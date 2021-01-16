// URL to retrieve data
var longUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

// Simple URL
var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson'
// Import in all earthquakes from last 30 days
d3.json(longUrl).then((data) => {
    createFeatures(data.features)
})

function createFeatures(earthquakeData) {
    // Create scales for magnitude markers
    var min = d3.min(earthquakeData.map(function(d) {return d.properties.mag}));
    var max = d3.max(earthquakeData.map(function(d) {return d.properties.mag}));
    var sizeScale = d3.scaleLinear().domain([min, max]).range([1, 10]);
    var colors = ['#f2d0a4', '#be6a7f', '#870058'];
    var colorScale = d3.scaleQuantile().domain([max, min]).range(colors);

    // Define a function we want to run once for each feature in the features array
    // Give each feature a circle marker which is larger/darker based on magnitude
    // And has a popup describing the place and time of the earthquake
    function createCircle(feature, latlng) {
        let mag = feature.properties.mag
        let properties = {fillOpacity: 0.8, weight: 1, color: 'white', fillColor: colorScale(mag), radius: sizeScale(mag)}
        return L.circleMarker(latlng, properties)
        .bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
  
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: createCircle

    });
  
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes, min, max, colors);
  }
  
  function createMap(earthquakes, min, max, colors) {
  
    // Define streetmap and darkmap layers
    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "satellite-streets-v11",
      accessToken: API_KEY
    });
  
    var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "outdoors-v11",
      accessToken: API_KEY
    });
  
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Satellite": satellitemap,
      "Outdoors": outdoorsmap
    };
  
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [satellitemap, earthquakes]
    });
  
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    var legend_quakes = L.control({position: 'bottomright'});
    var colorScale = d3.scaleQuantile().domain([max, min]).range(colors);
    var thresholds = colorScale.quantiles().map(function (i) { return i.toFixed(2)});

    legend_quakes.onAdd = function (map) {    
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [min, thresholds[0], thresholds[1], max],
        labels = ['<strong>Categories</strong>'];
    
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < (grades.length -1); i++) {
        div.innerHTML += labels.push('<i style="background:' + colorScale(grades[i]) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>': '+'));
        }
        div.innerHTML = labels.join('<br>');
    
        return div;
    };

    legend_quakes.addTo(myMap)
  }
