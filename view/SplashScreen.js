import { Text, View, Image, StatusBar } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'

export class SplashScreen extends Component {
  render() {
    return (
      <View>
        <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
        <Gambar navigation={this.props.navigation}></Gambar>
      </View>
    )
  }
}

const Gambar =({navigation})=> (
    <View>
        <Image source={require('../assets/images/splashscreen.png')} style={{ width:420, height:812, position:'absolute' }}></Image>
        <View style={{ paddingLeft:40, paddingTop:30, marginBottom:400 }}>
            <Text style={{ fontFamily:'Montserrat-Bold', fontSize:32, color:'#511AEF' }}>KarirKu</Text>
            <Text style={{ fontFamily:'Montserrat-Bold', fontSize:32, color:'#FFFFFF' }}>Temukan</Text>
            <Text style={{ fontFamily:'Montserrat-Bold', fontSize:32, color:'#511AEF' }}>Pekerjaanmu</Text>
            <Text style={{ fontFamily:'Montserrat-Bold', fontSize:32, color:'#FFFFFF' }}>dengan Mudah</Text>
        </View>
        <BaseButton style={{ alignItems:'center', marginBottom:20 }} onPress={()=>{navigation.navigate('Login')}}>
            <View style={{ backgroundColor:'#511AEF', height:45, width:200, alignItems:'center', flexDirection:'row', justifyContent:'center' }}>
                <Text style={{fontFamily:'Poppins-Regular', fontSize:16, color:'white' }}>Login</Text>
            </View>
        </BaseButton>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:14, color:'#fff', marginRight:5 }}>Kamu belum punya akun?</Text>
            <BaseButton onPress={()=>{navigation.navigate('Register')}}>
                <Text style={{ fontFamily:'Poppins-Regular', fontSize:14, color:'#511AEF' }}>Register</Text>
            </BaseButton>
        </View>
    </View>
)

export default SplashScreen