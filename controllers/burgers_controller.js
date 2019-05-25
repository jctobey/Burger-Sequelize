var express = require("express");
var db = require("../models");

var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  db.burger.findAll({}).then(function(hbsObject) {
    var hbsObject = {
      burgers: hbsObject
    };

    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  db.burger.create(req.body).then(function(dbfound_pets) {
    res.json(dbfound_pets);
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = req.params.id;

  console.log("condition", condition);

  db.burger.update(
    {
      devoured: req.body.devoured
    },
    {
      where: {
        id: condition
      }
    }
  );
});

// router.delete("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   burger.deleteOne(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// Export routes for server.js to use.
module.exports = router;
