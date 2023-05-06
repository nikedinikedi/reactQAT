
// import statusbar expo
import { StatusBar } from 'expo-status-bar';
// import button and view
import { Button, View } from 'react-native';

// export homescreen
export default function HomeScreen({ navigation }) {
    return (
        // view
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* button to navigate to projects */}
        <Button
            title="Go to Projects"
            onPress={() => navigation.navigate('SecondScreen')}
        />

        {/* status bar */}
        <StatusBar style="auto" />
        </View>
    );
    }
