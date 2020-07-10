var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var app = express();

require('dotenv').config()

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;
var staticIP = "10.10.10.167";

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// controller file
var routes_information = require("./controllers/information_controller");

var routes_information_owner = require("./controllers/information_owner_controller");
var routes_information_driver = require("./controllers/information_driver_controller");
var routes_information_truck = require("./controllers/information_truck_controller");
var routes_input_truck_payment = require("./controllers/input_truck_payment_controller");
var routes_input_part_purchase = require("./controllers/input_part_purchase_controller");
var routes_deduction_search_truck = require("./controllers/deduction_search_truck_controller");
var routes_deduction_search_part = require("./controllers/deduction_search_part_controller");
var routes_history_search_truck = require("./controllers/history_search_truck_controller");
var routes_history_search_part = require("./controllers/history_search_part_controller");


app.use(routes_information_owner);
app.use(routes_information_driver);
app.use(routes_information_truck);
app.use(routes_input_truck_payment);
app.use(routes_input_part_purchase);
app.use(routes_deduction_search_truck);
app.use(routes_deduction_search_part);
app.use(routes_history_search_truck);
app.use(routes_history_search_part);


// first login page
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/views/login.html'));
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, staticIP, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: " + staticIP + ":" + PORT);
});

// app.listen(process.env.PORT);





// Delete a todo
// app.delete("/todos/:id", function (req, res) {
//   connection.query("DELETE FROM deliveryOrder WHERE id = ?", [req.params.id], function (err, result) {
//     if (err) {
//       // If an error occurred, send a generic server failure
//       return res.status(500).end();
//     }
//     else if (result.affectedRows === 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     }
//     res.status(200).end();

//   });
// });

// app.get('/home', function (request, response) {
//   if (request.session.loggedin) {
//     response.send('Welcome back, ' + request.session.username + '!');
//   } else {
//     response.send('Please login to view this page!');
//   }
//   response.end();
// });

// app.get('/admin', function (request, response) {
//   if (request.session.loggedin) {
//     response.send('Welcome back, ' + request.session.username + '!');
//   } else {
//     response.send('Please login to view this page!');
//   }
//   response.end();
// });



// app.get("/", function (req, res) {
//   connection.query("SELECT * FROM deliveryOrder;", function (err, data) {
//     if (err) {
//       return res.status(500).end();
//     }

//     res.render("wrongPage", { deliveryOrder: data });
//   });
// });

// app.get("/gate/DeliveryOrder", function (req, res) {
//   connection.query("SELECT * FROM deliveryOrder;", function (err, data) {
//     if (err) {
//       return res.status(500).end();
//     }

//     res.render("index", { deliveryOrder: data });
//   });
// });













