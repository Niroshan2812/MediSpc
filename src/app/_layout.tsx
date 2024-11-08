import { Stack } from "expo-router"
import "../../global.css";
export default function RootLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{title:'Meditation'}}/>
            <Stack.Screen name="meditation/[id]" options={{headerShown:false, animation:'slide_from_bottom'}}/>
            
        </Stack>
    )
}