import PropTypes from "prop-types";
import "./featureInfo.css";
const AttributeTable = (props) => {
  const { feature } = props;
  return (
    <table>
      <thead>
        <tr>
          <td colSpan={2}>
            <strong>{feature.layername.toUpperCase()}</strong>
          </td>
        </tr>
      </thead>
      <tbody>
        {feature.keys.map((key) => (
          <tr key={key}>
            <td className="attributetable__cell">{key}</td>
            <td className="attributetable__cell">
              <i>{feature.props[key]}</i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttributeTable;

AttributeTable.propTypes = {
  feature: PropTypes.object.isRequired,
};
