import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import FindUser from "./FindUser";
import UserList from "./UserList";
import Stepper from "./Stepper";

class CreateSprint extends React.Component {
  state = {
    newName: "",
    newID: "",
    checked: [],
    activeStep: 0
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  updateChecked = checked => {
    this.setState({ checked });
  };

  getSteps = () => {
    return ["Choose a workspace name", "Invite users", "Create!"];
  };

  handleNext = () => {
    if (this.state.activeStep + 1 === this.getSteps().length) {
      this.props.functions.create.workspace({
        name: this.state.newName,
        users: this.state.checked
      });
      this.props.callback();
    } else {
      this.setState({
        activeStep: this.state.activeStep + 1
      });
    }
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField
              id="name"
              name="name"
              label="Workspace Name"
              required={true}
              onChange={this.handleChange("newName")}
              margin="normal"
              variant="outlined"
              inputProps={{ name: this.state.newName }}
            />
          </div>
        );
      case 1:
        return (
          <div>
            <UserList
              checkable={true}
              updateChecked={this.updateChecked}
              users={this.props.globals.users}
            />
            <FindUser functions={this.props.functions} />
          </div>
        );
      case 2:
        return (
          <div>
            <Typography>{`Your new workspace: ${
              this.state.newName
            }`}</Typography>
            <Typography>{"Users"}</Typography>
            <UserList
              users={this.props.globals.users}
              uids={this.state.checked}
            />
          </div>
        );
    }
  };

  render() {
    const steps = this.getSteps();
    return (
      <Dialog onClose={this.props.handleClose} open={this.props.open}>
        <DialogTitle id="Create Workspace">Create Workspace</DialogTitle>
        <Stepper
          getSteps={this.getSteps}
          getStepContent={this.getStepContent}
          continue={() =>
            this.state.activeStep === 0 && this.state.newName === ""
          }
          finish={() => {
            this.props.functions.create.workspace({
              name: this.state.newName,
              users: this.state.checked
            });
            this.props.handleClose();
          }}
          cancel={this.props.handleClose}
        />
      </Dialog>
    );
  }
}

export default CreateSprint;
