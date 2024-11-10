import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";

import { meditations } from '@/data';
export default function MeditationDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const meditation = meditations.find((m) => m.id == Number(id));
    if (!meditation) {
        return <Text >Meditation not found!</Text>;
    }
    return (
        <SafeAreaView className="bg-red-400  00 flex-1 p-2">
            {/* Top part */}
            <View className=" flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between p-10">
                    <AntDesign name="infocirlceo" size={20} color="black" />
                    <View className="bg-gray-500 rounded-md p-2 ">
                        <Text className="text-white font-semibold">Today's Meditation</Text>
                    </View>
                    <AntDesign onPress={() => router.back()} name="close" size={20} color="black" />

                </View>
                <Text className="text-3xl mt-10 text-center font-semibold">{meditation?.title}  </Text>
            </View>
            {/* Middle */}
            <Pressable className="bg-zinc-600 self-center p-6 w-20 aspect-square rounded-full items-center justify-center">
                <FontAwesome6 name="play" size={24} color="white" />

            </Pressable>

            {/* Top part */}
            <View className=" flex-1">

                {/* Player Footer */}
                <View className="p-5 mt-auto gap-5" >
                    <View className="flex-row justify-between">

                        <MaterialIcons name="airplay" size={24} color="#5F5B53" />
                        <Ionicons name="cog-outline" size={24} color="#5F5B53" />
                    </View>

                    <View>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            value={0.5}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="lightgray"
                            maximumTrackTintColor="#000000"
                            thumbTintColor="lightgray"
                        />
                    </View>
                    <View className="flex-row justify-between">
                        <Text>03.14</Text>
                        <Text>01.14</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>



    )
}