const Lead = require("../models/Lead");
const { getLeadScore } = require("../services/aiService");

// Create a new lead
const createLead = async (req, res) => {
    try {
        const lead = await Lead.create(req.body);
        res.status(201).json(lead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all leads
const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Assign AI-based lead score
const assignLeadScore = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ message: "Lead not found" });

        lead.score = await getLeadScore(lead);
        await lead.save();

        res.json({ message: "Lead scored successfully", lead });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createLead, getLeads, assignLeadScore };
