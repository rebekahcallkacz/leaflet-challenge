# Map of Recent Earthquakes 
This project uses Leaflet to visualize recent earthquake data.

## Data
The earthquake data is an API created by the USGS Earthquake Hazard Program and contains all earthquakes from the last 30 days (Past 30 Days). The tectonic plate boundaries dataset is GeoJSON data downloaded from Ahlenius, Nordpil and Bird (2014). 

## Method
The purpose of this project is to allow the user to view earthquakes from the last 30 days and the tectonic plate lines on a map. 

![alt text](https://github.com/rebekahcallkacz/leaflet-challenge/blob/main/static/images/map1.jpg "Map")

The map is interactive: the earthquake markers can be clicked on to display more data about that earthquake and the map layers can be turned on and off.

![alt text](https://github.com/rebekahcallkacz/leaflet-challenge/blob/main/static/images/map2.jpg "Map Interactive")

## Instructions 
Some of the tile layers in the map require a Mapbox API key. The user need to create a config.js file with the variable API_KEY containing their API key in order to make the Mapbox API calls. Additionally, the tectonic plates data will not load unless the Live Server extension is installed and active in Visual Studio Code, or the user can edit the file path and open the webpage using the command 'python -m http.server' in the terminal.

## References
Ahlenius, H. Nordpil, and Bird, P. (2014). World tectonic plates and boundaries. Retrieved from https://github.com/fraxen/tectonicplates

Past 30 Days - All Earthquakes (2020). Earthquake Hazards Program. U.S. Geological Survey USGS. Retrieved from https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
