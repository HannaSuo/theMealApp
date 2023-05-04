import { Text, } from 'react-native';
import { Header, } from '@rneui/base';
import { useState, } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';;
import { onAuthStateChanged } from "firebase/auth";
import NonUserStack from './navigation/NonUserStack';
import UserStack from './navigation/UserStack';
import HomeScreen from './components/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from './firebaseConfig';
import { UserContext } from './ContextProvider';
import { tabStyle } from './Style';
import LogOut from './components/LogOut';

const Tab = createBottomTabNavigator();

export default function App() {

  const [status, setStatus] = useState(false);
  const [user, setUser] = useState('');
  const [uid, setUid] = useState('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setStatus(true);
      if (user !== null) {
        setUser(user.email);
        setUid(user.uid);
      }
    } else {
      setStatus(false);
      setUser('')
      setUid('')
    }
  });

  return (
    <UserContext.Provider value={[user, uid]}>
      <Header
        backgroundColor='#1F4A75'
        barStyle="default"
        centerComponent={{
          text: "The Meal App",
          style: { color: "#fff", fontSize: 25, marginRight: 30 }
        }}
        containerStyle={{ width: '100%' }}
        rightComponent={<LogOut />}
        placement="center"
      />
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'My recipes') {
              iconName = 'book';
            } else if (route.name === "Register") {
              iconName = 'idcard'
            }
            return <AntDesign name={iconName} size={30} color={tabStyle.iconColor} />;
          },
          tabBarStyle:
          {
            backgroundColor: tabStyle.tabBackGround,
          },

          tabBarActiveTintColor: tabStyle.active,
          tabBarInactiveTintColor: tabStyle.inactive,
          headerStyle: { backgroundColor: tabStyle.headerbackGround },
          headerRight: (() => {
            if (user === "") {
              return;
            } else {
              return <Text style={{ paddingRight: 6 }}>Logged in as: {user} </Text>
            }
          })
        })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          {!status &&
            <Tab.Screen name="Register" component={NonUserStack} />}
          {status &&
            <Tab.Screen name="My recipes" component={UserStack} />}
        </Tab.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  )
}

