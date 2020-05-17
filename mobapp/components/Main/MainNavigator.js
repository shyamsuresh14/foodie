import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import ShopMenu from '../ShopMenu/shopMenu';
import CartView from '../CartView/CartView';
import MobileNoAuthScreen from '../Auth/MobileNoAuthScreen';
import ShopList from '../ShopList/shopList';
import EmailAuthScreen from '../Auth/EmailAuthScreen';
import SplashScreen from '../Splash/SplashScreen';

const navDefaultOptions = (init, title="Welcome!") => {
    return {
        initialRouteName: init, 
        title: title,
        headerTitleStyle: {color: "white", fontWeight: "bold"},
        headerTitleAlign: "center",
        headerStyle: {backgroundColor: "red"},
        /*headerRight: {
            headerRight: () => (
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Info"
                  color="#fff"
                />
              ),
        }*/
    };
}

const AuthNavigator = createStackNavigator({
    auth1: {
        screen: EmailAuthScreen,
    },
    auth2: {
        screen: MobileNoAuthScreen,
    },
},{
    defaultNavigationOptions: navDefaultOptions("auth1")
});

const MainNavigator = createStackNavigator({
    list: {
        screen: ShopList,
        navigationOptions: {
            title: "Shop List",
        }
    },
    menu: {
        screen: ShopMenu,
        navigationOptions: {
            title: "Shop Menu",
        }
    },
    cart: {
        screen: CartView,
        navigationOptions: {
            title: "My Orders",
        }
    },
},{
    defaultNavigationOptions: navDefaultOptions("list")
});


const AppNavigator = createSwitchNavigator({
    Init: SplashScreen,
    Auth: AuthNavigator,
    App: MainNavigator,
},{
    defaultNavigationOptions: {
        initialRouteName: "Init"
    }
})

export default createAppContainer(AppNavigator);


//above

//import {createBottomTabNavigator} from 'react-navigation-tabs'
//import {createDrawerNavigator} from 'react-navigation-drawer';
/*import ChatApp from './chat'
import Initial from './initial' 
import Schedule from './Schdule'
import ListOfSchdules from './ListOfSchdules';
import ChatHelp from './ChatHelp'*/

/*const defOptions = {
    headerStyle: {
        backgroundColor: '#8b008b',
    },
    headerTitleStyle: {
        fontSize: 20
    },
    headerTintColor: 'white'
    
};*/

//below

/*const Events = createStackNavigator({
    Disp: ListOfSchdules,
    Add: Schedule,
    
    
},{
    defaultNavigationOptions: {
        initialRouteName: 'init', 
        headerShown: false
    }
});

const tabScreenConfig = {
    Find:{
        screen: ChatHelp,
        navigationOptions: {
            
            tabBarIcon: (tabInfo) => {
                return <Text color={tabInfo.tintColor} >Search</Text>;
            },
                tabBarColor: '#ffa500'
            }

    }
    ,Forum: { 
        screen: ShopNavigator,
        navigationOptions: {
            
            tabBarIcon: (tabInfo) => {
                return <Text color={tabInfo.tintColor} >Chat</Text>;
            },
                tabBarColor: '#ffa500'
            }
    
            },
    Notification: {
        screen: Events ,
        navigationOptions: {
            
            tabBarIcon: (tabInfo) => {
                return <Text color={tabInfo.tintColor} >Schedule</Text>;
            },
                tabBarColor: '#ffa500'
            }
    },
        
    
};


const TabNavigator = createBottomTabNavigator(tabScreenConfig, {
    activeTintColor: '#ff6f00',
    shifting: true,
    tabBarOptions: {
        
        activeBackgroundColor: '#8b008b',
        inactiveBackgroundColor: '#8b008b',
        activeTintColor: 'white'
    }
},{
    defaultNavigationOptions: defOptions
});*/

