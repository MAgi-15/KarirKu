import { StatusBar, Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'

export class Profile extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#FFF' }}>
        <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView style={{ marginBottom:70 }}>
          <PhotoProfile navigation={this.props.navigation}></PhotoProfile>
          <Postingan navigation={this.props.navigation}></Postingan>
          <Postingan navigation={this.props.navigation}></Postingan>
          <Postingan navigation={this.props.navigation}></Postingan>
          <Postingan navigation={this.props.navigation}></Postingan>
          <Postingan navigation={this.props.navigation}></Postingan>
          <Postingan navigation={this.props.navigation}></Postingan>
        </ScrollView>
      </View>
    )
  }
}

const Header = ({navigation})=> (
    <View style={{ backgroundColor:'#FFF', paddingHorizontal:30, paddingTop:20, paddingBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', elevation:4,zIndex:9, marginBottom:20 }}>
      <BaseButton onPress={()=>{navigation.navigate('Home')}}>
        <Ionicons name='arrow-back' size={30} color={'black'} ></Ionicons>
      </BaseButton>
      <BaseButton onPress={()=>{navigation.navigate('SettingProfile')}}>
        <FontAwesome5 name='edit' size={20} color={'black'} ></FontAwesome5>
      </BaseButton>
    </View>
)

const PhotoProfile = ({navigation})=> (
  <View style={{ padding:20 }}>
    <View style={{ paddingHorizontal:10 }}>
      <View style={{ alignItems:'center', justifyContent:'center'}}>
        <Image style={{ marginBottom:20, flexDirection:'row' }} source={require('../assets/images/photo_profile.png')}></Image>
        <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:14, color:'black', marginBottom:60 }}>@Username</Text>
      </View>
      <View style={{ borderBottomWidth:1, borderColor:'#D9D9D9', marginBottom:-60 }}></View>
    </View>
    <View style={{ alignItems:'center', justifyContent:'center' }}>
      <View style={{ backgroundColor:'white', elevation:5, width:190, height:55, padding:10 }}>
        <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
          <BaseButton onPress={()=>{navigation.navigate('Profile')}}>
            <Foundation name='upload' size={30} color={'black'} style={{ marginTop:-2 }} ></Foundation>
          </BaseButton>
          <View style={{ borderRightColor:'black', borderRightWidth:2, marginHorizontal:37, paddingVertical:20, marginTop:-2 }}></View>
          <BaseButton onPress={()=>{navigation.navigate('ProfileSimpan')}}>
            <Ionicons name='bookmark' size={27} color={'black'} style={{ marginTop:-2 }} ></Ionicons>
          </BaseButton>
        </View>
      </View>
    </View>
  </View>
)

const Postingan = ({navigation})=> (
  <View style={{ paddingHorizontal:20, marginBottom:10 }}>
    <View style={{ backgroundColor:'white', padding:10, marginTop:10, elevation:1 }}>
      <View style={{ flexDirection:'row' }}>
        <Image style={{ width:120, height:120, margin:10, marginRight:20 }} source={require('../assets/images/logo_luminor2.png')}></Image>
        <View>
          <View style={{ flexDirection:'row' }}>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:13, color:'black', borderBottomColor:'black', borderBottomWidth:1, marginRight:90}}>Luminor Hotel</Text>
            <Entypo name='dots-three-vertical' size={18} color={'black'}></Entypo>
          </View>
          <BaseButton style={{ marginVertical:10, marginBottom:10 }} onPress={()=>{navigation.navigate('DetailHome')}}>
            <Text style={{ fontFamily:'Poppins-Medium', fontSize:14, color:'black' }}>Lowongan Kerja di Luminor</Text>
            <Text style={{ fontFamily:'Poppins-Medium', fontSize:14, color:'black' }}>Hotel Purwokerto</Text>
            <Text style={{ fontFamily:'Poppins-Light', fontSize:12, color:'black', borderBottomColor:'black' }}>16/06/2022</Text>
          </BaseButton>
          <View style={{ flexDirection:'row', alignItems:'center' }}>
            <View style={{ flexDirection:'row', alignContent:'center', marginRight:20 }}>
              <AntDesign name='like2' size={17} color={'black'} style={{ marginRight:5 }}></AntDesign>
              <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>20</Text>
            </View>
            <BaseButton style={{ flexDirection:'row', alignContent:'center' }} onPress={()=>{navigation.navigate('CommentScreen')}}>
              <Feather name='message-square' size={17} color={'black'} style={{ marginRight:5 }}></Feather>
              <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>9</Text>
            </BaseButton>
          </View>
        </View>
      </View>
    </View>
  </View>
)
export default Profile