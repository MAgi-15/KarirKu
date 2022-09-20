import { Text, Dimensions, View, Image, StatusBar, ScrollView, TextInput, Alert, Modal } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { BaseButton } from 'react-native-gesture-handler'
import axios from 'axios'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const { width, height } = Dimensions.get('screen')
export class EditPostingan1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            IdPostingan: this.props.route.params.data.id_postingan,
            Kategori: this.props.route.params.data.kategori,
            Gambar: this.props.route.params.data.gambar,
            Judul: this.props.route.params.data.judul,
            Deskripsi: this.props.route.params.data.deskripsi,
            Nama_pekerjaan: this.props.route.params.data.nama_pekerjaan,
            Kualifikasi: this.props.route.params.data.kualifikasi,
            Kelengkapan_berkas: this.props.route.params.data.kelengkapan_berkas,
            Cara_daftar: this.props.route.params.data.cara_daftar,
            StatusModal: false,
            StatusModalGambar: false,
            source: '',
            photoAttachment: '',
            photoSize: '',
            PostData: '',
            GambarPilih: false,
            GambarNew: '',
            GambarTambah: ''
        }
    }

    uploadPhoto = (method) => { // fungsi upload bukti bayar
        try {
            // pengaturan untuk menjalankan library kamera
            const options = {
                quality: 1.0,
                maxWidth: 1000,
                maxHeight: 1000,
                cameraType: 'back',
                includeBase64: true
            }

            if (method === 'camera') {
                launchCamera(options, async (response) => { this.callbackUpload(response) }).catch((error) => {
                    console.log(error)
                })
            } else if (method === 'select-from-gallery') {
                launchImageLibrary(options, async (response) => { this.callbackUpload(response) })
            }
        } catch (error) {
            console.log(error)
        }
    }

    callbackUpload = async (response) => {
        try {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                // rumus perbandingan image scale
                let IS = ((width - 60) / response.assets[0].width)
                let _width = response.assets[0].width * IS
                let _height = response.assets[0].height * IS

                let source = { uri: response.assets[0].uri }
                let photoAttachment = 'data:image/jpeg;base64,' + response.assets[0].base64
                let photoSize = {
                    width: _width,
                    height: _height
                }

                this.setState({
                    GambarNew: source,
                    GambarPilih: true,
                    GambarTambah: photoAttachment,
                    photoSize
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    openModal = () => {
        this.setState({ StatusModal: true })
    }
    closeModal = () => {
        this.setState({ StatusModal: false })
    }
    openModalGambar = () => {
        this.setState({ StatusModalGambar: true })
    }
    closeModalGambar = () => {
        this.setState({ StatusModalGambar: false })
    }
    DaftarKategori = (value) => {
        this.setState({ Kategori: value })
    }

    UpdatePostingan = () => {
        const { IdPostingan, Kategori, GambarTambah, Judul, Deskripsi, Nama_pekerjaan, Kualifikasi, Kelengkapan_berkas, Cara_daftar } = this.state
        let PostData = {
            "id_postingan": IdPostingan,
            "kategori": Kategori,
            "gambar": GambarTambah,
            "judul": Judul,
            "deskripsi": Deskripsi,
            "nama_pekerjaan": Nama_pekerjaan,
            "kualifikasi": Kualifikasi,
            "kelengkapan_berkas": Kelengkapan_berkas,
            "cara_daftar": Cara_daftar
        }
        console.log('http://192.168.0.110:8080/api/uploadPostingan/editPostbyId/' + IdPostingan)
        console.log('PostData', PostData)
        axios({
            method: 'POST',
            url: Constant.api_url + 'api/uploadPostingan/editPostbyId/' + IdPostingan,
            data: PostData
        }).then((back) => {
            console.log(JSON.stringify(back))
            if (back.status === 200 && back.data.message === "success") {
                console.log("masuk")
                this.props.navigation.navigate('Profile')
            } else {
                Alert.alert("Gagal", back.data.message)
            }
        }).catch((error) => {
            console.log("error", error)
        })
    }

    SetKategori = (kategori) => {
        this.setState({ Kategori: kategori })
    }
    SetGambar = (gambar) => {
        this.setState({ Gambar: gambar })
    }
    SetJudul = (judul) => {
        this.setState({ Judul: judul })
    }
    SetDeskripsi = (deskripsi) => {
        this.setState({ Deskripsi: deskripsi })
    }
    SetNama_pekerjaan = (nama_pekerjaan) => {
        this.setState({ Nama_pekerjaan: nama_pekerjaan })
    }
    SetKualifikasi = (kualifikasi) => {
        this.setState({ Kualifikasi: kualifikasi })
    }
    SetKelengkapan_berkas = (kelengkapan_berkas) => {
        this.setState({ Kelengkapan_berkas: kelengkapan_berkas })
    }
    SetCara_daftar = (cara_daftar) => {
        this.setState({ Cara_daftar: cara_daftar })
    }

    render() {
        const data_kirim = this.props.route.params.data
        console.log("data kirim", data_kirim)
        const { source, photoSize, photoAttachment, PostData, Kategori, GambarNew, GambarPilih } = this.state
        console.log(source, photoSize, photoAttachment)
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <ScrollView>
                    <Form GambarPilih={GambarPilih} GambarNew={GambarNew} data_kirim={data_kirim} UpdatePostingan={this.UpdatePostingan} Kategori={this.state.Kategori} Gambar={this.state.Gambar} Judul={this.state.Judul}
                        Deskripsi={this.state.Deskripsi} Nama_pekerjaan={this.state.Nama_pekerjaan} Kualifikasi={this.state.Kualifikasi} Kelengkapan_berkas={this.state.Kelengkapan_berkas}
                        Cara_daftar={this.state.Cara_daftar} navigation={this.props.navigation} SetKategori={(kategori) => { this.SetKategori(kategori) }} SetGambar={(username) => { this.SetGambar(username) }}
                        SetJudul={(username) => { this.SetJudul(username) }} SetDeskripsi={(username) => { this.SetDeskripsi(username) }} SetNama_pekerjaan={(username) => { this.SetNama_pekerjaan(username) }}
                        SetKualifikasi={(username) => { this.SetKualifikasi(username) }} SetKelengkapan_berkas={(username) => { this.SetKelengkapan_berkas(username) }}
                        SetCara_daftar={(username) => { this.SetCara_daftar(username) }} source={source} photoSize={photoSize} closeModal={function () { this.closeModal() }} openModal={() => { this.openModal() }}
                        closeModalGambar={function () { this.closeModalGambar() }} openModalGambar={() => { this.openModalGambar() }}></Form>
                    <Modal visible={this.state.StatusModal} transparent>
                        <View style={{ flex: 1, backgroundColor: 'rgba(80,80,80,.0)', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                            <View style={{ backgroundColor: 'white', padding: 15, minWidth: 150, elevation: 2, height: 300, marginTop: 130, marginLeft: 30 }}>
                                <AntDesign name='closecircleo' size={20} color={'black'} onPress={() => { this.closeModal() }} ></AntDesign>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <Pressable style={{ marginVertical: 10, padding: 5, borderWidth: 1 }} android_ripple={{ color: '#ffdddd' }} onPress={() => { this.closeModal(this.DaftarKategori('Purwokerto')) }} >
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: 'black' }}>Purwokerto</Text>
                                    </Pressable>
                                    <Pressable style={{ marginVertical: 10, padding: 5, borderWidth: 1 }} android_ripple={{ color: '#ffdddd' }} onPress={() => { this.closeModal(this.DaftarKategori('Jakarta')) }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: 'black' }}>Jakarta</Text>
                                    </Pressable>
                                    <Pressable style={{ marginVertical: 10, padding: 5, borderWidth: 1 }} android_ripple={{ color: '#ffdddd' }} onPress={() => { this.closeModal(this.DaftarKategori('Yogyakarta')) }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: 'black' }}>Yogyakarta</Text>
                                    </Pressable>
                                    <Pressable style={{ marginVertical: 10, padding: 5, borderWidth: 1 }} android_ripple={{ color: '#ffdddd' }} onPress={() => { this.closeModal(this.DaftarKategori('Surabaya')) }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: 'black' }}>Surabaya</Text>
                                    </Pressable>
                                    <Pressable style={{ marginVertical: 10, padding: 5, borderWidth: 1 }} android_ripple={{ color: '#ffdddd' }} onPress={() => { this.closeModal(this.DaftarKategori('Semarang')) }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: 'black' }}>Semarang</Text>
                                    </Pressable>
                                    <Pressable style={{ marginVertical: 10, padding: 5, borderWidth: 1 }} android_ripple={{ color: '#ffdddd' }} onPress={() => { this.closeModal(this.DaftarKategori('Bandung')) }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: 'black' }}>Bandung</Text>
                                    </Pressable>
                                    <Pressable style={{ marginVertical: 10, padding: 5, borderWidth: 1 }} android_ripple={{ color: '#ffdddd' }} onPress={() => { this.closeModal(this.DaftarKategori('Bali')) }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: 'black' }}>Bali</Text>
                                    </Pressable>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                    <Modal visible={this.state.StatusModalGambar} transparent>
                        <View style={{ flex: 1, backgroundColor: 'rgba(80,80,80,.0)', justifyContent: 'flex-end', marginTop: 550 }}>
                            <View style={{ backgroundColor: '#FFF', padding: 20, borderColor: '#D9D9D9', borderWidth: 1, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: 'black' }}>Unggah dari :</Text>
                                    <Pressable style={{ padding: 8 }}
                                        onPress={() => { this.closeModalGambar() }}>
                                        <AntDesign name='close' size={20} color={'#383838'} onPress={() => { this.closeModalGambar() }}></AntDesign>
                                    </Pressable>
                                </View>
                                <Pressable style={{ marginTop: 8 }} android_ripple={{ color: '#D9D9D9' }} onPress={() => { this.closeModalGambar(this.uploadPhoto('camera')) }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name='camera' size={16} color={'#511AEF'} style={{ marginRight: 8 }} onPress={() => { this.closeModalGambar() }}></FontAwesome>
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#383838' }}>Camera</Text>
                                    </View>
                                </Pressable>
                                <Pressable style={{ marginTop: 8 }} android_ripple={{ color: '#D9D9D9' }} onPress={() => { this.closeModalGambar(this.uploadPhoto('select-from-gallery')) }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name='photo' size={16} color={'#511AEF'} style={{ marginRight: 8 }} onPress={() => { this.closeModalGambar() }}></FontAwesome>
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#383838' }}>Galery</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>
        )
    }
}

