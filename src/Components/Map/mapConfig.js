const attribution =
  "© Geodata: <a href='https://www.swisstopo.admin.ch/de/home.html'>Swisstopo</a>";

const basemap = {
  name: "Orthofoto",
  url: "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg",
  attribution,
  zIndex: 0,
};

// the map config can come from a server, config file etc.
const mapConfig = {
  zoom: 10,
  center: [879169, 5890894],
  basemap,
};

export default mapConfig;
