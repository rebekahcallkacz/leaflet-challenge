d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson').then((data) => {
    console.log(data)
    console.log(data.features[0])
})