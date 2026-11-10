import type { ReactNode } from "react";
import "./featureInfo.css";

/** A feature as delivered by FeatureInfoPresenter.pmToVm. */
export interface FeatureInfo {
  layername: string;
  keys: string[];
  props: Record<string, ReactNode>;
}

interface AttributeTableProps {
  feature: FeatureInfo;
}

const AttributeTable = (props: AttributeTableProps) => {
  const { feature } = props;
  return (
    <table>
      <thead>
        <tr>
          <td colSpan={2}>
            <strong>{feature.layername}</strong>
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
