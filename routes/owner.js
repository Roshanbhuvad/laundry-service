const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Owner = require("../models/owner");

router.post("/newOwner", auth, function (req, res, next) {
  const addOwner = new Owner({
    name: req.body.name,
    location: req.body.location,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    shopOpeningTime: req.body.shopOpeningTime,
    geometry: req.body.geometry,
  })
    .save()
    .then((result) => {
      res
        .json({
          owner: {
            name: result.name,
            location: result.location,
            phoneNumber: result.phoneNumber,
            address: result.address,
            shopOpeningTime: result.shopOpeningTime,
            geometry: result.geometry,
          },
        })
        .catch((err) => {
          res.json(err);
        });
    });
});
router.put("/newOwner/:id", auth, function (req, res, next) {
  Owner.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      Owner.findOne({ _id: req.params.id }).then(function (result) {
        res.send(result);
      });
    })
    .catch(next);
});

router.delete("/newOwner/:id", auth, function (req, res, next) {
  const deleteOwner = Owner.findById(req.params.id);
  if (deleteOwner) {
    deleteOwner.remove();
    res.send({ message: "Owner deleted" });
  }
});

module.exports = router;
