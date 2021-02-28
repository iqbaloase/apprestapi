'use strict';

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);
    
    app.route('/tampil')
        .get(jsonku.tampilsemuamahasiswa);
    
    app.route('/tampil/:id')
        .get(jsonku.tampilkanberdasarkanid);
    
    app.route('/tambah')
        .post(jsonku.tambahMahasiswa);
    
    app.route('/ubah')
        .put(jsonku.ubahMahasiswa);
    
    app.route('/ubah/:id')
        .put(jsonku.ubahMahasiswaid);
    
    app.route('/delete/:id')
        .delete(jsonku.hapusMahasiswa);

    app.route('/tampilmatakuliah')
        .get(jsonku.tampilgroupmatakuliah);
}