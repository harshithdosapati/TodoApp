import React, { Component } from 'react';
import Modal from '@mui/material/Modal';
import { TextField, InputLabel, Button, Box, Alert, IconButton, Paper, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { connect } from 'react-redux';
import { sendRequest, acceptRequest, getUsers } from '../actions/accountActions';

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

class ManageModal extends Component {
  state = {
    isOpen: false,
    email: '',
    error: null,
    prompt: null
  }

  componentDidMount(){
    this.props.getUsers();
  }

  componentDidUpdate(prevProps) {
    const {error, prompt} = this.props;
    if(error !== prevProps.error) {
      if(error.id === 'REQUEST_FAIL') {
        this.setState({error: error.msg.msg});
      } else {
        this.setState({error: null});
      }
    }

    if(prompt !== prevProps.prompt){
      this.setState({prompt: prompt.msg.msg});
    }
    if(prevProps.account_id !== this.props.account_id) {
      this.props.getUsers();
    }
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({error: null})
    this.setState({prompt: null})
    this.setState({isOpen: false})
  }


  onEmailChange = e => {
    this.setState({ email: e.target.value});
  }

  onAcceptClick = (id) => {
    const body = {account_id: id}
    this.props.acceptRequest(body);
  }


  onSubmit = e => {
    e.preventDefault();
    const email = this.state.email;
    const body = {email: email}

    this.props.sendRequest(body);
  }

  render() {
    const user = this.props.user;
    const accounts = user.accounts;
    const account_users = this.props.account_users;
    return (
      <div>
        <div style={{paddingRight:5}}>
          <Button color='inherit' variant='outlined' onClick={this.handleOpen}>Manage</Button>
        </div>
        <Modal
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {this.state.error ? <Alert severity='error'>{this.state.error}</Alert> :null}
            {this.state.prompt ? <Alert>{this.state.prompt}</Alert> :null}
            <form onSubmit={this.onSubmit} className='account_form'>
                <InputLabel className='input'>Send an Invite to Join Account {this.props.current_account}</InputLabel>
                <TextField
                  type='text'
                  name='email'
                  id='email'
                  placeholder='Email'
                  size='small'
                  style={{ width: "76%" }}
                  onChange={this.onEmailChange}
                />
                <Button type='submit' variant='contained' color='primary'>Invite</Button>
            </form>
            <div className='invites' style={{ marginTop: '20px', marginBottom: '10px' }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex' }}>
                Invites
              </Typography>
              {accounts.filter(account => account.accepted===false).length===0 ? 'No Invites' : ''}
              {accounts.filter(account => account.accepted===false).map(account => (
                <Paper key={account.id} className="todo_container" variant='outlined'>
                  <div className='textbox'>
                    <div className='todo_incomp' style={{ paddingLeft: 5 }}>
                      {account.name}
                    </div>
                  </div>
                  <IconButton
                    onClick={this.onAcceptClick.bind(this, account.id)}
                    color='primary'
                  >
                    <DoneIcon />
                  </IconButton>
                </Paper>
              ))}
            </div>
            <div className='user_list todo_incomp' style={{ paddingTop: '15px' }}>
              <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1}}>
                Existing Users in Account {this.props.current_account}
              </Typography>
              {account_users.map(account_user => (
                <Paper key={account_user._id} className="todo_container" variant='outlined' style={{ minHeight: '30px' }}>
                <div className='textbox'>
                  <div style={{ paddingLeft: '10px' }}>
                    {account_user.name}
                  </div>
                </div>
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
  error: state.error,
  prompt: state.prompt,
  account_users: state.account_users.users,
  account_id: state.account.account_id,
  current_account: state.account.account_name
});

export default connect(
  mapStateToProps,
  {sendRequest, acceptRequest, getUsers }
)(ManageModal);