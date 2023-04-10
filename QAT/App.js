import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  const [name, setName] = useState('');

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@MySuperStore:name', name);
      console.log('Data saved successfully');
      // log the data
      const value = await AsyncStorage.getItem('@MySuperStore:name');
      console.log('Value:', value);
      
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
                  onPress={() => {
                    saveData();
                    // clear the input field
                    setName('');
                  }}
                />
              </View>
            </View>
          )}
        </Tab.Screen>
        <Tab.Screen name="Questions" options={{ title: 'Questions' }}>
          {() => (
            <View style={styles.container}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Questions Screen" onPress={() => console.log('Questions button pressed')} />
              </View>
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
