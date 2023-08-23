# Infinite Mapping Architecture

This project is an example of how to apply the [infinite architecture](https://www.logicroom.co) in a web mapping project.

## Architecture Overview

This project uses the **Observer Pattern**, **Presenters**, **Repositories** and **Gateways** to display a webmap. Third party libraries
like OpenLayers or React are only used in Components and Gateways. This separation of concerns allows great testability
and scales very well.
<br /><br />
**Features:**

- URL updates when interacting on the map.
- If URL Parameters are available, the map uses them on load.
- Layers can be turned on/off and opacity can be changed.
- Layer legend can be shown.
- A click on map features, performs a getFeatureInfo Request to the WMS Layers.
  <br /><br />

![image](https://github.com/karten-werk-GmbH/maps-infinite-architecture/assets/6850977/0891e17c-05ff-423c-98d3-8a1e912bac85)

## Getting started

Clone the project

```bash
git clone https://github.com/karten-werk-GmbH/maps-infinite-architecture.git
```

```bash
# enter the directory
cd maps-infinite-architecture

# install the dependencies
npm install

# run the dev server
npm run dev

```

## Codesandbox

There is a Codesandbox available [here](https://codesandbox.io/p/github/karten-werk-GmbH/maps-infinite-architecture/main?workspaceId=038b5ef1-18cc-46c0-b841-51a1d6f29c16)

## Testing

This project uses [vitest](https://vitest.dev/) as a testing library.
You can run the tests with the following command

```bash
npm run test
```

## Dependencies

- [OpenLayers](https://openlayers.org/)
- [QueryString](https://github.com/sindresorhus/query-string)
- [React](https://react.dev/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/#)
