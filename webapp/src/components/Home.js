import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import OrderIcon from '@material-ui/icons/ListAlt';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import DishInfo from './dashboard/editDetails';
import AddDish from './dashboard/addFood';
import Orders from './dashboard/orders';
import * as firebase from 'firebase';

const drawerWidth = 240;

class Home extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
        shop : null,
        shopName: sessionStorage.getItem("username").split("_")[1],
        userName: sessionStorage.getItem("username").split("_")[0]
    };
  }
  componentDidMount(){
    const db = firebase.database();
    const shop = db.ref(this.state.shopName);
    shop.on('value',(snapshot)=>{
        console.log(snapshot.val());
        this.setState({
            shop : snapshot.val(),
        })
    });
  }
  logout = () => {
    sessionStorage.removeItem("username");
    window.location = "http://localhost:3000/";
  }
  render(){
    const { theme } = this.props;
    const classes = makeStyles((theme) => ({drawerPaper: {width: 500,}}));

    return (
      <div style={{display: 'flex'}}>
        <BrowserRouter>
        <CssBaseline />
        <AppBar position="fixed" style={{zIndex: theme.zIndex.drawer + 1}}>
          <Toolbar style={{justifyContent: "center"}}>
            <Typography variant="h5" noWrap>
              Foodie Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          style={{width: drawerWidth, flexShrink: 0}}
          variant="permanent"
          classes={{paper: classes.drawerPaper,}}
        >
          <Toolbar />
          <div style={{overflow: "auto", width: drawerWidth}}>
            <List>
              <Link to="/dashboard/orders" style={{textDecoration: "none", color: "black"}}>
                <ListItem button>
                    <ListItemIcon><OrderIcon /></ListItemIcon>
                    <ListItemText primary={"Orders"} />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/dashboard/dish_info" style={{textDecoration: "none", color: "black"}}>
                <ListItem button>
                  <ListItemIcon><EditIcon /></ListItemIcon>
                  <ListItemText primary={"Edit Dish"} />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/dashboard/add_dish" style={{textDecoration: "none", color: "black"}}>
                <ListItem button>
                  <ListItemIcon><AddIcon /></ListItemIcon>
                  <ListItemText primary={"Add Dish"} />
                </ListItem>
              </Link>
              <Divider />
              <ListItem onClick={this.logout} button>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItem>
              <Divider />
            </List> 
          </div>
        </Drawer>
        <main style={{flexGrow: 1, padding: theme.spacing(3)}}>
          <Toolbar />
          <Route path="/dashboard" exact>
              {
                this.state.shop == null ? 
                <div style={{display: 'flex', marginLeft: "40%", marginTop: "20%"}}><CircularProgress /></div> : 
                <Redirect to="/dashboard/orders" />
              }
          </Route>
          <Route 
            path="/dashboard/orders"
            render={(props) => <Orders shop={this.state.shop} />}
          >  
          </Route>
          <Route path="/dashboard/dish_info"
            render={(props) => <DishInfo shop={this.state.shop} shopName={this.state.shopName}/>}
          >
          </Route>
          <Route path="/dashboard/add_dish"
            render={(props) => <AddDish shopName="shop1"/>}
          >
          </Route>
        </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default withTheme(Home);