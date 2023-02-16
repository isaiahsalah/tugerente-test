import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { UserProvider } from './providers/UserProvider';
import { MD2DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import PostScreen from './screens/PostScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PostProvider } from './providers/PostProvider';

export default function App() {
  const Stack = createNativeStackNavigator();
  const theme = {
    ...MD2DarkTheme,
    colors: {
      ...MD2DarkTheme.colors,
      primary: '#2b724a',
      card: '#2b724a',
      surface: '#121212',
      onSurface: '#e3a92b',
      accent: '#2b724a',
    },
  }

  return (
    <UserProvider>
      <PostProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme} >
            <Stack.Navigator initialRouteName='home'  >
              <Stack.Screen name="home" component={HomeScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                }} />
              <Stack.Screen name="list" component={ListScreen}

                options={{
                  gestureEnabled: false,
                  headerShown: false,
                  headerBackTitle: 'Volver',
                  title: 'Viajes',
                }}
              />
              <Stack.Screen name="post" component={PostScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PostProvider>
    </UserProvider>
  );
}

