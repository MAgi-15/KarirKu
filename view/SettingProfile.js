import { StatusBar, Text, View, Image, AsyncStorage } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import { CommonActions } from '@react-navigation/native'

export class SettingProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
          Username: ''
        }
      }

    UNSAFE_componentWillMount = async()=> {
        const value = await AsyncStorage.getItem('users');
        // console.log("dari async storage", value)
        const obj = JSON.parse(value);
        console.log("Username", obj.data.username)
        this.setState({Username : obj.data.username})
    }

  render() {
    return (
      <View style={{  }}>
        <Header navigation={this.props.navigation}></Header>
        <PhotoProfile Username={this.state.Username}></PhotoProfile>
        <Menu navigation={this.props.navigation}></Menu>
        <MenuLogout navigation={this.props.navigation}></MenuLogout>
      </View>
    )
  }
}

const Header = ({navigation})=> (
    <View style={{ backgroundColor:'#FFF', paddingHorizontal:20, paddingTop:12, flexDirection:'row', alignItems:'center', elevation:2, borderBottomColor:'#D9D9D9', borderBottomWidth:.5 }}>
        <BaseButton style={{ justifyContent:'flex-start', width:30, paddingBottom:12 }} onPress={()=>{navigation.navigate('Profile')}}>
            <Ionicons name='arrow-back' size={24} color={'#383838'} ></Ionicons>
        </BaseButton>
        <View style={{ alignItems:'center', flex:1 }}>
            <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:16, color:'#383838', paddingBottom:12 }}>Setting</Text>
        </View>
        <View style={{ width:30 }}></View>
    </View>
)

const PhotoProfile = ({Username})=> (
    <View style={{ backgroundColor:'white', padding:20, paddingTop:40, marginBottom: 10, marginTop:2, elevation:.5 }}>
        <View style={{ paddingHorizontal:0 }}>
            {/* <View style={{ borderBottomWidth:1, borderColor:'#A5A5A5', marginBottom:10 }}></View> */}
            <View style={{ alignItems:'center', justifyContent:'center' }}>
                <Image style={{ marginBottom:20, flexDirection:'row' }} source={require('../assets/images/photo_profile.png')}></Image>
                <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:14, color:'black', marginBottom:10 }}>{Username}</Text>
            </View>
            {/* <View style={{ borderBottomWidth:1, borderColor:'#A5A5A5', marginBottom:10 }}></View> */}
        </View>
    </View>
)

