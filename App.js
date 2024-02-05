// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackScreen from './MainStack';
import StatusInformation from './DrawerScreens/Monitoring/StatusInformation';




const App = () => {
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
};

export default App;
