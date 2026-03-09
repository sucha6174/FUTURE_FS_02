const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/crm")

const Lead = mongoose.model("Lead", {
  name: String,
  email: String,
  source: String,
  status: String,
  notes: String
})

// Test route
app.get("/", (req,res)=>{
  res.send("CRM Server Running")
})

app.listen(5000, ()=>{
  console.log("Server running on port 5000")
})

// Add new lead
app.post("/leads", async (req, res) => {

  try {

    const lead = new Lead({
      name: req.body.name,
      email: req.body.email,
      source: req.body.source,
      status: "new",
      notes: ""
    })

    await lead.save()

    res.json({
      message: "Lead added successfully",
      lead
    })

  } catch (error) {
    res.status(500).json({ error: "Error adding lead" })
  }

})