import React from "react";
import { HorizontalBar } from "react-chartjs-2";

export default class HorizontalBarchart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [
          "Doctors",
          "Nurses",
          "Pharmacist",
          "Laboratorist",
          "Accountant",
          "Receptionist",
        ],
        datasets: [
          {
            label: "Number Of Employee",
            backgroundColor: [
              //        "rgba(54,162,235,1)",
              //   "rgba(255,159,64,1)",
              //   "rgba(255,99,132,)",
              //   "rgba(255,205,86,1)",
              //   "rgba(54,162,235,1)",
              //   "rgba(255,159,64,1)",
              //   "rgba(153,102,255,1)",

              // "rgba(255, 99, 132, 1)",
              // "rgba(255, 206, 86, 1)",
              // "rgba(75, 192, 192, 1)",
              // "rgba(153, 102, 255, 1)",
              // "rgba(255, 159, 64, 1)",

              "rgba(84, 219, 180,1)",
              "rgba(153, 160, 246,1)",
              "rgba(84, 219, 180,1)",
              "rgba(153, 160, 246,1)",
              "rgba(84, 219, 180,1)",
              "rgba(153, 160, 246,1)",
            ],

            borderColor: [
              "rgba(84, 219, 180,1)",
              "rgba(153, 160, 246,1)",
              "rgba(84, 219, 180,1)",
              "rgba(153, 160, 246,1)",
              "rgba(84, 219, 180,1)",
              "rgba(153, 160, 246,1)",
            ],
            borderWidth: 1,

            //   hoverBackgroundColor: "rgba(255,99,132,0.4)",
            //   hoverBorderColor: "rgba(255,99,132,1)",
            data: [
              this.props.getAllDocCount.doctors,
              this.props.getAllDocCount.nurses,
              this.props.getAllDocCount.pharmacists,
              this.props.getAllDocCount.laboratorist,
              this.props.getAllDocCount.accountant,
              this.props.getAllDocCount.receptionist,
            ],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Employee",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          yAxes: [
            {
              barPercentage: 0.5,
              gridLines: {
                display: false,
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  }

  render() {
    return (
      <div>
        <HorizontalBar
          data={this.state.data}
          options={this.state.options}
          height={30}
          width={100}
        />
      </div>
    );
  }
}
