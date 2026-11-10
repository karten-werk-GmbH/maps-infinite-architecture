import type BaseLayer from "ol/layer/Base";

/** An overlay as delivered to the layer components by LayerPresenter. */
export interface Overlay {
  name: string;
  visible: boolean;
  opacity: number;
  legendUrl: string;
  tileLayer: BaseLayer;
}

export interface LayerUpdate {
  layer: Overlay;
  visible: boolean;
  /** The range input delivers a string; LayerPresenter.updateLayer parses it. */
  opacity: number | string;
}
