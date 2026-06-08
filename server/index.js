const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// Contact form route
app.post("/api/contact", (req, res) => {
  const { name, email, phone, message, interest } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required.",
    });
  }

  console.log("New contact form submission:");
  console.log({
    name,
    email,
    phone,
    message,
    interest,
  });

  res.status(201).json({
    success: true,
    message: "Contact form submitted successfully.",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});