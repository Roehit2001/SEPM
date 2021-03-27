const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const ejsLint = require('ejs-lint');
const User = require('./models/user');
const app_dev = require('./models/app_dev');
const ui = require('./models/ui');
const cyber = require('./models/cyber');
const web = require('./models/web');
const corporate = require('./models/corporate');
const Question = require('./models/question');
const Ans = require("./models/ans");
const bcrypt = require('bcrypt');
const session = require("express-session");
const e = require('express');
const user = require('./models/user');
mongoose.connect('mongodb://localhost:27017/SEPM', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log("MONGO CONNECTION OPEN") }).catch(err => {
    console.log("THERE IS A PROBLEM");
    console.log(err)
});
//mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(__dirname + '/Assets'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "I love Batman" }))
var currentdate = new Date();
mongoose.set('useFindAndModify', false);
var datetime = " at " + currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();
const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect("/login");
    }
    next();
}
const App_dev = new app_dev({
    level1: "",
    time1: "",
    level2: "",
    time2: "",
    Assi: "",
    d1: "",
    t1: "",
    t2: "",
    t3: "",
    d2: "",
    t4: "",
    t5: "",
    t6: "",
    d3: "",
    t7: "",
    t8: "",
    t9: ""
});
App_dev.save();
const Corporate = new corporate({
    level1: "",
    time1: "",
    level2: "",
    time2: "",
    Assi: "",
    d1: "",
    t1: "",
    t2: "",
    t3: "",
    d2: "",
    t4: "",
    t5: "",
    t6: "",
    d3: "",
    t7: "",
    t8: "",
    t9: ""
});
Corporate.save();

const Ui = new ui({
    level1: "",
    time1: "",
    level2: "",
    time2: "",
    Assi: "",
    d1: "",
    t1: "",
    t2: "",
    t3: "",
    d2: "",
    t4: "",
    t5: "",
    t6: "",
    d3: "",
    t7: "",
    t8: "",
    t9: ""
});
Ui.save();
const Cyber = new cyber({
    level1: "",
    time1: "",
    level2: "",
    time2: "",
    Assi: "",
    d1: "",
    t1: "",
    t2: "",
    t3: "",
    d2: "",
    t4: "",
    t5: "",
    t6: "",
    d3: "",
    t7: "",
    t8: "",
    t9: ""
});
Cyber.save();
const Web = new web({
    level1: "",
    time1: "",
    level2: "",
    time2: "",
    Assi: "",
    d1: "",
    t1: "",
    t2: "",
    t3: "",
    d2: "",
    t4: "",
    t5: "",
    t6: "",
    d3: "",
    t7: "",
    t8: "",
    t9: ""
});
Web.save();
//REGISTER
app.get("/register", (req, res) => {
    res.render('register', { msg: "" });
});
app.post("/register", async (req, res) => {
    const { name, department, whatsapp_number, email, reg, year, phone_number, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    
    User.findOne({ email: email }).then(user => {
        if (user) {
            res.render("register", { msg: "User already exist" });
        } else {

            const user = new User({
                email,
                password: hash,
                name,
                phone_number,
                selection_level: "wait",
                selection_level1: "wait",
                domain_1: "",
                domain_2: "",
                linkedin: "",
                day: "",
                time: "",
                day1: "",
                time2: ""
            });
            user.save();
            req.session.user_id = user._id;
            res.redirect("/login");
        }
    });
});
//Login
app.get("/", (req, res) => {
    res.redirect("/login");
});
app.get("/login", (req, res) => {
    res.render("login", { msg: "" });
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            if (user.email == "webdev.scro@gmail.com") {
                console.log("Admin Logged in" + datetime);
                req.session.user_id = user._id;
                return res.redirect("/admin/" + user._id);
            }
            if (user.email == "ewebdev.scro@gmail.com") {
                console.log("eAdmin Logged in" + datetime);
                req.session.user_id = user._id;
                return res.redirect("/eadmin/" + user._id);
            }
            req.session.user_id = user._id;
            res.redirect("/portal/" + user._id);
        } else {

            res.redirect("/login/wrgcre");
            // console.log("Invalid password entered.")
        }
    } catch (error) {
        res.redirect("/login/wrgcre");
    }


});
app.get("/login/wrgcre", (req, res) => {
    res.render("login", { msg: "Wrong email or password" });
});
//User portal
app.get("/portal/:id", requireLogin, (req, res) => {
    User.findById(req.params.id).then(user => {
        if (!user) {
            req.redirect("/login");
        }
        cyber.find({}, (err, data1) => {

            app_dev.find({}, (err, data2) => {

                corporate.find({}, (err, data3) => {

                    ui.find({}, (err, data5) => {
                        web.find({}, (err, data6) => {
                            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                            res.render("portal", { id: req.params.id, user: user, cyber: data1, app_dev: data2, corporate: data3, ui: data5, web: data6 });
                        })
                    })

                })
            });
        });
    });
});

