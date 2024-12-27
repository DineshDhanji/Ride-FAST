import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQScreen() {
  const navigation = useNavigation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "How do I request a ride?",
      answer:
        "To request a ride, open the app and tap on the 'Request Ride' button. Enter your destination and pick-up location, then confirm your request. You'll be matched with an available driver shortly.",
    },
    {
      question: "How do I offer a ride?",
      answer:
        "To offer a ride, tap on the 'Offer Ride' button on the home screen. Enter your destination, route, and available seats, then post your ride offer.",
    },
    {
      question: "Is RIDE-FAST only for students?",
      answer:
        "RIDE-FAST is available for both students and faculty members of our university. You need a valid university email address to register and use the app.",
    },
    {
      question: "How are payments handled?",
      answer:
        "Payments are handled manually for now. In future, payment methods will also be integrated. The fare is calculated based on the distance and automatically charged after the ride is completed.",
    },
    {
      question: "What if I need to cancel my ride?",
      answer:
        "You can cancel a ride by going to your active rides and selecting 'Cancel Ride'. Please note that cancellations made close to the pickup time may incur a small fee to compensate the driver for their time.",
    },
    // Add more FAQ items as needed
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView className="flex-1 bg-zinc-200 dark:bg-zinc-800 px-4">
      <Text className="text-zinc-900 dark:text-zinc-100 text-2xl mt-3 mb-3">
        Question on your mind?
      </Text>
      <Text className="text-zinc-900 dark:text-zinc-100 text-lg mb-4">
        Feel free to browse and find your answer.{" "}
      </Text>
      {faqItems.map((item, index) => (
        <View key={index} className="mb-4">
          <TouchableOpacity
            onPress={() => toggleExpand(index)}
            className="flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm"
          >
            <Text className="text-base font-medium text-zinc-900 flex-1 mr-2">
              {item.question}
            </Text>
            {expandedIndex === index ? (
              <Feather name="chevron-up" size={24} color="black" />
            ) : (
              <Feather name="chevron-down" size={24} color="black" />
            )}
          </TouchableOpacity>
          {expandedIndex === index && (
            <View className="bg-zinc-100 p-4 rounded-b-lg mt-1">
              <Text className="text-base text-zinc-700">{item.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
