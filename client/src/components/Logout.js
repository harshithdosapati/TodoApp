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
        <div style={{ paddingLeft: 5 }}>
          <Button color="inherit" variant="outlined" onClick={this.props.logout}>
            Logout
          </Button>
        </div>
      </Fragment>
    )
  }
}


export default connect(null, { logout }) (Logout)