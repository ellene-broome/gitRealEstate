const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// Contact form route - saves to Supabase
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message, interest } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required.",
    });
  }

  const newSubmission = {
    name,
    email,
    phone: phone || "",
    message,
    interest: interest || "",
  };

  const { data, error } = await supabase
    .from("contact_leads")
    .insert([newSubmission])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not save contact form submission.",
    });
  }

  console.log("Saved contact form submission:");
  console.log(data[0]);

  try {
    await resend.emails.send({
      from: "Website Leads <onboarding@resend.dev>",
      to: process.env.LEAD_NOTIFICATION_EMAIL,
      subject: `New website lead from ${name}`,
      html: `
        <h2>New Website Lead</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Interest:</strong> ${interest || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("Lead notification email sent.");
  } catch (emailError) {
    console.error("Resend email error:", emailError);
  }

  res.status(201).json({
    success: true,
    message: "Contact form submitted successfully.",
    submission: data[0],
  });
});

function requireAdmin(req, res, next) {
  const adminPassword = req.headers["x-admin-password"];

  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({
      success: false,
      message: "Admin password is not configured on the server.",
    });
  }

  if (!adminPassword) {
    return res.status(401).json({
      success: false,
      message: "Admin password is required.",
    });
  }

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Invalid admin password.",
    });
  }

  next();
}

async function getContactLeads(req, res) {
  const { data, error } = await supabase
    .from("contact_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not fetch contact submissions.",
    });
  }

  res.json({
    success: true,
    count: data.length,
    submissions: data,
  });
}

// View saved contact leads from Supabase
app.get("/api/contact", requireAdmin, getContactLeads);

// Clearer admin leads route
app.get("/api/leads", requireAdmin, getContactLeads);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Delete a contact lead permanently
app.delete("/api/leads/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;

  const { data: existingLead, error: fetchError } = await supabase
    .from("contact_leads")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Supabase fetch before delete error:", fetchError);

    return res.status(404).json({
      success: false,
      message: "Lead not found.",
    });
  }

  if (!existingLead.archived) {
    return res.status(400).json({
      success: false,
      message: "Only archived leads can be deleted.",
    });
  }

  const { error: deleteError } = await supabase
    .from("contact_leads")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error("Supabase delete error:", deleteError);

    return res.status(500).json({
      success: false,
      message: "Could not delete lead.",
    });
  }

  res.json({
    success: true,
    message: "Lead deleted permanently.",
    deletedLeadId: id,
  });
});

// Update a contact lead
app.patch("/api/leads/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status, notes, archived } = req.body;

  const updates = {};

  if (status !== undefined) {
    updates.status = status;
  }

  if (notes !== undefined) {
    updates.notes = notes;
  }

  if (archived !== undefined) {
    updates.archived = archived;
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No valid lead updates were provided.",
    });
  }

  app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

  const { data, error } = await supabase
    .from("contact_leads")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Supabase update error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not update lead.",
    });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Lead not found.",
    });
  }

  res.json({
    success: true,
    message: "Lead updated successfully.",
    lead: data[0],
  });
});