import React from 'react';
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import icons from '@/constants/icons';
import { login } from '@/lib/appwrite';
import images from '@/constants/images';
import { useGlobalContext } from '@/lib/global-provider';

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();

    console.log('Login result:', result);

    if (result) {
      console.log('Login successful');
      // refetch({});
    } else {
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to Restate
          </Text>
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's get You Closer to {'\n'}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>
          <Text className="text-center text-lg font-rubik text-black-200 mt-12">
            Login to Restate with Google
          </Text>
          <TouchableOpacity
            className="bg-white shadow-md shadow-zinc-600 rounded-full w-full py-4 mt-5"
            onPress={handleLogin}
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                className="w-5 h-5"
                resizeMode="contain"
                source={icons.google}
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