const Header = ({ navigation }) => (
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', elevation: 1, borderBottomColor: '#D9D9D9', borderBottomWidth: 0.5 }}>
      <BaseButton style={{ justifyContent: 'flex-start', width: 30 }} onPress={() => { navigation.navigate('Profile') }}>
        <Ionicons name='arrow-back' size={24} color={'#383838'} ></Ionicons>
      </BaseButton>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#383838' }}>Edit Post</Text>
      </View>
      <View style={{ width: 30 }}></View>
    </View>
  )

const Form = ({ GambarPilih, GambarNew, openModal, openModalGambar, source, photoSize, data_kirim, UpdatePostingan, Kategori, Gambar, Judul, Deskripsi, Nama_pekerjaan, Kualifikasi, Kelengkapan_berkas, Cara_daftar, SetKategori, SetGambar, SetJudul, SetDeskripsi, SetNama_pekerjaan, SetKualifikasi, SetKelengkapan_berkas, SetCara_daftar }) => (
    <View style={{ backgroundColor: '#FFF' }}>
        <View style={{ padding: 30 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'black' }}>Pilih Kategori</Text>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#B5B5B5', marginBottom: 40 }} onPress={() => { openModal() }}>
                <AntDesign name='caretdown' size={20} color={'black'} style={{ marginRight: 10, marginBottom: 5 }}></AntDesign>
                <Text onChangeText={(kategori) => { SetKategori(kategori) }} style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#000' }}>{Kategori}</Text>
            </Pressable>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'black' }}>Upload Gambar</Text>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#B5B5B5', padding: 5, marginBottom: 40, justifyContent: 'space-between' }}>

                {
                    GambarPilih
                        ? <Image source={GambarNew} style={{ width: 120, height: 120 }}></Image>
                        : <Image style={{ width: 120, height: 120, backgroundColor: 'blue' }} source={{ uri: Constant.api_url + data_kirim.gambar }}></Image>
                }
                <Pressable onPress={() => { openModalGambar() }}>
                    <Feather name='upload' size={20} color={'black'} style={{ marginTop: 100 }}></Feather>
                </Pressable>
            </View>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'black' }}>Judul</Text>
            <View style={{ borderBottomWidth: 1, borderColor: '#B5B5B5', marginBottom: 40 }}>
                <TextInput multiline value={Judul} onChangeText={(judul) => { SetJudul(judul) }} style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black', paddingBottom: 0 }}></TextInput>
            </View>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'black' }}>Deskripsi Perusahaan</Text>
            <View style={{ borderBottomWidth: 1, borderColor: '#B5B5B5', marginBottom: 40 }}>
                <TextInput multiline value={Deskripsi} onChangeText={(deskripsi) => { SetDeskripsi(deskripsi) }} style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black', paddingBottom: 0 }}></TextInput>
            </View>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'black' }}>Nama Pekerjaan</Text>
            <View style={{ borderBottomWidth: 1, borderColor: '#B5B5B5', marginBottom: 40 }}>
                <TextInput multiline value={Nama_pekerjaan} onChangeText={(nama_pekerjaan) => { SetNama_pekerjaan(nama_pekerjaan) }} style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black', paddingBottom: 0 }}></TextInput>
            </View>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'black' }}>Kualifikasi</Text>
            <View style={{ borderBottomWidth: 1, borderColor: '#B5B5B5', marginBottom: 40 }}>
                <TextInput value={Kualifikasi} onChangeText={(kualifikasi) => { SetKualifikasi(kualifikasi) }} multiline style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black', width: 300, paddingBottom: 0 }}></TextInput>
            </View>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'black' }}>Kelengkapan Berkas</Text>
            <View style={{ borderBottomWidth: 1, borderColor: '#B5B5B5', marginBottom: 40 }}>
                <TextInput value={Kelengkapan_berkas} onChangeText={(kelengkapan_berkas) => { SetKelengkapan_berkas(kelengkapan_berkas) }} multiline style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black', width: 300, paddingBottom: 0 }}></TextInput>
            </View>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'black' }}>Cara Daftar</Text>
            <View style={{ borderBottomWidth: 1, borderColor: '#B5B5B5', marginBottom: 70 }}>
                <TextInput multiline value={Cara_daftar} onChangeText={(cara_daftar) => { SetCara_daftar(cara_daftar) }} style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black', paddingBottom: 0 }} ></TextInput></View>
            <View style={{ alignItems: 'center', marginBottom: 100 }} >
                <BaseButton onPress={() => { UpdatePostingan() }} style={{ backgroundColor: '#511AEF', height: 45, width: 200, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderRadius: 8 }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: '#FFF' }}>Save</Text>
                </BaseButton>
            </View>
        </View>
    </View>
)

