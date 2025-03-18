const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    source: { type: String, enum: ["web", "email", "social", "other"], required: true },
    score: { type: Number, default: 0 },
    status: { type: String, enum: ["new", "contacted", "qualified", "closed"], default: "new" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lead", leadSchema);
