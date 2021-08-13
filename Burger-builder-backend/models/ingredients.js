const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ingredientsSchema = new schema ({
    salad :{
        type:Number,
        require:true
    },
    bacon:{
        type:Number,
        require:true
    },
    cheese:{
        type:Number,
        require:true
    },
    meat :{
        type:Number,
        require:true
    }
});

module.exports = mongoose.model("ingredients",ingredientsSchema);