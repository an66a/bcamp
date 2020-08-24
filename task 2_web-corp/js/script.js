// const pages = ["formPage", "karyawanPage", "divisiPage"]

// function changePageTo(idPage) {
//     for (let i = 0; i < pages.length; i++) {
//         let page = document.getElementById(pages[i]).classList;
//         if(idPage == pages[i]) {
//             page.style.display = "block";
//             continue
//         }
//         page.style.display = "none";
// }
// }
// changePageTo("formPage")
var a = document.getElementById("formPage");
var b = document.getElementById("karyawanPage");
var c = document.getElementById("divisiPage");
var x = document.getElementById("homePage");
function changePageA() {
    
    if (a.style.display === "none") {
        a.style.display = "block";
        b.style.display = "none";
        c.style.display = "none";
        x.style.display = "none";
    }
}

function changePageB() {
    
    if (b.style.display === "none") {
        a.style.display = "none";
        b.style.display = "block";
        c.style.display = "none";
        x.style.display = "none";
    } 
}
function changePageC() {
    
    if (c.style.display === "none") {
        a.style.display = "none";
        b.style.display = "none";
        c.style.display = "block";
        x.style.display = "none";
    } 
}
//----------------------------------------------------

var menuContainer = document.getElementById("side-menu");
var links = menuContainer.getElementsByClassName("nav-link");
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
} 

//-----------------------------------------------------

function karyawanList()   {
    $.getJSON('assets/karyawan.json', function (data)  {
        let karyawan = data.karyawan;
        $.each(karyawan, function (i, data) {
         $('#data-karyawan').append('<tr><td>' + data.posisi + '</td><td>' + data.nama + '</td><td>' + data.alamat + '</td><td>' + data.email + '</td></tr>');
        });
    });
}
karyawanList()

//-------------------------------------------------

google.charts.load('current', {packages:["orgchart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('string', 'Manager');
  data.addColumn('string', 'ToolTip');


  data.addRows([
    ['Presiden Director',
     '', 'The President'],
    ['Head of IT / CIO', 'Presiden Director', ''],
       ['IT Strategy & Planning', 'Head of IT / CIO', ''],
       ['IT App & Development', 'Head of IT / CIO', ''],
       ['IT Network & Infrastructure', 'Head of IT / CIO', ''],
       ['IT Operation', 'Head of IT / CIO', '']
  ]);

  // Create the chart.
  var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
  // Draw the chart, setting the allowHtml option to true for the tooltips.
  chart.draw(data, {'allowHtml':true});
}