// Create a map using Leaflet's Simple CRS for non-geographic coordinates
var map = L.map('map', {
    crs: L.CRS.Simple,    // Coordinate Reference System for flat images
    minZoom: -6,          // Minimum zoom level
    maxZoom: 0,           // Maximum zoom level
    zoomDelta: 0.5,       // Step zoom increment/decrement
    zoomSnap: 0.5         // Snap zoom levels to 0.5 increments
});

// Define the bounds of the image in pixel coordinates (top-left, bottom-right)
var bounds = [[0, 0], [10714.28571, 10714.28571]];  // Bounds from the configuration

// Add the image to the map as a layer
var image = L.imageOverlay('Zadash.png', bounds).addTo(map);

// Set the default view (initial center and zoom)
map.setView([5357.142857, 5357.142857]);  // Center and default zoom level

// Fit the map to the bounds of the image
map.fitBounds(bounds);
map.setMaxBounds(bounds);
map.dragging.disable();

// Fetch marker data from external JSON file
fetch('markers.json')
    .then(response => response.json())
    .then(data => {
        console.log('Fetched data:', data); // Debug: check if data is an array
        if (Array.isArray(data)) {
            data.forEach(function (marker) {
                var latLng = [marker.loc[0], marker.loc[1]]; // Leaflet uses [latitude, longitude] order
                var leafletMarker = L.marker(latLng).addTo(map);

                // Set the tooltip to show the content of the `link` field
                if (marker.tooltip === "hover") {
                    leafletMarker.bindTooltip(marker.link, {
                        permanent: false,    // Tooltip disappears when not hovering
                        direction: 'auto'    // Tooltip direction automatically adjusts
                    });
                }
            });
        } else {
            console.error('Data is not an array:', data);
        }
    })
    .catch(error => console.error('Error loading marker data:', error));