import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { meditations } from '@/data';
import { useEffect, useState } from "react";


export default function MeditationDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [sound,setSound] = useState<Audio.Sound |undefined>();
    const [isPlaying, setIsPlaying] =useState(false);
    const [position, setPosition] =useState(0);
    const [duration, setDuration] = useState(0);


     useEffect(() => {
        const loadSound = async () => {
          const { sound } = await Audio.Sound.createAsync(
            require('@assets/meditations/mediAudio.mp3')
          );
          setSound(sound);
          //getDuration Time
          const status = await sound.getStatusAsync();
          if(status.isLoaded){
            setDuration(status.durationMillis || 0);
          }
          // setup an interval to update the playback position while playing
          const interval = setInterval(async ()=>{
            if(sound && isPlaying){
                const status = await sound.getStatusAsync();
                if (status.isLoaded){
                    setPosition(status.positionMillis || 0 );
                }
            }
          },500); // update happening every second
          return ()=>{
            clearInterval(interval);
          };
        };
    
        loadSound();
        return () => {
          if (sound) {
            sound.unloadAsync(); 
          }
        };
      }, []);

    async function playSound (){
        if(sound){
            if(isPlaying){
                await sound.pauseAsync();
                setIsPlaying(false);
            }else{
                await sound.playAsync();
                setIsPlaying(true);
            }
          
        }
    }
    const formatSeconds = (milliseconds :number)=>{
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2,'0')}`;
    }

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
            <Pressable onPress={playSound} className="bg-zinc-600 self-center p-6 w-20 aspect-square rounded-full items-center justify-center">
                <FontAwesome6 name={isPlaying? "pause" : "play"} size={24} color="white" />

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
                            value={position}
                            minimumValue={0}
                            maximumValue={duration}
                            minimumTrackTintColor="lightgray"
                            maximumTrackTintColor="#000000"
                            thumbTintColor="lightgray"
                            onSlidingComplete={async(value)=>{
                                if(sound) {
                                   await sound.setPositionAsync(value)
                                   setPosition(value)
                                }
                            }}
                        />
                    </View>
                    <View className="flex-row justify-between">
                        <Text>{formatSeconds(position)}</Text>
                        <Text>{formatSeconds(duration-position)}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>



    )
}