export default EditPostingan1






// import { Text, View, Image, StatusBar, ScrollView, TextInput, AsyncStorage } from 'react-native'
// import React, { Component } from 'react'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import Feather from 'react-native-vector-icons/Feather'
// import { BaseButton } from 'react-native-gesture-handler'
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

// export class EditPostingan1 extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             Kategori : '',
//             Gambar: '',
//             Judul: '',
//             DeskripsiPerusahaan : '',
//             NamaPekerjaan: '',
//             Kualifikasi: '',
//             KelengkapanBerkas: '',
//             CaraDaftar: ''
//         }
//       }

//     KategoriPost = (kategori)=> {
//         this.setState({Kategori : kategori})
//     }
//     GambarPost = (gambar)=> {
//         this.setState({Gambar : gambar})
//     }
//     JudulPost = (judul)=> {
//         this.setState({Judul : judul})
//     }
//     DeskripsiPost = (deskripsi)=> {
//         this.setState({DeskripsiPerusahaan : deskripsi})
//     }
//     NamaPekerjaanPost = (namapekerjaan)=> {
//         this.setState({NamaPekerjaan : namapekerjaan})
//     }
//     KualifikasiPost = (kualifikasi)=> {
//         this.setState({Kualifikasi : kualifikasi})
//     }
//     KelengkapanBerkasPost = (kelengkapanberkas)=> {
//         this.setState({kelengkapanberkas : kelengkapanberkas})
//     }
//     CaraDaftarPost = (caradaftar)=> {
//         this.setState({CaraDaftar : caradaftar})
//     }

