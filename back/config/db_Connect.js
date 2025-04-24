const mongoose = require("mongoose");
//je suis en train d'importer la bibliothèque Mongoose, qui me permet de travailler avec MongoDB d'une façon plus simple et organisée

const connectDB = async () => {
    try {

        mongoose.set("strictQuery", false);
        //Pour appler la base avec un quary sans afficher un warning 

        await mongoose.connect(process.env.DB_URI, {
            //La connexion avec la BD  et le entre () c'est le lien de la BD 
            useNewUrlParser: true, 
            //Utliser une nouvelle parser  pour evitér des warnings 
            useUnifiedTopology: true
            //nouvelle architecture 
        });

        console.log("Database is connected successfully!");
    } catch (error) {
        // Si il y'a un erreur w BD mch connecté - Dis nous c'est quoi l'érreur si il y'a un probleme sinon on passe catch 
        console.error("Database connection failed:", error.message);
        process.exit(1);
    // Stop parce que c'est pas normal d'utiliser l'app sans BD
    }
};

module.exports = connectDB;
