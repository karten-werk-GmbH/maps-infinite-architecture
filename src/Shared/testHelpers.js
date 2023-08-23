const tileLayer = {
  opacity: 1,
  visible: true,
  source: {
    getFeatureInfoUrl() {
      return "https://wms.geo.admin.ch/?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=ch.swisstopo.swisstlm3d-wanderwege&LAYERS=ch.swisstopo.swisstlm3d-wanderwege&INFO_FORMAT=text%2Fxml%3B%20subtype%3Dgml%2F3.2.1&I=210&J=230&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=875662.5960349776%2C5875255.742111787%2C878108.5809401033%2C5877701.727016913";
    },
  },
  setOpacity(opacity) {
    this.opacity = opacity;
  },
  setVisible(visible) {
    this.visible = visible;
  },
  getSource() {
    return this.source;
  },
};

const event = { coordinate: [874024.6762857577, 5874255.602034891] };

const projection = {
  code_: "EPSG:3857",
  units_: "m",
  extent_: [
    -20037508.342789244, -20037508.342789244, 20037508.342789244,
    20037508.342789244,
  ],
  worldExtent_: [-180, -85, 180, 85],
  axisOrientation_: "enu",
  global_: true,
  canWrapX_: true,
  defaultTileGrid_: {
    minZoom: 0,
    resolutions_: [
      156543.03392804097, 78271.51696402048, 39135.75848201024,
      19567.87924100512, 9783.93962050256, 4891.96981025128, 2445.98490512564,
      1222.99245256282, 611.49622628141, 305.748113140705, 152.8740565703525,
      76.43702828517625, 38.21851414258813, 19.109257071294063,
      9.554628535647032, 4.777314267823516, 2.388657133911758,
      1.194328566955879, 0.5971642834779395, 0.29858214173896974,
      0.14929107086948487, 0.07464553543474244, 0.03732276771737122,
      0.01866138385868561, 0.009330691929342804, 0.004665345964671402,
      0.002332672982335701, 0.0011663364911678506, 0.0005831682455839253,
      0.00029158412279196264, 0.00014579206139598132, 0.00007289603069799066,
      0.00003644801534899533, 0.000018224007674497665, 0.000009112003837248832,
      0.000004556001918624416, 0.000002278000959312208, 0.000001139000479656104,
      5.69500239828052e-7, 2.84750119914026e-7, 1.42375059957013e-7,
      7.11875299785065e-8, 3.559376498925325e-8,
    ],
    zoomFactor_: 2,
    maxZoom: 42,
    origin_: [-20037508.342789244, 20037508.342789244],
    origins_: null,
    tileSizes_: null,
    tileSize_: 256,
    extent_: [
      -20037508.342789244, -20037508.342789244, 20037508.342789244,
      20037508.342789244,
    ],
    fullTileRanges_: [
      {
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
      },
      {
        minX: 0,
        maxX: 1,
        minY: 0,
        maxY: 1,
      },
      {
        minX: 0,
        maxX: 3,
        minY: 0,
        maxY: 3,
      },
      {
        minX: 0,
        maxX: 7,
        minY: 0,
        maxY: 7,
      },
      {
        minX: 0,
        maxX: 15,
        minY: 0,
        maxY: 15,
      },
      {
        minX: 0,
        maxX: 31,
        minY: 0,
        maxY: 31,
      },
      {
        minX: 0,
        maxX: 63,
        minY: 0,
        maxY: 63,
      },
      {
        minX: 0,
        maxX: 127,
        minY: 0,
        maxY: 127,
      },
      {
        minX: 0,
        maxX: 255,
        minY: 0,
        maxY: 255,
      },
      {
        minX: 0,
        maxX: 511,
        minY: 0,
        maxY: 511,
      },
      {
        minX: 0,
        maxX: 1023,
        minY: 0,
        maxY: 1023,
      },
      {
        minX: 0,
        maxX: 2047,
        minY: 0,
        maxY: 2047,
      },
      {
        minX: 0,
        maxX: 4095,
        minY: 0,
        maxY: 4095,
      },
      {
        minX: 0,
        maxX: 8191,
        minY: 0,
        maxY: 8191,
      },
      {
        minX: 0,
        maxX: 16383,
        minY: 0,
        maxY: 16383,
      },
      {
        minX: 0,
        maxX: 32767,
        minY: 0,
        maxY: 32767,
      },
      {
        minX: 0,
        maxX: 65535,
        minY: 0,
        maxY: 65535,
      },
      {
        minX: 0,
        maxX: 131071,
        minY: 0,
        maxY: 131071,
      },
      {
        minX: 0,
        maxX: 262143,
        minY: 0,
        maxY: 262143,
      },
      {
        minX: 0,
        maxX: 524287,
        minY: 0,
        maxY: 524287,
      },
      {
        minX: 0,
        maxX: 1048575,
        minY: 0,
        maxY: 1048575,
      },
      {
        minX: 0,
        maxX: 2097151,
        minY: 0,
        maxY: 2097151,
      },
      {
        minX: 0,
        maxX: 4194303,
        minY: 0,
        maxY: 4194303,
      },
      {
        minX: 0,
        maxX: 8388607,
        minY: 0,
        maxY: 8388607,
      },
      {
        minX: 0,
        maxX: 16777215,
        minY: 0,
        maxY: 16777215,
      },
      {
        minX: 0,
        maxX: 33554431,
        minY: 0,
        maxY: 33554431,
      },
      {
        minX: 0,
        maxX: 67108863,
        minY: 0,
        maxY: 67108863,
      },
      {
        minX: 0,
        maxX: 134217727,
        minY: 0,
        maxY: 134217727,
      },
      {
        minX: 0,
        maxX: 268435455,
        minY: 0,
        maxY: 268435455,
      },
      {
        minX: 0,
        maxX: 536870911,
        minY: 0,
        maxY: 536870911,
      },
      {
        minX: 0,
        maxX: 1073741823,
        minY: 0,
        maxY: 1073741823,
      },
      {
        minX: 0,
        maxX: 2147483647,
        minY: 0,
        maxY: 2147483647,
      },
      {
        minX: 0,
        maxX: 4294967295,
        minY: 0,
        maxY: 4294967295,
      },
      {
        minX: 0,
        maxX: 8589934591,
        minY: 0,
        maxY: 8589934591,
      },
      {
        minX: 0,
        maxX: 17179869183,
        minY: 0,
        maxY: 17179869183,
      },
      {
        minX: 0,
        maxX: 34359738367,
        minY: 0,
        maxY: 34359738367,
      },
      {
        minX: 0,
        maxX: 68719476735,
        minY: 0,
        maxY: 68719476735,
      },
      {
        minX: 0,
        maxX: 137438953471,
        minY: 0,
        maxY: 137438953471,
      },
      {
        minX: 0,
        maxX: 274877906943,
        minY: 0,
        maxY: 274877906943,
      },
      {
        minX: 0,
        maxX: 549755813887,
        minY: 0,
        maxY: 549755813887,
      },
      {
        minX: 0,
        maxX: 1099511627775,
        minY: 0,
        maxY: 1099511627775,
      },
      {
        minX: 0,
        maxX: 2199023255551,
        minY: 0,
        maxY: 2199023255551,
      },
      {
        minX: 0,
        maxX: 4398046511103,
        minY: 0,
        maxY: 4398046511103,
      },
    ],
    tmpSize_: [256, 256],
    tmpExtent_: [0, 0, 0, 0],
  },
  ol_uid: "29",
};
const resolution = 5.848936742169251;

