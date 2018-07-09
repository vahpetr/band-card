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
    const onChange = sinon.spy();
    const wrapper = mount(
      <ValueTypeSelectComponent
        defaultValue={filter.valueType}
        onChange={onChange}
      />
    );

    expect(wrapper.props().defaultValue).toBe(filter.valueType);
    expect(wrapper.props().onChange).toBe(onChange);
  });

  it("snapshot", () => {
    const { filter } = initialState.bond;
    const onChange = sinon.spy();
    const wrapper = mount(
      <ValueTypeSelectComponent
        defaultValue={filter.valueType}
        onChange={onChange}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulates click events', () => {
    const { filter } = initialState.bond;
    const onChange = sinon.spy();
    const wrapper = mount(
      <ValueTypeSelectComponent
        defaultValue={filter.valueType}
        onChange={onChange}
      />
    );
    wrapper.simulate('change');
    expect(onChange.called).toBeTruthy();
  });
});
