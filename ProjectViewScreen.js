import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useParams } from 'react-router-native';

export default function ProjectViewScreen() {
  const { projectName } = useParams();

  useEffect(() => {
    // Fetch any additional data about the project
  }, []);

  return (
    <View style={styles.container}>
      <Text>{projectName}</Text>
      {/* Add more details about the project here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
