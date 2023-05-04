import { Alert, Linking, } from "react-native"
import { useCallback, } from "react";
import { Button, Icon, } from "@rneui/base";
import { buttonColor, recipeCardButtonStyle, recipeCardButtonCointainer, } from "../Style";

export default function OpenUrl(props) {
    const { url } = props;

    const handlePress = useCallback(async () => {
        const valid = await Linking.canOpenURL(url);

        if (valid) {
            Linking.openURL(url)
        } else {
            Alert.alert('Please add a valid url for the recipe')
        }
    }, [url]);

    return <Button
        size='sm' type="solid" color={buttonColor.color}
        buttonStyle={recipeCardButtonStyle}
        containerStyle={
            recipeCardButtonCointainer
        }
        onPress={handlePress}>
        Open recipe
        <Icon name="open-in-browser" color="white" />
    </Button>
};