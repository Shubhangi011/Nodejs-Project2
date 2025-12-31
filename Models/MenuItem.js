const mongoose=require('mongoose');

const MenuItem={
    dish:{
        type:String,
        required:true
    },
    ingredients:{
        type:[],
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    is_tasty:{
        type:Boolean,
    }
};

const menuCard=mongoose.model('MenuItem',MenuItem);
module.exports=menuCard;