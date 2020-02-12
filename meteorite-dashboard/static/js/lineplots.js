/* global Plotly */
var url = "/api/meteorites" //change to "https://meteorite-dashboard.herokuapp.com/api/meteorites" when live;

// Fetch the JSON data and console log it
mindate= 1900;
maxdate= 1980;
yearsdictionary={};
d3.json(url).then(function(data) {
  for (i=0; i<data.length; i++){
    if (data[i].Year<mindate){
      mindate=data[i].Year;
    }
    if (data[i].Year>maxdate){
      maxdate=data[i].Year;
    }
  }
  for (i=1500; i<=2013; i++){
    yearsdictionary[i]=0;
    for (j=0; j<data.length; j++){
      if (data[j].Year==i){
        yearsdictionary[i]++;
      }
  }
}
console.log(yearsdictionary);
var data = [{
  type: "scatter",
  mode: "lines",
  name: name,
  x: Object.keys(yearsdictionary),
  y: Object.values(yearsdictionary),
  line: {
    color: "White"
  }
}];
  
var layout = {
  paper_bgcolor: "Transparent",
  plot_bgcolor: "Transparent",
  title: {
    text: 'Annual Frequency of Observable Meteorite Strikes in the Past 500 Years',
    font: {
      family: 'sans-serif',
      size: 18,
      color: 'White'
    }
  },
  xaxis: {
    tickfont: {
      family: 'sans-serif',
      size: 12,
      color: 'White'
    },
    autorange: true,
    showgrid: false,
    type: "date",
    title: {
      text: 'Year',
      font: {
        family: 'sans-serif',
        size: 14,
        color: 'White'
      }
    }
  },
  yaxis: {
    tickfont: {
      family: 'sans-serif',
      size: 12,
      color: 'White'
    },
    autorange: true,
    showgrid: false,
    type: "linear",    
    title: {
      text: 'Frequency (Strikes/Year)',
      font: {
        family: 'sans-serif',
        size: 14,
        color: 'White'
      }}}
};
  
Plotly.newPlot("plot", data, layout);
});
