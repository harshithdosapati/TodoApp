import React, { Component } from 'react';
import Modal from '@mui/material/Modal';
import { TextField, InputLabel, Button, Box, Alert, Paper, Typography } from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setDefaultAccount, setAccount, createAccount } from '../actions/accountActions';

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

class AccountModal extends Component {
  state = {
    isOpen: false,
    account_name: null,
    prompt : null
  }

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.setDefaultAccount(this.props.user.default_account.id, this.props.user.default_account.name);
  }

  componentDidUpdate(prevProps) {
    const  prompt = this.props.prompt;

    if(prompt !== prevProps.prompt){
      this.setState({prompt: prompt.msg.msg});
    }
  
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  onAccountNameChange = e => {
    this.setState({ account_name: e.target.value});
  }

  SetCurrentAccount = (id, name) => {
    this.props.setAccount(id, name);
    this.handleClose();
  }

  onSubmit = e => {
    e.preventDefault();
    const account_name = this.state.account_name;
    const body = {account_name: account_name}

    this.props.createAccount(body);
  }


  render() {
    const user = this.props.user;
    const accounts = user.accounts;
    return (
      <div>
        <Button color='inherit' variant='outlined' onClick={this.handleOpen}>Accounts</Button>
        <Modal
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          {this.state.prompt ? <Alert>{this.state.prompt}</Alert> :null}
          <form onSubmit={this.onSubmit} className='account_form'>
                <InputLabel className='input'>Create New Account</InputLabel>
                <TextField
                  type='text'
                  name='account'
                  id='account'
                  placeholder='Account Name'
                  style={{ width: "76%" }}
                  size='small'
                  onChange={this.onAccountNameChange}
                />
                <Button type='submit' variant='contained' color='primary'>Create</Button>
            </form>
            <div style={{ paddingTop: '30px' }}>
              <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1}}>
                Select Account
              </Typography>
              {accounts.filter(account => account.accepted === true).map(account => (
                <Paper>
                  <Button sx={{ textTransform: 'none' }} style={{ minWidth: '400px' }} variant='outlined' key={account.id} onClick={this.SetCurrentAccount.bind(this, account.id, account.name)}>{account.name}</Button>
                </Paper>
              ))}
            </div>
            
          </Box>
          
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  prompt: state.prompt
});

export default connect(
  mapStateToProps,
  { setDefaultAccount, setAccount, createAccount}
)(AccountModal);