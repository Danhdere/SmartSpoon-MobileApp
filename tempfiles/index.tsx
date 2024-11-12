// import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from 'expo-image-picker';
import { Button, View, Image } from 'react-native';
import { useState } from 'react';

export default function Index() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      // console.log(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView 
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Button title="Take a photo" onPress={openCamera} />
        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} resizeMode="contain"/>}
      </View>
    </SafeAreaView>
  );
}
