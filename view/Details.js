import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import { BaseButton, TextInput } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export class Details extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#FFF', flex:1 }}>
        <Header navigation={this.props.navigation}></Header>
        <PhotoProfile></PhotoProfile>
        <Form></Form>
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

const Form = ()=> (
    <View style={{ padding:20 }}>
        <View style={{ padding:20, flexDirection:'row', alignItems:'center', marginBottom:20 }}>
            <View style={{ marginRight:10 }}>
                <Feather name='user' size={27} color={'#454545'}></Feather>
            </View>
            <View>
                <Text style={{ fontFamily:'Poppins-Light', fontSize:16, color: "#696969", borderBottomWidth:1, borderColor:'#454545', width:280, paddingBottom:0 }} >Username</Text>
            </View>
        </View>
        <View style={{ padding:20, flexDirection:'row', alignItems:'center' }}>
            <View style={{ marginRight:10 }}>
                <MaterialCommunityIcons name='email-outline' size={27} color={'#454545'} ></MaterialCommunityIcons>
            </View>
            <View>
                <Text style={{ fontFamily:'Poppins-Light', fontSize:16, color: "#696969", borderBottomWidth:1, borderColor:'#454545', width:280, paddingBottom:0 }} >Email</Text>
            </View>
        </View>
    </View>
)

export default Details