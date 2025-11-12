import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import HomeScreen from '../screens/HomeScreen';
import PerfumesScreen from '../screens/PerfumesScreen';
import SaleScreen from '../screens/SaleScreen';
import SummerScreen from '../screens/SummerScreen';
import WinterScreen from '../screens/WinterScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#e10047ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Main" 
          component={MainScreen}
          options={{ title: 'StyleMart' }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen 
          name="Winter" 
          component={WinterScreen}
          options={{ title: 'Winter Collection' }}
        />
        <Stack.Screen 
          name="Summer" 
          component={SummerScreen}
          options={{ title: 'Summer Collection' }}
        />
        <Stack.Screen 
          name="Perfumes" 
          component={PerfumesScreen}
          options={{ title: 'Perfumes' }}
        />
        <Stack.Screen 
          name="Sale" 
          component={SaleScreen}
          options={{ title: 'Sale - Hot Deals!' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;