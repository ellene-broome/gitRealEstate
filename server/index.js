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

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Contact form route - saves to Supabase
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message, interest } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required.",
    });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Not provided");
  const safeInterest = escapeHtml(interest || "Not provided");
  const safeMessage = escapeHtml(message);

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
    const emailResult = await resend.emails.send({
      from: "Website Leads <onboarding@resend.dev>",
      to: process.env.LEAD_NOTIFICATION_EMAIL,
      subject: `New website lead from ${safeName}`,
      html: `
        <div style="margin:0; padding:0; background-color:#f5f1e8; font-family:Arial, sans-serif;">
          <div style="max-width:640px; margin:0 auto; padding:32px 16px;">
            <div style="background-color:#0a0a0a; border-radius:18px; overflow:hidden; border:1px solid #c8a96b;">

              <div style="padding:28px 28px 18px; text-align:center; background-color:#000000;">
                <h1 style="margin:0; color:#c8a96b; font-size:28px; letter-spacing:0.5px;">
                  New Website Lead
                </h1>

                <p style="margin:10px 0 0; color:#d4d4d4; font-size:15px;">
                  Git Real Estate contact form submission
                </p>
              </div>

              <div style="padding:28px; background-color:#111827;">

                <div style="margin-bottom:18px; padding:16px; background-color:#ffffff; border-radius:12px;">
                  <p style="margin:0 0 6px; color:#777; font-size:12px; text-transform:uppercase; font-weight:bold;">
                    Name
                  </p>
                  <p style="margin:0; color:#111; font-size:18px; font-weight:bold;">
                    ${safeName}
                  </p>
                </div>

                <div style="margin-bottom:18px; padding:16px; background-color:#ffffff; border-radius:12px;">
                  <p style="margin:0 0 6px; color:#777; font-size:12px; text-transform:uppercase; font-weight:bold;">
                    Email
                  </p>
                  <p style="margin:0; color:#111; font-size:16px;">
                    <a href="mailto:${safeEmail}" style="color:#1e3a8a; text-decoration:none;">
                      ${safeEmail}
                    </a>
                  </p>
                </div>

                <div style="margin-bottom:18px; padding:16px; background-color:#ffffff; border-radius:12px;">
                  <p style="margin:0 0 6px; color:#777; font-size:12px; text-transform:uppercase; font-weight:bold;">
                    Phone
                  </p>
                  <p style="margin:0; color:#111; font-size:16px;">
                    ${safePhone}
                  </p>
                </div>

                <div style="margin-bottom:18px; padding:16px; background-color:#ffffff; border-radius:12px;">
                  <p style="margin:0 0 6px; color:#777; font-size:12px; text-transform:uppercase; font-weight:bold;">
                    Interest
                  </p>
                  <p style="margin:0; color:#111; font-size:16px;">
                    ${safeInterest}
                  </p>
                </div>

                <div style="padding:16px; background-color:#ffffff; border-radius:12px;">
                  <p style="margin:0 0 6px; color:#777; font-size:12px; text-transform:uppercase; font-weight:bold;">
                    Message
                  </p>
                  <p style="margin:0; color:#111; font-size:16px; line-height:1.6;">
                    ${safeMessage}
                  </p>
                </div>

              </div>

              <div style="padding:22px 28px;  text-align:center; background-color:#000000;">
                <p style="margin:0 0 16px; color:#a3a3a3; font-size:13px;">
                Check your admin leads page to update status, add notes, or archive this lead.
                </p>

                <a
                  href="${process.env.LEADS_DASHBOARD_URL || "#"}"
                  style="display:inline-block; padding:12px 20px; background-color:#c8a96b; color:#111111; text-decoration:none; border-radius:999px; font-weight:bold; font-size:14px;"
                >
                  Open Leads Dashboard
                </a>
              </div>

            </div>
          </div>
        </div>
      `,
    });

    console.log(
      "Lead notification email sent to:",
      process.env.LEAD_NOTIFICATION_EMAIL
    );
    console.log("Resend result:", emailResult);
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});