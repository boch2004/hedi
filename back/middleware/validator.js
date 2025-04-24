const { check, validationResult } = require("express-validator");
// Importer check et validationResult de la package express-validator

exports.registerRules = () => [
  //Fct lorsque le visiteur veux faire une inscrit 
  check("name", "name is required").notEmpty(),
  //Faire un check pour le nom , si il ya un erreur il affiche le msg name is required 
  check("lastname", "lastname is required").notEmpty(),
  check("email", "name is required").notEmpty(),
  check("email", "check email again").isEmail(),
  check("password", "password is required").isLength({
    min: 6,
    max: 20,
  }),
];

exports.loginRules = () => [
  //il faut valider 2 champs 
  check("email", "name is required").notEmpty(),
  check("email", "check email again").isEmail(),
  check(
    "password",
    "password must be between 6 character and 20 character"
  ).isLength({
    min: 6,
    max: 20,
  }),
];
exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  //Lire les résultats de validation : s'il ya une faute dans les inputs 
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((el) => ({
        msg: el.msg,
      })),
    });
  }
  next();
};

//Cette partie faire un check pour les inputs envoyé par utlisateurs et si'il fya un errueur au niveau de l'input il le stop   
// Faire un check au niveau de mail , passwaord ... et sil ya une chose cv pas 