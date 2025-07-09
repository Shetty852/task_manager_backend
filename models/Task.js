const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  assignedTo: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Not Done', 'Done'], default: 'Not Done' } 
});

module.exports = mongoose.model('Task', taskSchema);
