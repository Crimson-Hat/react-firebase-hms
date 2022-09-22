import React, { Component } from "react";
import firebase from "../../firebase";
import "react-datepicker/dist/react-datepicker.css";
import NewPersonDetailsForm from "./newpersondetailsform";
import Service from "../../Service/firebase";
import "./addpersonDetails.css";

class AddPersonDetails extends Component {
  constructor() {
    super();

    this.state = {
      date: null,
      // startDate: new Date(),
      isLoading: false,
      htmlelement: <i className="fa fa-user fa-8x" aria-hidden="true"></i>,

      formData: {
        firstname: "",
        lastname: "",
        sex: "",
        age: "",
        bloodgroup: "",
        phonenumber: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        remark: "",
        birthdate: null,
      },
    };
  }

  handleSubmit = () => {
    this.setState({
      isLoading: true,
    });
    this.props.setCloseBtnAppear();
    
  };
    async onAddPerson(imageUrl) {
    let sendData = {
      ...this.state.formData,
      searchbyname: (
        this.state.formData.firstname + this.state.formData.lastname
      ).toLowerCase(),
      timeStamp: firebase.firestore.Timestamp.fromDate(new Date()),
    };
    if (this.props.collectionName === "patients") {
      sendData = {
        ...sendData,

        bedallotementid: "",
        operationreportid: "",
        birthreportid: "",
        deathreportid: "",
      };
    }

    const res = await Service.addData(
      sendData,
      this.props.collectionName,
      this.props.id
    );

    if (res === "success") {
      this.setState({
        isLoading: false,
      });

      this.props.handleSuccessDailog();
    } else {
      this.setState({
        isLoading: false,
      });
      this.props.handleErrorDailog();
    }
  }

  handleChange = (date) => {
    if (date !== null) {
      const birthDate = new Date(date);

      this.setState({
        date: date,
        formData: {
          ...this.state.formData,
          birthdate: `${
            birthDate.getMonth() + 1
          }/${birthDate.getDate()}/${birthDate.getFullYear()}`,
        },

        startDate: date,
      });
    } else {
      this.setState({
        date: date,
        formData: {
          ...this.state.formData,
          birthdate: date,
        },

        startDate: date,
      });
    }
  };
  onEdit = (e) => {
    const formData = this.state.formData;
    this.setState({
      formData: {
        ...formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    // if (this.state.imageAvatar === "") {
      // this.state.htmlelement = (
       // <div className="addpersonpage">
         //  <i className="fa fa-user fa-8x" aria-hidden="true"></i>
         //</div>
       //);
     //} else {
       //this.state.htmlelement = (
         //<div className="addpersonpage">
           //<img className="netimage" srcSet={this.state.imageAvatar} alt="" />
         //</div>
       //);
   //  }
    return this.state.isLoading ? (
      <div className="addpersonpage">
        <i className="fas fa-spinner fa-pulse fa-2x"></i>
      </div>
    ) : (
      <div className="addpersonpage">
        <div className="container main_section">
          <div className="row">
            <div className="col-sm">
              <NewPersonDetailsForm
                handleSubmit={this.handleSubmit}
                onEdit={this.onEdit}
                // startDate={this.state.startDate}
                date={this.state.date}
                htmlelement={this.state.htmlelement}
                handleChange={this.handleChange}
              ></NewPersonDetailsForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddPersonDetails;
