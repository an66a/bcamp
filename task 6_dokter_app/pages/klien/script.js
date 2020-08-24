db.ref('obat').orderByChild('nama').on('value', showData => {
var list = '';
var tokoObat = el('toko-obat');
showData.forEach(child => {
    var obat = child.val();
    list +=  '<div class="card mr-3 mt-3" style="width: 16.5rem;"><img class="card-img-top" src="'+ obat.gambar + '" alt="Card image cap"><div class="card-body"><h5 class="card-title">' + obat.nama + '</h5><p class="card-text">Harga: ' + obat.harga + '</p><button class="btn btn-primary">Beli</button></div></div>'
    
  })   
 tokoObat.innerHTML = list;
})
db.ref('users/dokter/').orderByChild('nama').on('value', showData => {

  var tableData = el("tabel-dokter");
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
      user.spesialis +
      "</td><td>" +
      user.alamat +
      "</td><td>" +
      user.email +
      "</td><td>" +
      user.kontak +
      "</td></tr>";    
  })   
  tableData.innerHTML = listData;
})


var dokter = el('pageDataDokter')
var toko = el('pageToko');
function changePageToko() {
    
  if (toko.style.display === "none") {
      toko.style.display = "block";
      dokter.style.display = "none";
  } 
}
function changePageDokter() {
    
  if (dokter.style.display === "none") {
      dokter.style.display = "block";
      toko.style.display = "none";
  } 
}