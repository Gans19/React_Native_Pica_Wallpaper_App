import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images,icons } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
const SignUp = () => {
const [form, setform] = useState({
    username :"",
    email : "",
    password : "",
})

const [isSubmitting,setIsSubmitting] = useState(false)

const submit = async()=>{


  if(!form.email || !form.password || !form.username){
    Alert.alert('error', "Please fill in all the fields")
  }

setIsSubmitting(true)

try {
  const result = await createUser(form.email, form.password, form.username)

  router.replace("/home")
} catch (error) {
  Alert.alert('error', error.message)
}finally{
  setIsSubmitting(false)

}

// createUser()
}

  return (
    <SafeAreaView className=' bg-primary h-full'>
      <ScrollView>
        <View className=' w-full h-full min-h-[85vh] justify-center  px-4 my-6'>
<Image source={images.logo} resizeMode='contain' className=" w-[115px] h-[35px]" />
        <Text className=' text-2xl text-white font-psemibold mt-10'>Sign up to PICA</Text>
       
       <FormField
       title="Username"
       value={form.username}
       handleChangeText={(e)=> setform({
        ...form,username: e
       })}
       otherStyles="mt-7"
       keyboardType="email-address"
       />
        <FormField
       title="Email"
       value={form.email}
       handleChangeText={(e)=> setform({
        ...form,email: e
       })}
       otherStyles="mt-7"
       keyboardType="email-address"
       />
       <FormField
       title="Password"
       value={form.password}
       handleChangeText={(e)=> setform({
        ...form,password: e
       })}
       otherStyles="mt-7"
     
       />

       <CustomButton title={"Sign Up"} handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />
       

       <View className=" justify-center pt-5 flex-row gap-2">
<Text className=" text-lg text-gray-100 font-pregular">
Have an account already?
</Text>
<Link href={"/sign-in"} className=' text-lg font-psemibold text-secondary'><Text>Sign In</Text></Link>
       </View>


        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp