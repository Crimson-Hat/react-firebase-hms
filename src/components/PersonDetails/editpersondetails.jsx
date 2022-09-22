import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { setpersonDetails } from "../../actions/setpersondetailsaction";
import AlertDialogBox from "../DailogBoxes/alertdailogbox";
import Service from "../../Service/firebase";
import ErorrDialogBox from "../DailogBoxes/errordaologbox";
import EditPersonDetailsForm from "./editpersondetailsform";

class EditPersonDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.personDetails.birthdate,
      startDate: new Date(this.props.personDetails.birthdate),
      image: "",
      profileHtmlelEment: (
        <i className="fa fa-user fa-8x" aria-hidden="true"></i>
      ),
      isLoading: false,
      openAlertDailog: false,
      openErrorDailog: false,

      personDetails: {
        address: this.props.personDetails.address,
        age: this.props.personDetails.age,
        birthdate: this.props.personDetails.birthdate,
        bloodgroup: this.props.personDetails.bloodgroup,
        city: this.props.personDetails.city,
        email: this.props.personDetails.email,
        firstname: this.props.personDetails.firstname,
        imgaeurl: this.props.personDetails.imgaeurl,
        lastname: this.props.personDetails.lastname,
        phonenumber: this.props.personDetails.phonenumber,
        sex: this.props.personDetails.sex,
        state: this.props.personDetails.state,
        zip: this.props.personDetails.zip,
        collectionName: this.props.personDetails.collectionName,
      },
    };
  }

  handleSubmit = () => {
    this.setState({
      isLoading: true,
    });

    this.handleImageForUpload();
  };
  handleImageForUpload = () => {
    const image = this.state.image;

    if (this.state.image !== "") {
      this.onUploadImage(image);
    } else {
      this.onUpdate();
    }
  };
  onUploadImage = async (image) => {
    const url = await Service.uploadImage(image);
    if (url !== "") {
      this.setState({
        personDetails: {
          ...this.state.personDetails,
          imgaeurl: url,
        },
      });

      this.onUpdate();
    }
  };
  async onUpdate() {
    const sendData = {
      ...this.state.personDetails,
      searchbyname: (
        this.state.personDetails.firstname + this.state.personDetails.lastname
      ).toLowerCase(),
    };
    const res = await Service.updateData(
      sendData,
      this.props.personDetails.collectionName,
      this.props.personDetails.personId
    );
    if (res === "success") {
      this.setState({
        isLoading: false,
        openAlertDailog: true,
        alertDailogBoxTitle: "Update",
        alertDailogBoxDes: "successfully updated",
      });

      let personDetails = this.state.personDetails;
      personDetails = {
        ...this.state.personDetails,
        collectionName: this.props.personDetails.collectionName,
        personId: this.props.personDetails.personId,
      };

      this.props.setOnpersonDetails(personDetails);
    } else {
      this.setState({
        isLoading: false,
      });
      this.handleErrorDailog();
    }
  }
  handleErrorDailog = () => {
    this.setState({
      openErrorDailog: true,
    });
  };
  closeErrorDailog = () => {
    this.setState({
      openErrorDailog: false,
    });
  };
  handleChange = (date) => {
    if (date !== null) {
      const birthDate = new Date(date);

      this.setState({
        personDetails: {
          ...this.state.personDetails,
          birthdate: `${
            birthDate.getMonth() + 1
          }/${birthDate.getDate()}/${birthDate.getFullYear()}`,
        },
        date: date,
        startDate: date,
      });
    } else {
      this.setState({
        personDetails: {
          ...this.state.personDetails,
          birthdate: date,
        },
        date: date,
        startDate: date,
      });
    }
  };
  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        image: event.target.files[0],
      });
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          personDetails: {
            ...this.state.personDetails,
            imgaeurl: e.target.result,
          },
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  onImageRemove = () => {
    this.setState({
      personDetails: {
        ...this.state.personDetails,
        imgaeurl: "",
      },
      image: "",
    });
  };

  onEdit = (e) => {
    let personDetails = this.state.personDetails;

    this.setState({
      personDetails: {
        ...this.state.personDetails,
        [e.target.name]: e.target.value,
      },
    });
    console.log(personDetails);
  };
  handleSetOpenDailog = () => {
    this.setState({
      setAlertOpenDailog: false,
      openAlertDailog: false,
    });
  };
 render()
    {
//    if (this.state.personDetails.imgaeurl === "") {
  //    this.state.profileHtmlelEment = (
    //    <div className="editpersondetailspage">
      //    <i className="fa fa-user fa-8x" aria-hidden="true"></i>
        //</div>
     // );
    //} else {
      //this.state.profileHtmlelEment = (
        //<div className="editpersondetailspage">
          //<img
            //className="netimage"
            //srcSet={this.state.personDetails.imgaeurl}
            //alt=""
          ///>
        //</div>
      //);
   // }

    return this.state.isLoading ? (
      <div className="editpersondetailspage">
        <i
          className="fas fa-spinner fa-pulse fa-4x"
          style={{ position: "fixed", top: "50%", left: "50%" }}
        ></i>
      </div>
    ) : (
      <div className="editpersondetailspage">
        <AlertDialogBox
          openDailog={this.state.openAlertDailog}
          setOpenDailog={this.state.setOpenAlertDailog}
          onSetOpenDailog={this.handleSetOpenDailog}
          title="Update"
          des="successfully updated"
        ></AlertDialogBox>
        <ErorrDialogBox
          openDailog={this.state.openErrorDailog}
          onSetOpenDailog={this.closeErrorDailog}
          title="Error"
          des="Someting went wrong. Try again"
        ></ErorrDialogBox>
        <EditPersonDetailsForm
          handleSubmit={this.handleSubmit}
          onEdit={this.onEdit}
          date={this.state.date}
          handleChange={this.handleChange}
          personDetails={this.state.personDetails}
          profileHtmlelEment={this.state.profileHtmlelEment}
          onImageRemove={this.onImageRemove}
          onImageChange={this.onImageChange}
          handleImageForUpload={this.handleImageForUpload}
        ></EditPersonDetailsForm>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    personDetails: state.personDetails,
  };
};
const mapDisptachToProps = (dispatch) => {
  return {
    setOnpersonDetails: (p) => {
      dispatch(setpersonDetails(p));
    },
  };
};
export default connect(mapStateToProps, mapDisptachToProps)(EditPersonDetails);
