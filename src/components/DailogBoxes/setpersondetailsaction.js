import React, { Component } from "react";
import "./dashboard.css";
import LineChart from "../Chart/linechart";
import DougHuntChart from "../Chart/doughuntchart";
import Service from "../../Service/firebase";
import firebase from "../../firebase";
import HorizontalBarchart from "../Chart/horizontalbarchart";

class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      getAllDocCount: {
        birthreport: 0,
        patients: 0,
        accountant: 0,
        deathreport: 0,
        doctors: 0,
        laboratorist: 0,
        nurses: 0,
        operationreport: 0,
        payrolllist: 0,
        pharmacists: 0,
        receptionist: 0,
      },
      month: {
        jan: 0,
        feb: 0,
        march: 0,
        april: 0,
        may: 0,
        jun: 0,
        july: 0,
        aug: 0,
        sep: 0,
        oct: 0,
        nov: 0,
        des: 0,
      },
    };
  }
  async componentDidMount() {
    await this.getAllDocCount();
    await this.getPatientTimeStamp();
  }
  async getPatientTimeStamp() {
    this.setState({
      isLoading: true,
    });
    const db = firebase.firestore();
    await db
      .collection("patients")
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const date = new Date(doc.data().timeStamp.toDate()).getMonth();
          const month = date;

          switch (month) {
            case 0:
              const jan = this.state.month.jan + 1;
              this.setState({
                month: {
                  ...this.state.month,
                  jan: jan,
                },
              });

              break;
            case 1:
              const feb = this.state.month.feb + 1;
              this.setState({
                month: {
                  ...this.state.month,
                  feb: feb,
                },
              });
              break;
            case 2:
              const march = this.state.month.march + 1;
              this.setState({
                month: {
                  ...this.state.month,
                  march: march,
                },
              });
              break;
            case 3:
              const april = this.state.month.april + 1;
              this.setState({
                month: {
                  ...this.state.month,
                  april: april,
                },
              });
              break;
            case 4:
              const may = this.state.month.may + 1;
              this.setState({
                month: {
                  ...this.state.month,
                  may: may,
                },
              });
              break;
            case 5:
              const jun = this.state.month.jun + 1;
              this.setState({
                month: {
                  ...this.state.month,
                  jun: jun,
                },
              });
              break;
            case 6:
              const july = this.state.month.july + 1;
              this.setState({
                month: {
                  ...this.state.month,
                  july: july,
                },
              });
              break;
            case 7:
              const aug = this.state.month.aug + 1;
              this.setState({
                month: {
                  ...this.state.month,
                  aug: aug,
                },
              });
              break;

            case 8:
              const sep = this.state.month.sep + 1;
              this.setState({
                month: {
                  ...this.state.month,
                  sep: sep,
                },
              });
              break;
            case 9:
              const oct = this.state.month.oct + 1;
              this.setState({
                month: {
                  ...this.state.month,
                  oct: oct,
                },
              });
              break;
            case 10:
              const nov = this.state.month.nov + 1;
              this.setState({
                month: {
                  ...this.state.month,
                  nov: nov,
                },
              });
              break;
            case 11:
              const des = this.state.month.des + 1;
              this.setState({
                month: {
                  ...this.state.month,
                  des: des,
                },
              });
              break;

            default:
              console.log("default");
          }
        });
        this.setState({
          isLoading: false,
        });

        console.log("Data fetched ");
      })
      .catch((e) => {
        this.setState({
          isLoading: false,
        });
        console.log("Error during fetching data" + e);
      });
  }
  async getAllDocCount() {
    this.setState({
      isLoading: true,
    });
    const allDocCount = await Service.getDocCount();
    this.setState({
      getAllDocCount: allDocCount,
    });

    this.setState({
      isLoading: false,
    });
  }

  render() {
    return this.state.isLoading ? (
      <div className="dashboardpage">
        <i className="fas fa-spinner fa-pulse fa-2x "></i>
      </div>
    ) : (
      <div className="dashboardpage">
        <div className="topheader">
          <ul>
            <li>
              <i
                className="fa fa-arrow-circle-o-right fa-2x"
                aria-hidden="true"
              ></i>
            </li>
            <li>
              <span>Dashboard</span>
            </li>
          </ul>
        </div>

        <div className="first_section">
          <div className="row">
            <div className="col-sm">
              {" "}
              <div className="box">
                {" "}
                <div className="box_containt">
                  <h1
                    style={{
                      fontWeight: "700",
                      color: "#BA79CB",
                      fontSize: "30px",
                    }}
                  >
                    {this.state.getAllDocCount.patients}
                  </h1>
                  {/* <hr /> */}
                  <span
                    style={{
                      fontWeight: "700",

                      color: "#BA79CB",
                    }}
                  >
                    Patients
                  </span>
                </div>
                <i className="fa fa-user fa-4x" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-sm">
              {" "}
              <div className="box">
                {" "}
                <div className="box_containt">
                  <h1
                    style={{
                      fontWeight: "700",
                      color: "#FFA812",
                      fontSize: "30px",
                    }}
                  >
                    {this.state.getAllDocCount.doctors}
                  </h1>
                  {/* <hr /> */}
                  <span
                    style={{
                      fontWeight: "700",

                      color: "#FFA812",
                    }}
                  >
                    Doctors
                  </span>
                </div>
                <i className="fa fa-user-md fa-4x" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-sm">
              {" "}
              <div className="box">
                {" "}
                <div className="box_containt">
                  <h1
                    style={{
                      fontWeight: "700",
                      color: "#00A65A",
                      fontSize: "30px",
                    }}
                  >
                    {this.state.getAllDocCount.nurses}
                  </h1>
                  {/* <hr /> */}
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#00A65A",
                    }}
                  >
                    Nurses
                  </span>
                </div>
                <i className="fa fa-female fa-4x" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-sm">
              {" "}
              <div className="box">
                {" "}
                <div className="box_containt">
                  <h1
                    style={{
                      fontWeight: "700",
                      color: "#F56954",
                      fontSize: "30px",
                    }}
                  >
                    {this.state.getAllDocCount.pharmacists}
                  </h1>
                  {/* <hr /> */}
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#F56954",
                    }}
                  >
                    Pharmacist
                  </span>
                </div>
                <i className="fa fa-medkit fa-4x" aria-hidden="true"></i>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm">
              {" "}
              <div className="box">
                {" "}
                <div className="box_containt">
                  <h1
                    style={{
                      fontWeight: "700",
                      color: "#00B29E",
                      fontSize: "30px",
                    }}
                  >
                    {this.state.getAllDocCount.laboratorist}
                  </h1>
                  {/* <hr /> */}
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#00B29E",
                    }}
                  >
                    Laboratorist
                  </span>
                </div>
                <i className="fa fa-flask fa-4x" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-sm">
              {" "}
              <div className="box">
                {" "}
                <div className="box_containt">
                  <h1
                    style={{
                      fontWeight: "700",
                      color: "#EC3B83",
                      fontSize: "30px",
                    }}
                  >
                    {this.state.getAllDocCount.accountant}
                  </h1>
                  {/* <hr /> */}
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#EC3B83",
                    }}
                  >
                    Accountant
                  </span>
                </div>
                <i className="fa fa-money fa-4x" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-sm">
              {" "}
              <div className="box">
                {" "}
                <div className="box_containt">
                  <h1
                    style={{
                      fontWeight: "700",
                      color: "#00C0EF",
                      fontSize: "30px",
                    }}
                  >
                    {this.state.getAllDocCount.receptionist}
                  </h1>
                  {/* <hr /> */}
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#00C0EF",
                    }}
                  >
                    Receptionist
                  </span>
                </div>
                <i className="fa fa-briefcase fa-4x" aria-hidden="true"></i>
              </div>
            </div>

            <div className="col-sm">
              {" "}
              <div className="box">
                {" "}
                <div className="box_containt">
                  <h1
                    style={{
                      fontWeight: "700",
                      color: "#BA79CB",
                      fontSize: "30px",
                    }}
                  >
                    {this.state.getAllDocCount.payrolllist}
                  </h1>
                  {/* <hr /> */}
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#BA79CB",
                    }}
                  >
                    Payments
                  </span>
                </div>
                <i
                  className="fa fa-credit-card-alt fa-4x"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              {" "}
              <div className="box">
                {" "}
                <div className="box_containt">
                  <h1
                    style={{
                      fontWeight: "700",
                      color: "#00A65A",
                      fontSize: "30px",
                    }}
                  >
                    {this.state.getAllDocCount.operationreport}
                  </h1>
                  {/* <hr /> */}
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#00A65A",
                    }}
                  >
                    Operation Reportt
                  </span>
                </div>
                <i className="fa fa-hospital-o fa-4x" aria-hidden="true"></i>
              </div>
            </div>

            <div className="col-sm-3">
              {" "}
              <div className="box">
                {" "}
                <div className="box_containt">
                  <h1
                    style={{
                      fontWeight: "700",
                      color: "#95641E",
                      fontSize: "30px",
                    }}
                  >
                    {this.state.getAllDocCount.birthreport}
                  </h1>
                  {/* <hr /> */}
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#95641E",
                    }}
                  >
                    Birth Report
                  </span>
                </div>
                <i className="fa fa-child fa-4x" aria-hidden="true"></i>
              </div>
            </div>

            <div className="col-sm-3">
              {" "}
              <div className="box">
                {" "}
                <div className="box_containt">
                  <h1
                    style={{
                      fontWeight: "700",
                      color: "#701C1C",
                      fontSize: "30px",
                    }}
                  >
                    {this.state.getAllDocCount.deathreport}
                  </h1>
                  {/* <hr /> */}
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#701C1C",
                    }}
                  >
                    Death Report
                  </span>
                </div>
                <i className="fa fa-ban fa-4x" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="second_section">
          <div className="row">
            <div className="col-lg-8">
              <div className="wrap_chart">
                <LineChart month={this.state.month}></LineChart>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="wrap_chart">
                <DougHuntChart
                  operationCount={this.state.getAllDocCount.operationreport}
                  birthReportCount={this.state.getAllDocCount.birthreport}
                  deathreportCount={this.state.getAllDocCount.deathreport}
                ></DougHuntChart>
              </div>
            </div>
          </div>
        </div>
        <div className="third_section">
          <div className="wrap_chart">
            <HorizontalBarchart
              getAllDocCount={this.state.getAllDocCount}
            ></HorizontalBarchart>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
