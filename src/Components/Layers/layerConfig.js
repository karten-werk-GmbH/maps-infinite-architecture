const attribution =
  "© Geodata: <a href='https://www.swisstopo.admin.ch/de/home.html'>Swisstopo</a>";
const swisstopoBaseUrl =
  "https://wms.geo.admin.ch/?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities";
const legendBaseUrl = "https://api3.geo.admin.ch/static/images/legends";
const overlays = [
  {
    name: "Hiking trails",
    layerName: "ch.swisstopo.swisstlm3d-wanderwege",
    type: "overlay",
    url: swisstopoBaseUrl,
    legendUrl: `${legendBaseUrl}/ch.swisstopo.swisstlm3d-wanderwege_en.png`,
    attribution,
    zIndex: 1,
    visible: true,
    opacity: 1,
  },
  {
    name: "Solar energy potential",
    layerName: "ch.bfe.solarenergie-eignung-daecher",
    type: "overlay",
    url: swisstopoBaseUrl,
    legendUrl: `${legendBaseUrl}/ch.bfe.solarenergie-eignung-daecher_en.png`,
    attribution,
    zIndex: 2,
    minZoom: 14,
    maxZoom: 22,
    visible: true,
    opacity: 1,
  },
];

export default overlays;
