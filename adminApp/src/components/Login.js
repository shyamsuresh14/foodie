import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Foodie from '../assets/foodapp_icon.png';

class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }
  handleChange = (event) => {
    console.log(event.target.id === "email");
    if(event.target.id === "email") this.setState({email: event.target.value});
    else if(event.target.id === "password") this.setState({password: event.target.value});
  }
  handleSubmit = (event) => {
    if(this.state.password === "admin123"){
      sessionStorage.setItem("username", this.state.email.split("@")[0]);
      window.location = "/";
    }
    event.preventDefault();
  }
  render(){
    const { theme } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{marginTop: theme.spacing(8),display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
          <Avatar style={{margin: theme.spacing(1),backgroundColor: "lightgreen"}} src={Foodie} sizes="large"/>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form  style={{width: '100%', marginTop: theme.spacing(1)}} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              //type="submit"
              onClick={this.handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
              style={{margin: theme.spacing(3, 0, 2),}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
              Just a rather very intelligent (food ordering) system.
          </Typography>
        </Box>
      </Container>
    );
  }
}

export default withTheme(SignIn);