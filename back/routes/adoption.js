const express = require('express');
const router = express.Router();
const AdoptionRequest = require('../models/AdoptionRequest');

router.post('/', async (req, res) => {
  try {
    const { name, telephone, email, reason, idanimal, iduser, proprietaire, myid, status } = req.body;

    const newRequest = new AdoptionRequest({
      name,
      telephone,
      email,
      reason,
      idanimal,
      iduser,
      proprietaire,
      myid,
      status 
    });

    await newRequest.save();
    res.status(201).json({ message: 'Demande enregistrée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});


router.get('/', async (req, res) => {
  try {
    const requests = await AdoptionRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});
// DELETE adoption request by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRequest = await AdoptionRequest.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Demande non trouvée' });
    }
    res.status(200).json({ message: 'Demande supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});
// Modifier le status d'une demande
router.put('/status/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'accepted', 'refused'].includes(status)) {
      return res.status(400).json({ message: 'Status invalide' });
    }

    const updatedRequest = await AdoptionRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Demande non trouvée' });
    }

    res.status(200).json({ message: 'Status modifié avec succès', updatedRequest });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});



module.exports = router;
