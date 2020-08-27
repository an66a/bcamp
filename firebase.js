const el = (el) => {
  return document.getElementById(el)
}
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBYDGNqrre2oFI0xJrPqxNH0sZMIIlGfic",
  authDomain: "bcamp-81660.firebaseapp.com",
  databaseURL: "https://bcamp-81660.firebaseio.com",
  projectId: "bcamp-81660",
  storageBucket: "bcamp-81660.appspot.com",
  messagingSenderId: "835960981628",
  appId: "1:835960981628:web:efe3830147d5ecb8bbe1f9",
  measurementId: "G-081990HQ6Q",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var auth =  firebase.auth();
//reference database from firebase
var db = firebase.database();
var dbUsers = db.ref("users");

//login handler
var email_text = el('email_text');
var password_text = el('password_text');
var login_btn = el('login');
var signUp_btn = el('signUp');
var logout_btn = el('logout');
var loginContainer = el('loginContainer');

login_btn.addEventListener('click', userLogin);
signUp_btn.addEventListener('click', userSignup);
logout_btn.addEventListener('click', userLogout);

function userSignup() {
  auth.createUserWithEmailAndPassword(email_text.value, password_text.value)
  .then(function(data){
    console.log('eaaa...sukses daftar!!');
    console.log(data)
    alert('Berhasil terdaftar!')
    location.reload();
    // loginContainer.classList.add('hidden')
    // logout_btn.classList.remove('hidden')
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
function userLogin() {
  auth.signInWithEmailAndPassword(email_text.value, password_text.value)
  .then(function(data){
    // console.log('eaaa...bisa login!!');
    console.log(data)
    location.reload();
    // logout_btn.classList.remove('hidden')
    // loginContainer.classList.add('hidden')
  })
  .catch(function(err){
    console.log(err.code)
    switch(err.code) {
      case 'auth/user-not-found':
      alert('User tidak terdaftar!');
      break;
      case 'auth/wrong-password':
      alert('Kata sandi/password yang anda masukan salah.')
    break;
    case 'auth/invalid-email':
      alert('Format email salah!');
      break;
    }    
  })
}
function userLogout() {
  auth.signOut().then(function(){
// console.log('Berhasil keluar dari akun.');
// alert('Berhasil keluar dari akun.');
// logout_btn.classList.add('hidden')
// loginContainer.classList.remove('hidden')
  }).catch(function(err){
    console.log(err.code);
  })
}
auth.onAuthStateChanged(function(user){
if(user){
//login
console.log('dah mam lum?');
logout_btn.classList.remove('hidden')
loginContainer.classList.add('hidden')

} else {
//logout
console.log('jangan lupa aqua');
logout_btn.classList.add('hidden')
loginContainer.classList.remove('hidden')
location.href = 'login.html'
}
});
//  READ DATA
dbUsers.orderByChild("nama").on("value", showData, showError);

function showData(objects) {
  var tableData = document.getElementById("data-karyawan");
  var modalDetail = document.getElementById("modalDetail");
  var listData = "";
  var editData= "";
  var detailData= "";

  objects.forEach(function (child) {
  var user = child.val();
  // console.log(user);
    listData += '<tr><td>' + user.nik + '</td><td>' + user.nama + '</td><td>' + user.divisi + '</td><td>' + user.kabupaten + '</td><td>' + user.status + '</td><td>' + user.email + '</td><td>' + user.kontak + '</td><td><div class="btn-group" role="group"><button type="button" class="detail-button btn btn-dark btn-sm" data-toggle="modal" data-target="#userDetail' + user.nik +'">Detail</button><button type="button" class="detail-button btn btn-default btn-sm" data-toggle="modal" data-target="#userDetail' + user.nik +'">Edit</button><button type="button" class="btn btn-danger btn-sm" onclick="deleteUser('+ user.nik +')">Hapus</button></div>' + '</td></tr>'

      editData += '<div class="modal fade" id="userDetail' + user.nik + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-lg" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLongTitle">Detail Data</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="container"><div class="card"><div class="card-body"><form action="#" id="modalForm'+ user.nik +'" onsubmit="updateData()"><div class="form-row"><div class="form-group col-md-3"><label>NIK</label><input type="number" class="form-control" onKeyPress="if(this.value.length==16) return false;" name="nik" placeholder="NIK" id="nikUpdate'+ user.nik +'" value="' + user.nik + '"disabled /></div><div class="form-group col-md-4"><label>Nama Lengkap</label><input type="text" class="form-control" name="nama" value="' + user.nama + '" placeholder="Nama" id="namaUpdate'+ user.nik +'" required /></div><div class="form-group col-md-2"><label>Jenis Kelamin</label><select class="form-control" id="jenis_kelaminUpdate'+ user.nik +'" value="' + user.jenis_kelamin + '" required><option disable selected value>Pilih...</option><option value="pria">Pria</option><option value="wanita">Wanita</option></select></div><div class="form-group col-md-3"><label>Tanggal Lahir</label><input type="date" class="form-control" name="tanggal_lahir" id="tanggal_lahirUpdate'+ user.nik +'" required /></div></div><div class="form-row"><div class="form-group col-md-6"><label>Alamat</label><input type="text" class="form-control" name="alamat" placeholder="Alamat" id="alamatUpdate'+ user.nik +'" value="' + user.alamat + '" required /></div><div class="form-group col-md-2"><label>RT/RW</label><input type="text" class="form-control" name="rt/rw" placeholder="RT/RW" id="rtrwUpdate'+ user.nik +'" value="' + user.rtrw + '" required /></div><div class="form-group col-md-4"><label>Kelurahan / Desa</label><input type="text" class="form-control" name="desa" placeholder="Kelurahan / Desa" id="kelurahanUpdate'+ user.nik +'" value="' + user.kelurahan + '" required /></div></div><div class="form-row"><div class="form-group col-md-6"><label>Kecamatan</label><input type="text" class="form-control" name="kecamatan" placeholder="Kecamatan" id="kecamatanUpdate'+ user.nik +'" value="' + user.kecamatan + '" required /></div><div class="form-group col-md-6"><label>Kabupaten</label><input type="text" class="form-control" name="kabupaten" placeholder="Kabupaten" id="kabupatenUpdate'+ user.nik +'" value="' + user.kabupaten + '" required /></div></div><div class="form-row"><div class="form-group col-md-4"><label>Agama</label><select class="form-control" name="agama" id="agamaUpdate'+ user.nik +'" value="' + user.agama + '" required ><option disable selected value>Pilih...</option><option>Budha</option><option>Hindu</option><option>Islam</option><option>Katolik</option><option>Khonghucu</option><option>Protestan</option></select></div><div class="form-group col-md-4"><label>Status Perkawinan</label><select class="form-control" name="status" id="statusUpdate'+ user.nik +'" required ><option disable selected value>Pilih...</option><option>Menikah</option><option>Belum Menikah</option></select></div><div class="form-group col-md-4"><label>Kewarganegaraan</label><input type="text" class="form-control" name="kewarganegaraan" placeholder="Kewarganegaraan" id="kewarganegaraanUpdate'+ user.nik +'" value="' + user.kewarganegaraan + '" required /></div></div><div class="form-row"><div class="form-group col-md-4"><label>Email</label><input type="email" class="form-control" name="email" placeholder="Email" id="emailUpdate'+ user.nik +'" value="' + user.email + '"required /></div><div class="form-group col-md-4"><label>No. Telepon / Ponsel</label><input type="number" onKeyPress="if(this.value.length==12) return false;" class="form-control" name="kontak" placeholder="No. Telepon / Ponsel" id="kontakUpdate'+ user.nik +'" value="' + user.kontak + '" required /></div><div class="form-group col-md-4"><label>Divisi</label><select class="form-control" name="divisi" id="divisiUpdate'+ user.nik +'" value="' + user.divisi + '" required><option disable selected value>Pilih...</option><option>IT Staff</option><option>IT Strategist</option><option>IT Planner</option><option>System Analist</option><option>System Administrator</option><option>Security Specialist</option><option>Network Specialist</option><option>Web Developer</option><option>CIO</option><option>President Director</option></select></div></div></form></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button><input class="btn btn-primary btn-sm" type="submit" value="Submit" onclick="modalSubmit(' + user.nik + ')"></div></div></div></div>'

  });
  console.log("cemungud eaa..");
  tableData.innerHTML = listData;
  modalDetail.innerHTML = editData;
}
function deleteUser(id) {    
var x = confirm("Hapus data yang dipilih?");
if (x == true) {
alert("Data berhasil dihapus!");
firebase.database().ref('users/' + id).remove();      
} 
};

function showError(err) {
  console.log(err);
}

function addData() {
  var nama = el("nama").value;
  var alamat = el("alamat").value;
  var email = el("email").value;
  var tanggal_lahir = el("tanggal_lahir").value;
  var nik = el("nik").value;
  var jenis_kelamin = el("jenis_kelamin").value;
  var rtrw = el("rtrw").value;
  var kelurahan = el("kelurahan").value;
  var kecamatan = el("kecamatan").value;
  var kabupaten = el("kabupaten").value;
  var agama = el("agama").value;
  var status = el("status").value;
  var kewarganegaraan = el("kewarganegaraan").value;
  var kontak = el("kontak").value;
  var divisi = el("divisi").value;

  dataId = {nik, nama, alamat, email, tanggal_lahir, divisi, rtrw, kelurahan, kecamatan, kabupaten, agama, status, kewarganegaraan, kontak, jenis_kelamin};
 
  firebase
    .database()
    .ref("users/" + nik)
    .set(dataId);  
};
function modalSubmit(key) {
  document.getElementById("modalForm" + key).submit();
  updateData(key);
  alert("Data berhasil diupdate!");
  }     
function updateData(key) {
  var nama = el("namaUpdate" + key).value;
  var alamat = el("alamatUpdate" + key).value;
  var email = el("emailUpdate" + key).value;
  var tanggal_lahir = el("tanggal_lahirUpdate" + key).value;
  var nik = el("nikUpdate" + key).value;
  var jenis_kelamin = el("jenis_kelaminUpdate" + key).value;
  var rtrw = el("rtrwUpdate" + key).value;
  var kelurahan = el("kelurahanUpdate" + key).value;
  var kecamatan = el("kecamatanUpdate" + key).value;
  var kabupaten = el("kabupatenUpdate" + key).value;
  var agama = el("agamaUpdate" + key).value;
  var status = el("statusUpdate" + key).value;
  var kewarganegaraan = el("kewarganegaraanUpdate" + key).value;
  var kontak = el("kontakUpdate" + key).value;
  var divisi = el("divisiUpdate" + key).value;

  dataId = {nik, nama, alamat, email, tanggal_lahir, divisi, rtrw, kelurahan, kecamatan, kabupaten, agama, status, kewarganegaraan, kontak, jenis_kelamin};

  firebase
    .database()
    .ref("users/" + nik)
    .update(dataId);
};