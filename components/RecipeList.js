import { View, Text, FlatList, } from "react-native"
import { useState, useEffect, useContext } from "react";
import { ref, onValue, } from 'firebase/database';
import { database } from "../firebaseConfig";
import { UserContext } from "../ContextProvider";
import { Button, Card, Icon, } from "@rneui/base";
import {
    buttonColor, addEtRandomButtonContainer, addEtRandomButtonStyle,
    recipeCardButtonCointainer, recipeCardButtonStyle, outerCard, cardView
} from "../Style";
import DeleteRecipe from "./DeleteRecipe";
import OpenUrl from "./OpenUrl";

export default function RecipeList({ navigation }) {
    const [user, uid] = useContext(UserContext);
    const [dataArray, setDataArray] = useState([]);

    useEffect(() => {
        const itemsRef = ref(database, `${uid}/`);
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                setDataArray(Object.entries(data));
            }
        })
    }, []);

    if (!user) {
        return (
            <View>
                <Text>Please sign in first</Text>
            </View>
        )
    } else {
        return (
            <View>
                <Card containerStyle={outerCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                        <Button
                            size='sm' type="solid" color={buttonColor.color}
                            buttonStyle={addEtRandomButtonStyle}
                            containerStyle={
                                addEtRandomButtonContainer
                            }
                            onPress={() => navigation.navigate('Add recipe')}>
                            Add a recipe
                            <Icon name="add" color="white" />
                        </Button>
                        <Button
                            size='sm' type="solid" color={buttonColor.color}
                            buttonStyle={addEtRandomButtonStyle}
                            containerStyle={
                                addEtRandomButtonContainer
                            }
                            onPress={() => navigation.navigate('Random', { uid: uid })}>
                            I'm out of ideas
                            <Icon name="help" color="white" />
                        </Button>
                    </View>
                </Card>
                {dataArray.length === 0 && <Text> Lets start by adding some recipes! </Text>}
                <FlatList
                    style={{ height: '85%' }}
                    keyExtractor={item => item[0]}
                    renderItem={({ key, item }) =>
                        <Card containerStyle={outerCard}>
                            <View style={cardView}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item[1].title}</Text>
                                <Text style={{ fontSize: 15, fontStyle: 'italic' }}>{item[1].comments}</Text>
                                <OpenUrl url={item[1].address}></OpenUrl>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Button
                                        size='sm' type="solid" color={buttonColor.color}
                                        buttonStyle={recipeCardButtonStyle}
                                        containerStyle={
                                            recipeCardButtonCointainer
                                        }
                                        onPress={() => navigation.navigate('Edit', { title: item[1].title, address: item[1].address, comments: item[1].comments, key: item[0] })}>
                                        Edit
                                        <Icon name="edit" color="white" />
                                    </Button>
                                    <DeleteRecipe uid={uid} item={item[0]} />
                                </View>
                            </View>
                        </Card>
                    }
                    data={dataArray}
                />

            </View>
        )
    }
}


