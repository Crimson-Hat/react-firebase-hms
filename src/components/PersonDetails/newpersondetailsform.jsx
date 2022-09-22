import React, { Component } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./newpersondetailsform.css";

class NewPersonDetailsForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="first_section">
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationDefault01">First name</label>
              <input
                name="firstname"
                type="text"
                className="form-control"
                id="firstname"
                onChange={this.props.onEdit}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="validationDefault02">Last name</label>
              <input
                name="lastname"
                type="text"
                className="form-control"
                id="lastname"
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
                id="sex"
                onChange={this.props.onEdit}
                required
              >
                <option></option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="validationDefault11">Age</label>
              <input
                name="age"
                type="number"
                className="form-control"
                id="age"
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
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={this.props.date}
                  onChange={this.props.handleChange}
                  autoComplete="off"
                  format="MM/dd/yyyy"
                />
              </MuiPickersUtilsProvider>
              {/* <DatePicker
              name="birthdate"
              selected={this.props.startDate}
              className="datepicker form-control"
              value={this.props.date}
              onChange={this.props.handleChange}
              autoComplete="off"
            /> */}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="validationDefault13">Blood Group</label>
              <select
                name="bloodgroup"
                type="text"
                className="form-control"
                id="bloodgroup"
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

              {/* <input
              name="bloodgroup"
              type="text"
              className="form-control"
              id="bloodgroup"
              onChange={this.props.onEdit}
            /> */}
            </div>
          </div>

          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label htmlFor="validationDefault03">Mobile</label>
              <input
                name="phonenumber"
                type="number"
                className="form-control"
                id="phonenumber"
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
                id="email"
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
                id="address"
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
                id="city"
                onChange={this.props.onEdit}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationDefault07">State</label>
              <select
                name="state"
                className="custom-select"
                id="state"
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
                id="zip"
                onChange={this.props.onEdit}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="validationDefault09">Remarks</label>
            <textarea
              name="remarks"
              className="form-control"
              id="remark"
              onChange={this.props.onEdit}
              rows="3"
            ></textarea>
          </div>
        </div>

        <div className="container">
          <div className="row second_section">
            <div className="clo-sm-6">
              <div className="profileimage">{this.props.htmlelement}</div>
            </div>

            <div className="col-sm-6 btn_section">
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
          </div>
        </div>
        <button className="btn btn-success savebtn" type="submit">
          Save
        </button>
      </form>
    );
  }
}

export default NewPersonDetailsForm;
