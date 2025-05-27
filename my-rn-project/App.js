import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackNavigation from './src/navigation/StackNavigation';
import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>

  );
}
