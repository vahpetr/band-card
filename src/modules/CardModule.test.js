// shallow+sinon http://airbnb.io/enzyme/
// redux-mock-store https://github.com/dmitry-zaets/redux-mock-store

import React from "react";
import { configure, shallow, mount } from "enzyme";
import sinon from 'sinon';
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import { ConnectedCardModule, CardModule } from "./CardModule";
import { initialState } from "../reducers";

configure({ adapter: new Adapter() });

describe("<ConnectedCardModule />", () => {

  it("without crashing", () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = shallow(<ConnectedCardModule store={store} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe("<CardModule />", () => {
    it("renders without crashing", () => {
      var callback = sinon.fake();
      const wrapper = mount(<CardModule card={initialState} dispatch={callback} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  
  });
});
