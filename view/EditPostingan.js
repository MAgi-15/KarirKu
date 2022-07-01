import { Text, View, Image, StatusBar } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'

export class EditPostingan extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#FFF' }}>
        <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
            <EditPost navigation={this.props.navigation}></EditPost>
        </ScrollView>
      </View>
    )
  }
}

const Header = ({navigation})=> (
    <View style={{ backgroundColor:'#FFF', paddingHorizontal:20, paddingTop:20, PaddingBottom:10, marginBottom:5, flexDirection:'row', alignItems:'center', elevation:1, borderBottomColor:'#D9D9D9', borderBottomWidth:1 }}>
        <BaseButton style={{ justifyContent:'flex-start', width:30, paddingBottom:15 }} onPress={()=>{navigation.navigate('Profile')}}>
            <Ionicons name='arrow-back' size={30} color={'black'} ></Ionicons>
        </BaseButton>
        <View style={{ alignItems:'center', flex:1 }}>
            <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:20, color:'black', paddingBottom:15 }}>Edit Post</Text>
        </View>
        <View style={{ width:30 }}></View>
    </View>
)

const EditPost = ({navigation})=> (
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
            <TextInput style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black', paddingBottom:0 }}>Lowongan Kerja di Luminor Hotel Purwokerto</TextInput>
        </View>
        <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Deskripsi Perusahaan</Text>
        <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
            <TextInput style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black', paddingBottom:0 }}>Luminor Hotel Purwokerto adalah hotel bintang empat yang mulai beroperasional sejak Maret 2020.  Luminor Hotel Purwokerto berlokasi di Jalan Jenderal Sudirman No. 324, 53116 Purwokerto.</TextInput>
        </View>
        <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Nama Pekerjaan</Text>
        <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
            <TextInput style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }}>Customer Service</TextInput>
        </View>
        <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Kualifikasi</Text>
        <View style={{ flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#454545', marginBottom:40, justifyContent:'space-between' }}>
            <TextInput style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black', paddingBottom:0 }}>Kualifikasi</TextInput>
            {/* <View>
                <TextInput style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }}>Pria / Wanita</TextInput>
                <TextInput style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }}>Usia minimal 18 tahun, maksimal 25 tahun</TextInput>
                <TextInput style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }}>Sehat jasmani, rohani, tidak buta warna, tidak bertato dan bebas narkoba</TextInput>
                <TextInput style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }}>Pendidikan minimal SMA/SMK sederajat</TextInput>
                <TextInput style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }}>Fresh Graduate dipersilahkan melamar</TextInput>
                <TextInput style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }}>Memiliki kemampuan komunikasi yang baik</TextInput>
            </View> */}
            <AntDesign name='plus' size={20} color={'black'} style={{ paddingBottom:0 }}></AntDesign>
        </View>
        <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Kelengkapan Berkas</Text>
        <View style={{ flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#454545', marginBottom:40, justifyContent:'space-between' }}>
            <TextInput style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black', paddingBottom:0 }}>Kelengkapan Berkas</TextInput>
            <AntDesign name='plus' size={20} color={'black'} style={{ paddingBottom:0 }}></AntDesign>
        </View>
        <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Cara Daftar</Text>
        <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:70 }}>
            <TextInput style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black', paddingBottom:0 }} >Jika berminat silahkan kirim berkas lamaran melalui Email : contoh@gmail.com (Paling lambat 30 Juni 2022)</TextInput></View>
        <BaseButton style={{ alignItems:'center', marginBottom:100 }} onPress={()=>{navigation.navigate('Profile')}}>
            <View style={{ backgroundColor:'#511AEF', height:45, width:200, alignItems:'center', flexDirection:'row', justifyContent:'center' }}>
                <Text style={{fontFamily:'Poppins-Regular', fontSize:16, color:'white' }}>Save</Text>
            </View>
        </BaseButton>
    </View>
)

export default EditPostingan