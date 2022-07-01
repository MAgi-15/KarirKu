import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'

export class Upload extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#FFF', flex:1 }}>
        <Header navigation={this.props.navigation}></Header>
        <UpGambar></UpGambar>
      </View>
    )
  }
}

const Header = ({navigation})=> (
    <View style={{ backgroundColor:'#FFF', paddingHorizontal:30, paddingVertical:15, flexDirection:'row', alignItems:'center', justifyContent:'space-between', elevation:1, borderBottomColor:'#D9D9D9', borderBottomWidth:1 }}>
      <BaseButton onPress={()=>{navigation.navigate('Home')}}>
        <AntDesign name='close' size={27} color={'black'} ></AntDesign>
      </BaseButton>
      <BaseButton onPress={()=>{navigation.navigate('NextUpload')}}>
        <Ionicons name='arrow-forward' size={30} color={'black'} ></Ionicons>
      </BaseButton>
    </View>
)

const UpGambar = ()=> (
    <View style={{ padding:30 }}>
        <Text style={{ marginBottom:7, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Pilih Kategori</Text>
        <View style={{ flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#454545', marginBottom:30 }}>
            <AntDesign name='caretdown' size={20} color={'black'} style={{ marginRight:10, marginBottom:5 }}></AntDesign>
            <Text style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black' }}>Pilih Kategori</Text>
        </View>
        <Text style={{ marginBottom:7, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Upload Gambar</Text>
        <View style={{ flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#454545', padding:5 }}>
            <Feather name='upload' size={20} color={'black'} style={{ marginRight:10 }}></Feather>
        </View>
    </View>
)

export default Upload