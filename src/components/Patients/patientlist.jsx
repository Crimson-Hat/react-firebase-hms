import React, { Component } from "react";
import "./patientlist.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setpersonDetails,
  setReportDetails,
} from "../../actions/setpersondetailsaction";
import FormPrompt from "../DailogBoxes/formprompt";
import AddPersonDetails from "../PersonDetails/addpersondetails";
import AlertDialogBox from "../DailogBoxes/alertdailogbox";
import ConfirmDialogBox from "../DailogBoxes/confirmdailogbox";
import ErorrDialogBox from "../DailogBoxes/errordaologbox";
import Service from "../../Service/firebase";

class PatienList extends Component {
  constructor() {
    super();
    this.state = {
      serachText: "",
      isLoading: true,
      limit: 10,

      isLoadMoredata: false,
      isCloseBtnAppear: true,
      isDeleting: false,

      totalNumOfPatient: null,
      noMoreDataText: "",

      openFormDailog: false,
      openAlertDailog: false,
      openErrorDailog: false,
      openConfirmDailog: false,

      patientlist: [],
      isSearching: false,
      isSearchDataShow: false,

      selectedPatientName: "",
      selectedPatientId: "",
    };
  }
  componentDidMount() {
    this.onSetTotalNumOfPatient();
    this.onFetchData(this.state.limit);
  }

  showMore = () => {
    if (this.state.limit <= this.state.totalNumOfPatient) {
      const limit = this.state.limit + 10;
      this.setState({ limit: limit });
      this.onFetchData(limit);
    } else {
      this.setState({
        noMoreDataText: "No More Patients",
      });
    }
  };
  async onSetTotalNumOfPatient() {
    this.setState({ isLoading: true });
    const res = await Service.getTotalNumOfPerson("patients");
    if (res === "error") {
      console.log("error");
      this.setState({ isLoading: false });
    } else {
      this.setState({ totalNumOfPatient: res, isLoading: false });
    }
  }

  async onFetchData(limit) {
    this.setState({ isLoadMoredata: true });

    const fetchedDataList = await Service.getData("patients", limit);

    if (fetchedDataList.length !== 0) {
      this.setState({
        patientlist: fetchedDataList,
        isLoadMoredata: false,
        isLoading: false,
      });
    } else {
      this.setState({
        patientlist: fetchedDataList,
        isLoadMoredata: false,
        isLoading: false,
      });
    }
  }

  handleOnDelete = (patientname, id) => {
    this.setState({
      selectedPatientName: patientname,
      selectedPatientId: id,
      openConfirmDailog: true,
    });
  };
  deleteData = async () => {
    this.setState({ isDeleting: true });
    const res = await Service.deleteData(
      "patients",
      this.state.selectedPatientId
    );
    if (res === "success") {
      this.setState({
        isDeleting: false,
        openConfirmDailog: false,
      });
      window.location.reload(false);
    } else {
      this.setState({
        isDeleting: false,
      });
      this.handleErrorDailog();
    }
  };
  handleSeach = async () => {
    if (this.state.serachText === "" || null) {
      window.location.reload(false);
    } else {
      this.setState({
        isSearching: true,
        isSearchDataShow: true,
      });

      const searchText = this.state.serachText.toLowerCase().replace(/\s/g, "");

      const resultPatientlist = await Service.getSearchRes(
        "patients",
        searchText
      );
      if (resultPatientlist === "error") {
        this.setState({
          isSearching: false,
          openErrorDailog: true,
        });
      } else {
        this.setState({
          patientlist: resultPatientlist,
          isSearching: false,
        });
      }
    }
  };

  handleSuccessDailog = () => {
    this.setState({
      openFormDailog: false,
      openAlertDailog: true,
    });
  };
  handleErrorDailog = () => {
    this.setState({
      openFormDailog: false,
      openConfirmDailog: false,
      openErrorDailog: true,
    });
  };
  closeFormDailog = () => {
    this.setState({
      openFormDailog: false,
    });
  };
  closeAlertDailog = () => {
    this.setState({
      openAlertDailog: false,
    });
    window.location.reload(false);
  };
  closeErrorDailog = () => {
    this.setState({
      openErrorDailog: false,
    });
  };
  closeConfirmDailog = () => {
    this.setState({
      openConfirmDailog: false,
    });
  };
  setCloseBtnAppear = () => {
    this.setState({
      isCloseBtnAppear: false,
    });
  };

