import React from "react";
import { configure, mount } from "enzyme";
import sinon from 'sinon';
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import { initialState } from "../reducers";
import { ValueTypeSelectComponent } from "./ValueTypeSelectComponent";

configure({ adapter: new Adapter() });

describe("<ValueTypeSelectComponent />", () => {
  it("renders without crashing", () => {
    const { filter } = initialState.bond;
    const onBondDataFilterChange = sinon.spy();
    const wrapper = mount(
      <ValueTypeSelectComponent
        filter={filter}
        onFilterChange={onBondDataFilterChange}
      />
    );

    expect(wrapper.props().filter.isin).toBe(filter.isin);
    expect(wrapper.props().filter.valueType).toBe(filter.valueType);
    expect(wrapper.props().onFilterChange).toBe(onBondDataFilterChange);
  });

  it("snapshot", () => {
    const { filter } = initialState.bond;
    const onBondDataFilterChange = sinon.spy();
    const wrapper = mount(
      <ValueTypeSelectComponent
        filter={filter}
        onFilterChange={onBondDataFilterChange}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulates click events', () => {
    const { filter } = initialState.bond;
    const onBondDataFilterChange = sinon.spy();
    const wrapper = mount(
      <ValueTypeSelectComponent
        filter={filter}
        onFilterChange={onBondDataFilterChange}
      />
    );
    wrapper.simulate('change');
    expect(onBondDataFilterChange.called).toBeTruthy();
  });
});
