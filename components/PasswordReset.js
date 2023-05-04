import { Alert, } from "react-native"
import { Button, } from "@rneui/base";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export default function PasswordReset(props) {
    const { email } = props;

    const resetPassword = () => {

        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert("Email sent!")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/user-not-found') {
                    Alert.alert(`No account for ${email} found!`)
                } else if (errorCode === 'auth/missing-email') {
                    Alert.alert('Please, enter your email as username to receive reset email')
                } else {
                    Alert.alert("Something went wrong")
                }
            });
    }


    return (
        <Button
            size='sm' type="solid" color='white'
            titleStyle={{ color: 'black' }}
            containerStyle={{
                height: 40,
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
                borderWidth: 1,
                borderStyle: 'dotted'
            }}
            onPress={() => resetPassword()}
        >
            I forgot my password
        </Button>
    )
}