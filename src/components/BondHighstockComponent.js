// @ts-check

import React from "react";
import * as Highcharts from "highcharts/highstock";

export class BondHighstockComponent extends React.Component {
  element = null;
  chart = null;

  render() {
    return (
      <div ref={element => (this.element = element)} className="highstock" />
    );
  }

  componentDidMount() {
    this.createChart(this.props);
  }

  componentWillUnmount() {
    this.disposeChart();
  }

  componentWillReceiveProps(nextProps) {
    if (this.chart) {
      this.updateChart(nextProps);
    } else if (this.element) {
      this.createChart(nextProps);
    }
  }

  onValueType(ev) {
    this.props.onFilterChange({
      valueType: ev.target.value
    });
  }

  createChart(options) {
    const config = this.createConfig(options);
    // @ts-ignore
    this.chart = Highcharts.stockChart(this.element, config);
    window.setTimeout(() => {
      this.chart.rangeSelector.clickButton(1, true);
    }, 10);
  }

  updateChart(options) {
    const config = this.createConfig(options);
    this.chart.update(config, true);
  }

  disposeChart() {
    this.chart.destroy();
    this.chart = null;
  }

  createConfig(options) {
    const date = new Date();
    const dateFormat = new Intl.DateTimeFormat("ru").format(date);
    const subtitle =
      `${options.filter.isin}` +
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
          name: `${options.filter.isin}`,
          pointStart: Date.UTC(2016, 0, 1),
          pointInterval: 3 * 24 * 3600 * 1000,
          data: options.data,
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
