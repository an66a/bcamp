var obj = [];
    

    function addData() {
        
        var nik1 = document.getElementById("nik").value;
        var nama1 = document.getElementById("nama").value;
        var jenkal = document.getElementById("jenkal").value;
        var tgl1 = document.getElementById("tgl").value;
        var alamat1 = document.getElementById("alamat").value;
        var rtrw1 = document.getElementById("rtrw").value;
        var desa1 = document.getElementById("desa").value;
        var kecamatan1 = document.getElementById("kecamatan").value;
        var kabupaten1 = document.getElementById("kabupaten").value;
        var agama1 = document.getElementById("agama").value;
        var status1 = document.getElementById("status").value;        
        var kewarganegaraan1 = document.getElementById("kewarganegaraan").value;
        var email1 = document.getElementById("email").value;
        var kontak1 = document.getElementById("kontak").value;
        var jabatan1 = document.getElementById("jabatan").value;
        
        
        
    
    var karyawan = {
        nik : nik1,
        nama: nama1,
        jenis_kelamin : jenkal,
        tanggal_lahir: tgl1,
        alamat: alamat1,
        rtrw: rtrw1,
        desa: desa1,
        kecamatan: kecamatan1,
        kabupaten : kabupaten1,
        agama : agama1,
        status : status1,        
        kewarganegaraan: kewarganegaraan1,   
        email: email1 ,
        kontak : kontak1,
        jabatan : jabatan1     
        };

obj.push(karyawan);

		localStorage.userRecord = JSON.stringify(obj);
		
    };