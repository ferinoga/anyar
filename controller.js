'use strict';

var response = require('./res');
var connection =require('./koneksi');
const { address } = require('ip');

exports.index = function(req,res){
    response.ok("aplikasi REST API ku berjalan!",res)
};

//menampilkan semua data user
exports.tampilsemuadatauser = function(req,res){
    connection.query('SELECT * FROM baru', function(error, rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res)
        }
    });
};

//menampilkan user berdasarkan id
exports.tampilberdasarkanid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM baru WHERE id =?',[id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};

//menambahkan data user
exports.tambahdatauser = function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var role = req.body.role;
    var address = req.body.address;
    var email = req.body.email;
    var phone = req.body.phone;
    connection.query('INSERT INTO baru (username,password,name,role,address,email,phone) VALUES(?,?,?,?,?,?,?)',
    [username,password,name,role,address,email,phone],
    function (error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("berhasil menambahkan data",res)
        }
    });
};

//mengubah data berdasarkan id
exports.ubahdatauser = function(req,res){
    var id = req.body.id;
    var username= req.body.username;
    var password= req.body.password;
    var name= req.body.name;
    var role= req.body.role;
    var address= req.body.address;
    var email= req.body.email;
    var phone= req.body.phone;
    connection.query('UPDATE baru SET username=?, password=?, name=?, role=?, address=?, email=?, phone=? WHERE id=?',[username,password,name,role,address,email,phone,id],
        function(error, rows, fields){
            if(error){
                console.log(error);
            }else{
                response.ok("berhasil ubah data",res)
            }
        });
};

//menghapus data berdasarkan id
exports.hapusdatauser = function(req,res){
    var id = req.body.id;
    connection.query('DELETE FROM baru WHERE id=?',[id],
    function(error, rows, fields){
        if(error) {
            console.log(error);
        }else{
            response.ok("berhasil menghapus data",res)
        }
    });
};