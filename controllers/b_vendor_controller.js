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
    connection.query("SELECT * FROM b_vendor;", function (err, data) {
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

// Use Handlebars to render the main master_vendor.handlebars page.
router.get("/master_vendor", authAdmin, function (req, res) {
    connection.query("SELECT * FROM b_vendor;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }

        else if (req.session.user === "adminSession" || req.session.admin) {
            res.render("master_vendor", { b_vendor: data });
        }
        else {
            res.send('Please login to view this page!');
        }


    });
});

// Use Handlebars to render the create_b_vendor.handlebars page.
router.get("/b_vendor_pages/create_b_vendor", function (req, res) {
    connection.query("SELECT * FROM b_division;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }
        else if (req.session.user === "adminSession") {
            res.render("b_vendor_pages/create_b_vendor", { b_vendor_division: data });
        };
    });
});

// router.get("/b_vendor_pages/create_b_vendor_add_div", function (req, res) {
//     connection.query("SELECT * FROM b_division;", function (err, data) {
//         if (err) {
//             return res.status(500).end();
//         }
//         else if (req.session.user === "adminSession") {
//             res.render("b_vendor_pages/create_b_vendor_add_div", { b_vendor_division: data });
//         };
//     });
// });

// router.get("/b_vendor_pages/create_b_vendor_add_div_2", function (req, res) {
//     connection.query("SELECT * FROM b_division;", function (err, data) {
//         if (err) {
//             return res.status(500).end();
//         }
//         else if (req.session.user === "adminSession") {
//             res.render("b_vendor_pages/create_b_vendor_add_div_2", { b_vendor_division: data });
//         };
//     });
// });

// router.get("/b_vendor_pages/create_b_vendor_add_div_2/:id", function (req, res) {
//     connection.query("SELECT * FROM b_division where id = ?", [req.params.id], function (err, data) {
//         if (err) {
//             return res.status(500).end();
//         }
//         else if (req.session.user === "adminSession") {
//             console.log(data);
//             res.render("b_vendor_pages/create_b_vendor_add_div_2", data[0]);
//         };
//     });
// });

// Use Handlebars to render the edit_b_vendor.handlebars page.
// router.get("/b_vendor_pages/edit_b_vendor/:id", function (req, res) {
//     connection.query("SELECT * FROM b_vendor where id = ?", [req.params.id], function (err, data) {
//         if (err) {
//             return res.status(500).end();
//         }
//         else if (req.session.user === "adminSession") {
//             console.log(data);
//             res.render("b_vendor_pages/edit_b_vendor", data[0]);
//         };
//     });
// });

// two tables from mysql: Use Handlebars to render the edit_b_vendor.handlebars page.
router.get("/b_vendor_pages/edit_b_vendor/:id", function (req, res) {
    connection.query("SELECT * FROM b_vendor where id = ?", [req.params.id], function (err, result1) {
        connection.query("SELECT * FROM b_division;", function (err, result2) {
        if (err) {
            return res.status(500).end();
        }
        else if (req.session.user === "adminSession") {
            console.log(result1);
            console.log(result2);
            res.render("b_vendor_pages/edit_b_vendor", {result1, result2});
        };
    });
});
});

// Use Handlebars to render the delete_b_vendor.handlebars page.
router.get("/b_vendor_pages/delete_b_vendor/:id", function (req, res) {
    connection.query("SELECT * FROM b_vendor where id = ?", [req.params.id], function (err, data) {
        if (err) {
            return res.status(500).end();
        }
        else if (req.session.user === "adminSession") {
            console.log(data);
            res.render("b_vendor_pages/delete_b_vendor", data[0]);
        };
    });
});

// Create a new list
router.post("/b_vendor_list", function (req, res) {
    connection.query("INSERT INTO b_vendor (vendor_div, vendor_vendor_code, vendor_vendor_name, vendor_registration_name_1, vendor_registration_name_2, vendor_registration_address, vendor_lien_holder) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [req.body.vendor_div, req.body.vendor_vendor_code, req.body.vendor_vendor_name, req.body.vendor_registration_name_1, req.body.vendor_registration_name_2, req.body.vendor_registration_address, req.body.vendor_lien_holder], function (err, result) {
            if (err) {
                return res.status(500).end();
            }

            // Send back the ID of the new todo
            res.json({ id: result.insertId });
            console.log({ id: result.insertId });
        });
});

// for create_b_vendor_add_div

// router.post("/b_vendor_list", function (req, res) {
//     connection.query("INSERT INTO b_vendor (vendor_div, vendor_div_name, vendor_vendor_code, vendor_vendor_name, vendor_registration_name_1, vendor_registration_name_2, vendor_registration_address, vendor_lien_holder) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//         [req.body.vendor_div, req.body.vendor_div_name, req.body.vendor_vendor_code, req.body.vendor_vendor_name, req.body.vendor_registration_name_1, req.body.vendor_registration_name_2, req.body.vendor_registration_address, req.body.vendor_lien_holder], function (err, result) {
//             if (err) {
//                 return res.status(500).end();
//             }

//             // Send back the ID of the new todo
//             res.json({ id: result.insertId });
//             console.log({ id: result.insertId });
//         });
// });


// Retrieve all list
router.get("/b_vendor_list", function (req, res) {
    connection.query("SELECT * FROM b_vendor;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }

        res.json(data);
    });
});

// Update a lits
router.put("/b_vendor_list/:id", function (req, res) {
    connection.query("UPDATE b_vendor SET vendor_div = ?, vendor_vendor_code = ?, vendor_vendor_name = ?, vendor_registration_name_1 = ?, vendor_registration_name_2 = ?, vendor_registration_address = ?, vendor_lien_holder = ? WHERE id = ?",
        [req.body.vendor_div, req.body.vendor_vendor_code, req.body.vendor_vendor_name, req.body.vendor_registration_name_1, req.body.vendor_registration_name_2, req.body.vendor_registration_address, req.body.vendor_lien_holder, req.params.id],
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
router.delete("/b_vendor_list/:id", function (req, res) {
    connection.query("DELETE FROM b_vendor WHERE id = ?", [req.params.id], function (err, result) {
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