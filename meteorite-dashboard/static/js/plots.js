// Dependencies
var API_KEY = api_key; 
var queryUrl = "/api/meteorites" ;

console.log('test')
// Perform a GET request to the query URL
d3.json(queryUrl, function(sites) {
	console.log(sites)
  buildMap(sites);
});

function buildMap(sites) {
	
	var map = L.map("map", {
		center: [0, 0],
		zoom:3
	});
	
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
		tileSize: 512,
		maxZoom: 18,
		zoomOffset: -1,
		id: 'mapbox/dark-v10',
		accessToken: API_KEY
	}).addTo(map);
  
  // Loop through the sites array
	for (var i = 0; i < sites.length; i++) {
		var site = sites[i];
		if (site.Latitude == null) {continue;}
		if (site.Longitude == null) {continue;}
		
			// Customize marker
			var greyIcon = new L.Icon({
				iconUrl: './static/img/marker-icon-grey.png',
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowSize: [41, 41]
			});
			
			// Plot a marker with a pop-up
			L.marker([site.Latitude, site.Longitude], {icon: greyIcon}).bindPopup("<h3>" + site.Name + "</h3> <hr> <h5>Fell: " + site.Year + "<br> Classification: " + site.Classification + "<br> Mass: " + site.Mass + "g </h5>").addTo(map);
		
	}
};
