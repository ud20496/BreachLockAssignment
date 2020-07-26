// const category = require('../models/category.model');
const Category = require('../models/category.model');

// Update a Category identified by the categoryId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // console.log(req.body);
  
    Category.updateById(
      req.params.categoryId,
      new Category(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Category with id ${req.params.categoryId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Category with id " + req.params.categoryId
            });
          }
        } else res.send(data);
      }
    );
  };