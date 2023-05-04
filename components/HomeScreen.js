import { Alert, View, Text, } from "react-native"
import { Button, Card, Input, Icon } from "@rneui/base";
import { useState, useContext } from "react"
import { signInWithEmailAndPassword, } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { UserContext } from "../ContextProvider";
import { buttonColor, logInButtonContainer } from "../Style";
import PasswordReset from "./PasswordReset";

export default function HomeScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [user, uid] = useContext(UserContext);

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, passWord)
            .then(() => {
                setEmail(''),
                    setPassWord('');
                navigation.navigate('My recipes', {
                    screen: 'Recipes'
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/user-not-found') {
                    Alert.alert('User not found')
                } else if (errorCode === 'auth/wrong-password') {
                    Alert.alert('Incorrect password');
                } else {
                    Alert.alert('Something went wrong')
                }

            })
    }

    return (
        <Card>
            <Card.Title>Welcome {user}!</Card.Title>
            <View style={{ height: '100%', backgroundColor: '#F7fbfb' }}>
                <View>
                    {!user &&
                        <Card>
                            <View>
                                <Text>Already a user? </Text>
                                <Input
                                    leftIcon={<Icon name="person" size={20} />}
                                    placeholder="Username"
                                    onChangeText={text => setEmail(text)}
                                    value={email}
                                />
                                <Input
                                    leftIcon={<Icon name="security" size={20} />}
                                    secureTextEntry={true}
                                    placeholder="Password"
                                    onChangeText={text => setPassWord(text)}
                                    value={passWord}
                                />
                                <Button
                                    size='sm' type="solid" color={buttonColor.color}

                                    containerStyle={
                                        logInButtonContainer
                                    }
                                    onPress={() => signIn()}>
                                    Sign In
                                    <Icon name="lock-open" color="white" />
                                </Button>
                                <PasswordReset email={email} />
                            </View>
                        </Card>}

                    <View style={{ marginVertical: 50, alignItems: 'center' }} >
                    </View>
                </View>
            </View>
        </Card>
    )
}

