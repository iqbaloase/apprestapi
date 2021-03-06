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
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    var query = 'SELECT email FROM public.user WHERE email = $1';
    
    connection.query(query, [post.email], function(error, rows){
        if(error){
            console.log(error);
        } else {
            if(rows.rows.length == 0){
                var query = "INSERT INTO public.user(username, email, password, role, tanggal_daftar) values($1, $2, $3, $4, $5) ";
                connection.query(query, [post.username, post.email, post.password, post.role, post.tanggal_daftar], function(error, rows){
                    if(error){
                        console.log(error);
                    } else {
                        response.ok('berhasil menambahkan data user baru', res);
                    }
                });
            } else {
                response.ok('email sudah terdaftar', res);
            }
        }
    })
}