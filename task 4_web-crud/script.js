
//----------------------------------------------------

var menuContainer = document.getElementById("sidebar");
var links = menuContainer.getElementsByClassName("nav-link");
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
//----------------------------------------------------
var a = document.getElementById("formPage");
var b = document.getElementById("karyawanPage");
var c = document.getElementById("divisiPage");
var x = document.getElementById("dashboard");

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

//-------------------------------------------------

google.charts.load("current", { packages: ["orgchart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Name");
  data.addColumn("string", "Manager");
  data.addColumn("string", "ToolTip");

  data.addRows([
    ["Presiden Director", "", "The President"],
    ["Head of IT / CIO", "Presiden Director", ""],
    ["IT Strategy & Planning", "Head of IT / CIO", ""],
    ["IT App & Development", "Head of IT / CIO", ""],
    ["IT Network & Infrastructure", "Head of IT / CIO", ""],
    ["IT Operation", "Head of IT / CIO", ""],
  ]);

  // Create the chart.
  var chart = new google.visualization.OrgChart(
    document.getElementById("chart_div")
  );
  // Draw the chart, setting the allowHtml option to true for the tooltips.
  chart.draw(data, { allowHtml: true });
}
;
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
