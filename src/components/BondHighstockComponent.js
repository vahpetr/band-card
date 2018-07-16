// @ts-check

import React from "react";
import * as Highcharts from "highcharts/highstock";

/**
 * Bond highstock component
 */
export class BondHighstockComponent extends React.Component {
  element = null;
  chart = null;

  /**
   * Draw highstock
   */
  render() {
    return (
      <div ref={element => (this.element = element)} className="highstock" />
    );
  }

  /**
   * On create component event
   */
  componentDidMount() {
    this.createChart(this.props);
  }

  /**
   * On dispose component event
   */
  componentWillUnmount() {
    this.disposeChart();
  }

  /**
   * On update component event
   */
  componentWillReceiveProps(nextProps) {
    if (this.chart) {
      this.updateChart(nextProps);
    } else if (this.element) {
      this.createChart(nextProps);
    }
  }

  /**
   * Create chart method
   */
  createChart(props) {
    const config = this.createConfig(props);
    // @ts-ignore
    this.chart = Highcharts.stockChart(this.element, config);

    // BUG current version highstock not work correctly with rangeSelector.selected, can't find issue
    window.setTimeout(() => {
      this.chart.rangeSelector.clickButton(1, true);
    }, 10);
  }

  /**
   * Update chart action
   */
  updateChart(props) {
    const config = this.createConfig(props);
    this.chart.update(config, true);
  }

  /**
   * Dispose chart
   */
  disposeChart() {
    this.chart.destroy();
    this.chart = null;
  }

  /**
   * Create chart config
   */
  createConfig(props) {
    const date = new Date();
    const dateFormat = new Intl.DateTimeFormat("ru").format(date);
    const subtitle =
      `${props.filter.isin}` +
      "<br>" +
      `NII CAPITAL CORP, Telcommunicaions, NR, till ${dateFormat}`;

    const config = {
      chart: {
        type: "line"
      },
      title: {
        text: "NII CAPITAL 7.625 21 USD",
        align: "left"
      },
      subtitle: {
        text: subtitle,
        align: "left"
      },
      credits: {
        enabled: false
      },
      rangeSelector: {
        allButtonsEnabled: true,
        buttonTheme: {
          width: 60
        },
        labelStyle: {
          display: "none"
        },
        inputEnabled: false,
        buttons: [
          {
            count: 1,
            text: "Week",
            type: "week"
          },
          {
            count: 1,
            text: "Month",
            type: "month"
          },
          {
            count: 3,
            text: "Quarter",
            type: "month"
          },
          {
            count: 1,
            text: "Year",
            type: "year"
          },
          {
            text: "Max",
            type: "all"
          }
        ]
      },
      tooltip: {
        shared: true,
        crosshairs: true
      },
      series: [
        {
          name: `${props.filter.isin}`,
          pointStart: Date.UTC(2016, 0, 1),
          pointInterval: 3 * 24 * 3600 * 1000,
          data: props.data,
          marker: {
            enabled: null,
            radius: 2,
            lineWidth: 3,
            lineColor: "#d0d0d0"
          },
          color: "#d0d0d0",
          tooltip: {
            valueDecimals: 3
          }
        }
      ],
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
            formatter: function() {
              return Highcharts.numberFormat(this.y, 2);
            }
          }
        }
      },
      xAxis: {
        type: "datetime",
        scrollbar: {
          enabled: false
        },
        tickInterval: 7 * 24 * 3600 * 1000,
        gridLineWidth: 1,
        labels: {
          format: "{value:%d.%m}"
        }
      },
      yAxis: {
        opposite: false
      },

      navigator: {
        enabled: false,
        height: 0,
        margin: 0
      },
      scrollbar: {
        enabled: false
      }
    };
    return config;
  }
}
