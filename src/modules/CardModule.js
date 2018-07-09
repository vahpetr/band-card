// @ts-check

import React from "react";
import { connect } from "react-redux";
import { BondHighstockComponent } from "../components/BondHighstockComponent";
// @ts-ignore
import logo from "../logo.svg";
import "../App.css";
import { bondDataFething } from "../actions";
import { ValueTypeSelectComponent } from "../components/ValueTypeSelectComponent";

export class CardModule extends React.Component {
  componentDidMount() {
    const { dispatch, card } = this.props;
    dispatch(bondDataFething(card.bond.filter));
  }

  render() {
    const { data, filter } = this.props.card.bond;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bond card</h1>
        </header>
        <BondHighstockComponent data={data} filter={filter} />
        <ValueTypeSelectComponent
          defaultValue={filter.valueType}
          onChange={this.onBondDataFilterChange}
        />
      </div>
    );
  }

  onBondDataFilterChange = (valueType) => {
    this.props.dispatch(bondDataFething({
      valueType
    }));
  }
}

const mapStateToProps = state => {
  return {
    card: state.cardReducer
  };
};
const mapDispatchToProps = dispatch => ({ dispatch });

export const ConnectedCardModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardModule);
