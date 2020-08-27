const el = (el) => {
  return document.getElementById(el);
};
var db = firebase.database();
var dbParking = db.ref("parking_data/keluar/");

dbParking.orderByChild("waktu_keluar").limitToLast(13).on("value", showData => {

  var tableData = el("tabel-parkir");
  var listData = "";

  showData.forEach(child => {
    var user = child.val();
    listData +=
      "<tr><td>" +
      user.plat_nomor +
      "</td><td>" +
      user.jenis_kendaraan +
      "</td><td>" +
      user.tanggal +
      "</td><td>" +
      user.waktu_masuk +
      "</td><td>" +
      user.waktu_keluar +
      "</td><td>" +
      user.lama_parkir +
      "</td><td>" +
      user.biaya +
      "</td></tr>";    
  })   
  tableData.innerHTML = listData;
});

dbParking
  .orderByChild("waktu_keluar")
  .limitToLast(1)
  .on("value", showCurrent => {

    var currentOut = el("currentOut");
    var current = "";
    showCurrent.forEach(child => {
      var data = child.val();
      current +=
        "<tr><th>" +
        data.plat_nomor +
        "</th><th>" +
        data.jenis_kendaraan +
        "</th><th>" +
        data.tanggal +
        "</th><th>" +
        data.waktu_masuk +
        "</th><th>" +
        data.waktu_keluar +
        "</th><th>" +
        data.lama_parkir +
        "</th><th>" +
        data.biaya +
        "</th></tr>";
    }) 
    currentOut.innerHTML = current;
  });

  function parkingHandlerIn(){
    var randomTiket = Math.floor((Math.random() * 9999) + 1000)
    // var randomTiket = 1191;
    var d = new Date(); 
    var n = d.toLocaleTimeString();
    var y = d.getTime();
    el('genno_tiket').value = randomTiket;
    el('genwaktu_masuk').value = n;  

    db.ref("parking_data/masuk/" + randomTiket)
    .once("value")
    .then(tiket => {   
      if (tiket.val() === null ) {       
        db.ref('parking_data/keluar/' + randomTiket)
        .once('value')
        .then(tiket => {
                if(tiket.val() === null){
                db.ref("parking_data/masuk/" + randomTiket)
                  .set({waktu_masuk: n, timestamp: y})
                    } else {
                          console.log('tekan lagi.');
                            document.getElementById("tiket-generator")
                              .reset()        
                                    }
        })     
}
           else{
          console.log('tekan lagi.');
          document.getElementById("tiket-generator")
        .reset()        
          }
    })
  }

function parkingHandlerOut() {
  var jenis = el("jenis_kendaraan").value;
  var plat = el("plat_nomor").value;
  var no_tiket = el("no_tiket").value;

  db.ref("parking_data/masuk/" + no_tiket)
    .once("value")
    .then(tiket => {
      var d = new Date();
      var n = d.toLocaleTimeString();
      var y = d.getTime();
      var tgl = d.toLocaleDateString()
      var masuk = tiket.val().waktu_masuk;
      var a = tiket.val().timestamp;
      var x = y - a;
      var menit = 1000 * 60;
      var lama_parkir = Math.round(x / menit);
      var lama_parkirMnt = lama_parkir + " menit";
      var motor = 3000;
      var mobil = 5000;
      var mntMotor = 1000;
      var mntMobil = 3000;      

      if (lama_parkir >= 2) {
        lamaMnt = lama_parkir - 2;
      } else {
        lamaMnt = 0;
      }    
      var biayaMntMotor = lamaMnt * mntMotor;
      var biayaMntMobil = lamaMnt * mntMobil;

      if (jenis == "motor") {
        biaya = motor + biayaMntMotor;
      } else {
        biaya = mobil + biayaMntMobil;
      }
      db.ref("parking_data/keluar/" + no_tiket).set({     
        tanggal: tgl, 
        waktu_masuk: masuk,
        waktu_keluar: n,
        jenis_kendaraan: jenis,
        plat_nomor: plat,
        lama_parkir: lama_parkirMnt,
        biaya: biaya,
        timestamp: a,
    }) 
      db.ref("parking_data/masuk/" + no_tiket).remove();
    });
  var form = el("input_tiket");
  form.reset();
}

// var noTiket = el('cariTiket').value;
// function cariTiket(noTiket) {
//   db.ref("parking_data/keluar/" + noTiket)
//   .once("value")
//   .then(function (tiket) {
//     console.log(tiket.val());

//   })    
// }