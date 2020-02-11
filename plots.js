// Dependencies
var API_KEY = api_key; // add to config file
var queryUrl = "/api/meteorites" ;


// Perform a GET request to the query URL
d3.json(queryUrl, function(sites) {
  buildMap(sites);
});

function buildMap(sites) {
	
	var map = L.map("map", {
		center: [0, 0],
		zoom:3
	});
	
	L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
		maxZoom: 18,
		id: "mapbox.dark",
		accessToken: API_KEY
	}).addTo(map);
  
  // Loop through the sites array
	for (var i = 0; i < sites.length; i++) {
		var site = sites[i];
		if (site.Latitude == null) {continue;}
		if (site.Longitude == null) {continue;}
		
			// Customize marker
			var greyIcon = new L.Icon({
				iconUrl: 'marker-icon-grey.png',
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowSize: [41, 41]
			});
			
			// Plot a marker with a pop-up
			L.marker([site.Latitude, site.Longitude], {icon: greyIcon}).bindPopup("<h3>" + site.Name + "</h3> <hr> <h5>Fell: " + site.Year + "<br> Classification: " + site.Classification + "<br> Mass: " + site.Mass + "g </h5>").addTo(map);
		
	}
};
