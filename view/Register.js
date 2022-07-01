import { StatusBar, Text, View, Image, TextInput } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

export class Register extends Component {
  render() {
    return (
        <View style={{ backgroundColor:'#FFF', flex:1 }}>
            <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
            <Header navigation={this.props.navigation}></Header>
            <Logo navigation={this.props.navigation}></Logo>
        </View>
    )
  }
}

const Header = ({navigation})=> (
    <View style={{ paddingHorizontal:20, paddingTop:20, marginBottom:50, flexDirection:'row', alignItems:'center',  paddingVertical:10 }}>
        <BaseButton style={{ justifyContent:'flex-start', width:30 }} onPress={()=>{navigation.navigate('SplashScreen')}}>
            <Ionicons name='arrow-back' size={30} color={'black'} ></Ionicons>
        </BaseButton>
        <View style={{ alignItems:'center', flex:1 }}>
            <Text style={{ fontFamily:'PlayfairDisplay-Regular', fontSize:30, color:'black' }}>KarirKu</Text>
        </View>
        <View style={{ width:30 }}></View>
    </View>
)

const Logo = ({navigation})=> (
    <View style={{ padding:20 }}>
        <View style={{ alignItems:'center', marginBottom:10 }}>
            <Image source={require('../assets/images/logo_karrirku.png')}></Image>
            <Text style={{ fontFamily:'Poppins-Medium', fontSize:24, color:'black' }}>Register</Text>
        </View>
        <View style={{ padding:20, flexDirection:'row', alignItems:'center', marginBottom:10 }}>
            <View style={{ marginRight:10 }}>
                <Feather name='user' size={27} color={'#454545'}></Feather>
            </View>
            <View>
                <TextInput style={{ fontFamily:'Poppins-Light', fontSize:16, color: "#696969", borderBottomWidth:1, borderColor:'#454545', width:280, paddingBottom:0 }} placeholder={'Username'}></TextInput>
            </View>
        </View>
        <View style={{ padding:20, flexDirection:'row', alignItems:'center', marginBottom:10 }}>
            <View style={{ marginRight:10 }}>
                <MaterialCommunityIcons name='email-outline' size={27} color={'#454545'} ></MaterialCommunityIcons>
            </View>
            <View>
                <TextInput style={{ fontFamily:'Poppins-Light', fontSize:16, color: "#696969", borderBottomWidth:1, borderColor:'#454545', width:280, paddingBottom:0 }} placeholder={'Email'}></TextInput>
            </View>
        </View>
        <View style={{ padding:20, flexDirection:'row', alignItems:'center', marginBottom:70 }}>
            <View style={{ marginRight:10 }}>
            <Ionicons name='lock-closed-outline' size={27} color={'black'} ></Ionicons>
            </View>
            <View>
                <TextInput style={{ fontFamily:'Poppins-Light', fontSize:16, color: "#696969", borderBottomWidth:1, borderColor:'#454545', width:280, paddingBottom:0 }} placeholder={'Password'}></TextInput>
            </View>
        </View>
        <BaseButton style={{ alignItems:'center', marginBottom:20 }} onPress={()=>{navigation.navigate('Register')}}>
            <View style={{ backgroundColor:'#511AEF', height:45, width:200, alignItems:'center', flexDirection:'row', justifyContent:'center' }}>
                <Text style={{fontFamily:'Poppins-Regular', fontSize:16, color:'white' }}>Register</Text>
            </View>
        </BaseButton>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:14, color:'#0E0E0E', marginRight:5 }}>Sudah punya akun?</Text>
            <BaseButton onPress={()=>{navigation.navigate('Login')}}>
                <Text style={{ fontFamily:'Poppins-Regular', fontSize:14, color:'#511AEF' }}>Login</Text>
            </BaseButton>
        </View>
    </View>
)
export default Register