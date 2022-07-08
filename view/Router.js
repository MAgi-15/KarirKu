// import { Text, View } from 'react-native'
// import React, { Component } from 'react'
// import { NavigationContainer } from "@react-navigation/native"
// import { createStackNavigator } from "@react-navigation/stack"
// import Home from './Home'

// const Stack = createStackNavigator()

// export default function Router() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator headerMode='none' initialRouteName='Home'>
//                 <Stack.Screen name='Home' component={Home}></Stack.Screen>
//             </Stack.Navigator>
//         </NavigationContainer>
//     ) 

import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Home from './Home'
import Login from './Login'
import Register from './Register'
import DetailHome from './DetailHome'
import Profile from './Profile'
import SplashScreen from './SplashScreen'
import ProfileSimpan from './ProfileSimpan'
import Notifikasi from './Notifikasi'
import SettingProfile from './SettingProfile'
import CommentScreen from './CommentScreen'
import Upload from './Upload'
import NextUpload from './NextUpload'
import EditProfile from './EditProfile'
import Details from './Details'
import EditPostingan from './EditPostingan'

const Stack = createStackNavigator()

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' initialRouteName='SplashScreen'>
        <Stack.Screen name='Home' component={Home}>

        </Stack.Screen>
        <Stack.Screen name='Login' component={Login}>

        </Stack.Screen>
        <Stack.Screen name='Register' component={Register}>

        </Stack.Screen>
        <Stack.Screen name='DetailHome' component={DetailHome}>

        </Stack.Screen>
        <Stack.Screen name='Profile' component={Profile}>

        </Stack.Screen>
        <Stack.Screen name='SplashScreen' component={SplashScreen}>

        </Stack.Screen>
        <Stack.Screen name='CommentScreen' component={CommentScreen}>

        </Stack.Screen>
        <Stack.Screen name='SettingProfile' component={SettingProfile}>

        </Stack.Screen>
        <Stack.Screen name='ProfileSimpan' component={ProfileSimpan}>

        </Stack.Screen>
        <Stack.Screen name='Notifikasi' component={Notifikasi}>

        </Stack.Screen>
        <Stack.Screen name='Upload' component={Upload}>

        </Stack.Screen>
        <Stack.Screen name='NextUpload' component={NextUpload}>

        </Stack.Screen>
        <Stack.Screen name='EditProfile' component={EditProfile}>

        </Stack.Screen>
        <Stack.Screen name='Details' component={Details}>

        </Stack.Screen>
        <Stack.Screen name='EditPostingan' component={EditPostingan}>

        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  )
}
