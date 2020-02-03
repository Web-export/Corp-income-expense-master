import React from 'react';
import { Easing, Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
// screens
import IncomeDetail from '../screens/IncomeDetails';
import ExpenseDetailScreen from '../screens/ExpenseDetails';
import Register from '../screens/Register';
import Home from '../screens/Home';

// settings
import ExpenseListScreen from '../screens/ExpenseList';

// drawer
import Menu from './Menu';
import DrawerItem from '../components/DrawerItem';

// header for screens
import Header from '../components/Header';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = 'Search';

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const ExpenseDetailStack = createStackNavigator(
  {
    ExpenseDetail: {
      screen: ExpenseDetailScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header transparent title="Corp App - Expense" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: { backgroundColor: '#FFFFFF' },
    transitionConfig
  }
);

const ExpenseListStack = createStackNavigator(
  {
    ExpenseList: {
      screen: ExpenseListScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header transparent back title="Corp App - Expense List" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: { backgroundColor: '#FFFFFF' },
    transitionConfig
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header transparent back title="Corp App - Home" navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);

const IncomeDetailStack = createStackNavigator(
  {
    IncomeDetail: {
      screen: IncomeDetail,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header transparent title="Crop App - Income" iconColor={'#FFF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: '#FFFFFF' },
    transitionConfig
  }
);

const AccountStack = createStackNavigator(
  {
    Account: {
      screen: Register,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header transparent title="Corp App - Login" iconColor={'#333'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: '#FFFFFF' },
    transitionConfig
  }
);

const AppStack = createDrawerNavigator(
  {
    Account: {
      screen: AccountStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Register" title="Account" />
        )
      })
    },
    Home: {
      screen: HomeStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Home" title="Home" />
        )
      })
    },
    IncomeDetail: {
      screen: IncomeDetailStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="IncomeDetail" title="IncomeDetail" />
        )
      })
    },
    ExpenseDetail: {
      screen: ExpenseDetailStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="ExpenseDetail" title="ExpenseDetail" />
        )
      })
    },
    ExpenseList: {
      screen: ExpenseListStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="ExpenseList" title="ExpenseList" />
        )
      })
    },
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