//     Posttingan = async(Gambar) => {
//         //untuk menambahkan username
//         const value = await AsyncStorage.getItem('users');
//         console.log("dari async storage", value)
//         const obj = JSON.parse(value);
//         console.log("obj", obj.data.username)
//         let PostData = {
//             "Kategori" : obj.data.Kategori,
//             "Gambar": obj.data.Gambar,
//             "Judul": obj.data.Judul,
//             "DeskripsiPerusahaan" : obj.data.DeskripsiPerusahaan,
//             "NamaPekerjaan": obj.data.NamaPekerjaan,
//             "Kualifikasi": obj.data.Kualifikasi,
//             "KelengkapanBerkas": obj.data.KelengkapanBerkas,
//             "CaraDaftar": obj.data.CaraDaftar
//             // "Gambar": 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII='
//         }
//         console.log(Constan.api_url +'api/uploadThread/upload')
//         console.log('proses')
//         axios({
//             method: 'POST',
//             url: Constan.api_url +'api/uploadThread/upload',
//             data: PostData
//         }).then((back) => {
//             console.log(JSON.stringify(back))
//             if (back.status===200&& back.data.message === "success" ){
//               console.log("masuk")
//               Alert.alert("Berhasil", back.data.message, [
//                   {
//                       text: "oke",
//                       style: 'default',
//                       onPress: this.props.navigation.navigate ("Home")
//                   }
//               ])
//             } else{
//               alert.alert("Gagal", back.data.message)
//             }
//         }).catch ((error)=> {
//             console.log("error", error)
//         })
//     }

