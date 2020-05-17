import React from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';

export default class DishInfo extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      shop : props.shop,
      count : [],
      shopName : props.shopName,
      category: "",
      name: "",
      cost: -1,
      desc: "",
      available: "",
    };
    
  }
  _editDetails(dishID,attr,val)
  {
    //;
    console.log(dishID, attr, val);
    firebase.database().ref(this.state.shopName.concat("/", "food/", dishID, "/", attr)).set(val);
  
  }

  handleChange = (event) => {
    switch(event.target.id){
      case "category": this.setState({category: event.target.value}); break;
      case "name": this.setState({name: event.target.value}); console.log(event.target.value); break;
      case "desc": this.setState({desc: event.target.value}); break;
      case "cost": this.setState({cost: event.target.value}); break;
      case "available": this.setState({available: event.target.value}); break;
    }
  }
  handleSubmit = (event, id) => {
    if(this.state.category !== "") this._editDetails(id, "category", this.state.category);
    if(this.state.name !== "") this._editDetails(id, "name", this.state.name);
    if(this.state.desc !== "") this._editDetails(id, "desc", this.state.desc);
    if(this.state.cost >= 0) this._editDetails(id, "cost", this.state.cost);
    if(this.state.available !== "") this._editDetails(id, "available", this.state.available);
    this.setState({category: "", name: "", cost: -1, desc: "", available: ""});
    event.preventDefault();
  }
 render() {
  return (
    <div>
      {/* {this.state.count.forEach((val)=>{return <p>{(val.val()).toString()}</p>})} */}
      {
        this.state.shop == null ? 
        <Redirect to="/dashboard" /> : 
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Cost</TableCell>
                    <TableCell align="center">Available</TableCell>
                    <TableCell align="center"/>
                </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Object.entries(this.state.shop["food"]).map((val, ind) => (
                      <React.Fragment key={ind}>
                        <TableRow>
                          <TableCell component="th" scope="row" align="center">
                            <TextField onChange={this.handleChange} id="category" defaultValue={val[1].category} />
                          </TableCell>
                          <TableCell align="center">
                            <TextField onChange={this.handleChange} id="name" defaultValue={val[1].name} />
                          </TableCell>
                          <TableCell align="center">
                            <TextField onChange={this.handleChange} id="desc" defaultValue={val[1].desc}/>  
                          </TableCell>
                          <TableCell align="center">
                            <TextField onChange={this.handleChange} id="cost" defaultValue={val[1].cost}/>
                          </TableCell>
                          <TableCell align="center">
                            <TextField onChange={this.handleChange} id="available" defaultValue={val[1].available}/>
                          </TableCell>
                          <TableCell align="center">
                           <Button onClick={(event) => this.handleSubmit(event, val[0])} variant="outlined" size="small" color="primary">Update</Button>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))
                  }
                </TableBody>
            </Table>
        </TableContainer>
      } 
    </div>
  );
}
}

