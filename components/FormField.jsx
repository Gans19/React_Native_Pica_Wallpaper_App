import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPasword, setShowPasword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className=" text-base text-gray-100 font-medium">{title}</Text>
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPasword}
          className=" flex-1 text-white font-psemibold text-base"
        />

{title === "Password" && (
          <TouchableOpacity onPress={() => setShowPasword(!showPasword)}>
            <Image
              source={!showPasword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
