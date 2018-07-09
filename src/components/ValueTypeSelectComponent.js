// @ts-check

import React from "react";
import { ValueType } from "../types";

export class ValueTypeSelectComponent extends React.Component {
  availableValueTypes = [ValueType.YIELD, ValueType.SPREAD, ValueType.PRICE];

  render() {
    const { defaultValue } = this.props;
    return (
      <select defaultValue={defaultValue} onChange={this.onValueTypeChange}>
        {this.buildOptions()}
      </select>
    );
  }

  onValueTypeChange = ev => {
    this.props.onChange(ev.target.value);
  };

  buildOptions() {
    return this.availableValueTypes.map(availableValueType => (
      <option value={availableValueType} key={availableValueType}>
        {availableValueType}
      </option>
    ));
  }
}
