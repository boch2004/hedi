const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const user = require("../models/User");
const jwt = require("jsonwebtoken");


const {
  loginRules,
  registerRules,
  validation,
} = require("../middleware/validator");
//Middleware check le formulaire si il'ya des champs obligatoires(name, email, etc).


const isAuth = require("../middleware/passport");
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
      newUserToken: token, 
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
  const { email, password } = req.body;
  try {
    const searchedUser = await User.findOne({ email });
    if (!searchedUser) {
      return res.status(400).send({ msg: "email invalide" });
    }

    const match = await bcrypt.compare(password, searchedUser.password);
    if (!match) {
      return res.status(400).send({ msg: "Mot de passe invalide" });
    }
   
    const payload = {
      _id: searchedUser._id,
      name: searchedUser.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
      
    });
    
    res
      .status(200)
      .send({ user: searchedUser, msg: "success", token: `bearer ${token}` });
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

//get all users 
router.get("/", async (req, res) => {
  try {

    let result = await User.find();
    res.send({ users: result, msg: "all users" })
  } catch (error) {
    console.log(error)
  }
})
// Get user by ID
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
