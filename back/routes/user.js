const express = require("express");
const User = require("../models/User");
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
  const { name, lastname, email, password, category, img, postalCode, phone, location } = req.body;

  try {
    const searchedUser = await User.findOne({ email });
    if (searchedUser) {
      return res.status(400).send({ msg: "Email déjà utilisé." });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      lastname,
      email,
      password: hashedPassword,
      category,
      img,
      postalCode,
      phone,
      location,
    });

    const savedUser = await newUser.save();

    const payload = {
      _id: savedUser._id,
      name: savedUser.name,
    };

    const token = jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });

    res.status(200).send({
      newUserToken: savedUser,
      msg: "Utilisateur enregistré avec succès.",
      token: `bearer ${token}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Erreur lors de l'enregistrement." });
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
router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

//get tout les  users , faire un appel a tout les usuers 
router.get("/", async (req, res) => {
  try {

      let result = await User.find();
      res.send({ users: result, msg: "all users" })
  } catch (error) {
      console.log(error)
  }
})
// ✅ Get user by ID
router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});






module.exports = router;
