import React, { Component, Fragment } from "react";
import { connect  } from 'react-redux';
import { logout } from '../actions/authActions';
import { PropTypes } from 'prop-types';
import { Button } from "@mui/material";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  }
  render() {
    return (
      <Fragment>
        <Button color="inherit" onClick={this.props.logout}>
          Logout
        </Button>
      </Fragment>
    )
  }
}


export default connect(null, { logout }) (Logout)