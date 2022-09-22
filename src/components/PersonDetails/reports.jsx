import React, { Component } from "react";
import Service from "../../Service/firebase";
import { connect } from "react-redux";
import "./report.css";
class Reports extends Component {
  constructor() {
    super();
    this.state = {
      bedAllotmentDetails: {},
      operationReportDetails: {},
      birthReportDetails: {},
      detahReportDetails: {},
    };
  }
  componentDidMount() {
    console.log(this.props.reportDetails);
    if (this.props.reportDetails.deathreportid !== "") {
      this.fetchDeathReport();
    }
    if (this.props.reportDetails.birthreportid !== "") {
      this.fetchBirthReport();
    }
    if (this.props.reportDetails.operationreportid !== "") {
      this.fetchOperationReport();
    }
    if (this.props.reportDetails.bedallotementid !== "") {
      this.fetchBedAllotmentDetais();
    }
  }
  async fetchDeathReport() {
    const fetchedDataList = await Service.getDataWithoutLimit(
      "deathreport",
      this.props.reportDetails.deathreportid
    );

    if (fetchedDataList === "error") {
      console.log("Error in get person details data");
    } else {
      this.setState({
        detahReportDetails: fetchedDataList,
      });
    }
  }
  async fetchBirthReport() {
    const fetchedDataList = await Service.getDataWithoutLimit(
      "birthreport",
      this.props.reportDetails.birthreportid
    );

    if (fetchedDataList === "error") {
      console.log("Error in get person details data");
    } else {
      this.setState({
        birthReportDetails: fetchedDataList,
      });
    }
  }
  async fetchOperationReport() {
    const fetchedDataList = await Service.getDataWithoutLimit(
      "operationreport",
      this.props.reportDetails.operationreportid
    );

    if (fetchedDataList === "error") {
      console.log("Error in get person details data");
    } else {
      this.setState({
        operationReportDetails: fetchedDataList,
      });
    }
  }