//     tambahKualifikasi = ()=> {
//         const {Kualifikasi} = this.state
//         const object = {
//             id: Kualifikasi.length,
//             text: ''
//         }
//         let Tambahdata = Kualifikasi
//         Tambahdata.push(object)
//         console.log(Tambahdata)
//         this.setState({Kualifikasi: Tambahdata})
//     }

//     tambahKelengkapanBerkas = ()=> {
//         const {KelengkapanBerkas} = this.state
//         const object = {
//             id: KelengkapanBerkas.length,
//             text: ''
//         }
//         let Tambahdata = KelengkapanBerkas
//         Tambahdata.push(object)
//         console.log(Tambahdata)
//         this.setState({KelengkapanBerkas: Tambahdata})
//     }

//   render() {
//     // const {KelengkapanBerkas} = this.state
//     // const {Kualifikasi} = this.state
//     return (
//       <View>
//         <Header></Header>
//         <ScrollView>
//             <Form></Form>
//         </ScrollView>
//       </View>
//     )
//   }
// }

// const Header = ({navigation})=> (
//     <View style={{ backgroundColor:'#FFF', paddingHorizontal:20, paddingTop:20, PaddingBottom:10, marginBottom:5, flexDirection:'row', alignItems:'center', elevation:1, borderBottomColor:'#D9D9D9', borderBottomWidth:1 }}>
//         <BaseButton style={{ justifyContent:'flex-start', width:30, paddingBottom:15 }} onPress={()=>{navigation.navigate('Profile')}}>
//             <Ionicons name='arrow-back' size={30} color={'black'} ></Ionicons>
//         </BaseButton>
//         <View style={{ alignItems:'center', flex:1 }}>
//             <Text style={{ fontFamily:'Poppins-SemiBold', fontSize:20, color:'black', paddingBottom:15 }}>Edit Post</Text>
//         </View>
//         <View style={{ width:30 }}></View>
//     </View>
// )

