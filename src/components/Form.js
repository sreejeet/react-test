import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      dob: '',
      phone: '',
      err_name: '',
      err_email: '',
      err_dob: '',
      err_phone: '',
      submit_success: false,
    }
  }


  render() {

    const fireRedirect = this.state.submit_success

    return (
      <Container maxWidth="xs" style={{ padding: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h3" noWrap>
            User form
          </Typography>
        </div>
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth
                    error={this.state.err_name !== undefined && this.state.err_name !== ''}
                    helperText={this.state.err_name} type="text" label="Name" name="name" size="small" variant="outlined"
                    value={this.state.name} onChange={this.onNameChange.bind(this)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth
                    error={this.state.err_email !== undefined && this.state.err_email !== ''}
                    helperText={this.state.err_email} type="email" label="E-Mail" name="email" size="small" variant="outlined"
                    value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField InputLabelProps={{ shrink: true }} fullWidth
                    error={this.state.err_dob !== undefined && this.state.err_dob !== ''}
                    helperText={this.state.err_dob} type="date" label="Date of Birth" name="dob" size="small" variant="outlined"
                    value={this.state.dob} onChange={this.onDobChange.bind(this)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth
                    error={this.state.err_phone !== undefined && this.state.err_phone !== ''}
                    helperText={this.state.err_phone} type="number" label="Phone" name="phone" size="small" variant="outlined"
                    value={this.state.phone} onChange={this.onPhoneChange.bind(this)} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        {fireRedirect && (<Redirect to='/' />)}
      </Container>
    );
  }

  onNameChange(event) {
    this.setState({ name: event.target.value.trimLeft() })
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  onDobChange(event) {
    this.setState({ dob: event.target.value })
  }

  onPhoneChange(event) {
    this.setState({ phone: event.target.value })
  }

  handleSubmit(event) {

    event.preventDefault();

    // Check user over 18
    // 18 years in milliseconds is 568036800000
    if (Date.now() - Date.parse(this.state.dob) < 568036800000) {
      this.setState({ err_dob: 'You must be over 18 years old.' })
      return
    }

    this.setState({
      err_name: '',
      err_email: '',
      err_dob: '',
      err_phone: '',
    })

    axios.post(
      '//whispering-peak-79518.herokuapp.com/api/userdata/',
      this.state,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    ).then(response => {
      this.resetErrors()
      this.setState({ submit_success: true })
      window.location.pathname = '/user-list'
    }).catch((err) => {
      this.setState({
        err_name: err.response.data.name,
        err_email: err.response.data.email,
        err_dob: err.response.data.dob,
        err_phone: err.response.data.phone,
      })
    })
  }

  resetErrors() {
    this.setState({
      err_name: '',
      err_email: '',
      err_dob: '',
      err_phone: '',
    })
  }

}