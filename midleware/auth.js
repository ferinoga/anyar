var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controler untuk register
exports.registrasi = function(req,res) {
    var post ={
        username: req.body.username,
        password: md5(req.body.password),
        name: req.body.name,
        role: req.body.role,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
    }
    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["baru", "email", post.email];

    query =mysql.format(query,table);

    connection.query(query, function(error, rows) {
        if(error) {
            console.log(error);
        }else {
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["baru"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error,rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("berhasil menambahkan data user baru",res);
                    }
                });
               }else{
                    response.ok("email sudah terdaftar cuy",res);
                
            }
        }
    });
}

//controller login
exports.login = function(req,res){
    var post = {
        password: req.body.password,
        email: req.body.email
    }
    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["baru", "password", md5(post.password), "email", post.email];

    query = mysql.format(query,table);
    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 1){
                var token = jwt.sign({rows}, config.secret,{
                    expiresIn: 1440
                });
                id_user = rows[0].id;

                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        res.json({
                            success : true,
                            message:'token JWT tergenerate',
                            token:token,
                            currUser:data.id_user
                        });
                    }
                });
            }else {
                res.json({"Error": true, "Message":"Email atau password salah!"});
            }
        }
    });
}

exports.halamanrahasia = function(req,res){
    res.json("halaman rahasia!");
}
exports.halamanrahasia = function(req,res){
    res.json("halaman rahasia!");
}