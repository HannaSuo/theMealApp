import { Alert, } from "react-native"
import { ref, remove } from 'firebase/database';
import { database } from "../firebaseConfig";
import { Button, Icon, } from "@rneui/base";

export default function DeleteRecipe(props) {
    const { uid, item } = props;

    const deleteNow = (i) => {
        Alert.alert('Delete', 'Are you sure?', [
            {
                text: 'Cancel',
                onPress: (() => {
                    return;
                })
            },
            {
                text: 'Confirm',
                onPress: (() => {
                    deleteForReal(i);
                })
            }
        ])
    }

    const deleteForReal = (i) => {
        remove(ref(database, `/${uid}/${i}`))
            .then(() => {
                Alert.alert('Deleted!')
            })
            .catch((error) => {
                Alert.alert('Something went wrong')
            })
    }

    return (
        <Button
            size='sm' type="solid" color='red'
            buttonStyle={{ borderRadius: 10, padding: 6 }}
            containerStyle={{
                height: 40,
                width: 50,
                marginTop: 10,
            }}
            onPress={() => deleteNow(item)}
        >
            <Icon name="delete" color="white" />
        </Button>
    )
}
