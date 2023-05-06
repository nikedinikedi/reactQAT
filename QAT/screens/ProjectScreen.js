// ProjectScreen.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProjectScreen = ({ route }) => {
    const { project } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.projectName}>{project.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    projectName: {
        fontSize: 24,
    },
});

export default ProjectScreen;
