import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import ArrowLeft from "@expo/vector-icons/Feather";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function MyProfileScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("User Name");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState("male");
  const [mobileNumber, setMobileNumber] = useState("");

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-zinc-200">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="p-2"
        >
          <ArrowLeft size={24} color="#27272a" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-zinc-900 ml-4">My Profile</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        {/* Profile Picture */}
        <View className="items-center mb-8">
          <Image
            source={require("../../assets/images/profile_pic.png")}
            className="w-24 h-24 rounded-full"
          />
        </View>

        {/* Basic Detail Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-zinc-900 mb-4">Basic Detail</Text>
          
          {/* Full Name */}
          <View className="mb-6">
            <Text className="text-sm text-zinc-500 mb-2">Full name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              className="text-base py-2 border-b border-zinc-200 text-zinc-900"
            />
          </View>

          {/* Date of Birth */}
          <View className="mb-6">
            <Text className="text-sm text-zinc-500 mb-2">Date of birth</Text>
            <TouchableOpacity 
              onPress={() => setShowDatePicker(true)}
              className="flex-row items-center justify-between py-2 border-b border-zinc-200"
            >
              <Text className="text-base text-zinc-900">
                {dateOfBirth.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </View>

          {/* Gender */}
          <View>
            <Text className="text-sm text-zinc-500 mb-2">Gender</Text>
            <View className="flex-row space-x-8">
              <TouchableOpacity 
                onPress={() => setGender('male')}
                className="flex-row items-center"
              >
                <View className={`w-5 h-5 rounded-full border-2 ${
                  gender === 'male' ? 'border-blue-500' : 'border-zinc-300'
                } items-center justify-center`}>
                  {gender === 'male' && (
                    <View className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </View>
                <Text className="text-base text-zinc-900 ml-2">Male</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => setGender('female')}
                className="flex-row items-center"
              >
                <View className={`w-5 h-5 rounded-full border-2 ${
                  gender === 'female' ? 'border-blue-500' : 'border-zinc-300'
                } items-center justify-center`}>
                  {gender === 'female' && (
                    <View className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </View>
                <Text className="text-base text-zinc-900 ml-2">Female</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Contact Detail Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-zinc-900 mb-4">Contact Detail</Text>
          
          {/* Mobile Number */}
          <View>
            <Text className="text-sm text-zinc-500 mb-2">Mobile number</Text>
            <TextInput
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              className="text-base py-2 border-b border-zinc-200 text-zinc-900"
              placeholder="Enter your mobile number"
              placeholderTextColor="#a1a1aa"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity className="w-full bg-blue-500 py-4 rounded-xl items-center">
          <Text className="text-white font-semibold text-lg">Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}