  render() {
    let count = 0;
    return this.state.isLoading ? (
      <div className="patientlistpage">
        <i className="fas fa-spinner fa-pulse fa-2x "></i>
      </div>
    ) : (
      <div className="patientlistpage">
        <div className="main_section">
          <ConfirmDialogBox
            openDailog={this.state.openConfirmDailog}
            onSetOpenDailog={this.closeConfirmDailog}
            handleConfirmOkBtn={this.deleteData}
            isLoading={this.state.isDeleting}
            title="Delete"
            des={
              "Are you sure to delete " +
              this.state.selectedPatientName +
              " " +
              "details"
            }
          ></ConfirmDialogBox>
          <AlertDialogBox
            openDailog={this.state.openAlertDailog}
            onSetOpenDailog={this.closeAlertDailog}
            title="Added"
            des="New Patient has been added sccessfully"
          ></AlertDialogBox>
          <ErorrDialogBox
            openDailog={this.state.openErrorDailog}
            onSetOpenDailog={this.closeErrorDailog}
            title="Error"
            des="Someting went wrong. Try again"
          ></ErorrDialogBox>

          <FormPrompt
            openDailog={this.state.openFormDailog}
            title="Add New Patient"
            onSetOpenDailog={this.closeFormDailog}
            isCloseBtnAppear={this.state.isCloseBtnAppear}
          >
            <AddPersonDetails
              setCloseBtnAppear={this.setCloseBtnAppear}
              handleSuccessDailog={this.handleSuccessDailog}
              handleErrorDailog={this.handleErrorDailog}
              collectionName="patients"
              id="patientid"
            ></AddPersonDetails>
          </FormPrompt>

          <div className="topheader">
            <ul>
              <li>
                <i
                  className="fa fa-arrow-circle-o-right fa-2x"
                  aria-hidden="true"
                ></i>
              </li>
              <li>
                <h5>Patient</h5>
              </li>
            </ul>
          </div>
          <hr />
          <div className="top_section">
            <div className="wrap">
              <ul>
                <li>
                  <div className="search">
                    <input
                      type="text"
                      className="searchTerm"
                      placeholder="Search patient by full name"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          this.handleSeach();
                        }
                      }}
                      onChange={(e) => {
                        this.setState({
                          serachText: e.target.value,
                        });
                      }}
                    />

                    <button
                      onClick={this.handleSeach}
                      type="submit"
                      className="searchButton"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </li>
                <li style={{ fontSize: "12px" }}> #</li>
                <li tyle={{ fontSize: "12px" }}>
                  {this.state.patientlist.length}{" "}
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="btn btn-warning"
              onClick={() => {
                this.setState({
                  openFormDailog: true,
                });
              }}
            >
              + Add Patient
            </button>
          </div>
          <table className="table table-striped">
            <thead className="thead tablehead">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Profile</th>
                <th scope="col">Name</th>
                <th scope="col">Sex</th>
                <th scope="col">Age</th>
                <th scope="col">Blood Group</th>
                <th scope="col">Mobile</th>
                {/* <th scope="col">Email</th> */}
                <th scope="col">City</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Option</th>
              </tr>
            </thead>
            {this.state.isSearching ? (
              <i className="fas fa-spinner fa-pulse fa-2x "></i>
            ) : this.state.patientlist.length === 0 ? (
              <tbody>
                <tr>
                  <td>No Patient Found</td>
                </tr>
              </tbody>
            ) : (
              <tbody className="tablebody">
                {this.state.patientlist &&
                  this.state.patientlist.map((p) => {
                    count++;
                    let date = new Date(p.timeStamp.toDate());
                    const createdTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                    const createdDate = `${date.getDate()}/${
                      date.getMonth() + 1
                    }/${date.getFullYear()}`;

                    return (
                      <tr key={p.patientid}>
                        <td className="align-middle">{count}</td>
                        
                        <td className="align-middle">
                          {p.firstname + " " + p.lastname}
                        </td>
                        <td className="align-middle">{p.sex}</td>
                        <td className="align-middle">
                          {p.age === "" ? "N/A" : p.age}
                        </td>
                        <td className="align-middle">
                          {p.bloodgroup === "" ? "N/A" : p.bloodgroup}
                        </td>
                        <td className="align-middle">
                          {" "}
                          {p.phonenumber === "" ? "N/A" : p.phonenumber}
                        </td>
                        {/* <td className="align-middle">
                          {" "}
                          {p.email == "" ? "N/A" : p.email}
                        </td> */}
                        <td className="align-middle">
                          {p.city === "" ? "N/A" : p.city}
                        </td>
                        <td className="align-middle">
                          {createdDate === "" ? "N/A" : createdDate}
                        </td>
                        <td className="align-middle">
                          {createdTime === "" ? "N/A" : createdTime}
                        </td>
                        <td className="align-middle">
                          <Link to="editpersondetails">
                            <button
                              onClick={async () => {
                                const sendData = {
                                  ...p,
                                  collectionName: "patients",
                                  personId: p.patientid,
                                };
                                const reportDeatils = {
                                  bedallotementid: p.bedallotementid,
                                  operationreportid: p.operationreportid,
                                  birthreportid: p.birthreportid,
                                  deathreportid: p.deathreportid,
                                };

                                this.props.setOnPatientDetails(sendData);
                                this.props.setOnReportDetails(reportDeatils);
                              }}
                              type="button"
                              className="btn btn-success"
                            >
                              <i className="fa fa-edit" aria-hidden="true"></i>
                            </button>
                          </Link>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                              this.handleOnDelete(
                                p.firstname + " " + p.lastname,
                                p.patientid
                              );
                            }}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            )}
          </table>

          <div className="loadmoredatasection">
            {this.state.isLoadMoredata ? (
              <i className="fas fa-spinner fa-pulse fa-2x loadmoredataspinner"></i>
            ) : (
              <div className="nomoredatatext">{this.state.noMoreDataText}</div>
            )}
            {this.state.patientlist.length === 0 ? null : this.state
                .isSearchDataShow ? null : (
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => this.showMore()}
              >
                Show More
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDisptachToProps = (dispatch) => {
  return {
    setOnPatientDetails: (p) => {
      dispatch(setpersonDetails(p));
    },
    setOnReportDetails: (p) => {
      dispatch(setReportDetails(p));
    },
  };
};

export default connect(null, mapDisptachToProps)(PatienList);
