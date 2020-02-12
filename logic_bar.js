// chart style
var options = {
    responsive: true,
    title: {
        display: true,
        text: 'The Big 10 by Mass (g)'
    },
    legend: {display: false},
    maintainAspectRatio: false,
    animation: {
        duration: 0
    },
    hover: {
        animationDuration: 0
    },
    responsiveAnimationDuration: 0
};

// init
function init() {
    // console.log(chartData)
    var id = 0;
    buildPlot(chartData, chartLabels, options, id, 'bar');
    buildDrop()
    buildPanel(id)
};


// chart builder
function buildPlot(data, labels, options, id, elementID) {
    var ctx = document.getElementById(elementID);
    var colors = ['#303030', '#484848', '#606060', '#707070', '#888888', '#A0A0A0', '#B0B0B0', '#C0C0C0', '#D3D3D3', '#E0E0E0'];
    colors[id] = '#007acc'
    var resourceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Top 10 Meteorites by Mass (g)',
                backgroundColor: colors,
                data: data
            }],
        options: options
        }})
};

// build dropdown
function buildDrop() {
    d3.json('/api/meteorites').then(function(data) {
        var dropDown = d3.select('#selDataset');
        data.forEach(function(item) { dropDown.append('option')
            .attr('value', data.indexOf(item))
            .text(item.Name)
        });
    });
};

// build panel
function buildPanel(id) {
    d3.json('/api/meteorites').then(function(data) {
        var meteorite = data[id]
    
        table = d3.select('.panel-body')
        table.html('')
        table.append('h5').text(`Name: ${meteorite['Name']}`)
            .append('p').text(`Classification: ${meteorite['Classification']}`)
            .append('p').text(`Mass: ${meteorite['Mass']}g`)
            .append('p').text(`Location: (${meteorite['Latitude']}, ${meteorite['Longitude']})`)
            .append('p').text(`Year: ${meteorite['Year']}`)
    });
};

// get data
function getData() {
    var chartData = [];
    var chartLabels = [];
    
    d3.json('/api/meteorites').then(function(data) { 
            
        data.forEach(function(item) {
    
            chartData.push(item['Mass'])
            chartLabels.push(item['Name'])
        });

    });
    return [chartData, chartLabels]
}

// updater
function update() {
    var dropdownMenu = d3.select("#selDataset");
    var new_id = dropdownMenu.node().value
    buildPlot(chartData, chartLabels, options, new_id, 'bar');
    buildPanel(new_id)
}



// run code
var chartData = getData()[0]
var chartLabels = getData()[1]
init()

// listener
d3.selectAll("#selDataset").on("change", update);