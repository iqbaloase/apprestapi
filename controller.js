'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req, res){
    response.ok("Aplikasi REST API ku berjalan", res)
};

//menampilka semua data mahasiswa
exports.tampilsemuamahasiswa = function(req, res){
    connection.query('SELECT * FROM mahasiswa ORDER BY id_mahasiswa ASC ', function(err, rows, fields){
        if(err){
            connection.log(err);
        } else {
            response.ok(rows.rows, res);
        }
    })
}