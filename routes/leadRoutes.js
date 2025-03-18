const express = require("express");
const { createLead, getLeads, assignLeadScore } = require("../controllers/leadController");
const router = express.Router();

router.post("/create", createLead);
router.get("/list", getLeads);
router.put("/score/:id", assignLeadScore);

module.exports = router;
