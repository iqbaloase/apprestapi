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
            console.log(err);
        } else {
            response.ok(rows.rows, res);
        }
    })
}

//menampilkan semua data mahasiswa berdasarkan id
exports.tampilkanberdasarkanid = function(req, res){
    let { id } = req.params;
    connection.query('SELECT * FROM mahasiswa where id_mahasiswa = $1', [id], 
        function(err, rows, fields){
            if(err){
                console.log(err);
            } else {
                response.ok(rows.rows, res);
            }
        }
    );
}