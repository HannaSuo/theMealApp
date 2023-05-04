import { View, Alert } from "react-native";
import { useState, useEffect, useContext } from "react";
import { ref, set } from 'firebase/database';
import { database } from "../firebaseConfig";
import { UserContext } from "../ContextProvider";
import { Button, Card, Input, Icon, } from "@rneui/base";
import { saveButtonContainer, buttonColor } from "../Style";

export default function EditRecipe({ route, navigation }) {
    const [user, uid] = useContext(UserContext);
    const { title, address, comments, key } = route.params;
    const [editTitle, setEditTitle] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [editComments, setEditComments] = useState('');
    const [dbKey, setDbKey] = useState('');

    useEffect(() => {
        setEditTitle(title);
        setEditAddress(address);
        setEditComments(comments);
        setDbKey(key);

    }, []);

    const saveEditedItem = () => {
        set(ref(database, `${uid}/${dbKey}`), {
            'title': editTitle,
            'address': editAddress,
            'comments': editComments
        })
            .then(() => {
                Alert.alert('Edits saved succesfully!')
                navigation.navigate('My recipes', {
                    screen: 'Recipes',
                });
            })
            .catch((error) => {
                Alert.alert('Something went wrong')
            })
    }

    return (
        <Card>
            <View>
                <Input
                    inputContainerStyle={{ borderWidth: 2 }}
                    label='Title'
                    placeholder="Title"
                    onChangeText={text => setEditTitle(text)}
                    value={editTitle}
                />
                <Input
                    inputContainerStyle={{ borderWidth: 2 }}
                    label='Recipe address'
                    placeholder='Address'
                    onChangeText={text => setEditAddress(text)}
                    value={editAddress}
                />
                <Input
                    inputContainerStyle={{ height: 70, borderWidth: 2 }}
                    multiline={true}
                    textAlignVertical="top"
                    label='Comments'
                    placeholder='Comments'
                    onChangeText={text => setEditComments(text)}
                    value={editComments}
                />
                <Button
                    size='sm' type="solid" color={buttonColor.color}
                    containerStyle={
                        saveButtonContainer
                    }
                    onPress={saveEditedItem}>
                    Save edits
                    <Icon name="save" color="white" />
                </Button>
            </View>
        </Card>
    )
}