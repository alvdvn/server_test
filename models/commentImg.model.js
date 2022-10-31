const mongoose = require("mongoose");
const CmtIMGSchema = new mongoose.Schema({
    commentId:{type: mongoose.Schema.Types.ObjectId,ref: 'comment'},
    CmtImg: {type: String}
});
module.exports = mongoose.model("commentIMG", CmtIMGSchema);
