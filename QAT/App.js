import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function ProjectViewScreen({ route }) {
  const { projectName } = route.params;
  return (
    <View style={styles.container}>
      <Text>{projectName}</Text>
      {/* Add more details about the project here */}
    </View>
  );
}

export default function App() {
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@MySuperStore:questions');
        if (value !== null) {
          setQuestions(JSON.parse(value));
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    getData();
  }, []);

  const saveData = async () => {
    try {
      const newQuestions = [...questions, name];
      await AsyncStorage.setItem('@MySuperStore:questions', JSON.stringify(newQuestions));
      console.log('Data saved successfully');
      setQuestions(newQuestions);
      setName('');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };
  
  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('@MySuperStore:questions');
      console.log('Data deleted successfully');
      setQuestions([]);
    } catch (error) {
      console.log('Error deleting data:', error);
    }
  };
  

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" options={{ title: 'Home' }}>
          {() => (
            <View style={styles.container}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {questions.map((question, index) => (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate('ProjectView', { projectName: question })}>
                    <Text>{question}</Text>
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
              {questions.map((question, index) => (
                <Text key={index}>{question}</Text>
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
        <Tab.Screen name="ProjectView" component={ProjectViewScreen} options={{ title: 'Project View' }} />
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