app.post("/domain/:id", requireLogin, (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, { "domain_1": req.body.domain_1, "domain_2": req.body.domain_2 }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/portal/" + req.params.id);
        }
    });
});
app.post("/someMore0/:id", requireLogin, (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, { "linkedin": req.body.linkedin }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/portal/" + req.params.id);
        }
    });
});
app.post("/someMore1/:id", requireLogin, (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, {
        "linkedin": req.body.linkedin,
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/portal/" + req.params.id);
        }
    });
});
app.post("/assignment/:id", requireLogin, (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, { "Assignment1": req.body.Assignment1 }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/portal/" + req.params.id);
        }
    });
})
app.post("/someMore2/:id", requireLogin, (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, { "github": req.body.github, "linkedin": req.body.linkedin, }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/portal/" + req.params.id);
        }
    });
});
// app.post("/someMore3/:id", requireLogin, (req, res) => {
//     const id = req.params.id;
//     User.findByIdAndUpdate(id, { "corp": req.body.corp }, (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.redirect("/portal/" + req.params.id);
//         }
//     });
// });
app.get("/exam/:id/:domain", requireLogin, (req, res) => {
    User.findById(req.params.id).then(user => {
        if (!user) {
            req.redirect("/login");
        }
        // if (user.domain_1 != req.params.domain || user.domain_2 != req.params.domain) {
        //     req.redirect("/choose/" + req.params.id);
        // }
        //res.render("eportal", { userId: req.params.id});
    });
    Question.find({ domain: req.params.domain }, (err, data) => {
        if (err) {
            res.redirect("/login");
        }
        // res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render("eportal", { question: data, userId: req.params.id, domain: req.params.domain });
    });
});
app.get("/choose/:id", requireLogin, (req, res) => {
    User.findById(req.params.id).then((user) => {

        res.render("inter", { user: user });
    });
});
app.get("/eadmin/:id", requireLogin, (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if ((user.email == "webdev.scro@gmail.com")) {

            Question.find({}, (err, data) => {
                res.render("eadmin", { id: req.params.id, data: data });
            })
        } else { res.redirect("/login"); }

    });

});
app.get("/crt/:id/:domain", requireLogin, (req, res) => {

    Ans.find({ "userId": req.params.id, "domain": req.params.domain }, (err, ans) => {

        User.findById(req.params.id).then(user => {
            Question.find({ domain: req.params.domain }, (err, question) => {
                res.render("mark", { ans: ans, user: user, question: question });
            });
        });
    });
});

