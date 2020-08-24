// var obj = JSON.parse(localStorage.userRecord);
var userRecord = [];
if (localStorage.userRecord) {
    userRecord = JSON.parse(localStorage.userRecord);
}
// const el = (el) => {
//     return document.querySelector(el)
// }
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
        var divisi1 = document.getElementById("divisi").value;        
               
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
        divisi : divisi1    
        };

userRecord.push(karyawan);

		localStorage.userRecord = JSON.stringify(userRecord);
		
    };

    // const addData = () => {
    //     const nik = el("input[name=nik]").value
    //     const nama = el("input[name=nama]").value
    //     const jenis_kelamin = el("input[name=jenkal]").value
    //     const name = el("input[name=name]").value
    //     const name = el("input[name=name]").value
    //     const name = el("input[name=name]").value
    //     const name = el("input[name=name]").value
    //     const name = el("input[name=name]").value
    //     const name = el("input[name=name]").value
    //     const name = el("input[name=name]").value
    //     const name = el("input[name=name]").value
    //     const name = el("input[name=name]").value
    //     const name = el("input[name=name]").value
    //     const name = el("input[name=name]").value
    //     const address = el("textarea[name=address]").value
    
    //     // add to array
    //     dataList.push({ name, address }) // {name: "blabla", address: "blablabla"}
    //     // add to localstorage
    //     localStorage.setItem("dataList", JSON.stringify(dataList))
    //     listUser()
    //     // saveLS({ name, address }, () => {
    //     //     listUser()
    //     // })
    // }



//    show data JSON to table
function showData(){
var listData = "";
var tableData = document.getElementById('tabel');


for(var i=0; i<userRecord.length; i++){
    const obj = userRecord;
listData += '<tr><td>' + obj[i].nik + '</td><td>' + obj[i].nama + '</td><td>' + obj[i].jenis_kelamin + '</td><td>' + obj[i].divisi + '</td><td>' + obj[i].kabupaten + '</td><td>' + obj[i].email + '</td><td>' + obj[i].kontak + '</td><td>' + '<button class="btn btn-info" onclick="editData();">Edit</button>' + ' ' + '<button class="btn btn-info" onclick="">Hapus</button></td></tr>';
};
tableData.innerHTML = listData;
};


// const listUser = () => {
//     // el("table tbody").innerHTML = "<tr><td>1</td><td>" + dataList[0].name + "</td><td>" + dataList[0].address + "</td></tr>"

//     let rows = "";
//     for (let i = 0; i < userRecord.length; i++) {
//         const user = userRecord[i];
//         rows += `
//             <tr>
//                 <td>${i+1}</td>
//                 <td>${user.nik}</td>
//                 <td>${user.nama}</td>
//                 <td>${user.jenis_kelamin}</td>
//                 <td>${user.divisi}</td>
//                 <td>${user.kabupaten}</td>
//                 <td>${user.email}</td>
//                 <td>${user.kontak}</td>
//             </tr>
//         `
//     }
//     document.getElementById('table').innerHTML = rows
// }
// listUser()

//----------------------------------------------------

// var menuContainer = document.getElementById("sidebar");
// var links = menuContainer.getElementsByClassName("nav-link");
// for (var i = 0; i < links.length; i++) {
//     links[i].addEventListener("click", function() {
//     var current = document.getElementsByClassName("active");
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//   });
// } 
//----------------------------------------------------
// var a = document.getElementById("formPage");
// var b = document.getElementById("karyawanPage");
// var c = document.getElementById("divisiPage");
// var x = document.getElementById("dashboard");
// function changePageA() {
    
//     if (a.style.display === "none") {
//         a.style.display = "block";
//         b.style.display = "none";
//         c.style.display = "none";
//         x.style.display = "none";

//     }
// }

// function changePageB() {
    
//     if (b.style.display === "none") {
//         a.style.display = "none";
//         b.style.display = "block";
//         c.style.display = "none";
//         x.style.display = "none";

//     } 
// }
// function changePageC() {
    
//     if (c.style.display === "none") {
//         a.style.display = "none";
//         b.style.display = "none";
//         c.style.display = "block";
//         x.style.display = "none";
//     } 
// }

//-------------------------------------------------




//----------------------------  TOOGLE SLIDE MENU KIRI   ----------------------------
// var sidebar = document.getElementById('sidebar');
// var mainbar = document.getElementById('mainbar');
// sidebar.style.width = "0%";
// function menu() {
//     if (sidebar.style.width == "0%" || sidebar.style.display == "none" ) {
//         sidebar.style.width = "20%";
        
//         sidebar.style.transition = "0.5s";
//     } else {
//         sidebar.style.width = "0%";
        
//     }
// }
// menu()