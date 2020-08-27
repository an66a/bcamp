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
