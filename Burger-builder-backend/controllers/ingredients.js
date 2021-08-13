const  ingModel = require("../models/ingredients");

exports.getingredients=(req,res,next)=>{

    ingModel.find()
    .then(ings=>{
        res.status(200).json({
            message: 'Fetched ings successfully.',
            ings: ings,
          });
    })
    .catch(err => {
        console.log(err);
        if (!err.statusCode) {
          err.statusCode = 500;
          err.message="server error at getting ings "
        }
        next(err);
      });
};
