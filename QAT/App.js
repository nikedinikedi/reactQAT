import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

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

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" options={{ title: 'Home' }}>
          {() => (
            <View style={styles.container}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200 }}
                  placeholder="Enter your name"
                  onChangeText={text => setName(text)}
                  value={name}
                />
                <Button
                  title="Submit"
                  onPress={saveData}
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
});
