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

//mengubah data berdasarkan id

exports.ubahMahasiswa = function(req, res){
    let id = req.body.id_mahasiswa;
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa set nim = $1, nama = $2, jurusan = $3 where id_mahasiswa = $4', [nim, nama, jurusan, id],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok('Berhasil ubah data', res);
            }
        }
    );
}

exports.ubahMahasiswaid = function(req, res){
    let { id } = req.params;
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa set nim = $1, nama = $2, jurusan = $3 where id_mahasiswa = $4', [nim, nama, jurusan, id],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok('Berhasil ubah data', res);
            }
        }
    );
}

//menghapus data berdasarkan id
exports.hapusMahasiswa = function(req, res){
    let { id } = req.params;
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa = $1', [id],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok('Berhasil delete data', res);
            }
        }
    )
}

//menampilkan matakuliah group
exports.tampilgroupmatakuliah = function(req, res){
    connection.query("select mhs.id_mahasiswa, mhs.nim, mhs.nama, mhs.jurusan, mk.matakuliah, mk.sks from krs inner join mahasiswa mhs on krs.id_mahasiswa = mhs.id_mahasiswa inner join matakuliah mk on krs.id_matakuliah = mk.id_matakuliah order by mhs.id_mahasiswa",
        function(error, rows, fields){
            if(error) {
                console.log(error);
            } else {
                response.oknested(rows.rows, res);
            }
        }
    );     
}