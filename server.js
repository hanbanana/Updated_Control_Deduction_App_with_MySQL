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

// b_division_controller file
var routes_information = require("./controllers/information_controller");

// b_vendor_controller file
var routes_b_vendor = require("./controllers/b_vendor_controller");

// b_truck_controller file
var routes_b_truck = require("./controllers/b_truck_controller");

app.use(routes_information);
app.use(routes_b_vendor);
app.use(routes_b_truck);

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













