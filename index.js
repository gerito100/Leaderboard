var mysql = require('mysql');
// const http = require("http");
var express = require('express');
var app = express();
const host = 'localhost';
const port = 8000;
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "leaderboard"
});

app.listen(port, host, function () {
    console.log(`Example app listening on port ${port}!`)
});

con.connect(function () {
    console.log("connected");
});

app.set("view engine", "ejs");
app.set("view")

app.get("/", function (req, res) {

    var students = new Array();
    con.query("select * from student", function (err, result) {
        if (err) console.log(err);
        else {
            students = JSON.parse(JSON.stringify(result));
            res.render("index", { students: students });
        }
    });

});

app.get("/searchstudent", function (req, res) {

    var id = req.query.id;
    con.query("select * from student where id=" + id, function (err, result) {
        if (err) console.log(err);
        else {
            students = JSON.parse(JSON.stringify(result));
            console.log(students);
            res.render("index", { students: students });
        }
    });

});

app.get("/deletestudent", function (req, res) {

    var id = req.query.id;
    con.query("delete from  student where id=" + id, function (err, result) {
        if (err) console.log(err);
        else {
            students = JSON.parse(JSON.stringify(result));
            res.redirect("/");
        }
    });

});

app.get("/updatestudent", function (req, res) {

    var id = req.query.id;
    var points = req.query.points;
    con.query("update   student set points= " + points + " where id=" + id, function (err, result) {
        if (err) console.log(err);
        else {
            students = JSON.parse(JSON.stringify(result));
            res.redirect("/");
        }
    });

});

app.get("/insertStudent", function (req, res) {

    var name = req.query.name;
    var points = req.query.points;
    con.query("insert into student (name,points) values(" + "'" + name + "'" + "," + points + ")"), function (err, result) {
        if (err) console.log(err);
        else {
            console.log("student with the name:" + name + " has been inserted");
        }
    }
    res.redirect("/");
    
});