import { Text, View, Image, StatusBar } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'

export class DetailHome extends Component {
  render() {
    const data_kirim = this.props.route.params.data
    console.log("data kirim", data_kirim)
    return (
      <View style={{ backgroundColor:'#fff', flex:1 }}>
        <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
            <Postingan data_kirim={data_kirim}></Postingan>
        </ScrollView>
      </View>
    )
  }
}

const Header = ({ navigation }) => (
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', elevation: 1, borderBottomColor: '#D9D9D9', borderBottomWidth: 0.5 }}>
      <BaseButton style={{ justifyContent: 'flex-start', width: 30 }} onPress={() => { navigation.navigate('Home') }}>
        <Ionicons name='arrow-back' size={24} color={'#383838'} ></Ionicons>
      </BaseButton>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#383838' }}>Detail Post</Text>
      </View>
      <View style={{ width: 30 }}></View>
    </View>
  )

const Postingan = ({data_kirim})=> (
    <View style={{ paddingVertical:16, paddingHorizontal:20}}>
        <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:16, color:'black', marginBottom:16, width:340 }}>{data_kirim.judul}</Text>
        <View style={{ alignItems:'center', justifyContent:'center', marginBottom:16 }}>
            <Image style={{ width:370, height:200 }} source={{uri: Constant.api_url+ data_kirim.gambar}}></Image>
        </View>
        <View style={{ marginBottom:15 }}>
            <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:14, color:'black', marginRight:10 }}>Kategori :</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:13, color:'black' }}>{data_kirim.kategori}</Text>
        </View>
        <View style={{ marginBottom:15 }}>
            <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:14, color:'black', marginRight:10 }}>Pekerjaan :</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:13, color:'black', width:250 }}>{data_kirim.nama_pekerjaan}</Text>
        </View>
        <View style={{ marginBottom:15 }}>
            <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:14, color:'black', marginRight:10 }}>Deskripsi :</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:13, color:'black', width:340 }}>{data_kirim.deskripsi}</Text>
        </View>
        <View style={{ marginBottom:15 }}>
            <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:14, color:'black' }}>Kualifikasi :</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:13, color:'black', width:340 }}>{data_kirim.kualifikasi}</Text>
        </View>
        <View style={{ marginBottom:15 }}>
            <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:14, color:'black' }}>Kelengkapan Berkas :</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:13, color:'black', width:340 }}>{data_kirim.kelengkapan_berkas}</Text>
        </View>
        <View style={{ marginBottom:20 }}>
            <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:14, color:'black' }}>Cara Daftar :</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:13, color:'black', width:340 }}>{data_kirim.cara_daftar}</Text>
            {/* <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>Email : contoh@gmail.com</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>(Paling lambat 30 Juni 2022)</Text> */}
        </View>
        <View style={{ backgroundColor:'white', padding:10, borderColor:'#D9D9D9', borderWidth:1, borderRadius:10, flexDirection:'column', alignItems:'center' }}>
            <Image style={{ flexDirection:'row', width:40, height:40, marginRight:10, marginBottom:8 }} source={require('../assets/images/photo_profile.png')}></Image>
            <Text style={{ fontFamily:'Poppins-Bold', fontSize:14, color:'#511AEF' }}>{data_kirim.username}</Text>
        </View>
    </View>
)

export default DetailHome