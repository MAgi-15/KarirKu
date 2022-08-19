import { Text, View, Image, Dimensions } from 'react-native'
import React, { Component, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable.js'

const{width, height}= Dimensions.get('screen')
export class NextUpload extends Component {
    constructor(props){
        super(props)
        this.state = {
            Kualifikasi: [
                {
                    id: 0,
                    text: ''
                }
            ],
            KelengkapanBerkas: [
                {
                    id: 0,
                    text: ''
                }
            ]
        }
      }

    tambahKualifikasi = ()=> {
        const {Kualifikasi} = this.state
        const object = {
            id: Kualifikasi.length,
            text: ''
        }
        let Tambahdata = Kualifikasi
        Tambahdata.push(object)
        console.log(Tambahdata)
        this.setState({Kualifikasi: Tambahdata})
    }

    tambahKelengkapanBerkas = ()=> {
        const {KelengkapanBerkas} = this.state
        const object = {
            id: KelengkapanBerkas.length,
            text: ''
        }
        let Tambahdata = KelengkapanBerkas
        Tambahdata.push(object)
        console.log(Tambahdata)
        this.setState({KelengkapanBerkas: Tambahdata})
    }
  render() {
    const {KelengkapanBerkas} = this.state
    const {Kualifikasi} = this.state
    console.log(this.props.route.params)
    let data_kirim = this.props.route.params
    console.log("datakirim", data_kirim)
    return (
      <View style={{ backgroundColor:'#FFF', flex:1 }}>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
            <View style={{ padding:30 }}>
                <Text style={{ marginBottom:7, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Pilih Kategori</Text>
                <View style={{ flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
                    <AntDesign name='caretdown' size={20} color={'black'} style={{ marginRight:10, marginBottom:5 }}></AntDesign>
                    <Text style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black' }}>{data_kirim.Kategori}</Text>
                </View>
                <Text style={{ marginBottom:7, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Upload Gambar</Text>
                <View style={{ borderBottomWidth:1, borderColor:'#454545', padding:5, marginBottom:10 }}>
                    <Image source={data_kirim.source} style={{ height:150, width:150 }}></Image>
                    <Feather name='upload' size={20} color={'black'} style={{ marginTop:10 }}></Feather>
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
                <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
                    {Kualifikasi.map((item, index)=> {
                        let baris = (index + 1)
                        let jumlahList = Kualifikasi.length
                        if (jumlahList==baris){
                            return(
                                <View key={index} style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
                                    <TextInput multiline style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', width:300, paddingBottom:0 }} placeholder={'Kualifikasi'}></TextInput>
                                    <View style={{ flexDirection:'row', alignItems:'center' }}>
                                        <Pressable onPress={()=> {}}>
                                            <AntDesign name='minus' size={20} color={'black'} style={{ paddingBottom:0, marginRight:5 }}></AntDesign>
                                        </Pressable>
                                        <Pressable onPress={()=> {
                                            this.tambahKualifikasi()
                                            }}>
                                            <AntDesign name='plus' size={20} color={'black'} style={{ paddingBottom:0, marginRight:5  }}></AntDesign>
                                        </Pressable>
                                    </View>
                                </View>
                            )
                        }

                        return(
                            <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between'  }}>
                                <TextInput key={index} style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black',width:300, paddingBottom:0 }} placeholder={'Kualifikasi'}></TextInput>
                                <View style={{ flexDirection:'row', alignItems:'center' }}>
                                    <Pressable onPress={()=> {}}>
                                        <AntDesign name='minus' size={20} color={'#D9D9D9'} style={{ paddingBottom:0, marginRight:5 }}></AntDesign>
                                    </Pressable>
                                    <Pressable onPress={()=> {
                                        this.tambahKualifikasi()
                                        }}>
                                        <AntDesign name='plus' size={20} color={'#D9D9D9'} style={{ paddingBottom:0, marginRight:5  }}></AntDesign>
                                    </Pressable>
                                </View>
                            </View>
                        )
                    })}
                </View>
                <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Kelengkapan Berkas</Text>
                <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
                        {KelengkapanBerkas.map((item, index)=> {
                            let baris = (index + 1)
                            let jumlahList = KelengkapanBerkas.length
                            if (jumlahList==baris){
                                return(
                                    <View key={index} style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
                                        <TextInput multiline style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', width:300, paddingBottom:0 }} placeholder={'Kelengkapan Berkas'}></TextInput>
                                        <View style={{ flexDirection:'row', alignItems:'center' }}>
                                            <Pressable onPress={()=> {}}>
                                                <AntDesign name='minus' size={20} color={'black'} style={{ paddingBottom:0, marginRight:5 }}></AntDesign>
                                            </Pressable>
                                            <Pressable onPress={()=> {
                                                this.tambahKelengkapanBerkas()
                                                }}>
                                                <AntDesign name='plus' size={20} color={'black'} style={{ paddingBottom:0, marginRight:5  }}></AntDesign>
                                            </Pressable>
                                        </View>
                                    </View>
                                )
                            }

                            return(
                                <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between'  }}>
                                    <TextInput key={index} style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black',width:300, paddingBottom:0 }} placeholder={'Kelengkapan Berkas'}></TextInput>
                                    <View style={{ flexDirection:'row', alignItems:'center' }}>
                                        <Pressable onPress={()=> {}}>
                                            <AntDesign name='minus' size={20} color={'#D9D9D9'} style={{ paddingBottom:0, marginRight:5 }}></AntDesign>
                                        </Pressable>
                                        <Pressable onPress={()=> {
                                            this.tambahKelengkapanBerkas()
                                            }}>
                                            <AntDesign name='plus' size={20} color={'#D9D9D9'} style={{ paddingBottom:0, marginRight:5  }}></AntDesign>
                                        </Pressable>
                                </View>
                                </View>
                            )
                    })}
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

export default NextUpload