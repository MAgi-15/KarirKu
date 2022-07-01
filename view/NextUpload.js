import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'

export class NextUpload extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#FFF', flex:1 }}>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
            <UpAll navigation={this.props.navigation}></UpAll>
        </ScrollView>
      </View>
    )
  }
}

const Header = ({navigation})=> (
    <View style={{ backgroundColor:'#FFF', paddingHorizontal:30, paddingVertical:15, elevation:1, borderBottomColor:'#D9D9D9', borderBottomWidth:1 }}>
      <BaseButton onPress={()=>{navigation.navigate('Upload')}}>
        <Ionicons name='arrow-back' size={30} color={'black'} ></Ionicons>
      </BaseButton>
    </View>
)

const UpAll = ({navigation})=> (
    <View style={{ padding:30 }}>
        <Text style={{ marginBottom:7, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Pilih Kategori</Text>
        <View style={{ flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
            <AntDesign name='caretdown' size={20} color={'black'} style={{ marginRight:10, marginBottom:5 }}></AntDesign>
            <Text style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black' }}>Purwokerto</Text>
        </View>
        <Text style={{ marginBottom:7, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Upload Gambar</Text>
        <View style={{ flexDirection:'row', borderBottomWidth:1, borderColor:'#454545', padding:5, marginBottom:40, justifyContent:'space-between' }}>
            <Image source={require('../assets/images/logo_luminor2.png')}></Image>
            <Feather name='upload' size={20} color={'black'} style={{ marginTop:70 }}></Feather>
        </View>
        <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Judul</Text>
        <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
            <TextInput style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }} placeholder={'Judul'}></TextInput>
        </View>
        <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Deskripsi Perusahaan</Text>
        <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
            <TextInput style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }} placeholder={'Deskripsi Perusahaan'}></TextInput>
        </View>
        <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Nama Pekerjaan</Text>
        <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
            <TextInput style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }} placeholder={'Nama Pekerjaan'}></TextInput>
        </View>
        <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Kualifikasi</Text>
        <View style={{ flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#454545', marginBottom:40, justifyContent:'space-between' }}>
            <TextInput style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }} placeholder={'Kualifikasi'}></TextInput>
            <AntDesign name='plus' size={20} color={'black'} style={{ paddingBottom:0 }}></AntDesign>
        </View>
        <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Kelengkapan Berkas</Text>
        <View style={{ flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#454545', marginBottom:40, justifyContent:'space-between' }}>
            <TextInput style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }} placeholder={'Kelengkapan Berkas'}></TextInput>
            <AntDesign name='plus' size={20} color={'black'} style={{ paddingBottom:0 }}></AntDesign>
        </View>
        <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Cara Daftar</Text>
        <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:70 }}>
            <TextInput style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }} placeholder={'Cara Daftar'}></TextInput>
        </View>
        <BaseButton style={{ alignItems:'center', marginBottom:40 }} onPress={()=>{navigation.navigate('Home')}}>
            <View style={{ backgroundColor:'#511AEF', height:45, width:200, alignItems:'center', flexDirection:'row', justifyContent:'center' }}>
                <Text style={{fontFamily:'Poppins-Regular', fontSize:16, color:'white' }}>Upload</Text>
            </View>
        </BaseButton>
    </View>
)

export default NextUpload