const queryLayers = [tileLayer];

export const getFeatureInfoParams = {
  event,
  projection,
  resolution,
  queryLayers,
};
const attribution =
  "© Geodata: <a href='https://www.swisstopo.admin.ch/de/home.html'>Swisstopo</a>";

export const overlays = [
  {
    name: "Hiking trails",
    type: "overlay",
    url: "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swisstlm3d-wanderwege/default/current/3857/{z}/{x}/{y}.png",
    attribution,
    tileLayer,
    zIndex: 1,
    visible: true,
    opacity: 1,
  },
  {
    name: "Solar energy potential",
    type: "overlay",
    url: "https://wmts.geo.admin.ch/1.0.0/ch.bfe.solarenergie-eignung-daecher/default/current/3857/{z}/{x}/{y}.png",
    attribution,
    zIndex: 2,
    tileLayer,
    minZoom: 14,
    maxZoom: 22,
    visible: true,
    opacity: 1,
  },
];

export const layerQueryParams = {
  basemap: "Orthofoto",
  center: [966667, 5862812],
  layers: ["Hiking trails", "Solar energy potential"],
  layers_opacity: [0.5, 1],
  layers_visibility: [true, false],
  zoom: 16,
};

export const fakePm = {
  properties: {
    layername: "my fake layer",
    geometryProperty: "fake geometry",
    testProp: "my test prop",
    anotherTestProp: "my other test prop",
  },

  features: [
    {
      getProperties() {
        return fakePm.properties;
      },
    },
  ],

  source: {
    getFeatures() {
      return fakePm.features;
    },
  },

  vectorLayer: {
    getSource() {
      return fakePm.source;
    },
  },
};
