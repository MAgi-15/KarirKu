import { Text, View, Image, Dimensions, AsyncStorage, Alert } from 'react-native'
import React, { Component, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable.js'
import axios from 'axios';
import Constant from '../Componen/Constant'

const{width, height}= Dimensions.get('screen')
export class NextUpload1 extends Component {
    constructor(props){
        super(props)
        this.state = {
            Kategori : '',
            Gambar: '',
            Judul: '',
            DeskripsiPerusahaan : '',
            NamaPekerjaan: '',
            Kualifikasi: '',
            KelengkapanBerkas: '',
            CaraDaftar: '',
            UploadPost: ''
        }
    }

        Kategori = (kategori)=> {
            this.setState({Kategori : kategori})
        }
        Gambar = (gambar)=> {
            this.setState({Gambar : gambar})
        }
        Judul = (judul)=> {
            this.setState({Judul : judul})
        }
        DeskripsiPerusahaan = (deskripsi)=> {
            this.setState({DeskripsiPerusahaan : deskripsi})
        }
        NamaPekerjaan = (namapekerjaan)=> {
            this.setState({NamaPekerjaan : namapekerjaan})
        }
        Kualifikasi = (kualifikasi)=> {
            this.setState({Kualifikasi : kualifikasi})
        }
        KelengkapanBerkas = (kelengkapanberkas)=> {
            this.setState({KelengkapanBerkas : kelengkapanberkas})
        }
        CaraDaftar = (caradaftar)=> {
            this.setState({CaraDaftar : caradaftar})
        }
        
        UploadPost = async(data_kirim1) => {
            const{ Kategori, Gambar, Judul, DeskripsiPerusahaan, NamaPekerjaan, Kualifikasi, KelengkapanBerkas, CaraDaftar} = this.state
            //untuk menambahkan username
            const value = await AsyncStorage.getItem('users');
            console.log("dari async storage", value)
            const obj = JSON.parse(value);
            console.log("obj", obj.data.username)
            let PostData = {
                "id_user": obj.data.id_user,
                "username": obj.data.username,
                "kategori": data_kirim1.Kategori, 
                "gambar": data_kirim1.Gambar, 
                "judul": Judul, 
                "deskripsi": DeskripsiPerusahaan, 
                "nama_pekerjaan": NamaPekerjaan, 
                "kualifikasi": Kualifikasi, 
                "kelengkapan_berkas": KelengkapanBerkas,
                "cara_daftar": CaraDaftar
            }
            console.log('http://192.168.1.5:8080/api/uploadPostingan/upload')
            console.log('PostData', PostData)
            axios({
                method: 'POST',
                url: Constant.api_url +'api/uploadPostingan/upload',
                data: PostData
            }).then((back) => {
                console.log(JSON.stringify(back))
                if (back.status===200&& back.data.message === "success" ){
                  console.log("masuk")
                  Alert.alert("Berhasil", back.data.message, [
                      {
                          text: "oke",
                          style: 'default',
                          onPress: this.props.navigation.navigate ("Home")
                      }
                  ])
                } else{
                  alert.alert("Gagal", back.data.message)
                }
            }).catch ((error)=> {
                console.log("error", error)
            })
        }

  render() {
    console.log(this.props.route.params)
    let data_kirim1 = this.props.route.params
    console.log("datakirim1", data_kirim1)
    const{ Kategori, Gambar, Judul, DeskripsiPerusahaan, NamaPekerjaan, Kualifikasi, KelengkapanBerkas, CaraDaftar } = this.state
    console.log(Kategori, Gambar, Judul, DeskripsiPerusahaan, NamaPekerjaan, Kualifikasi, KelengkapanBerkas, CaraDaftar)
    return (
        <View style={{ backgroundColor:'#FFF', flex:1 }}>
            <Header navigation={this.props.navigation}></Header>
            <ScrollView>
                <Form data_kirim1={data_kirim1} KategoriPost={(kategori)=>{this.Kategori(kategori)}} GambarPost={(gambar)=>{this.Gambar(gambar)}} JudulPost={(judul)=>{this.Judul(judul)}}
                DeskripsiPost={(deskripsi)=>{this.DeskripsiPerusahaan(deskripsi)}} NamaPekerjaanPost={(namapekerjaan)=>{this.NamaPekerjaan(namapekerjaan)}} KualifikasiPost={(kualifikasi)=>{this.Kualifikasi(kualifikasi)}}
                KelengkapanBerkasPost={(kelengkapanberkas)=>{this.KelengkapanBerkas(kelengkapanberkas)}} CaraDaftarPost={(caradaftar)=>{this.CaraDaftar(caradaftar)}}
                PostData={()=>{this.UploadPost()}} kirim={()=>{ this.UploadPost(data_kirim1) }}></Form>
            </ScrollView>
        </View>
    )
  }
}

const Header = ({navigation})=> (
    <View style={{ backgroundColor:'#FFF', paddingHorizontal:20, paddingVertical:12, flexDirection:'row', justifyContent:'flex-start', elevation:1, borderBottomColor:'#D9D9D9', borderBottomWidth:0.5 }}>
        <BaseButton onPress={()=>{navigation.navigate('Upload')}}>
            <Ionicons name='arrow-back' size={24} color={'#383838'} ></Ionicons>
        </BaseButton>
    </View>
)

const Form = ({navigation, data_kirim1, kirim, Kategori, Gambar, Judul, DeskripsiPerusahaan, NamaPekerjaan, Kualifikasi, KelengkapanBerkas, CaraDaftar, KategoriPost, GambarPost, JudulPost, DeskripsiPost, NamaPekerjaanPost, KualifikasiPost, KelengkapanBerkasPost, CaraDaftarPost})=> (
    <View style={{ padding:24 }}>
        <Text style={{ marginBottom:6, fontFamily:'Poppins-SemiBold', fontSize:15, color:'black' }}>Pilih Kategori</Text>
        <View style={{ flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#B5B5B5', marginBottom:16 }}>
            <AntDesign name='caretdown' size={16} color={'#383838'} style={{ marginRight:10, marginBottom:5 }}></AntDesign>
            <Text value = {Kategori} onChangeText = {(kategori)=>{KategoriPost(kategori)}} style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black' }}>{data_kirim1.Kategori}</Text>
        </View>
        <Text style={{ marginBottom:6, fontFamily:'Poppins-SemiBold', fontSize:15, color:'black' }}>Upload Gambar</Text>
        <View style={{ borderBottomWidth:1, borderColor:'#B5B5B5',marginBottom:16 }}>
            <Image source={data_kirim1.source} style={{ height:150, width:150, marginBottom:8 }}></Image>
            {/* <Feather name='upload' size={20} color={'#383838'} style={{ marginTop:10 }}></Feather> */}
        </View>
        <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:15, color:'black' }}>Judul</Text>
        <View style={{ borderBottomWidth:1, borderColor:'#B5B5B5', marginBottom:16 }}>
            <TextInput multiline value = {Judul} onChangeText = {(judul)=>{JudulPost(judul)}} style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }} placeholder={'Judul'}></TextInput>
        </View>
        <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:15, color:'black' }}>Deskripsi Perusahaan</Text>
        <View style={{ borderBottomWidth:1, borderColor:'#B5B5B5', marginBottom:16 }}>
            <TextInput multiline value = {DeskripsiPerusahaan} onChangeText = {(deskripsi)=>{DeskripsiPost(deskripsi)}} style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }} placeholder={'Deskripsi Perusahaan'}></TextInput>
        </View>
        <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:15, color:'black' }}>Nama Pekerjaan</Text>
        <View style={{ borderBottomWidth:1, borderColor:'#B5B5B5', marginBottom:16 }}>
            <TextInput multiline value = {NamaPekerjaan} onChangeText = {(namapekerjaan)=>{NamaPekerjaanPost(namapekerjaan)}} style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }} placeholder={'Nama Pekerjaan'}></TextInput>
        </View>
        <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:15, color:'black' }}>Kualifikasi</Text>
        <View style={{ borderBottomWidth:1, borderColor:'#B5B5B5', marginBottom:16 }}>
            <TextInput value = {Kualifikasi} onChangeText = {(kualifikasi)=>{KualifikasiPost(kualifikasi)}} multiline style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', width:300, paddingBottom:0 }} placeholder={'Kualifikasi'}></TextInput>
        </View>                
        <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:15, color:'black' }}>Kelengkapan Berkas</Text>
        <View style={{ borderBottomWidth:1, borderColor:'#B5B5B5', marginBottom:16 }}>
            <TextInput value = {KelengkapanBerkas} onChangeText = {(kelengkapanberkas)=>{KelengkapanBerkasPost(kelengkapanberkas)}} multiline style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', width:300, paddingBottom:0 }} placeholder={'Kelengkapan Berkas'}></TextInput>
        </View>
        <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:15, color:'black' }}>Cara Daftar</Text>
        <View style={{ borderBottomWidth:1, borderColor:'#B5B5B5', marginBottom:56 }}>
            <TextInput multiline value = {CaraDaftar} onChangeText = {(caradaftar)=>{CaraDaftarPost(caradaftar)}} style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }} placeholder={'Cara Daftar'}></TextInput>
        </View>
        <BaseButton style={{ alignItems:'center', marginBottom:40 }} onPress={()=>{kirim()}} >
            <View style={{ backgroundColor:'#511AEF', height:45, width:200, alignItems:'center', flexDirection:'row', justifyContent:'center', borderRadius:8 }}>
                <Text style={{fontFamily:'Poppins-Regular', fontSize:16, color:'white' }}>Upload</Text>
            </View>
        </BaseButton>
    </View>
)

export default NextUpload1