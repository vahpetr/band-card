// @ts-check

import React from "react";
import { ValueType } from "../types";

/**
 * Value type component
 */
export class ValueTypeSelectComponent extends React.Component {
  availableValueTypes = [ValueType.YIELD, ValueType.SPREAD, ValueType.PRICE];

  /**
   * Draw select
   */
  render() {
    const { defaultValue } = this.props;
    return (
      <select defaultValue={defaultValue} onChange={this.onValueTypeChange}>
        {this.buildOptions()}
      </select>
    );
  }

  /**
   * On value change event
   */
  onValueTypeChange = ev => {
    this.props.onChange(ev.target.value);
  };

  /**
   * Build select list
   */
  buildOptions() {
    return this.availableValueTypes.map(availableValueType => (
      <option value={availableValueType} key={availableValueType}>
        {availableValueType}
      </option>
    ));
  }
}
