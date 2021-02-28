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

//menambahkan data mahasiswa
exports.tambahMahasiswa = function(req, res) {
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim, nama, jurusan) VALUES ($1, $2, $3)',
        [nim, nama, jurusan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambahkan data", res);
            }
        }
    );
}