// console.log('hello from the client side! 🌍');

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiamltbXl0ZWVlZSIsImEiOiJjbHhwdWwxZGYwc3h3MmtvYXRmYXBkMGNuIn0.XgrWfQDfYvtph8UZMMfURA';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/jimmyteeee/clxpv8xvv00kt01pu7zwy7abz', // style URL
    scrollZoom: false,
    //   center: [-118, 34], // starting position [lng, lat]
    //   zoom: 9, // starting zoom
    //   interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
