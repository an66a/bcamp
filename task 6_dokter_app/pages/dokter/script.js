
    db.ref('users/klien/').orderByChild('nama').on('value', showData => {
  
        var tableData = el("tabel-klien");
        var listData = "";
        var i = 0;
        showData.forEach(child => {
          var user = child.val();
          i++
          listData +=
            "<tr><td>" +
            i +
            "</td><td>" +
            user.nama +
            "</td><td>" +
            user.tanggal_lahir +
            "</td><td>" +
            user.alamat +
            "</td><td>" +
            user.email +
            "</td><td>" +
            user.kontak +
            "</td></tr>";    
        })   
        tableData.innerHTML = listData
      });
  



var klien = el('pageDataKlien');
function changePageKlien() {
    
    if (klien.style.display === "none") {
        klien.style.display = "block";
        // dokter.style.display = "none";
        // toko.style.display = "none";      
    }
}

