/* global Plotly */
var url = "meteorites.json" //change to "https://meteorite-dashboard.herokuapp.com/api/meteorites" when live;

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
  for (i=860; i<=2013; i++){
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
    color: "#17BECF"
  }
}];
var layout = {
  title: `Annual Frequency of Meteorite Strikes`,
  xaxis: {
    autorange: true,
    type: "date"
  },
  yaxis: {
    autorange: true,
    type: "linear"
  }
};
Plotly.newPlot("plot", data, layout);
});
