import { Text, View, Image, AsyncStorage } from 'react-native'
import React, { Component } from 'react'
import { BaseButton, TextInput } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export class Details extends Component {
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
            <Form Username={this.state.Username} Email={this.state.Email}></Form>
        </View>
        )
    }
}

const Header = ({navigation})=> (
    <View style={{ backgroundColor:'#FFF', paddingHorizontal:20, paddingVertical:20, 
    marginBottom:5, alignItems:'center', elevation:1, borderBottomColor:'#D9D9D9', borderBottomWidth:1 }}>
        <BaseButton onPress={()=>{navigation.navigate('SettingProfile')}}>
            <Ionicons name='arrow-back' size={30} color={'black'} ></Ionicons>
        </BaseButton>
        <View style={{ alignItems:'center', flex:1 }}>
            <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:20, color:'black', paddingBottom:15 }}>Details</Text>
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

const Form = ({Username, Email})=> (
    <View style={{ padding:20 }}>
        <View style={{ padding:20, flexDirection:'row', alignItems:'center', marginBottom:20 }}>
            <View style={{ marginRight:10 }}>
                <Feather name='user' size={27} color={'#454545'}></Feather>
            </View>
            <View>
                <Text style={{ fontFamily:'Poppins-Regular', fontSize:16, color: "#696969", borderBottomWidth:1, borderColor:'#454545', width:280, paddingBottom:0 }} >{Username}</Text>
            </View>
        </View>
        <View style={{ padding:20, flexDirection:'row', alignItems:'center' }}>
            <View style={{ marginRight:10 }}>
                <MaterialCommunityIcons name='email-outline' size={27} color={'#454545'} ></MaterialCommunityIcons>
            </View>
            <View>
                <Text style={{ fontFamily:'Poppins-Regular', fontSize:16, color: "#696969", borderBottomWidth:1, borderColor:'#454545', width:280, paddingBottom:0 }} >{Email}</Text>
            </View>
        </View>
    </View>
)

export default Details