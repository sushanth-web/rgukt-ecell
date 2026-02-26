const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const gallery_route = require("./routes/galleryRoute");
const team_route = require("./routes/teamRoute");
const eventRoutes = require("./routes/eventRoutes");
const startupRoutes = require("./routes/startupRoutes");
const speakerRoutes = require("./routes/speakerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("E-Cell Backend Running 🚀");
});

app.use("/api/gallery", gallery_route);
app.use("/api/team", team_route);
app.use("/api/events", eventRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/speakers", speakerRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
  }
}

startServer();