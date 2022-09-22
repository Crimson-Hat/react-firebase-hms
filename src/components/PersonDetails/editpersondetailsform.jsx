import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "./editpersondetailsform.css";
import Reports from "./reports";

class EditPersonDetailsForm extends Component {
  render() {
    return (
      <div className="editd_person_details_formpage">
        <div className="container main_section">
          <div className="topheader">
            <ul>
              <li>
                <i
                  className="fa fa-arrow-circle-o-right fa-2x"
                  aria-hidden="true"
                ></i>
              </li>
              <li>
                <h5>{this.props.personDetails.collectionName}</h5>
              </li>
            </ul>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-8 first_section">
              <form onSubmit={this.props.handleSubmit}>
                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="validationDefault01">First name</label>
                    <input
                      name="firstname"
                      type="text"
                      className="form-control"
                      id="validationDefault01"
                      required
                      value={this.props.personDetails.firstname}
                      onChange={this.props.onEdit}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="validationDefault02">Last name</label>
                    <input
                      name="lastname"
                      type="text"
                      className="form-control"
                      id="validationDefault02"
                      value={this.props.personDetails.lastname}
                      onChange={this.props.onEdit}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="validationDefault10">Sex</label>
                    <select
                      name="sex"
                      className="custom-select"
                      id="validationDefault10"
                      value={this.props.personDetails.sex}
                      onChange={this.props.onEdit}
                      required
                    >
                      <option></option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>other</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="validationDefault11">Age</label>
                    <input
                      name="age"
                      type="number"
                      className="form-control"
                      id="validationDefault11"
                      value={this.props.personDetails.age}
                      onChange={this.props.onEdit}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="validationDefault12">Birth Date</label>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        style={{
                          padding: "0px 10px",
                          border: "1px solid rgb(197, 197, 197)",
                        }}
                        name="birthdate"
                        className="  form-control"
                        // selected={this.props.startDate}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        value={this.props.date}
                        onChange={this.props.handleChange}
                        autoComplete="off"
                        format="MM/dd/yyyy"
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="validationDefault13">Blood Group</label>
                    <select
                      name="bloodgroup"
                      type="text"
                      className="form-control"
                      id="bloodgroup"
                      value={this.props.personDetails.bloodgroup}
                      onChange={this.props.onEdit}
                    >
                      <option></option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="validationDefault03">Mobile</label>
                    <input
                      name="phonenumber"
                      type="number"
                      className="form-control"
                      id="validationDefault03"
                      value={this.props.personDetails.phonenumber}
                      onChange={this.props.onEdit}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="validationDefault04">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="validationDefault04"
                      value={this.props.personDetails.email}
                      onChange={this.props.onEdit}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="validationDefault05">Address</label>
                    <input
                      name="address"
                      type="text"
                      className="form-control"
                      id="validationDefault05"
                      value={this.props.personDetails.address}
                      onChange={this.props.onEdit}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="validationDefault06">City</label>
                    <input
                      name="city"
                      type="text"
                      className="form-control"
                      id="validationDefault06"
                      value={this.props.personDetails.city}
                      onChange={this.props.onEdit}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault07">State</label>
                    <select
                      name="state"
                      className="custom-select"
                      id="validationDefault07"
                      value={this.props.personDetails.state}
                      onChange={this.props.onEdit}
                    >
                      <option></option>
                      <option>CG</option>
                      <option>MP</option>
                      <option>UP</option>
                    </select>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault08">Zip</label>
                    <input
                      name="zip"
                      type="text"
                      className="form-control"
                      id="validationDefault85"
                      value={this.props.personDetails.zip}
                      onChange={this.props.onEdit}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="validationDefault09">Remarks</label>
                  <textarea
                    name="remarks"
                    className="form-control"
                    id="validationDefault09"
                    rows="3"
                    value={this.props.personDetails.remarks}
                    onChange={(e) => {
                      this.props.onEdit(e);
                    }}
                  ></textarea>
                </div>

                <button className="btn btn-success update_btn" type="submit">
                  Update
                </button>
              </form>
            </div>
            <div className="col-sm-4 second_section">
              <div className="profileimage">
                {this.props.profileHtmlelEment}
              </div>
              <div className="btn_section">
                <label htmlFor="files" className="selectimage">
                  Upload Image
                </label>
                <input
                  name="avatarimage"
                  id="files"
                  type="file"
                  onChange={this.props.onImageChange}
                />
                <button
                  type="button"
                  className="removebutton"
                  onClick={this.props.onImageRemove}
                >
                  {" "}
                  Remove
                </button>
              </div>

              <input id="files" type="file" onChange={this.onImageChange} />
            </div>
          </div>
          {this.props.personDetails.collectionName === "patients" ? (
            <div className="thrid_section">
              <Reports personDetails={this.props.personDetails}></Reports>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default EditPersonDetailsForm;