const Menu = ({navigation})=> (
    <View style={{ backgroundColor:'white', marginBottom:30, paddingVertical:40 }}>
        <BaseButton onPress={()=>{navigation.navigate('EditProfile')}} style={{ backgroundColor:'#F2F2F2', marginHorizontal:20, paddingVertical:10, paddingHorizontal:20, borderRadius:10, flexDirection:'row', alignItems:'center', justifyContent: 'space-between', marginBottom:10 }}>
            <View style={{ flexDirection:'row', alignItems:'center' }}>
                <View style={{ backgroundColor:'#D9D9D9', padding:8, borderRadius:10, alignItems:'center', justifyContent:'center', marginRight:20, width:50, height:50 }}>
                    <MaterialCommunityIcons name='account-edit' size={32} color={'#383838'} ></MaterialCommunityIcons>
                </View>
                <Text style={{ fontFamily:'Inter-SemiBold', fontSize:14, color:'black' }}>Edit Profile</Text>
            </View>
            <MaterialIcons name='arrow-forward-ios' size={20} color={'#383838'} ></MaterialIcons>
        </BaseButton>
        {/* <View style={{ borderBottomWidth:1, borderColor:'#D9D9D9', marginBottom:10 }}></View> */}
        <BaseButton onPress={()=>{navigation.navigate('Details')}} style={{ backgroundColor:'#F2F2F2', marginHorizontal:20, paddingVertical:10, paddingHorizontal:20, borderRadius:10, flexDirection:'row', alignItems:'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection:'row', alignItems:'center' }}>
                <View style={{ backgroundColor:'#D9D9D9', padding:8, borderRadius:10, alignItems:'center', justifyContent:'center', marginRight:20, width:50, height:50 }}>
                    <MaterialCommunityIcons name='account-box-multiple' size={28} color={'#383838'} ></MaterialCommunityIcons>
                </View>
                <Text style={{ fontFamily:'Inter-SemiBold', fontSize:14, color:'black' }}>Details</Text>
            </View>
            <MaterialIcons name='arrow-forward-ios' size={20} color={'black'} ></MaterialIcons>
        </BaseButton>
    </View>
)

const MenuLogout = ({navigation})=> (
    <View style={{ backgroundColor:'#FFF', paddingVertical:20, height:110 }}>
        <BaseButton onPress={()=>{
            AsyncStorage.clear()
            navigation.dispatch(
                CommonActions.reset({
                    index:0, routes:[{
                        name:'Login'
                    }]
                })
            )
            }} style={{ backgroundColor:'#F2F2F2', marginHorizontal:20, paddingVertical:10, paddingHorizontal:20, borderRadius:10, flexDirection:'row', alignItems:'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection:'row', alignItems:'center' }}>
                <View style={{ backgroundColor:'#D9D9D9', padding:10, borderRadius:10, width:50, height:50, alignItems:'center', justifyContent:'center', marginRight:20, idth:50, height:50 }}>
                    <FontAwesome name='sign-out' size={26} color={'black'} ></FontAwesome>
                </View>
                <Text style={{ fontFamily:'Inter-SemiBold', fontSize:14, color:'black' }}>Log Out</Text>
            </View>
            <MaterialIcons name='arrow-forward-ios' size={20} color={'black'} ></MaterialIcons>
        </BaseButton>
    </View>
)

export default SettingProfile

// export class IconEditProfile extends Component {
//   render() {
//     return (
//       <View style={{ backgroundColor:'#FFF', flex:1 }}>
//         <Header></Header>
//         <PhotoProfile></PhotoProfile>
//         <Menu></Menu>
//       </View>
//     )
//   }
// }

// const Header = ({navigation})=> (
//     <View style={{ backgroundColor:'white', paddingHorizontal:30, paddingTop:20, paddingBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', elevation:5 }}>
//       <BaseButton onPress={()=>{navigation.navigate('Home')}}>
//         <Ionicons name='arrow-back' size={30} color={'black'} ></Ionicons>
//       </BaseButton>
//     </View>
// )

// const PhotoProfile = ({navigation})=> (
//     <View style={{ padding:20, paddingTop:40 }}>
//         <View style={{ paddingHorizontal:0 }}>
//             {/* <View style={{ borderBottomWidth:1, borderColor:'#A5A5A5', marginBottom:10 }}></View> */}
//             <View style={{ alignItems:'center', justifyContent:'center' }}>
//                 <Image style={{ marginBottom:10, flexDirection:'row' }} source={require('../assets/images/photo_profile.png')}></Image>
//                 <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:12, color:'black', marginBottom:10 }}>@Username</Text>
//             </View>
//             <View style={{ borderBottomWidth:1, borderColor:'#A5A5A5', marginBottom:10 }}></View>
//         </View>
//     </View>
// )

// const Menu = ()=> (
//     <View>
//         <View style={{ backgroundColor:'#F2F2F2', marginHorizontal:20, paddingVertical:10, paddingHorizontal:20, borderRadius:10, flexDirection:'row', alignItems:'center', justifyContent: 'space-between', marginVertical:10 }}>
//             <View style={{ flexDirection:'row', alignItems:'center' }}>
//                 <View style={{ backgroundColor:'#D9D9D9', padding:10, borderRadius:10, width:50, height:50, alignItems:'center', marginRight:20 }}>
//                     <Ionicons name='settings' size={30} color={'black'} ></Ionicons>
//                 </View>
//                 <Text style={{ fontFamily:'Inter-SemiBold', fontSize:14, color:'black' }}>Edit Profile</Text>
//             </View>
//             <MaterialIcons name='arrow-forward-ios' size={25} color={'black'} ></MaterialIcons>
//         </View>
//         <View style={{ backgroundColor:'#F2F2F2', marginHorizontal:20, paddingVertical:10, marginBottom:50, paddingHorizontal:20, borderRadius:10, flexDirection:'row', alignItems:'center', justifyContent: 'space-between' }}>
//             <View style={{ flexDirection:'row', alignItems:'center' }}>
//                 <View style={{ backgroundColor:'#D9D9D9', padding:10, borderRadius:10, width:50, height:50, alignItems:'center', marginRight:20 }}>
//                     <MaterialCommunityIcons name='card-account-details' size={30} color={'black'} ></MaterialCommunityIcons>
//                 </View>
//                 <Text style={{ fontFamily:'Inter-SemiBold', fontSize:14, color:'black' }}>Details</Text>
//             </View>
//             <MaterialIcons name='arrow-forward-ios' size={25} color={'black'} ></MaterialIcons>
//         </View>
//         <View style={{ borderBottomWidth:1, borderColor:'#A5A5A5', marginBottom:10, marginHorizontal:20, marginBottom:50 }}></View>
//         <View style={{ backgroundColor:'#F2F2F2', marginHorizontal:20, paddingVertical:10, marginBottom:50, paddingHorizontal:20, borderRadius:10, flexDirection:'row', alignItems:'center', justifyContent: 'space-between' }}>
//             <View style={{ flexDirection:'row', alignItems:'center' }}>
//                 <View style={{ backgroundColor:'#D9D9D9', padding:10, borderRadius:10, width:50, height:50, alignItems:'center', marginRight:20 }}>
//                     <FontAwesome name='sign-out' size={30} color={'black'} ></FontAwesome>
//                 </View>
//                 <Text style={{ fontFamily:'Inter-SemiBold', fontSize:14, color:'black' }}>Log Out</Text>
//             </View>
//             <MaterialIcons name='arrow-forward-ios' size={25} color={'black'} ></MaterialIcons>
//         </View>
//     </View>
    
// )

// export default IconEditProfile