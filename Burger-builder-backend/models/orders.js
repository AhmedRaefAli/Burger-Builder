const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema ({
    totalPrice :{
        type:Number,
        require:true
    },
    ingredients:{
        type:Object,
        require:true
    },
    delivaryMethod:{
        type:String,
        require:true
    },
    customer :{
        type: schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    mobileNumber:{
        type:Number,
        require:true
    },
    zibCode:{
        type : String,
        require:true
    },
    adress:{
        type:Object,
        require:true
    },
    name:{
        type:String,
        require:true},
});

module.exports = mongoose.model("Orders",orderSchema);