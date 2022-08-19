import { Text, View, Image, Modal, Button, Dimensions, AsyncStorage } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const { width, height } = Dimensions.get('screen')
export class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      StatusModal: false,
      StatusModalGambar: false,
      Kategori: 'Pilih Kategori',
      source: '',
      photoAttachment: '',
      photoSize: '',
      PostData: '',
      listPostingan: [],
      masterData: [],
      listLike: []
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

        this.setState({ source, photoAttachment, photoSize })
      }
    } catch (error) {
      console.log(error)
    }
  }

  KirimData = async (Gambar) => {
    const value = await AsyncStorage.getItem('users');
    console.log("dari async storage", value)
    const obj = JSON.parse(value);
    console.log("obj", obj.data.name)
    let PostData = {
      "Kategori": this.state.Kategori,
      "Gambar": this.state.photoAttachment,
      "source": this.state.source
      // "Gambar": 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII='
    }
    this.props.navigation.navigate('NextUpload1', PostData)
    this.setState({ PostData: PostData })
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

  render() {
    const { source, photoSize, photoAttachment, PostData, Kategori } = this.state
    console.log(source)
    console.log(photoSize)
    console.log(photoAttachment)
    return (
      <View style={{ backgroundColor: '#FFF', flex: 1 }}>
        <Header PostData={PostData} navigation={this.props.navigation} kirim={() => {
          this.KirimData()
        }}></Header>
        <UpGambar source={source} photoSize={photoSize} closeModal={function () { this.closeModal() }} openModal={() => { this.openModal() }} Kategori={Kategori} closeModalGambar={function () { this.closeModalGambar() }} openModalGambar={() => { this.openModalGambar() }}></UpGambar>
        {/* <Modal visible={this.state.StatusModal} transparent>
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
        </Modal> */}
        <Modal visible={this.state.StatusModal} transparent>
          <View style={{ flex: 1, backgroundColor: 'rgba(80,80,80,.0)', justifyContent: 'flex-end', marginTop: 550 }}>
            <View style={{ backgroundColor: '#FFF', padding: 20, borderColor: '#D9D9D9', borderWidth: 1, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: 'black' }}>Pilih kota :</Text>
                <Pressable style={{ padding: 8 }}
                  onPress={() => { this.closeModal() }}>
                  <AntDesign name='close' size={20} color={'#383838'} onPress={() => { this.closeModal() }}></AntDesign>
                </Pressable>
              </View>
              <View style={{ flexDirection:'row', alignItems:'center' }}>
                <Pressable
                onPress={() => { this.closeModal(this.DaftarKategori('Purwokerto')) }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black', paddingVertical: 5, paddingHorizontal:10, borderRadius:24, borderWidth: 1, borderColor:'#7D53F5', marginRight:8, marginVertical:8 }} android_ripple={{ color: '#ffdddd' }} >Purwokerto</Text>
                </Pressable>
                <Pressable
                onPress={() => { this.closeModal(this.DaftarKategori('Jakarta')) }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black', paddingVertical: 5, paddingHorizontal:10, borderRadius:24, borderWidth: 1, borderColor:'#7D53F5', marginRight:8, marginVertical:8 }} android_ripple={{ color: '#ffdddd' }}>Jakarta</Text>
                </Pressable>
                <Pressable 
                onPress={() => { this.closeModal(this.DaftarKategori('Yogyakarta')) }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black', paddingVertical: 5, paddingHorizontal:10, borderRadius:24, borderWidth: 1, borderColor:'#7D53F5', marginRight:8, marginVertical:8 }} android_ripple={{ color: '#ffdddd' }}>Yogyakarta</Text>
                </Pressable>
                <Pressable
                onPress={() => { this.closeModal(this.DaftarKategori('Bali')) }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black', paddingVertical: 5, paddingHorizontal:10, borderRadius:24, borderWidth: 1, borderColor:'#7D53F5', marginRight:8, marginVertical:8 }} android_ripple={{ color: '#ffdddd' }}>Bali</Text>
                </Pressable>
              </View>
              <View style={{ flexDirection:'row', alignItems:'center' }}>
                <Pressable
                onPress={() => { this.closeModal(this.DaftarKategori('Surabaya')) }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black', paddingVertical: 5, paddingHorizontal:10, borderRadius:24, borderWidth: 1, borderColor:'#7D53F5', marginRight:8, marginVertical:8 }} android_ripple={{ color: '#ffdddd' }}>Surabaya</Text>
                </Pressable>
                <Pressable
                onPress={() => { this.closeModal(this.DaftarKategori('Semarang')) }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black', paddingVertical: 5, paddingHorizontal:10, borderRadius:24, borderWidth: 1, borderColor:'#7D53F5', marginRight:8, marginVertical:8 }} android_ripple={{ color: '#ffdddd' }}>Semarang</Text>
                </Pressable>
                <Pressable 
                onPress={() => { this.closeModal(this.DaftarKategori('Bandung')) }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black', paddingVertical: 5, paddingHorizontal:10, borderRadius:24, borderWidth: 1, borderColor:'#7D53F5', marginRight:8, marginVertical:8 }} android_ripple={{ color: '#ffdddd' }}>Bandung</Text>
                </Pressable>
                </View>
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
      </View>
    )
  }
}

const Header = ({ navigation, kirim }) => (
  <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 1, borderBottomColor: '#D9D9D9', borderBottomWidth: 0.5 }}>
    <BaseButton onPress={() => { navigation.navigate('Home') }}>
      <AntDesign name='close' size={22} color={'#383838'} ></AntDesign>
    </BaseButton>
    <BaseButton onPress={() => { kirim() }}>
      <Ionicons name='arrow-forward' size={24} color={'#383838'} ></Ionicons>
    </BaseButton>
  </View>
)

const UpGambar = ({ openModal, Kategori, openModalGambar, source, photoSize }) => (
  <View style={{ padding: 24 }}>
    <Text style={{ marginBottom: 8, fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'black' }}>Pilih Kategori</Text>
    <Pressable style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#B5B5B5', marginBottom: 30 }}
      onPress={() => { openModal() }}>
      <AntDesign name='caretdown' size={16} color={'#383838'} style={{ marginRight: 10, marginBottom: 5 }}></AntDesign>
      <Text style={{ fontFamily: 'Poppins-Light', fontSize: 14, color: 'black' }}>{Kategori}</Text>
    </Pressable>
    <Text style={{ marginBottom: 8, fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'black' }}>Upload Gambar</Text>
    <View style={{ borderColor: '#B5B5B5', borderBottomWidth: 1 }}>
      <Pressable
        onPress={() => { openModalGambar() }}>
        <Feather name='upload' size={20} color={'#383838'} style={{ marginRight: 10, marginBottom: 5 }}></Feather>
        <Image source={source || null} style={photoSize}></Image>
      </Pressable>
    </View>
  </View>
)

export default Upload