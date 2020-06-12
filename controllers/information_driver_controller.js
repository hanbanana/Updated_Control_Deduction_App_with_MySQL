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
router.get("/information_driver", authAdmin, function (req, res) {
    connection.query("SELECT * FROM information_driver_db;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }

        else if (req.session.user === "adminSession" || req.session.admin) {
            res.render("information_driver", { b_division: data });
        }
        else {
            res.send('Please login to view this page!');
        }


    });
});

// Use Handlebars to render the create_b_division.handlebars page.
router.get("/information_pages/create_information_driver", function (req, res) {
    connection.query("SELECT * FROM information_truck_db;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }
        else if (req.session.user === "adminSession") {
            res.render("information_pages/create_information_driver", { b_division: data });
        };
    });
});


// Use Handlebars to render the edit_b_division.handlebars page.
router.get("/information_pages/edit_information_driver/:id", function (req, res) {
    connection.query("SELECT * FROM information_driver_db where id = ?", [req.params.id], function (err, data) {
        if (err) {
            return res.status(500).end();
        }
        else if (req.session.user === "adminSession") {
            console.log(data);
            res.render("information_pages/edit_information_driver", data[0]);
        };
    });
});

// Use Handlebars to render the delete_b_division.handlebars page.
router.get("/information_pages/delete_information_driver/:id", function (req, res) {
    connection.query("SELECT * FROM information_driver_db where id = ?", [req.params.id], function (err, data) {
        if (err) {
            return res.status(500).end();
        }
        else if (req.session.user === "adminSession") {
            console.log(data);
            res.render("information_pages/delete_information_driver", data[0]);
        };
    });
});

// Create a new list
router.post("/information_driver_list", function (req, res) {
    connection.query("INSERT INTO information_driver_db (information_driver_no, information_driver_name, information_driver_license_id, information_driver_rfc, information_driver_ife, information_driver_address) VALUES (?, ?, ?, ?, ?, ?)",
        [req.body.information_driver_no, req.body.information_driver_name, req.body.information_driver_license_id, req.body.information_driver_rfc, req.body.information_driver_ife, req.body.information_driver_address], function (err, result) {
            if (err) {
                return res.status(500).end();
            }

            // Send back the ID of the new todo
            res.json({ id: result.insertId });
            console.log({ id: result.insertId });
        });
});

// Retrieve all list
router.get("/information_driver_list", function (req, res) {
    connection.query("SELECT * FROM information_driver_db;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }

        res.json(data);
    });
});

// Update a list
router.put("/information_driver_list/:id", function (req, res) {
    connection.query("UPDATE information_driver_db SET information_driver_no = ?, information_driver_name = ?, information_driver_license_id = ?, information_driver_rfc = ?, information_driver_ife = ?, information_driver_address = ? WHERE id = ?",
        [req.body.information_driver_no, req.body.information_driver_name, req.body.information_driver_license_id, req.body.information_driver_rfc, req.body.information_driver_ife, req.body.information_driver_address, req.params.id],
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
router.delete("/information_driver_list/:id", function (req, res) {
    connection.query("DELETE FROM information_driver_db WHERE id = ?", [req.params.id], function (err, result) {
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