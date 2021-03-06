var connection = require('../koneksi');
var pg = require('pg');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controller untuk register
exports.registrasi = function(req, res){
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role = req.body.role,
        tanggal_daftar: new Date()
    }

    var query = 'SELECT email FROM $1 WHERE $2';
    var table = ['user', 'email', post.email];

    query = pg.format(query, table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        } else {
            if(rows.rows.length == 0){
                var query = "INSERT INTO $1 SET $2";
                var table = ['user'];
                query = pg.format(query, table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    } else {
                        response.ok('berhasil menambahkan data user baru', res);
                    }
                });
            } else {
                response.ok('email sudah terdaftar');
            }
        }
    })
}