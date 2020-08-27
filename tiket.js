var db = firebase.database();


function parkingHandlerIn(){
  var randomTiket = Math.floor((Math.random() * 9000) + 1000)
  // var randomTiket = 1998;
  var d = new Date(); 
  var n = d.toLocaleTimeString();
  var y = d.getTime();
  document.getElementById('no_tiket').value = randomTiket;
  document.getElementById('waktu_masuk').value = n;  

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
                        console.log('silahkan tekan lagi.');
                          document.getElementById("tiket-generator")
                            .reset()        
                                  }
      })     
}
         else{
        console.log('silahkan tekan lagi.');
        document.getElementById("tiket-generator")
      .reset()        
        }
  })



  
}