  async fetchBedAllotmentDetais() {
    const fetchedDataList = await Service.getDataWithoutLimit(
      "beds",
      this.props.reportDetails.bedallotementid
    );

    if (fetchedDataList === "error") {
      console.log("Error in get person details data");
    } else {
      this.setState({
        bedAllotmentDetails: fetchedDataList,
      });
    }
    const dateTime = new Date(
      this.state.bedAllotmentDetails.allotedbeddatetime.toDate()
    );

    this.setState({
      bedAllotmentDetails: {
        ...this.state.bedAllotmentDetails,
        allotedbeddate: `${dateTime.getDate()}/${
          dateTime.getMonth() + 1
        }/${dateTime.getFullYear()}`,
        allotedbedtime: `${dateTime.getHours()}:${dateTime.getMinutes()}`,
      },
    });
    if (
      this.state.bedAllotmentDetails.dischargedate !== "" &&
      this.state.bedAllotmentDetails.dischargetime !== ""
    ) {
      const time = this.state.bedAllotmentDetails.dischargetime.toDate();
      const date = this.state.bedAllotmentDetails.dischargedate.toDate();
      this.setState({
        bedAllotmentDetails: {
          ...this.state.bedAllotmentDetails,

          dischargebedTime: `${time.getHours()}:${time.getMinutes()}`,
          dischargebedDate: `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`,
        },
      });
    } else {
      this.setState({
        bedAllotmentDetails: {
          ...this.state.bedAllotmentDetails,
          dischargebedTime: "",
          dischargebedDate: "",
        },
      });
    }
  }
  render() {
    return (
      <div className="reportpage">
        {this.props.reportDetails.bedallotementid === "" ? null : (
          <div className="bed_allotment_section table">
            <hr></hr>
            <h6>-- Bed Allotment Details</h6>
            <table className="table  table-striped">
              <tbody>
                <tr>
                  <td>Bed Number</td>

                  <td> {this.state.bedAllotmentDetails.allotedbednum}</td>
                </tr>

                <tr>
                  <td>Bed Type</td>

                  <td> {this.state.bedAllotmentDetails.allotedbedtype}</td>
                </tr>
                <tr>
                  <td>Alloted Date:</td>

                  <td> {this.state.bedAllotmentDetails.allotedbeddate}</td>
                </tr>
                <tr>
                  <td>Alloted Time</td>

                  <td>{this.state.bedAllotmentDetails.allotedbedtime}</td>
                </tr>

                <tr>
                  <td>Care Taker</td>

                  <td>{this.state.bedAllotmentDetails.caretaker}</td>
                </tr>
                <tr>
                  <td>Discharge Date</td>

                  <td>
                    {" "}
                    {this.state.bedAllotmentDetails.dischargebedDate === ""
                      ? "--:--"
                      : this.state.bedAllotmentDetails.dischargebedDate}
                  </td>
                </tr>
                <tr>
                  <td> Discharge Time</td>

                  <td>
                    {this.state.bedAllotmentDetails.dischargebedTime === ""
                      ? "--:--"
                      : this.state.bedAllotmentDetails.dischargebedTime}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}{" "}
        {this.props.reportDetails.operationreportid === "" ? null : (
          <div className="Operation _report_section table">
            <hr></hr>
            <h6>-- Operation Report</h6>
            <table className="table  table-striped">
              <tbody>
                <tr>
                  <td> Date</td>

                  <td> {this.state.operationReportDetails.date}</td>
                </tr>

                <tr>
                  <td> Doctor Name</td>

                  <td> {this.state.operationReportDetails.doctorname}</td>
                </tr>
                <tr>
                  <td> Status</td>

                  <td>
                    {this.state.operationReportDetails.status === ""
                      ? "---"
                      : this.state.operationReportDetails.status}
                  </td>
                </tr>
                <tr>
                  <td> Remarks</td>

                  <td>
                    {" "}
                    {this.state.operationReportDetails.remark === ""
                      ? "---"
                      : this.state.operationReportDetails.remark}
                  </td>
                </tr>
                <tr>
                  <td> Description</td>

                  <td>
                    {this.state.operationReportDetails.description === ""
                      ? "---"
                      : this.state.operationReportDetails.description}
                  </td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
        )}
        {this.props.reportDetails.birthreportid === "" ? null : (
          <div className="Birth_report_section table">
            <hr></hr>
            <h6>-- Birth Report</h6>
            <table className="table  table-striped ">
              <tbody>
                <tr>
                  <td> Date</td>

                  <td> {this.state.birthReportDetails.date}</td>
                </tr>

                <tr>
                  <td> Doctor Name</td>

                  <td> {this.state.birthReportDetails.doctorname}</td>
                </tr>
                <tr>
                  <td> Status</td>

                  <td>
                    {this.state.birthReportDetails.status === ""
                      ? "---"
                      : this.state.birthReportDetails.status}
                  </td>
                </tr>
                <tr>
                  <td> Remarks</td>

                  <td>
                    {" "}
                    {this.state.birthReportDetails.remark === ""
                      ? "---"
                      : this.state.birthReportDetails.remark}
                  </td>
                </tr>
                <tr>
                  <td> Description</td>

                  <td>
                    {this.state.birthReportDetails.description === ""
                      ? "---"
                      : this.state.birthReportDetails.description}
                  </td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
        )}
        {this.props.reportDetails.deathreportid === "" ? null : (
          <div className="Death_report_section table">
            <hr></hr>
            <h6>-- Death Report</h6>
            <table className="table  table-striped">
              <tbody>
                <tr>
                  <td> Date</td>

                  <td> {this.state.detahReportDetails.date}</td>
                </tr>

                <tr>
                  <td> Doctor Name</td>

                  <td> {this.state.detahReportDetails.doctorname}</td>
                </tr>
                <tr>
                  <td> Status</td>

                  <td>
                    {this.state.detahReportDetails.status === ""
                      ? "---"
                      : this.state.detahReportDetails.status}
                  </td>
                </tr>
                <tr>
                  <td> Remarks</td>

                  <td>
                    {" "}
                    {this.state.detahReportDetails.remark === ""
                      ? "---"
                      : this.state.detahReportDetails.remark}
                  </td>
                </tr>
                <tr>
                  <td> Description</td>

                  <td>
                    {this.state.detahReportDetails.description === ""
                      ? "---"
                      : this.state.detahReportDetails.description}
                  </td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
        )}{" "}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    reportDetails: state.reportDetails,
  };
};
export default connect(mapStateToProps, null)(Reports);
