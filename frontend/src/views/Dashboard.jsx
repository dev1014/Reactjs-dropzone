import React, { Component } from "react";
import ReactDOM from "react-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dropzone from "react-dropzone";
import axios from "axios";

import "./Dashboard.css";

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: "local",
      partnerId: "",
      businessId: "",
      apiKey: "",
      filePath: "",
      files: []
    };

    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handlePartnerIdInputChange = this.handlePartnerIdInputChange.bind(this);
    this.handleBusinessIdInputChange = this.handleBusinessIdInputChange.bind(this);
    this.handleApiKeyInputChange = this.handleApiKeyInputChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
  }

  handleRadioChange = e => {
    this.setState({
      radioValue: e.target.value
    });
  };

  handlePartnerIdInputChange = e => {
    this.setState({
      partnerId: e.target.value
    });
  };

  handleBusinessIdInputChange = e => {
    this.setState({
      businessId: e.target.value
    });
  };

  handleApiKeyInputChange = e => {
    this.setState({
      apiKey: e.target.value
    });
  };

  handleSubmitButton = async () => {
    var formData = {
      environment: this.state.radioValue,
      partnerId: this.state.partnerId,
      businessId: this.state.businessId,
      apiKey: this.state.apiKey,
      filePath: this.state.filePath
    };
    console.log("button is clicked, here is formData: ", formData);

    let res = await axios.post(`http://localhost:3000/createfile`, {
      formData
    });
    console.log("here is res: ", res);
  };

  onDrop = files => {
    if (files.length > 0) {
      this.setState({
        files: files,
        filePath: files[0].path
      }),
        console.log("this.filePath: ", this.state.files);
    }
  };

  onDropRejected = files => {
    //   console.log("drop rejected: ", files);
    alert("File type must be zip");
  };

  render() {
    return (
      <div className="container">
        <div className="row text-center mt-5">
          <div className="col-4">
            <FormControl component="fieldset" className="radioButton">
              <FormLabel component="legend">Environment</FormLabel>
              <RadioGroup
                aria-label="environment"
                name="environment"
                className="radiogroup"
                value={this.state.radioValue}
                onChange={this.handleRadioChange}
              >
                <FormControlLabel
                  value="local"
                  control={<Radio color="primary" />}
                  label="LOCAL"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="lab"
                  control={<Radio color="primary" />}
                  label="LAB"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="int"
                  control={<Radio color="primary" />}
                  label="INT"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="prod"
                  control={<Radio color="primary" />}
                  label="PROD"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="col-4">
            <FormControl component="fieldset" className="textbox">
              <FormLabel component="legend">Input Field</FormLabel>
              <TextField
                id="partnerId"
                label="Partner ID"
                placeholder="Enter Partner ID"
                className="partnerId"
                margin="normal"
                value={this.state.partnerId}
                onChange={this.handlePartnerIdInputChange}
              />
              <TextField
                id="businessId"
                label="Business ID"
                placeholder="Enter Business ID"
                className="businessId"
                margin="normal"
                value={this.state.businessId}
                onChange={this.handleBusinessIdInputChange}
              />
              <TextField
                id="apiKey"
                label="API KEY"
                placeholder="Enter API KEY"
                className="apiKey"
                margin="normal"
                value={this.state.apiKey}
                onChange={this.handleApiKeyInputChange}
              />
            </FormControl>
          </div>
          <div className="col-4">
            <FormControl component="fieldset" className="textbox">
              <FormLabel component="legend">Drop zip file</FormLabel>
              <Dropzone
                onDrop={this.onDrop}
                accept="application/x-zip-compressed"
                onDropRejected={this.onDropRejected}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    {this.state.files.length > 0 && (
                      <p> {this.state.files[0].path} </p>
                    )}
                    {this.state.files.length == 0 && (
                      <p>
                        Drag and drop some files here, or click to select files
                      </p>
                    )}
                  </div>
                )}
              </Dropzone>
            </FormControl>
          </div>
        </div>
        <div className="row text-center mt-5">
          <div className="col-12">
            <Button
              variant="contained"
              className="submit"
              onClick={this.handleSubmitButton}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
