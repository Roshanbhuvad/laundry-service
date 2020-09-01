const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Customer = require("../models/customer");

router.post("/newUser", function (req, res, next) {
  const addOwner = new Customer({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  })
    .save()
    .then((result) => {
      res
        .json({
          customer: {
            name: result.name,
            phoneNumber: result.phoneNumber,
            password: result.password,
          },
        })
        .catch((err) => {
          res.json(err);
        });
    });
});

router.put("/newUser/:id", auth, function (req, res, next) {
  Customer.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      Customer.findOne({ _id: req.params.id }).then(function (result) {
        res.send(result);
      });
    })
    .catch(next);
});

router.delete("/newUser/:id", auth, function (req, res, next) {
  const deleteUser = Customer.findById(req.params.id);
  if (deleteUser) {
    deleteUser.remove();
    res.send({ message: "Customer deleted" });
  }
});

module.exports = router;
