import { StatusBar, Text, View, Image, Modal, Button, AsyncStorage } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

export class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      StatusModal : false,
      Username: ''
    }
  }

UNSAFE_componentWillMount = async(filterId)=> {
  console.log("data_id", filterId)
  const value = await AsyncStorage.getItem('users');
  // console.log("dari async storage", value)
  const obj = JSON.parse(value);
  console.log("Username", obj.data.username)
  this.setState({Username : obj.data.username}) 
  axios({
    method: 'GET',
    url: Constant.api_url+'api/uploadThread/threadbyUser/' + obj.data.username,
  }).then( (parameter)=> {
    console.log(JSON.stringify(parameter.data, null, 2))
    this.setState({listUserThread: parameter.data.data})
  })
}

openModal = ()=> {
    this.setState({StatusModal : true})
}
closeModal = ()=> {
    this.setState({StatusModal : false})
}

  render() {
    return (
      <View style={{ backgroundColor:'#FFF', flex:1 }}>
        <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
          <PhotoProfile navigation={this.props.navigation} Username={this.state.Username}></PhotoProfile>
          <Postingan closeModal={function(){this.closeModal()}} openModal={()=>{this.openModal()}} navigation={this.props.navigation}></Postingan>
          <Postingan closeModal={function(){this.closeModal()}} openModal={()=>{this.openModal()}} navigation={this.props.navigation}></Postingan>
        </ScrollView>
        <Footer navigation={this.props.navigation}></Footer>
        <Modal visible={this.state.StatusModal} transparent>
          <View style={{flex:1, backgroundColor:'rgba(80,80,80,.5)', alignItems:'center', justifyContent:'center'}}>
              <View style={{backgroundColor:'white', padding:15, minWidth:150, elevation:2}}>
                <AntDesign name='closecircleo' size={20} color={'black'} onPress={()=>{this.closeModal()}} style={{ marginBottom:10 }} ></AntDesign>
                  <Pressable style={{marginVertical:5, padding:5, borderWidth:1 }}  android_ripple={{color:'#ffdddd'}} onPress={()=>{this.closeModal(this.props.navigation.navigate('EditPostingan'))}}>
                      <Text style={{fontFamily:'Poppins-Regular', fontSize:15, color:'black'}}>Edit</Text>
                  </Pressable>
                  <Pressable style={{ marginVertical:5, padding:5, borderWidth:1 }} android_ripple={{color:'#ffdddd'}} onPress={()=> {this.closeModal('Delete')}}>
                      <Text style={{fontFamily:'Poppins-Regular', fontSize:15, color:'black'}}>Delete</Text>
                  </Pressable>
              </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const Header = ({navigation})=> (
    <View style={{ backgroundColor:'#FFF', paddingHorizontal:30, paddingVertical:15, flexDirection:'row', alignItems:'center', justifyContent:'space-between', elevation:1, borderBottomColor:'#D9D9D9', borderBottomWidth:1 }}>
      <BaseButton onPress={()=>{navigation.navigate('Home')}}>
        <Ionicons name='arrow-back' size={30} color={'black'} ></Ionicons>
      </BaseButton>
      <BaseButton onPress={()=>{navigation.navigate('SettingProfile')}}>
        <FontAwesome5 name='edit' size={20} color={'black'} ></FontAwesome5>
      </BaseButton>
    </View>
)

const Footer = ({navigation})=> (
  <View style={{ backgroundColor:'#FFF', flexDirection:'row', justifyContent:'space-around', borderTopColor:'#D9D9D9', borderTopWidth:1 }}>
      <BaseButton style={{alignItems:'center', padding:3, justifyContent:'center'}} onPress={()=>{navigation.navigate('Home')}}>
          <Foundation name='home' size={32} color={'black'}></Foundation>
          <Text style={{ color:'black' }}>Home</Text>
      </BaseButton>
      <BaseButton style={{ alignItems:'center', padding:3, justifyContent:'center' }} onPress={()=>{navigation.navigate('Upload')}}>
          <SimpleLineIcons name='plus' size={38} color={'black'}></SimpleLineIcons>
      </BaseButton>
      <BaseButton style={{alignItems:'center', padding:3, justifyContent:'center'}} onPress={()=>{navigation.navigate('Profile')}}>
          <MaterialCommunityIcons name='account-circle-outline' size={32} color={'black'}></MaterialCommunityIcons>
          <Text style={{ color:'black' }}>Profile</Text>
      </BaseButton>
  </View>
)

const PhotoProfile = ({navigation, Username})=> (
  <View style={{ marginBottom:15, marginTop:50, paddingHorizontal:20 }}>
    <View style={{ paddingHorizontal:10 }}>
      <View style={{ alignItems:'center', justifyContent:'center'}}>
        <Image style={{ marginBottom:20, flexDirection:'row' }} source={require('../assets/images/photo_profile.png')}></Image>
        <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:15, color:'black', marginBottom:60 }}>{Username}</Text>
      </View>
      <View style={{ borderBottomWidth:1, borderColor:'#D9D9D9', marginBottom:-60 }}></View>
    </View>
    <View style={{ alignItems:'center', justifyContent:'center' }}>
      <View style={{ backgroundColor:'white', elevation:5, width:190, height:55, padding:10 }}>
        <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
          <BaseButton onPress={()=>{navigation.navigate('Profile')}}>
            <MaterialCommunityIcons name='folder-upload' size={30} color={'black'} style={{ marginTop:-2 }} ></MaterialCommunityIcons>
          </BaseButton>
          <View style={{ borderRightColor:'black', borderRightWidth:2, marginHorizontal:37, paddingVertical:20, marginTop:-2 }}></View>
          <BaseButton onPress={()=>{navigation.navigate('ProfileSimpan')}}>
            <Ionicons name='bookmark-outline' size={27} color={'black'} style={{ marginTop:-2 }} ></Ionicons>
          </BaseButton>
        </View>
      </View>
    </View>
  </View>
)

const Postingan = ({navigation, openModal})=> (
  <View style={{ paddingHorizontal:20, marginBottom:10 }}>
    <View style={{ backgroundColor:'white', padding:10, marginTop:10, elevation:1 }}>
      <View style={{ flexDirection:'row' }}>
        <Image style={{ width:120, height:120, margin:10, marginRight:20 }} source={require('../assets/images/logo_luminor2.png')}></Image>
        <View>
          <View style={{ flexDirection:'row' }}>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:13, color:'black', borderBottomColor:'black', borderBottomWidth:1, marginRight:90}}>Luminor Hotel</Text>
            <Pressable android_ripple={{color:'#ffdddd'}} onPress={()=>{openModal()}}>
              <Entypo name='dots-three-vertical' size={18} color={'black'}></Entypo>
            </Pressable>
          </View>
          <BaseButton style={{ marginVertical:10, marginBottom:10 }} onPress={()=>{navigation.navigate('DetailHome')}}>
            <Text style={{ fontFamily:'Poppins-Medium', fontSize:14, color:'black' }}>Lowongan Kerja di Luminor</Text>
            <Text style={{ fontFamily:'Poppins-Medium', fontSize:14, color:'black' }}>Hotel Purwokerto</Text>
            <Text style={{ fontFamily:'Poppins-Light', fontSize:12, color:'black', borderBottomColor:'black' }}>16/06/2022</Text>
          </BaseButton>
          <View style={{ flexDirection:'row', alignItems:'center' }}>
            <BaseButton style={{ flexDirection:'row', alignContent:'center', marginRight:20 }}>
              <AntDesign name='like2' size={17} color={'black'} style={{ marginRight:5 }}></AntDesign>
              <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>20</Text>
            </BaseButton>
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