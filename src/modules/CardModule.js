// @ts-check

import React from "react";
import { connect } from "react-redux";
import { BondHighstockComponent } from "../components/BondHighstockComponent";
// @ts-ignore
import logo from "../logo.svg";
import "../App.css";
import { bondDataFething } from "../actions";
import { ValueTypeSelectComponent } from "../components/ValueTypeSelectComponent";

/**
 * Card module
 */
export class CardModule extends React.Component {
  /**
   * Draw card
   */
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

  /**
   * On create event
   */
  componentDidMount() {
    const { dispatch, card } = this.props;
    dispatch(bondDataFething(card.bond.filter));
  }

  /**
   * On bond data filter change
   */
  onBondDataFilterChange = valueType => {
    this.props.dispatch(
      bondDataFething({
        valueType
      })
    );
  };
}

/**
 * Map reducer to props
 */
const mapStateToProps = state => {
  return {
    card: state.cardReducer
  };
};

/**
 * Map dispatch to props. Here we can add your actions
 */
const mapDispatchToProps = dispatch => ({ dispatch });

export const ConnectedCardModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardModule);
