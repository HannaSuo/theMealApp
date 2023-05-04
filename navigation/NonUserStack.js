import SignUp from '../components/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function NonUserStack({ navigation }) {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Sign Up"
                component={SignUp}
                options={{
                    headerShown: false,

                }} />
        </Stack.Navigator>
    )
}

