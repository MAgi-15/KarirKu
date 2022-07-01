import { Text, View, Image, StatusBar } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'

export class CommentScreen extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#FFF', flex:1 }}>
        <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
          <Postingan></Postingan>
          <Text style={{ paddingHorizontal:20, paddingVertical:5, color:'black' }}>Komentar</Text>
          <Komentar></Komentar>
          <Komentar></Komentar>
          <Komentar></Komentar>
          <Komentar></Komentar>
          <Komentar></Komentar>
          <Komentar></Komentar>
        </ScrollView>
        <Footer navigation={this.props.navigation}></Footer>
      </View>
    )
  }
}

const Header = ({navigation})=> (
  <View style={{ backgroundColor:'#FFF', paddingHorizontal:20, paddingTop:20, PaddingBottom:10, marginBottom:5, flexDirection:'row', alignItems:'center', elevation:1, borderBottomColor:'#D9D9D9', borderBottomWidth:1 }}>
      <BaseButton style={{ justifyContent:'flex-start', width:30, paddingBottom:15 }} onPress={()=>{navigation.navigate('Home')}}>
          <Ionicons name='arrow-back' size={30} color={'black'} ></Ionicons>
      </BaseButton>
      <View style={{ alignItems:'center', flex:1 }}>
          <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:20, color:'black', paddingBottom:15 }}>Komentar</Text>
      </View>
      <View style={{ width:30 }}></View>
  </View>
)

const Postingan = ()=> (
  <View style={{ backgroundColor:'#FFF', paddingVertical:20, marginBottom:10, elevation:2 }}>
    <View style={{ alignItems:'center', justifyContent:'center', marginBottom:10 }}>
        <Image style={{ width:120, height:120 }} source={require('../assets/images/logo_luminor2.png')}></Image>
    </View>
    <View style={{ paddingHorizontal:30, paddingVertical:20 }}>
        <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:14, color:'black', marginBottom:20 }}>Lowongan Kerja di Luminor Hotel Purwokerto</Text>
        <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>Luminor Hotel Purwokerto adalah hotel bintang empat yang mulai beroperasional sejak Maret 2020.  Luminor Hotel Purwokerto berlokasi di Jalan Jenderal Sudirman No. 324, 53116 Purwokerto.</Text>
    </View>
  </View>
)

const Komentar = ()=> (
  <View style={{ paddingHorizontal:20, paddingVertical:10, borderBottomWidth:1, borderColor:'#D9D9D9', marginBottom:10 }}>
      <View style={{ flexDirection:'row', alignItems:'center', marginBottom:2 }}>
        <Image source={require('../assets/images/photo_profile.png')} style={{ width:40, height:40, marginRight:10 }}></Image>
        <View>
          <Text style={{ fontFamily:'Poppins-Bold', fontSize:12, color:'black' }}>Chika</Text>
          <Text style={{ fontFamily:'Poppins-Light', fontSize:10, color:'black' }}>16-05-2022 / 20.00</Text>
        </View>
      </View>
      <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black', marginLeft:50 }}>Ada formulir pendaftarannya ngga kak???</Text>
    {/* <View style={{ backgroundColor:'#FFF', padding:10, borderRadius:5, elevation:1, marginBottom:10 }}>
      <View style={{ flexDirection:'row', alignItems:'center', marginBottom:2 }}>
        <Image source={require('../assets/images/photo_profile.png')} style={{ width:40, height:40, marginRight:10 }}></Image>
        <View>
          <Text style={{ fontFamily:'Poppins-Bold', fontSize:12, color:'black' }}>Luminor Hotel</Text>
          <Text style={{ fontFamily:'Poppins-Light', fontSize:10, color:'black' }}>16-05-2022 / 22.00</Text>
        </View>
      </View>
      <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black', marginLeft:50 }}>Ngga kak,,langsung kirim berkasnya saja di email yg tertera di situ</Text>
    </View> */}
  </View>
)

const Footer = ({navigation})=> (
  <View style={{ backgroundColor:'#FFF', paddingVertical:10,elevation:1, borderTopColor:'#D9D9D9', borderTopWidth:1, paddingHorizontal:20, elevation:5 }}>
      <View style={{ borderWidth:2, borderColor:'#F3F3F3', borderRadius:32, paddingRight:20, paddingLeft:10, paddingVertical:1 }}>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
          <View style={{  }}>
            <TextInput style={{ fontSize:15, fontStyle:'normal', color: "#696969" }} placeholder={'Beri Komentar'}></TextInput>
          </View>
          <BaseButton style={{ flexDirection:'row', justifyContent:'center', alignItems:'center' }} onPress={()=>{navigation.navigate('CommentScreen')}}>
            <Image style={{ position:'absolute', padding:5 }} source={require('../assets/icons/ellipse_search.png')}></Image>
            <Ionicons name='send-sharp' size={20} color={'white'}></Ionicons>
          </BaseButton>
        </View>
      </View>
  </View>
)

export default CommentScreen