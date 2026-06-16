const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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