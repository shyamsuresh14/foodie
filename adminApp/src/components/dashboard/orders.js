import React from 'react';
import {Redirect} from 'react-router-dom';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button, TextField } from '@material-ui/core';
import md5 from 'md5';
import * as firebase from 'firebase';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Order(props) {
    const { order, token, id, handleChange, handleSubmit } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const theme = createMuiTheme({typography: {fontSize: 12, fontWeightBold: 400}});

    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align="center">{order.uname}</TableCell>
          <TableCell align="center">{order.id}</TableCell>
          <TableCell align="center">{order.payment}</TableCell>
          <TableCell align="center">
            { order.status == "requested" ? 
            <TextField onChange={(event) => handleChange(event, order.id)} id="token" placeholder="Enter token no." /> : 
            <TextField onChange={(event) => handleChange(event, order.id)} id="token" placeholder="Enter token no." disabled/>
            }
          </TableCell>
          <TableCell align="center">
            {
              order.status=="requested"?
              <Button onClick={handleSubmit} variant="outlined" size="small" color="primary">Collected</Button>:
              <Typography>Collected!</Typography>
            }
           </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h6"gutterBottom component="div" align="justify">
                        DISHES :
                    </Typography>
                </ThemeProvider>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">No.</TableCell>
                      <TableCell align="center">Name of the dish</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.values(order.desc).map((dish, ind) => (
                      <TableRow key={ind}>
                        <TableCell component="th" scope="row" align="center">{ind + 1}</TableCell>
                        <TableCell align="center">{dish.fname}</TableCell>
                        <TableCell align="center">{dish.qty}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
}

class Orders extends React.Component    
{

  constructor(props)
  {
    super(props);
    this.state = {
      shop : props.shop,
      id: -1,
      token: "",
    };
  }

  handleChange = (event, id) => {
    this.setState({id: id, token: event.target.value});
  }
  handleSubmit = (event) => {
    console.log("submitted");
    if(this.state.token === md5(this.state.id.toString()).substring(0, 5)){
      console.log("success");
      firebase.database().ref("shop1/orders/"+this.state.id+"/status").set("picked").then(() => {
        window.location.reload();
      });
      //this.setState({id: -1, token: ""});
    }
    event.preventDefault();
  }

 render() {
   
  return (
        <div>
            {
                this.state.shop == null ?
                <Redirect to="/dashboard" /> :
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="center">User Name</TableCell>
                            <TableCell align="center">Order ID</TableCell>
                            <TableCell align="center">Payment</TableCell>
                            <TableCell align="center">Token No.</TableCell>
                            <TableCell align="center"/>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.shop["orders"].map((val, ind) => 
                                    <Order key={ind} order={val} token={this.state.token} id={this.state.id} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            }            
        </div>
  );
}
}

export default Orders;
