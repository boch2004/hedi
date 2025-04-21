const mongoose=require("mongoose");
const schema=mongoose.Schema;


const favorisSchema = new schema({
    iduser:String,
    nameuser:String,
    nameanimal:String,
    imganimal:String,
    description:String,
    Ingredients:Array,
    Directions:Array,
    chef:String,
    idurl:String,
});


const Favoris = mongoose.model('Favoris', favorisSchema);
module.exports=Favoris;