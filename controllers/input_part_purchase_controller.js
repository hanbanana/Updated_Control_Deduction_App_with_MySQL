var express = require("express");
var session = require('express-session');
var router = express.Router();
var path = require('path');

// mysql connection
var connection = require("../db_connection/mysql_connection");

// caching disabled for every route
router.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

var authUser = function (req, res, next) {
    if (req.session && req.session.user === "user1" && req.session.customer)
        return next();
    else
        return res.sendStatus(401);
};

var authAdmin = function (req, res, next) {
    if (req.session && req.session.user === "adminSession" && req.session.admin)
        return next();
    else
        return res.sendStatus(401);
};

router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

router.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;

    if (username === "user1" && password === "user1") {
        request.session.customer = true;
        request.session.user = "user1";

        response.redirect('/customer');
    }
    else if (username === "admin1" && password === "admin1") {
        request.session.admin = true;
        request.session.user = "adminSession";

        response.redirect('/BC_Deduction');
    }
    else if (username === "admin2" && password === "admin2") {
        request.session.admin = true;
        request.session.user = "adminSession";

        response.redirect('https://www.google.com');
    }
    else {
        response.send('Incorrect Username and/or Password!');
    }
    response.end();
});

// Use Handlebars to render the main index.html page.
router.get("/BC_Deduction", authAdmin, function (req, res) {
    connection.query("SELECT * FROM information_owner_db;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }

        else if (req.session.user === "adminSession" || req.session.admin) {
            res.render("index", { b_division: data });
        }
        else {
            res.send('Please login to view this page!');
        }

    });
});

// Use Handlebars to render the main master_division.handlebars page.
router.get("/input_part_purchase", authAdmin, function (req, res) {
    connection.query("SELECT * FROM input_part_purchase_db;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }

        else if (req.session.user === "adminSession" || req.session.admin) {
            res.render("input_part_purchase", { b_division: data });
        }
        else {
            res.send('Please login to view this page!');
        }


    });
});

// Use Handlebars to render the create_b_division.handlebars page.
router.get("/input_pages/create_input_part_purchase", function (req, res) {
    connection.query("SELECT * FROM information_owner_db;", function (err, ownerData) {
        connection.query("SELECT * FROM information_driver_db;", function (err, driverData) {
            connection.query("SELECT * FROM information_truck_db;", function (err, truckData) {
                if (err) {
                    return res.status(500).end();
                }
                else if (req.session.user === "adminSession") {
                    res.render("input_pages/create_input_part_purchase", { information_owner: ownerData, information_driver: driverData, input_truck: truckData });
                };
            });
        });
    });
});

// Use Handlebars to render the edit_b_division.handlebars page.
router.get("/input_pages/edit_input_part_purchase/:id", function (req, res) {
    connection.query("SELECT * FROM input_part_purchase_db where id = ?", [req.params.id], function (err, partPurchaseData) {
        connection.query("SELECT * FROM information_owner_db;", function (err, ownerData) {
            connection.query("SELECT * FROM information_driver_db;", function (err, driverData) {
                connection.query("SELECT * FROM information_truck_db;", function (err, truckData) {
                    if (err) {
                        return res.status(500).end();
                    }
                    else if (req.session.user === "adminSession") {
                        res.render("input_pages/edit_input_part_purchase", { partPurchaseData, ownerData, driverData, truckData });
                    };
                });
            });
        });
    });
});

// Use Handlebars to render the delete_b_division.handlebars page.
router.get("/input_pages/delete_input_part_purchase/:id", function (req, res) {
    connection.query("SELECT * FROM input_part_purchase_db where id = ?", [req.params.id], function (err, data) {
        if (err) {
            return res.status(500).end();
        }
        else if (req.session.user === "adminSession") {
            console.log(data);
            res.render("input_pages/delete_input_part_purchase", data[0]);
        };
    });
});

// Create a new list
router.post("/input_part_purchase_list", function (req, res) {
    connection.query("INSERT INTO input_part_purchase_db (input_part_purchase_status, input_part_purchase_type, input_part_purchase_truck_no, input_part_purchase_owner_id, input_part_purchase_driver_id, input_part_purchase_invoice_no, input_part_purchase_amount, input_part_purchase_pay_week, input_part_purchase_date, input_part_purchase_add_pay, input_part_purchase_cr, input_part_purchase_invoice, input_part_purchase_desc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [req.body.input_part_purchase_status, req.body.input_part_purchase_type, req.body.input_part_purchase_truck_no, req.body.input_part_purchase_owner_id, req.body.input_part_purchase_driver_id, req.body.input_part_purchase_invoice_no, req.body.input_part_purchase_amount, req.body.input_part_purchase_pay_week, req.body.input_part_purchase_date, req.body.input_part_purchase_add_pay, req.body.input_part_purchase_cr, req.body.input_part_purchase_invoice, req.body.input_part_purchase_desc], function (err, result) {
            if (err) {
                return res.status(500).end();
            }

            // Send back the ID of the new todo
            res.json({ id: result.insertId });
            console.log({ id: result.insertId });
        });
});


// Retrieve all list
router.get("/input_part_purchase_list", function (req, res) {
    connection.query("SELECT * FROM input_part_purchase_db;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }

        res.json(data);
    });
});

// Update a list
router.put("/input_part_purchase_list/:id", function (req, res) {
    connection.query("UPDATE input_part_purchase_db SET input_part_purchase_status = ?, input_part_purchase_type = ?, input_part_purchase_truck_no = ?, input_part_purchase_owner_id = ?, input_part_purchase_driver_id = ?, input_part_purchase_invoice_no = ?, input_part_purchase_amount = ?, input_part_purchase_pay_week = ?, input_part_purchase_date = ?, input_part_purchase_add_pay = ?, input_part_purchase_cr = ?, input_part_purchase_invoice = ?, input_part_purchase_desc = ? WHERE id = ?",
        [req.body.input_part_purchase_status, req.body.input_part_purchase_type, req.body.input_part_purchase_truck_no, req.body.input_part_purchase_owner_id, req.body.input_part_purchase_driver_id, req.body.input_part_purchase_invoice_no, req.body.input_part_purchase_amount, req.body.input_part_purchase_pay_week, req.body.input_part_purchase_date, req.body.input_part_purchase_add_pay, req.body.input_part_purchase_cr, req.body.input_part_purchase_invoice, req.body.input_part_purchase_desc, req.params.id],
        function (err, result) {
            if (err) {
                // If an error occurred, send a generic server failure
                return res.status(500).end();
            }
            else if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();

        });
});

// Delete a list
router.delete("/input_part_purchase_list/:id", function (req, res) {
    connection.query("DELETE FROM input_part_purchase_db WHERE id = ?", [req.params.id], function (err, result) {
        if (err) {
            // If an error occurred, send a generic server failure
            return res.status(500).end();
        }
        else if (result.affectedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();

    });
});

module.exports = router;