app.post("/question", async (req, res) => {
    const { question, option1, option2, option3, option4, Answer, domain } = req.body;
    const qu = new Question({
        question,
        option1,
        option2,
        option3,
        option4,
        Answer,
        domain
    });
    await qu.save();
    res.redirect("/eadmin/" + req.params.id);
});
app.post("/questions", async (req, res) => {

    try {
        const {
            userId,
            q1,
            a1,
            q2,
            a2,
            q3,
            a3,
            q4,
            a4,
            q5,
            a5,
            q6,
            a6,
            q7,
            a7,
            q8,
            a8,
            q9,
            a9,
            q10,
            a10,
            q11,
            a11,
            q12,
            a12,
            q13,
            a13,
            q14,
            a14,
            q15,
            a15,
            q16,
            a16,
            q17,
            a17,
            q18,
            a18,
            q19,
            a19,
            q20,
            a20,
            q21,
            a21,
            q22,
            a22,
            q23,
            a23,
            q24,
            a24,
            q25,
            a25,
            domain
        } = req.body;
        const a = new Ans({
            userId,
            q1,
            a1,
            q2,
            a2,
            q3,
            a3,
            q4,
            a4,
            q5,
            a5,
            q6,
            a6,
            q7,
            a7,
            q8,
            a8,
            q9,
            a9,
            q10,
            a10,
            q11,
            a11,
            q12,
            a12,
            q13,
            a13,
            q14,
            a14,
            q15,
            a15,
            q16,
            a16,
            q17,
            a17,
            q18,
            a18,
            q19,
            a19,
            q20,
            a20,
            q21,
            a21,
            q22,
            a22,
            q23,
            a23,
            q24,
            a24,
            q25,
            a25,
            domain
        });
        await a.save();
        User.findById(userId).then((user) => {
            if (user.domain_1 == domain) {
                User.findByIdAndUpdate(userId, { "selection_level": "Exam Given" }, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            if (user.domain_2 == domain) {
                User.findByIdAndUpdate(userId, { "selection_level1": "Exam Given" }, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            if (user.domain_2 == user.domain_1) {
                User.findByIdAndUpdate(userId, { "selection_level1": "Exam Given", "selection_level": "Exam Given" }, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        })

    }
    catch (error) {
        res.send(error);
    }
    res.redirect("/seq");

});
app.get("/seq", (req, res) => {
    req.session.user_id = null;
    req.session.destroy();
    res.redirect("/login");
});
app.post("/logout", (req, res) => {
    req.session.user_id = null;
    req.session.destroy();
    res.redirect("/login");
});
// app.post("/crt/:id/:domain", (req, res) => {
//     var Mark = 0;
//     Ans.findById(req.params.id, (err, ans) => {
//         Question.find({ domain: req.params.domain }, (err, question) => {
//             User.findById(ans.userID, (err, user) => {
//                 if (ans.a1 == question.Answer) {
//                     Mark++;
//                 }
//             });
//         });
//     });
// });
app.get("/admin/:id", requireLogin, (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (!(user.email == "webdev.scro@gmail.com")) {
            res.redirect("/login");
        }
    });

    User.find({}, (err, data) => {

        cyber.find({}, (err, data1) => {

            app_dev.find({}, (err, data2) => {

                corporate.find({}, (err, data3) => {

                    ui.find({}, (err, data5) => {
                        web.find({}, (err, data6) => {
                            // res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                            res.render("admin", { user: data, cyber: data1, app_dev: data2, corporate: data3, ui: data5, web: data6, id: req.params.id });
                        })
                    })

                })
            });
        });


    });
});

app.get("/edit/:id/:admin", requireLogin, (req, res) => {
    User.findById(req.params.id).then(user => {
        if (!user) {
            // res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            req.redirect("/admin/" + req.params.admin);
        }
        // res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render("edit", { id: req.params.id, user: user, aid: req.params.id });
    });
});
app.post("/dandt/:id", requireLogin, (req, res) => {
    // console.log(req.body);
    const id = req.params.id;
    User.findByIdAndUpdate(id, { "day": req.body.date, "time": req.body.time }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/portal/" + req.params.id);
        }
    });
});
app.post("/dandt1/:id", requireLogin, (req, res) => {
    // console.log(req.body);
    const id = req.params.id;
    User.findByIdAndUpdate(id, { "day1": req.body.date, "time1": req.body.time }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/portal/" + req.params.id);
        }
    });
});
app.post("/edit/:id/:admin", requireLogin, (req, res) => {

    User.findByIdAndUpdate(req.params.id, { "name": req.body.name, "department": req.body.department, "reg": req.body.reg, "year": req.body.year, "whatsapp_number": req.body.whatsapp_number, "phone_number": req.body.phone_number, "domain_1": req.body.domain_1, "domain_2": req.body.domain_2 }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            res.redirect("/admin/" + req.params.admin);
        }
    });
});
app.post("/delete/:id/:admin", requireLogin, (req, res) => {
    User.remove({ _id: req.params.id }, (err) => {
        console.log(err);
    }).exec();
    res.redirect("/admin/" + req.params.admin);
});
app.post("/data/:name/:admin", requireLogin, async (req, res) => {
    const name = req.params.name;
    const { level1, time1, level2, time2, Assi, d1, t1, t2, t3, d2, t4, t5, t6, d3, t7, t8, t9 } = req.body;
    // console.log(req.body);
    var data;
    if (name == "app_dev") {
        app_dev.deleteMany({}, () => {

        });

        // app_dev.remove().exec();
        data = new app_dev({
            level1,
            time1,
            level2,
            time2,
            Assi,
            d1,
            t1,
            t2,
            t3,
            d2,
            t4,
            t5,
            t6,
            d3,
            t7,
            t8,
            t9
        });
    }
    if (name == "corporate") {
        corporate.deleteMany({}, () => {

        });
        // corporate.remove().exec();
        data = new corporate({
            level1,
            time1,
            level2,
            time2,
            Assi,
            d1,
            t1,
            t2,
            t3,
            d2,
            t4,
            t5,
            t6,
            d3,
            t7,
            t8,
            t9
        });
    }
    if (name == "ui") {
        // ui.remove().exec();
        ui.deleteMany({}, () => {

        });
        data = new ui({
            level1,
            time1,
            level2,
            time2,
            Assi,
            d1,
            t1,
            t2,
            t3,
            d2,
            t4,
            t5,
            t6,
            d3,
            t7,
            t8,
            t9
        });
    }
    if (name == "web") {
        web.deleteMany({}, () => {

        });
        data = new web({
            level1,
            time1,
            level2,
            time2,
            Assi,
            d1,
            t1,
            t2,
            t3,
            d2,
            t4,
            t5,
            t6,
            d3,
            t7,
            t8,
            t9
        });
    }
    if (name == "cyber") {
        // cyber.remove().exec();
        cyber.deleteMany({}, () => {

        });
        data = new cyber({
            level1,
            time1,
            level2,
            time2,
            Assi,
            d1,
            t1,
            t2,
            t3,
            d2,
            t4,
            t5,
            t6,
            d3,
            t7,
            t8,
            t9
        });
    }
    await data.save();
    res.redirect('/admin/' + req.params.admin);
});
app.post("/selection/:id/:admin", requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.params.id, { "selection_level": req.body.selection_level }, (err, result) => {
        res.redirect("/admin/" + req.params.admin);
    });
});
app.post("/selection1/:id/:admin", requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.params.id, { "selection_level1": req.body.selection_level1 }, (err, result) => {
        res.redirect("/admin/" + req.params.admin);
    });
});
app.get("*", (req, res) => {
    res.render("404Page");
});
app.listen(3000, () => {
    console.log("SERVER STARTED");
});