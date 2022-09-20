import { StatusBar, Text, View, Image, TextInput, Alert } from 'react-native'
import React, { Component } from 'react'
import { BaseButton, ScrollView } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Constant from '../Componen/Constant'
import axios from 'axios'

export class Register extends Component {

    constructor(props){
        super(props)
        this.state = {
            Username: '',
            Email: '',
            Password: ''
            }
        }

        registerUser = () => {
            const{ Username, Email, Password} = this.state
            let PostData = {
                "username": Username,
                "email": Email,
                "password": Password
            }
            console.log('http://192.168.0.106:8080/api/user/register')
            console.log('PostData', PostData)
            axios({
                method: 'POST',
                url: Constant.api_url +'api/user/register',
                data: PostData
            }).then((back) => {
                console.log(JSON.stringify(back))
                if (back.status===200&& back.data.message === "success" ){
                  console.log("masuk")
                  this.props.navigation.navigate('Login')
                    this.setState({
                        Username: '',
                        Email: '', 
                        Password: ''
                    })
                } else{
                  Alert.alert("Gagal", back.data.message)
                }
            }).catch ((error)=> {
                console.log("error", error)
            })
        }

        Username = (username)=> {
            this.setState({Username : username})
        }
        Email = (email)=> {
            this.setState({Email : email})
        }
        Password = (pass)=> {
            this.setState({Password : pass})
        }

  render() {
    const{ Username, Email, Password} = this.state
    console.log(Username, Email, Password)
    return (
        <View style={{ backgroundColor:'#FFF', flex:1 }}>
            <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
            <Header navigation={this.props.navigation}></Header>
            <ScrollView>
                <Logo Username={(username)=>{this.Username(username)}} Email={(email)=>{this.Email(email)}} Password={(pass)=>{this.Password(pass)}} 
                username={this.props.username} email={this.props.email} pass={this.props.pass} 
                registerUser={this.registerUser} navigation={this.props.navigation}></Logo>
            </ScrollView>
        </View>
    )
  }
}

const Header = ({navigation})=> (
    <View style={{ paddingHorizontal:20, paddingVertical:16, flexDirection:'row', alignItems:'center',  paddingVertical:10 }}>
        <BaseButton style={{ justifyContent:'flex-start', width:30 }} onPress={()=>{navigation.navigate('SplashScreen')}}>
            <Ionicons name='arrow-back' size={24} color={'#383838'} ></Ionicons>
        </BaseButton>
    </View>
)

const Logo = ({navigation, registerUser, Username, Email, Password, username, email, pass})=> (
    <View style={{ padding:20 }}>
        <View style={{ alignItems:'center', marginBottom:10, marginTop:10, justifyContent:'center' }}>
            {/* <Image style={{  }} source={require('../assets/images/logo_karrirku.png')}></Image> */}
            <Image style={{ width:280, height:185 }} source={require('../assets/images/time.png')}></Image>
            {/* <Text style={{ fontFamily:'Poppins-Medium', fontSize:24, color:'black' }}>Register</Text> */}
        </View>
        <Text style={{ fontFamily:'Poppins-Bold', fontSize:26, color:'#383838', marginLeft:20 }}>Sign up</Text>
        <View style={{ paddingHorizontal:20, paddingVertical:15, flexDirection:'row', alignItems:'center', marginBottom:10 }}>
            <View style={{ marginRight:10 }}>
                <Feather name='user' size={24} color={'#797979'}></Feather>
            </View>
            <View>
                <TextInput value = {username} onChangeText = {(username)=>{Username(username)}} style={{ fontFamily:'Poppins-Regular', fontSize:16, color: "#383838", borderBottomWidth:1, borderColor:'#B5B5B5', width:280, paddingBottom:0 }} placeholder={'Username'}></TextInput>
            </View>
        </View>
        <View style={{ paddingHorizontal:20, paddingVertical:15, flexDirection:'row', alignItems:'center', marginBottom:10 }}>
            <View style={{ marginRight:10 }}>
                <MaterialCommunityIcons name='email-outline' size={24} color={'#797979'} ></MaterialCommunityIcons>
            </View>
            <View>
                <TextInput value = {email} onChangeText = {(email)=>{Email(email)}} style={{ fontFamily:'Poppins-Regular', fontSize:16, color: "#383838", borderBottomWidth:1, borderColor:'#B5B5B5', width:280, paddingBottom:0 }} placeholder={'Email'}></TextInput>
            </View>
        </View>
        <View style={{ paddingHorizontal:20, paddingVertical:15, flexDirection:'row', alignItems:'center', marginBottom:70 }}>
            <View style={{ marginRight:10 }}>
            <Ionicons name='lock-closed-outline' size={24} color={'#797979'} ></Ionicons>
            </View>
            <View>
                <TextInput value = {pass} onChangeText = {(pass)=>{Password(pass)}} secureTextEntry style={{ fontFamily:'Poppins-Regular', fontSize:16, color: "#383838", borderBottomWidth:1, borderColor:'#B5B5B5', width:280, paddingBottom:0 }} placeholder={'Password'}></TextInput>
            </View>
        </View>
        <BaseButton style={{ alignItems:'center', marginBottom:20 }} onPress={()=> {registerUser()}}>
            <View style={{ backgroundColor:'#511AEF', paddingVertical:8, paddingHorizontal:70, alignItems:'center', flexDirection:'row', justifyContent:'center', borderRadius:8 }}>
                <Text style={{fontFamily:'Poppins-Medium', fontSize:16, color:'white' }}>Register</Text>
            </View>
        </BaseButton>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom:50 }}>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:14, color:'#0E0E0E', marginRight:5 }}>Sudah punya akun?</Text>
            <BaseButton onPress={()=>{navigation.navigate('Login')}}>
                <Text style={{ fontFamily:'Poppins-Regular', fontSize:14, color:'#511AEF' }}>Login</Text>
            </BaseButton>
        </View>
    </View>
)
export default Register