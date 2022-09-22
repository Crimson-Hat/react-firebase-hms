import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class DougHuntChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ["Operation Report", "Birth Report", "Death Report"],
        datasets: [
          {
            label: "my chart",

            backgroundColor: [
              // "rgba(255,99,132,1)",
              // "rgba(255,205,86,1)",
              "rgba(54,162,235,1)",
              "rgba(255,159,64,1)",
              "rgba(153,102,255,1)",
            ],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Reports",
        },
      },
    };
  }
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <Doughnut
        options={this.state.options}
        height={80}
        width={100}
      ></Doughnut>
    );
  }
}

export default DougHuntChart;
