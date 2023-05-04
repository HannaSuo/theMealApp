import RecipeList from '../components/RecipeList';
import AddRecipe from '../components/AddRecipe';
import EditRecipe from '../components/EditRecipe';
import RandomRecipe from '../components/RandomRecipe';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stackStyle } from '../Style';

const Stack = createNativeStackNavigator();

export default function UserStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Recipes"
                component={RecipeList}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Add recipe"
                component={AddRecipe}
                options={{
                    headerStyle: {
                        backgroundColor: stackStyle.headerStyle,
                    },
                    headerTintColor: stackStyle.headerTint,
                    headerTitleStyle: {
                        fontWeight: stackStyle.fontWeight,
                    },
                }}
            />
            <Stack.Screen
                name="Edit"
                component={EditRecipe}
                options={{
                    headerStyle: {
                        backgroundColor: stackStyle.headerStyle,
                    },
                    headerTintColor: stackStyle.headerTint,
                    headerTitleStyle: {
                        fontWeight: stackStyle.fontWeight,
                    },
                }}
            />
            <Stack.Screen
                name="Random"
                component={RandomRecipe}
                options={{
                    headerStyle: {
                        backgroundColor: stackStyle.headerStyle,
                    },
                    headerTintColor: stackStyle.headerTint,
                    headerTitleStyle: {
                        fontWeight: stackStyle.fontWeight,
                    },
                }}
            />
        </Stack.Navigator>
    )
}