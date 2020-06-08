export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2VvdWwybGFsYSIsImEiOiJja2F4c3ZrbGMwNDRuMzBwaXlmZHQ4NDBvIn0.yCswch21OowYq-JhCqnNnw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/seoul2lala/ckaxt7w2u0xzh1ipie3lfflah',
    scrollZoom: false,
    //   center: [-118.113491, 34.111745],
    //   zoom: 6,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    //Add marker
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

    // Extends map bounds to include current location
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
