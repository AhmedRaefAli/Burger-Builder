const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserShema = new schema({
    email:{
        type:String,
        require:true},
    password:{
        type:String,
        require:true},
    orders: [
        {
          type: schema.Types.ObjectId,
          ref: 'Orders'
        }
      ]
});

module.exports = mongoose.model("Users",UserShema);