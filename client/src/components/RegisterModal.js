import React, { Component } from 'react';
import Modal from '@mui/material/Modal';
import { TextField, InputLabel, Button, Box, Alert } from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50.5%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

class RegisterModal extends Component {
  state = {
    isOpen: false,
    name: '',
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register : PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const {error, isAuthenticated} = this.props;
    if(error !== prevProps.error) {
      if(error.id === 'REGISTER_FAIL') {
        this.setState({msg: error.msg.msg});
      } else {
        this.setState({msg: null});
      }
    }

    if(this.state.isOpen) {
      if(isAuthenticated) {
        this.handleClose();
      }
    }
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.props.clearErrors();
    this.setState({isOpen: false})
  }

  onNameChange = e => {
    this.setState({ name: e.target.value});
  }

  onEmailChange = e => {
    this.setState({ email: e.target.value});
  }

  onPasswordChange = e => {
    this.setState({ password: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
    const {name, email, password} = this.state;

    const newUser = {
      name,
      email,
      password
    };

    this.props.register(newUser);
  }

  render() {
    return (
      <div>
        <div style={{paddingRight:5}}>
          <Button color='inherit' variant='outlined' onClick={this.handleOpen}>Register</Button>
        </div>
        <Modal
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {this.state.msg ? <Alert severity='error'>{this.state.msg}</Alert> :null}
            <form onSubmit={this.onSubmit} className='register_form'>
                <InputLabel className='input'>Name</InputLabel>
                <TextField
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  size='small'
                  onChange={this.onNameChange}
                />
                <InputLabel className='input'>Email</InputLabel>
                <TextField
                  type='text'
                  name='email'
                  id='email'
                  placeholder='Email'
                  size='small'
                  onChange={this.onEmailChange}
                />
                <InputLabel className='input'>Password</InputLabel>
                <TextField
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  size='small'
                  onChange={this.onPasswordChange}
                />
                <Button type='submit' variant='contained' color='primary'>Register</Button>
            </form>
          </Box>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);