const mongoose = require('mongoose');
const fileSchema = mongoose.Schema(
  {
    fileName: String,
  },
  { timestamps: true }
);

const File = mongoose.model('files', fileSchema);
module.exports = File;
