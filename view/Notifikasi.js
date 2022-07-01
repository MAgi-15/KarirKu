import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'

export class Notifikasi extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#FFF', flex:1 }}>
        <Header navigation={this.props.navigation}></Header>
        <PesanNotif></PesanNotif>
        <PesanNotif1></PesanNotif1>
      </View>
    )
  }
}

const Header = ({navigation})=> (
  <View style={{ backgroundColor:'#FFF', paddingHorizontal:20, paddingTop:20, PaddingBottom:10, marginBottom:5, flexDirection:'row', alignItems:'center', elevation:2, borderBottomColor:'#D9D9D9', borderBottomWidth:1 }}>
      <BaseButton style={{ justifyContent:'flex-start', width:30, paddingBottom:15 }} onPress={()=>{navigation.navigate('Home')}}>
          <Ionicons name='arrow-back' size={30} color={'black'} ></Ionicons>
      </BaseButton>
      <View style={{ alignItems:'center', flex:1 }}>
          <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:20, color:'black', paddingBottom:15 }}>Notifikasi</Text>
      </View>
      <View style={{ width:30 }}></View>
  </View>
)

const PesanNotif = ()=> (
  <View style={{ paddingHorizontal:20, paddingVertical:10, borderBottomWidth:1, borderColor:'#D9D9D9', marginBottom:20 }}>
    <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black', marginBottom:10 }}>Today</Text>
    <View style={{ backgroundColor:'#FFF', padding:10, flexDirection:'row', alignItems:'center', borderRadius:10, elevation:1, marginBottom:10 }}>
      <Image source={require('../assets/images/photo_profile.png')} style={{ width:45, height:45, marginRight:10 }}></Image>
      <View>
        <Text style={{ fontFamily:'Poppins-Regular', fontSize:14, color:'black' }}>Luminor Hotel membagikan postingan</Text>
        <Text style={{ fontFamily:'Poppins-Light', fontSize:12, color:'black' }}>16-05-2022 / 20.00</Text>
      </View>
    </View>
  </View>
)
const PesanNotif1 = ()=> (
  <View style={{ paddingHorizontal:20, paddingVertical:10 }}>
    <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black', marginBottom:10 }}>Yesterday</Text>
    <View style={{ backgroundColor:'#FFF', padding:10, flexDirection:'row', alignItems:'center', borderRadius:10, elevation:1, marginBottom:10 }}>
      <Image source={require('../assets/images/photo_profile.png')} style={{ width:45, height:45, marginRight:10 }}></Image>
      <View>
        <Text style={{ fontFamily:'Poppins-Regular', fontSize:14, color:'black' }}>Muhammad Agi menyuki postingan anda</Text>
        <Text style={{ fontFamily:'Poppins-Light', fontSize:12, color:'black' }}>15-05-2022 / 20.00</Text>
      </View>
    </View>
    <View style={{ backgroundColor:'#FFF', padding:10, flexDirection:'row', alignItems:'center', borderRadius:10, elevation:1, marginBottom:50 }}>
      <Image source={require('../assets/images/photo_profile.png')} style={{ width:45, height:45, marginRight:10 }}></Image>
      <View>
        <Text style={{ fontFamily:'Poppins-Regular', fontSize:14, color:'black' }}>Jessica mengomentari postingan anda</Text>
        <Text style={{ fontFamily:'Poppins-Light', fontSize:12, color:'black' }}>15-05-2022 / 17.00</Text>
      </View>
    </View>
  </View>
)

export default Notifikasi