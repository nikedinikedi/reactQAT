import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState('');

    const addProject = () => {
        const newProjects = [...projects, { id: Date.now().toString(), name: projectName }];
        setProjects(newProjects);
        setProjectName('');
        saveProjects(newProjects);
    };

    const deleteProject = (id) => {
        const updatedProjects = projects.filter((project) => project.id !== id);
        setProjects(updatedProjects);
        saveProjects(updatedProjects);
    };

    const ProjectItem = ({ project }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProjectScreen', { project })}>
                <Text style={styles.project}>{project.name}</Text>
            </TouchableOpacity>
        );
    };
    const saveProjects = async (newProjects) => {
        try {
          await AsyncStorage.setItem('projects', JSON.stringify(newProjects));
        } catch (error) {
          console.error('Error saving projects:', error);
        }
      };
      

  // Updated loadProjects function
const loadProjects = async () => {
    try {
      const storedProjects = await AsyncStorage.getItem('projects');
      if (storedProjects !== null) {
        return JSON.parse(storedProjects);
      }
      return [];
    } catch (error) {
      console.error('Error loading projects:', error);
      return [];
    }
  };
  
  // Updated useEffect hook
  useEffect(() => {
    (async () => {
      const loadedProjects = await loadProjects();
      setProjects(loadedProjects);
    })();
  }, []);
  
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter project name"
                onChangeText={(text) => setProjectName(text)}
                value={projectName}
            />
            <Button title="Add Project" onPress={addProject} />
            <FlatList
                data={projects}
                renderItem={({ item }) => <ProjectItem project={item} />}
                keyExtractor={(item) => item.id}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        alignSelf: 'stretch',
    },
    project: {
        fontSize: 18,
        padding: 10,
    },
});
