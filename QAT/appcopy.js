import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();



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
      <Tab.Navigator>
        <Tab.Screen name="Home" options={{ title: 'Home' }}>
          {() => (
            <View style={styles.container}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {projects.map((project, index) => (
                  // make each project clickable and take you to the ProjectViewScreen
                  <TouchableOpacity
                    key={index}
                    onPress={() => console.log('Project pressed')}
                  >
                    <Text>{project}</Text>
                  </TouchableOpacity>

                ))}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Add new project"
                  onChangeText={text => setName(text)}
                  value={name}
                />
                <Button
                  title="Submit"
                  onPress={saveData}
                />
                <Button
                  title="Delete data"
                  onPress={deleteData}
                  color="red"
                />
              </View>
            </View>
          )}
        </Tab.Screen>
  
        <Tab.Screen name="Questions" options={{ title: 'Questions' }}>
          {() => (
            <View style={styles.container}>
              {projects.map((project, index) => (
                <Text key={index}>{project}</Text>
              ))}
            </View>
          )}
        </Tab.Screen>
        <Tab.Screen name="Tasks" options={{ title: 'Tasks' }}>
          {() => (
            <View style={styles.container}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Tasks Screen" onPress={() => console.log('Tasks button pressed')} />
              </View>
            </View>
          )}
        </Tab.Screen>
      </Tab.Navigator>
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