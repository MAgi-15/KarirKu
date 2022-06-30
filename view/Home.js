import { Text, View, Image, StatusBar, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'

export class Home extends Component {
  render() {
    return (
      <View style={style.Header}>
        <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
          <TextHome></TextHome>
          <Postingan navigation={this.props.navigation}></Postingan>
          <Postingan navigation={this.props.navigation}></Postingan>
          <Postingan navigation={this.props.navigation}></Postingan>
          <Postingan navigation={this.props.navigation}></Postingan>
          <Postingan navigation={this.props.navigation}></Postingan>
          <Postingan navigation={this.props.navigation}></Postingan>
          <Postingan navigation={this.props.navigation}></Postingan>
          <Postingan navigation={this.props.navigation}></Postingan>
          <Postingan navigation={this.props.navigation}></Postingan>
        </ScrollView>
        <Footer navigation={this.props.navigation}></Footer>
      </View>
    )
  }
}

const Header = ({navigation})=> (
  <View style={{ backgroundColor:'white', padding:10, marginBottom:1, elevation:3 }}>
    <View style={{ flexDirection:'row', alignItems:'center', marginVertical:10 }}>
      <BaseButton style={{ paddingRight:10 }} onPress={()=>{navigation.navigate('Notifikasi')}}>
        <Ionicons name='notifications' size={30}></Ionicons>
      </BaseButton>
      <View style={{ borderWidth:2, borderColor:'#F3F3F3', borderRadius:32, paddingRight:20, paddingLeft:10 }}>
        <View style={{ flexDirection:'row' }}>
          <View style={{ paddingRight:190 }}>
            <TextInput style={{ fontSize:15, fontStyle:'normal', color: "#696969" }} placeholder={'Cari Pekerjaan'}></TextInput>
          </View>
          <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
            <Image style={{ position:'absolute', padding:5 }} source={require('../assets/icons/ellipse_search.png')}></Image>
            <AntDesign name='search1' size={20} color={'white'}></AntDesign>
          </View>
        </View>
      </View>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical:3 }}>
        <Text style={{ backgroundColor:'#F8FDFF', padding:3, elevation:2, minWidth:100, textAlign:'center' }}>Purwokerto</Text>
        <Text style={{ backgroundColor:'#F8FDFF', padding:3, elevation:2, minWidth:100, textAlign:'center' }}>Jakarta</Text>
        <Text style={{ backgroundColor:'#F8FDFF', padding:3, elevation:2, minWidth:100, textAlign:'center' }}>Yogyakarta</Text>
        <Text style={{ backgroundColor:'#F8FDFF', padding:3, elevation:2, minWidth:100, textAlign:'center' }}>Bandung</Text>
        <Text style={{ backgroundColor:'#F8FDFF', padding:3, elevation:2, minWidth:100, textAlign:'center' }}>Surabaya</Text>
    </ScrollView>
  </View>
)

const Footer = ({navigation})=> (
    <View style={{backgroundColor:'white', flexDirection:'row', justifyContent:'space-around'}}>
        <BaseButton style={{alignItems:'center', padding:10}}>
            <Image source={require('../assets/icons/home.png')} onPress={()=>{navigation.navigate('Home')}}></Image>
        </BaseButton>
        <BaseButton style={{ alignItems:'center', padding:10 }}>
            <Image source={require('../assets/icons/tambah_icon.png')}></Image>
        </BaseButton>
        <BaseButton style={{alignItems:'center', padding:10}} onPress={()=>{navigation.navigate('Profile')}}>
            <Image source={require('../assets/icons/profile_bottom.png')}></Image>
        </BaseButton>
    </View>
)

const TextHome = ()=> (
  <View style={{ backgroundColor:'white', padding:15 }}>
    <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:28, color:'black' }}>Temukan</Text>
    <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:28, color:'black' }}>Pekerjaan yang</Text>
    <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:28, color:'black' }}>kamu inginkan</Text>
    <Text style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black' }}>Menjadi salah satu bagian dari</Text>
    <Text style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black' }}>perusahaan impianmu</Text>
  </View>
)

const Postingan = ({navigation})=> (
  <View style={{ backgroundColor:'white', paddingHorizontal:20 }}>
    <View style={{ backgroundColor:'white', padding:10, marginTop:10, elevation:1, marginBottom:10 }}>
      <View style={{ flexDirection:'row' }}>
        <Image style={{ width:120, height:120, margin:10, marginRight:20 }} source={require('../assets/images/logo_luminor2.png')}></Image>
        <View>
          <View style={{ flexDirection:'row' }}>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:13, color:'black', borderBottomColor:'black', borderBottomWidth:1, marginRight:90}}>Luminor Hotel</Text>
            <Ionicons name='bookmark-outline' size={23} color={'black'}></Ionicons>
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

const style = StyleSheet.create({
  Header:{
    flex:1
  }
})

export default Home