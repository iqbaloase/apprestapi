'use strict';

exports.ok = function(values, res){
    var data = {
        'status': 200,
        'values': values
    };

     res.json(data);
     res.end();
}

//response untuk nested matakuliah
exports.oknested = function(values, res){
    //simulasi
    const hasil = values.reduce((akumulasikan, item) => {
        if(akumulasikan[item.nama]){
            //buat variable group nama mahasiswa
            const group = akumulasikan[item.nama];
            //cek jika isi array adalah matakuliah
            if(Array.isArray(group.matakuliah)){
                //tambahkan values ke dalam group matakuliah
                group.matakuliah.push(item.matakuliah);
            } else{
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        } else {
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    var data = {
        'status': 200,
        'values': hasil
    };

    res.json(data);
    res.end;
}