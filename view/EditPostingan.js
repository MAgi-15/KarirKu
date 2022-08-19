import { Text, View, Image, StatusBar, ScrollView, TextInput, AsyncStorage } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { BaseButton } from 'react-native-gesture-handler'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

export class EditPostingan extends Component {
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
            ],
            Kategori : '',
            Gambar: '',
            Judul: '',
            DeskripsiPerusahaan : '',
            NamaPekerjaan: '',
            Kualifikasi: '',
            KelengkapanBerkas: '',
            CaraDaftar: ''
        }
      }

    KategoriPost = (kategori)=> {
        this.setState({Kategori : kategori})
    }
    GambarPost = (gambar)=> {
        this.setState({Gambar : gambar})
    }
    JudulPost = (judul)=> {
        this.setState({Judul : judul})
    }
    DeskripsiPost = (deskripsi)=> {
        this.setState({DeskripsiPerusahaan : deskripsi})
    }
    NamaPekerjaanPost = (namapekerjaan)=> {
        this.setState({NamaPekerjaan : namapekerjaan})
    }
    KualifikasiPost = (kualifikasi)=> {
        this.setState({Kualifikasi : kualifikasi})
    }
    KelengkapanBerkasPost = (kelengkapanberkas)=> {
        this.setState({kelengkapanberkas : kelengkapanberkas})
    }
    CaraDaftarPost = (caradaftar)=> {
        this.setState({CaraDaftar : caradaftar})
    }

    Posttingan = async(Gambar) => {
        //untuk menambahkan username
        const value = await AsyncStorage.getItem('users');
        console.log("dari async storage", value)
        const obj = JSON.parse(value);
        console.log("obj", obj.data.username)
        let PostData = {
            "Kategori" : obj.data.Kategori,
            "Gambar": obj.data.Gambar,
            "Judul": obj.data.Judul,
            "DeskripsiPerusahaan" : obj.data.DeskripsiPerusahaan,
            "NamaPekerjaan": obj.data.NamaPekerjaan,
            "Kualifikasi": obj.data.Kualifikasi,
            "KelengkapanBerkas": obj.data.KelengkapanBerkas,
            "CaraDaftar": obj.data.CaraDaftar
            // "Gambar": 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII='
        }
        console.log(Constan.api_url +'api/uploadThread/upload')
        console.log('proses')
        axios({
            method: 'POST',
            url: Constan.api_url +'api/uploadThread/upload',
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
    return (
      <View style={{ backgroundColor:'#FFF' }}>
        <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
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
                    <TextInput style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black', paddingBottom:0 }} >Jika berminat silahkan kirim berkas lamaran melalui Email : contoh@gmail.com (Paling lambat 30 Juni 2022)</TextInput></View>
                <View style={{ alignItems:'center', marginBottom:100 }} >
                    <BaseButton style={{ backgroundColor:'#511AEF', height:45, width:200, alignItems:'center', flexDirection:'row', justifyContent:'center' }} onPress={()=>{navigation.navigate('Profile')}}>
                        <Text style={{fontFamily:'Poppins-Regular', fontSize:16, color:'white' }}>Save</Text>
                    </BaseButton>
                </View>
            </View>
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

export default EditPostingan