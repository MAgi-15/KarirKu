import { Text, View, Image, AsyncStorage } from 'react-native'
import React, { Component } from 'react'
import { BaseButton, TextInput } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export class EditProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            Username: '',
            Email: ''
        }
    }

    UNSAFE_componentWillMount = async(filterId)=> {
        console.log("data_id", filterId)
        const value = await AsyncStorage.getItem('users');
        // console.log("dari async storage", value)
        const obj = JSON.parse(value);
        console.log("Username", obj.data.username)
        this.setState({Username : obj.data.username})
        console.log("Email", obj.data.email)
        this.setState({Email : obj.data.email})
    }

  render() {
    return (
      <View style={{ backgroundColor:'#FFF', flex:1 }}>
        <Header navigation={this.props.navigation}></Header>
        <PhotoProfile></PhotoProfile>
        <Form navigation={this.props.navigation} Username={this.state.Username} Email={this.state.Email}></Form>
      </View>
    )
  }
}

const Header = ({navigation})=> (
    <View style={{ backgroundColor:'#FFF', paddingHorizontal:20, paddingTop:20, PaddingBottom:10, marginBottom:5, flexDirection:'row', alignItems:'center', elevation:1, borderBottomColor:'#D9D9D9', borderBottomWidth:1 }}>
        <BaseButton style={{ justifyContent:'flex-start', width:30, paddingBottom:15 }} onPress={()=>{navigation.navigate('SettingProfile')}}>
            <Ionicons name='arrow-back' size={30} color={'black'} ></Ionicons>
        </BaseButton>
        <View style={{ alignItems:'center', flex:1 }}>
            <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:20, color:'black', paddingBottom:15 }}>Edit Profile</Text>
        </View>
        <View style={{ width:30 }}></View>
    </View>
)

const PhotoProfile = ()=> (
    <View style={{ padding:20, paddingTop:40 }}>
        <View style={{ paddingHorizontal:0 }}>
            {/* <View style={{ borderBottomWidth:1, borderColor:'#A5A5A5', marginBottom:10 }}></View> */}
            <View style={{ alignItems:'center', justifyContent:'center' }}>
                <Image source={require('../assets/images/photo_profile.png')}></Image>
            </View>
            {/* <View style={{ borderBottomWidth:1, borderColor:'#A5A5A5', marginBottom:10 }}></View> */}
        </View>
    </View>
)

const Form = ({navigation, Username, Email})=> (
    <View style={{ padding:20 }}>
        <View style={{ padding:20, flexDirection:'row', alignItems:'center', marginBottom:10 }}>
            <View style={{ marginRight:10 }}>
                <Feather name='user' size={27} color={'#454545'}></Feather>
            </View>
            <View>
                <TextInput style={{ fontFamily:'Poppins-Light', fontSize:16, color: "#696969", borderBottomWidth:1, borderColor:'#454545', width:280, paddingBottom:0 }} >{Username}</TextInput>
            </View>
        </View>
        <View style={{ padding:20, flexDirection:'row', alignItems:'center', marginBottom:50 }}>
            <View style={{ marginRight:10 }}>
                <MaterialCommunityIcons name='email-outline' size={27} color={'#454545'} ></MaterialCommunityIcons>
            </View>
            <View>
                <TextInput style={{ fontFamily:'Poppins-Light', fontSize:16, color: "#696969", borderBottomWidth:1, borderColor:'#454545', width:280, paddingBottom:0 }} >{Email}</TextInput>
            </View>
        </View>
        <BaseButton style={{ alignItems:'center', marginBottom:20 }} onPress={()=>{navigation.navigate('SettingProfile')}}>
            <View style={{ backgroundColor:'#511AEF', height:45, width:200, alignItems:'center', flexDirection:'row', justifyContent:'center' }}>
                <Text style={{fontFamily:'Poppins-Regular', fontSize:16, color:'white' }}>Save</Text>
            </View>
        </BaseButton>
    </View>
)

export default EditProfile