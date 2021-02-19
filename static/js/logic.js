var myMap = L.map("map", {
    center: [
        30.09, -5.71
    ],
    zoom: 3
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap)

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson', data => {

    data.features.forEach(obj => {
        var lat = obj.geometry.coordinates[1];
        var lng = obj.geometry.coordinates[0];
        var depth = obj.geometry.coordinates[2];
        var mag = obj.properties.mag;
        var place = obj.properties.place;

        L.circle([lat, lng], {
            color: 'black',
            fillColor: getColor(depth),
            fillOpacity: 1,
            weight: .5,
            radius: mag * 30000
        }).addTo(myMap);
    });
});

function getColor(depth) {
    switch (true) {
        case depth > 90:
            return 'red';
        case depth > 40:
            return 'yellow';
        case depth < 41:
            return 'green';
    };
};

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<i style="background: red">>90</i>';
    div.innerHTML += '<i style="background: yellow">>40</i>';
    div.innerHTML += '<i style="background: green"><40</i>';
    return div;
};
legend.addTo(myMap);