// const Form = ({navigation})=> (
//     <View style={{ backgroundColor:'#FFF' }}>
//         <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
//         <Header navigation={this.props.navigation}></Header>
//         <ScrollView>
//             <View style={{ padding:30 }}>
//                 <Text style={{ marginBottom:7, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Pilih Kategori</Text>
//                 <View style={{ flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
//                     <AntDesign name='caretdown' size={20} color={'black'} style={{ marginRight:10, marginBottom:5 }}></AntDesign>
//                     <Text style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black' }}>Purwokerto</Text>
//                 </View>
//                 <Text style={{ marginBottom:7, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Upload Gambar</Text>
//                 <View style={{ flexDirection:'row', borderBottomWidth:1, borderColor:'#454545', padding:5, marginBottom:40, justifyContent:'space-between' }}>
//                     <Image source={require('../assets/images/logo_luminor2.png')}></Image>
//                     <Feather name='upload' size={20} color={'black'} style={{ marginTop:70 }}></Feather>
//                 </View>
//                 <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Judul</Text>
//                 <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
//                     <TextInput style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black', paddingBottom:0 }}>Lowongan Kerja di Luminor Hotel Purwokerto</TextInput>
//                 </View>
//                 <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Deskripsi Perusahaan</Text>
//                 <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
//                     <TextInput style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black', paddingBottom:0 }}>Luminor Hotel Purwokerto adalah hotel bintang empat yang mulai beroperasional sejak Maret 2020.  Luminor Hotel Purwokerto berlokasi di Jalan Jenderal Sudirman No. 324, 53116 Purwokerto.</TextInput>
//                 </View>
//                 <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Nama Pekerjaan</Text>
//                 <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
//                     <TextInput style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', paddingBottom:0 }}>Customer Service</TextInput>
//                 </View>
//                 <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Kualifikasi</Text>
//                 <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
//                     <TextInput multiline style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', width:300, paddingBottom:0 }} placeholder={'Kualifikasi'}></TextInput>
//                 </View>
//                 <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Kelengkapan Berkas</Text>
//                 <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:40 }}>
//                     <TextInput multiline style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black', width:300, paddingBottom:0 }} placeholder={'Kelengkapan Berkas'}></TextInput>
//                 </View>
//                 <Text style={{ marginBottom:5, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Cara Daftar</Text>
//                 <View style={{ borderBottomWidth:1, borderColor:'#454545', marginBottom:70 }}>
//                     <TextInput style={{ fontFamily:'Poppins-Regular', fontSize:12, color:'black', paddingBottom:0 }} >Jika berminat silahkan kirim berkas lamaran melalui Email : contoh@gmail.com (Paling lambat 30 Juni 2022)</TextInput></View>
//                 <View style={{ alignItems:'center', marginBottom:100 }} >
//                     <BaseButton style={{ backgroundColor:'#511AEF', height:45, width:200, alignItems:'center', flexDirection:'row', justifyContent:'center' }} onPress={()=>{navigation.navigate('Profile')}}>
//                         <Text style={{fontFamily:'Poppins-Regular', fontSize:16, color:'white' }}>Save</Text>
//                     </BaseButton>
//                 </View>
//             </View>
//         </ScrollView>
//     </View>
// )

// export default EditPostingan1