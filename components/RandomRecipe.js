import { View, Text, Linking, Image } from "react-native";
import { useState, useEffect, } from "react";
import { Button, Card, } from "@rneui/base";
import { randomButtonContainer, buttonColor, recipeCardButtonStyle } from "../Style";
import SaveRandomRecipe from "./SaveRandomRecipe";

export default function RandomRecipe({ route, }) {
    const { uid } = route.params
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [recipeUrl, setRecipeUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('')

    useEffect(() => {
        getAMeal();
    }, [])

    const getAMeal = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
            .then(response => response.json())
            .then(data => {
                setTitle(data.meals[0].strMeal)
                setRecipeUrl(data.meals[0].strSource)
                setVideoUrl(data.meals[0].strYoutube)
                setImage(data.meals[0].strMealThumb)
            })
            .catch(err => console.error(err))

    }

    return (
        <View style={{ height: '100%' }}>
            <Card containerStyle={{ height: '80%', backgroundColor: '#6E8FCA' }}>
                <Card.Title style={{ fontSize: 20, color: 'black' }}>Today you will make...</Card.Title>
                <View style={{ alignItems: 'center', backgroundColor: '#C8B7BE', padding: 3, borderRadius: 5, borderWidth: 1, padding: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}> {title} </Text>
                    <Image
                        style={{ width: '50%', height: '50%' }}
                        source={{
                            uri: `${image}/preview`
                        }}
                    />
                    {recipeUrl != '' &&
                        <Button
                            size='sm' type="solid" color={buttonColor.color}
                            buttonStyle={recipeCardButtonStyle}
                            containerStyle={
                                randomButtonContainer
                            }
                            onPress={() => Linking.openURL(recipeUrl)}>
                            Tap here for recipe!
                        </Button>}
                    {videoUrl != '' &&
                        <Button
                            size='sm' type="solid" color={buttonColor.color}
                            buttonStyle={recipeCardButtonStyle}
                            containerStyle={
                                randomButtonContainer
                            }
                            onPress={() => Linking.openURL(videoUrl)}>
                            Video instructions here!
                        </Button>}
                    <SaveRandomRecipe title={title} recipeUrl={recipeUrl} uid={uid} />
                </View>
            </Card>
            <Card containerStyle={{ backgroundColor: '#6E8FCA', }}>
                <View style={{ alignItems: 'center' }}>
                    <Button
                        size='sm' type="solid" color={buttonColor.color}
                        buttonStyle={{ borderRadius: 10, padding: 6, height: 60, }}
                        containerStyle={{
                            height: 60,
                            width: 350,
                            marginTop: 5,
                            borderRadius: 10,
                        }}
                        onPress={getAMeal}>
                        Get a new random recipe
                    </Button>
                </View>
            </Card>
        </View>
    )
}
