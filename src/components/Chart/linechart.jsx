import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [
          "JAN",
          "FEB",
          "MARCH",
          "APRIL",
          "MAY",
          "JUN",
          "JULY",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        datasets: [
          {
            label: "Number Of Patients Over Current Year",
            data: [
              this.props.month.jan,
              this.props.month.feb,
              this.props.month.march,
              this.props.month.april,
              this.props.month.may,
              this.props.month.jun,
              this.props.month.july,
              this.props.month.aug,
              this.props.month.sep,
              this.props.month.oct,
              this.props.month.nov,
              this.props.month.des,
            ],
            // borderColor: ["rgba(54,162,235,0.2)"],
            borderColor: "#47DBB3",
            backgroundColor: "white",
            borderWidth: 4,

            // backgroundColor: ["rgba(54,162,235,0.2)"],
            pontBackgroundColor: "rgba(54,162,235,0.2)",
            pointBorderColor: "rgba(54,162,235,0.2)",
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Patient",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  }

  render() {
    return (
      <Line
        data={this.state.data}
        options={this.state.options}
        height={50}
        width={100}
      ></Line>
    );
  }
}

export default LineChart;
