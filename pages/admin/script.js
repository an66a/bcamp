var namaDokter = el('namaDokter');
var alamatDokter = el('alamatDokter');
var spesialisDokter = el('spesialisDokter');
var kontakDokter = el('kontakDokter');
var emailDokter = el('emailDokter');
var passwordDokter = el('passwordDokter');

function handleDokter() {  

    auth.createUserWithEmailAndPassword(emailDokter.value, passwordDokter.value)
    .then(function(data){   
    console.log('berhasil daftar')
  db.ref("users/dokter/" + data.user.uid).set({     
    nama: namaDokter.value,
    kontak: kontakDokter.value,
    email: emailDokter.value,
    spesialis: spesialisDokter.value,
    alamat: alamatDokter.value,
    uid: data.user.uid,
  }) 
  location.reload()
  alert(namaDokter.value + ' berhasil ditambahkan')
    })
    .catch(function(err){
      console.log(err.code)
    switch(err.code){
      case 'auth/invalid-email':
        alert('Format email salah!');
        break;
        case 'auth/weak-password':
          alert('Password terlalu lemah!');
          break;
          case 'auth/email-already-in-use':
            alert('Email sudah digunakan!');
            break;
    }
    })  
      }

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
        "</td><td>" + '<button class="btn btn-danger" onclick="deleteData(' + user.uid + ')">Hapus</button>' + '<button class="btn btn-info" onclick="editData(' + user.uid + ')">Edit</button>'
        "</td></tr>";    
    })   
    tableData.innerHTML = listData;
  })
  function deleteData(key) {
    firebase.datebase().ref('users/dokter/' + key).remove()
  }

  var namaKlien = el('namaKlien');
  var alamatKlien = el('alamatKlien');
  var tanggalKlien = el('tanggalKlien');
  var kontakKlien = el('kontakKlien');
  var emailKlien = el('emailKlien');
  var passwordKlien = el('passwordKlien');
  
  function handleKlien() {  
  
      auth.createUserWithEmailAndPassword(emailKlien.value, passwordKlien.value)
      .then(data => {
      console.log('berhasil daftar')
      console.log(data.user.uid);
    db.ref("users/klien/" + data.user.uid).set({     
      nama: namaKlien.value,
      kontak:kontakKlien.value,
      email: emailKlien.value,
      tanggal_lahir: tanggalKlien.value,
      alamat: alamatKlien.value,
    }) 
    location.reload() 
    alert(namaKlien.value + ' berhasil ditambahkan')
   
      })
      .catch(err => {
        console.log(err.code)
      switch(err.code){
        case 'auth/invalid-email':
          alert('Format email salah!');
          break;
          case 'auth/weak-password':
            alert('Password terlalu lemah!');
            break;
            case 'auth/email-already-in-use':
              alert('Email sudah digunakan!');
              break;
      }
      })
   
    }   
  
  
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
      tableData.innerHTML = listData;
    });


  
// var storage = firebase.storage();

// var progress = el('uploadProgress');
// var upload = el('uploadImg');
// upload.addEventListener('change', function(e){
// var file = e.target.files[0];
// var strgFile = storage.ref('obat/' + file.name) 
// var uploadTask = strgFile.put(file)
// uploadTask.on('state_changed', loadUpload, errUpload, completeUpload)

// function loadUpload(data){
//     var percent = (data.bytesTransferred/data.totalBytes) * 100
//     progress.value = percent  
   
// }
// function errUpload(err){
//     console.log(err)
// }
// function completeUpload(){
//     console.log('finish')
//     strgFile.getDownloadURL().then(function(url){
//         console.log(url)
//         var namaObat = el('namaObat').value;
//           var hargaObat = el('hargaObat').value;

//         db.ref('obat/' + namaObat).set({
//             nama: namaObat,
//             harga: hargaObat,
//             gambar: url,
//         })
        
//             })

// location.reload()
// }
// })



function handleObat(){
var namaObat = el('namaObat').value;
var hargaObat = el('hargaObat').value;
var gambarObat = el('gambarObat').value;
db.ref('obat/').push({
    nama: namaObat,
    harga: hargaObat,
    gambar: gambarObat,
})
var form = el('formObat')
form.reset()
console.log('sukses');
// location.reload()
}

db.ref('obat').orderByChild('nama').on('value', showData => {
var list = '';
var tokoObat = el('toko-obat');
showData.forEach(child => {
    var obat = child.val();
    list +=  '<div class="card mr-3 mt-3" style="width: 16.5rem;"><img class="card-img-top" src="'+ obat.gambar + '" alt="Card image cap"><div class="card-body"><h5 class="card-title">' + obat.nama + '</h5><p class="card-text">Harga: ' + obat.harga + '</p><button class="btn btn-primary" onclick="removeObat('+ obat.nama +')">Hapus</button></div></div>'
    
  })   
 tokoObat.innerHTML = list;
})

function removeObat(key) {
    db.ref('obat/' + key).remove()
}


var toko = el('pageToko');
var dokter = el('pageDataDokter');
var klien = el('pageDataKlien');
// var x = el('homePage');
function changePageKlien() {
    
    if (klien.style.display === "none") {
        klien.style.display = "block";
        dokter.style.display = "none";
        toko.style.display = "none";      
    }
}

function changePageToko() {
    
    if (toko.style.display === "none") {
        toko.style.display = "block";
        klien.style.display = "none";
        dokter.style.display = "none";
    } 
}
// 