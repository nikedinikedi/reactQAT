import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



export default function App() {
  const [name, setName] = useState('');
  const [projects, setProjects] = useState([]);

  //#region some code to save and retrieve data from AsyncStorage

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@MySuperStore:projects');
        if (value !== null) {
          setProjects(JSON.parse(value));
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    getData();
  }, []);

  const saveData = async () => {
    try {
      const newProjects = [...projects, name];
      await AsyncStorage.setItem('@MySuperStore:projects', JSON.stringify(newProjects));
      console.log('Data saved successfully');
      setProjects(newProjects);
      setName('');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };
  
  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('@MySuperStore:projects');
      console.log('Data deleted successfully');
      setProjects([]);
    } catch (error) {
      console.log('Error deleting data:', error);
    }
  };

  //#endregion
  

  return (
    <NavigationContainer>
      {/* stack navigation */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});
