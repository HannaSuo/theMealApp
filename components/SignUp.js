import { Alert, View, } from "react-native"
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Button, Card, Input, } from "@rneui/base";

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const registerUser = () => {
        createUserWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {
                //const user = userCredential.user;
                navigation.navigate('My recipes', {
                    screen: 'Recipes',
                    //params: { user }
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/invalid-email') {
                    Alert.alert('Please, enter a valid e-mail address')
                } else if (errorCode === 'auth/email-already-in-use') {
                    Alert.alert('This email is already in use')
                } else if (errorCode === 'auth/weak-password') {
                    Alert.alert('Password must be at least 6 characters');
                } else {
                    Alert.alert('Something went wrong, try again')
                }

            })
    }


    return (
        <Card>
            <Card.Title>Sign up here</Card.Title>
            <View>
                <Card>
                    <Input
                        placeholder="Username"
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                    <Input
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={text => setPw(text)}
                        value={pw}
                    />
                    <Button
                        size='sm' type="solid" color='#1F4A75'
                        onPress={() => registerUser()}>
                        Sign up
                    </Button>
                </Card>
            </View>
        </Card>
    )
}