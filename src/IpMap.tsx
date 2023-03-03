import { Component, createEffect } from 'solid-js';
import * as L from 'leaflet';

interface MapProps {
  // location: {
  //   latitude: number;
  //   longitude: number;
  // };
  lat: number;
  lng: number;
}

const IpMap: Component<MapProps> = (props) => {
  let map: L.Map;

  createEffect(() => {
    try {
      map.remove();
    } catch (err) {}

    map = L.map('ip-map').setView([props.lat, props.lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      crossOrigin: 'anonymous',
    }).addTo(map);

    L.marker([props.lat, props.lng]).addTo(map);
  });

  return <div id="ip-map" style="height: 300px"></div>;
};

export default IpMap;
