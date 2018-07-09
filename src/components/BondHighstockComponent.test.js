import React from "react";
import { configure, mount } from "enzyme";
import sinon from 'sinon';
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import { initialState } from "../reducers";
import { BondHighstockComponent } from "./BondHighstockComponent";

configure({ adapter: new Adapter() });

describe("<BondHighstockComponent />", () => {
  it("renders without crashing", () => {
    const { data, filter } = initialState.bond;
    const wrapper = mount(<BondHighstockComponent data={data} filter={filter} />);

    expect(wrapper.props().filter.isin).toBe(filter.isin);
    expect(wrapper.props().filter.valueType).toBe(filter.valueType);
    expect(wrapper.props().data).toBe(data);
  });

  it("snapshot", () => {
    const { data, filter } = initialState.bond;
    const wrapper = mount(<BondHighstockComponent data={data} filter={filter} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('calls componentDidMount', () => {
    sinon.spy(BondHighstockComponent.prototype, 'componentDidMount');
    const { data, filter } = initialState.bond;
    const wrapper = mount(<BondHighstockComponent data={data} filter={filter} />);
    expect(BondHighstockComponent.prototype.componentDidMount.callCount).toBe(1);
    BondHighstockComponent.prototype.componentDidMount.restore();
  });

});