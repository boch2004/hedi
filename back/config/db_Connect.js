const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        mongoose.set("strictQuery", false);
        //Pour appler la base avec un quary sans afficher un warning si elle est non définis dans le schéma.

        await mongoose.connect(process.env.DB_URI, {
            //La connexion avec la BD  et le entre () c'est le lien de la BD 
            useNewUrlParser: true, //des recommendations de mongoos 
            useUnifiedTopology: true
            
        });

        console.log("Database is connected successfully!");
    } catch (error) {
       
        console.error("Database connection failed:", error.message);
        process.exit(1);
    
    }
};

module.exports = connectDB;
