import { View, Alert, } from "react-native";
import { useState, useContext, } from "react";
import { push, ref, } from 'firebase/database';
import { database } from "../firebaseConfig";
import { UserContext } from "../ContextProvider";
import { Button, Card, Input, Icon, } from "@rneui/base";
import { saveButtonContainer, buttonColor } from "../Style";

export default function AddRecipe({ navigation, route }) {
    const [user, uid] = useContext(UserContext);
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('');
    const [comments, setComments] = useState('');

    const saveItem = () => {
        if (address.trim() === "") {
            Alert.alert('Please, enter url for the recipe')
        } else {
            push(
                ref(database, `${uid}/`),
                { 'title': title, 'address': address.toLowerCase(), 'comments': comments })
                .then(() => {
                    Alert.alert('Recipe saved succesfully!')
                    navigation.navigate('My recipes', {
                        screen: 'Recipes',
                    });
                })
                .catch((error) => {
                    Alert.alert('Something went wrong')
                })
        }
    }

    return (
        <Card>
            <View>

                <Input
                    inputContainerStyle={{ borderWidth: 1, borderColor: 'black', }}
                    placeholder='Recipe title'
                    onChangeText={text => setTitle(text)}
                    value={title}
                />
                <Input
                    inputContainerStyle={{ borderWidth: 1, borderColor: 'black' }}
                    placeholder='https://example.com'
                    onChangeText={text => setAddress(text)}
                    value={address}
                />
                <Input
                    inputContainerStyle={{ height: 70, borderWidth: 1, borderColor: 'black' }}
                    multiline={true}
                    placeholder='Comments'
                    onChangeText={text => setComments(text)}
                    value={comments}
                />
                <Button
                    size='sm' type="solid" color={buttonColor.color}
                    containerStyle={
                        saveButtonContainer
                    }
                    onPress={saveItem}>
                    Save recipe
                    <Icon name="save" color="white" />
                </Button>
            </View>
        </Card>
    )
}