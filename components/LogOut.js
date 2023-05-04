import { Alert, } from "react-native"
import { Button, Icon } from "@rneui/base";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { buttonColor } from "../Style";

export default function LogOut() {

    const logOut = () => {
        signOut(auth).then(() => {

        }).catch((error) => {
            Alert.alert("An error happened")
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            })
    }
    return (
        <Button
            size='sm' type="solid" color={buttonColor.color}
            containerStyle={{
                height: 40,
                width: 90,
                marginHorizontal: 10,
                borderRadius: 10
            }}
            onPress={() => logOut()}>
            Log out
            <Icon name="lock-outline" color="white" />
        </Button>

    )
}