import { Alert, } from "react-native";
import { push, ref, } from 'firebase/database';
import { database } from "../firebaseConfig";
import { Button, } from "@rneui/base";
import { randomButtonContainer, buttonColor, recipeCardButtonStyle } from "../Style";

export default function SaveRandomRecipe(props) {
    const { title, recipeUrl, uid } = props;

    const saveRecipe = () => {
        if (recipeUrl === "") {
            Alert.alert("Sorry no recipe address to save")
        } else {
            push(
                ref(database, `${uid}/`),
                { 'title': title, 'address': recipeUrl.toLowerCase(), 'comments': "Saved from meal database" })
                .then(() => {
                    Alert.alert('Recipe saved succesfully!')
                })
                .catch((error) => {
                    Alert.alert('Something went wrong')
                })
        }
    }


    return (
        <Button
            size='sm' type="solid" color={buttonColor.color}
            buttonStyle={recipeCardButtonStyle}
            containerStyle={
                randomButtonContainer
            }
            onPress={saveRecipe}>Save to recipes</Button>
    )
}