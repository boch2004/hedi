const express = require("express");
const User = require("../models/User");
// Nous utilisons express pour créer des routes spéciales pour l’utilisateur.
const router = express.Router();
const bcrypt = require("bcrypt");
//Cryté la mdp 
const user = require("../models/User");
//Nous importons le modèle User pour pouvoir ajouter, modifier ou chercher un utilisateur dans BD
const jwt = require("jsonwebtoken");
//JWT nous permt de faire l'authentication. Pas d'accées au BD pour chaque utlisateur 
const {
  loginRules,
  registerRules,
  validation,
} = require("../middleware/validator");
//Middleware check le formulaire si il'ya des champs obligatoires(name, email, etc).


const isAuth = require("../middleware/passport");
//check que l'utlisateur est connecté 

//register route 
router.post("/register", registerRules(), validation, async (req, res) => {
  // Si il y'a un user veut inscrit , il passe par là :
  const { name, lastname, email, password, category, img } = req.body;
  //des infos 
  try {
    const newUser = new User({ name, lastname, email, password,category, img });
    // check if the email exist
    const searchedUser = await User.findOne({ email });
    //check si il'ya un user à le meme email 

    if (searchedUser) {
      return res.status(400).send({ msg: "email already exist" });
    }

    // crypté password
    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    //crytptage de mdp pour etre plus sécruisé 
    console.log(hashedPassword);
    newUser.password = hashedPassword;
    // generation token
    //save  the user
    const newUserToken = await newUser.save();
    const payload = {
      _id: newUser._id,
      name: newUserToken.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrkey, {
      expiresIn: 3600,
    });

    res
      .status(200)
      .send({ newUserToken, msq: "user is saved", token: `bearer ${token}` });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Le login
router.post("/login", loginRules(), validation, async (req, res) => {
  //User veut se connecter , il passe par là 
  const { email, password } = req.body;
  try {
    //Si il'ya un utlisateur avec le meme mail 
    const searchedUser = await User.findOne({ email });
    //si le mail n'existe pas 
    if (!searchedUser) {
      return res.status(400).send({ msg: "Invalid email" });
    }
    //si mdp est validée 
    const match = await bcrypt.compare(password, searchedUser.password);
    if (!match) {
      return res.status(400).send({ msg: "Invalid password" });
    }
    //creer un token
    const payload = {
      _id: searchedUser._id,
      name: searchedUser.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
      //sa supprime aprés 3600 seconde
    });
    //console.log(token)

    //send the user
    res
      .status(200)
      .send({ user: searchedUser, msg: "success", token: `bearer ${token}` });
      //l'ultilisateur a msg: "success" si login marche sinon token: JWT token presente à chaque requete , et se s'écrit au format bearer 
  } catch (error) {
    res.status(500).send({ msg: "Can not get the user" });
  }
});

router.get("/current", isAuth(), (req, res) => {
  res.status(200).send({ user: req.user });
});


//supprimer un user
router.delete("/:id", async (req, res) => {
  try {

      let result = await User.findByIdAndDelete(req.params.id);
      //supprime le user de la BD
      res.send({ msg: "user is deleted" })
  } catch (error) {
      console.log(error)
  }
})




//modifier user
router.put("/:id", async (req, res) => {
  //PUT = modifier 
    try {

      let result = await User.findByIdAndUpdate(
        //faire la recherche par ID et fait les modifications 
          { _id: req.params.id }, { $set: { ...req.body } }
      );
      res.send({ msg: "user is updated" })
  } catch (error) {
      console.log(error)
  }
})

//get tout les  users , faire un appel a tout les usuers 
router.get("/", async (req, res) => {
  try {

      let result = await User.find();
      res.send({ users: result, msg: "all users" })
  } catch (error) {
      console.log(error)
  }
})





module.exports = router;
