import { Text, View, Image, StatusBar } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'

export class DetailHome extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#fff' }}>
        <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
            <Postingan></Postingan>
        </ScrollView>
      </View>
    )
  }
}

const Header = ({navigation})=> (
    <BaseButton style={{ backgroundColor:'white', paddingHorizontal:20, paddingTop:20, paddingBottom:10, elevation:4,zIndex:9 }} onPress={()=>{navigation.navigate('Home')}}>
        <Ionicons name='arrow-back' size={30} color={'black'} ></Ionicons>
    </BaseButton>
)

const Postingan = ()=> (
    <View style={{ paddingVertical:20 }}>
        <View style={{ alignItems:'center', justifyContent:'center', marginBottom:10 }}>
            <Image style={{ width:120, height:120 }} source={require('../assets/images/logo_luminor2.png')}></Image>
        </View>
        <View style={{ paddingHorizontal:30, paddingVertical:20 }}>
            <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:14, color:'black', marginBottom:20 }}>Lowongan Kerja di Luminor Hotel Purwokerto</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>Luminor Hotel Purwokerto adalah hotel bintang empat yang mulai beroperasional sejak Maret 2020.  Luminor Hotel Purwokerto berlokasi di Jalan Jenderal Sudirman No. 324, 53116 Purwokerto.</Text>
        </View>
        <View style={{ alignItems:'center', paddingVertical:20 }}>
            <Text style={{ fontFamily:'Poppins-Medium', fontSize:16, color:'black' }}>Customer Service</Text>
        </View>
        <View style={{ paddingHorizontal:30, paddingVertical:20 }}>
            <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:14, color:'black' }}>Kualifikasi :</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>- Pria / Wanita</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>- Usia minimal 18 tahun, maksimal 25 tahun</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>- Sehat jasmani, rohani, tidak buta warna, tidak bertato dan bebas narkoba</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>- Pendidikan minimal SMA/SMK sederajat</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>- Fresh Graduate diperbolehkan melamar</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>- Memiliki kemampuan komunikasi yang baik</Text>
        </View>
        <View style={{ paddingHorizontal:30, paddingVertical:20 }}>
            <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:14, color:'black' }}>Kelengkapan Berkas :</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>- Fotocopy KTP</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>- Fotocopy KK terbaru</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>- Surat keterangan sehat dan buta warna (mencantumkan tinggi badan dan berat badan)</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>- CV</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>- Foto berwarna ukuran 4x6 2 lembar (background warna merah)</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>- Fotocopy ijazah terakhir</Text>
        </View>
        <View style={{ paddingHorizontal:30, paddingTop:20, paddingBottom:80 }}>
            <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:14, color:'black' }}>Cara Daftar :</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>Jika berminat silahkan kirim berkas lamaran melalui</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>Email : contoh@gmail.com</Text>
            <Text style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black' }}>(Paling lambat 30 Juni 2022)</Text>
        </View>
    </View>
)

export default DetailHome