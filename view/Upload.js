import { Text, View, Image, Modal, Button, Dimensions } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const{width, height}= Dimensions.get('screen')
export class Upload extends Component {
  constructor(props){
    super(props)
    this.state = {
      StatusModal : false,
      StatusModalGambar : false,
      Kategori: 'Pilih Kategori',
      source: '',
      photoAttachment : '',
      photoSize : ''
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
            launchCamera(options, async (response) => { this.callbackUpload(response) }).catch((error)=>{
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

openModal = ()=> {
    this.setState({StatusModal : true})
}
closeModal = ()=> {
    this.setState({StatusModal : false})
}
openModalGambar = ()=> {
    this.setState({StatusModalGambar : true})
}
closeModalGambar = ()=> {
    this.setState({StatusModalGambar : false})
}
DaftarKategori = (value)=> {
  this.setState({Kategori : value})
}

  render() {
    const {source, photoSize, photoAttachment} = this.state
      console.log(source)
      console.log(photoSize)
      console.log(photoAttachment)
    return (
      <View style={{ backgroundColor:'#FFF', flex:1 }}>
        <Header navigation={this.props.navigation}></Header>
        <UpGambar source={source} photoSize={photoSize} closeModal={function(){this.closeModal()}} openModal={()=>{this.openModal()}} Kategori={this.state.Kategori} closeModalGambar={function(){this.closeModalGambar()}} openModalGambar={()=>{this.openModalGambar()}}></UpGambar>
        <Modal visible={this.state.StatusModal} transparent>
                <View style={{flex:1, backgroundColor:'rgba(80,80,80,.0)', alignItems:'flex-start', justifyContent:'flex-start'}}>
                    <View style={{backgroundColor:'white', padding:15, minWidth:150, elevation:2, height:300, marginTop:130, marginLeft:30}}>
                    <AntDesign name='closecircleo' size={20} color={'black'} onPress={()=>{this.closeModal()}} ></AntDesign>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        <Pressable style={{marginVertical:10, padding:5, borderWidth:1}}  android_ripple={{color:'#ffdddd'}} onPress={()=>{this.closeModal(this.DaftarKategori ('Purwokerto'))}} >
                            <Text style={{fontFamily:'Poppins-Regular', fontSize:15, color:'black'}}>Purwokerto</Text>
                        </Pressable>
                        <Pressable style={{ marginVertical:10, padding:5, borderWidth:1}} android_ripple={{color:'#ffdddd'}} onPress={()=> {this.closeModal(this.DaftarKategori('Jakarta'))}}>
                            <Text style={{fontFamily:'Poppins-Regular', fontSize:15, color:'black'}}>Jakarta</Text>
                        </Pressable>
                        <Pressable style={{marginVertical:10, padding:5, borderWidth:1}} android_ripple={{color:'#ffdddd'}} onPress={()=> {this.closeModal(this.DaftarKategori('Yogyakarta'))}}>
                            <Text style={{fontFamily:'Poppins-Regular', fontSize:15, color:'black'}}>Yogyakarta</Text>
                        </Pressable>
                        <Pressable style={{marginVertical:10, padding:5, borderWidth:1}} android_ripple={{color:'#ffdddd'}} onPress={()=> {this.closeModal(this.DaftarKategori('Surabaya'))}}>
                            <Text style={{fontFamily:'Poppins-Regular', fontSize:15, color:'black'}}>Surabaya</Text>
                        </Pressable>
                        <Pressable style={{marginVertical:10, padding:5, borderWidth:1}} android_ripple={{color:'#ffdddd'}} onPress={()=> {this.closeModal(this.DaftarKategori('Semarang'))}}>
                            <Text style={{fontFamily:'Poppins-Regular', fontSize:15, color:'black'}}>Semarang</Text>
                        </Pressable>
                        <Pressable style={{marginVertical:10, padding:5, borderWidth:1}} android_ripple={{color:'#ffdddd'}} onPress={()=> {this.closeModal(this.DaftarKategori('Bandung'))}}>
                            <Text style={{fontFamily:'Poppins-Regular', fontSize:15, color:'black'}}>Bandung</Text>
                        </Pressable>
                        <Pressable style={{marginVertical:10, padding:5, borderWidth:1}} android_ripple={{color:'#ffdddd'}} onPress={()=> {this.closeModal(this.DaftarKategori('Bali'))}}>
                            <Text style={{fontFamily:'Poppins-Regular', fontSize:15, color:'black'}}>Bali</Text>
                        </Pressable>
                      </ScrollView>
                    </View>
                </View>
            </Modal>
            <Modal visible={this.state.StatusModalGambar} transparent>
            <View style={{flex:1, backgroundColor:'rgba(80,80,80,.5)', alignItems:'center', justifyContent:'center'}}>
              <View style={{backgroundColor:'white', padding:15, minWidth:150, elevation:2}}>
                <AntDesign name='closecircleo' size={20} color={'black'} onPress={()=>{this.closeModalGambar()}} style={{ marginBottom:10 }} ></AntDesign>
                <Pressable style={{marginVertical:5, padding:5, borderWidth:1 }}  android_ripple={{color:'#ffdddd'}} onPress={()=>{this.closeModalGambar(this.uploadPhoto('camera'))}}>
                    <Text style={{fontFamily:'Poppins-Regular', fontSize:15, color:'black'}}>Camera</Text>
                </Pressable>
                <Pressable style={{ marginVertical:5, padding:5, borderWidth:1 }} android_ripple={{color:'#ffdddd'}} onPress={()=> {this.closeModalGambar(this.uploadPhoto('select-from-gallery'))}}>
                    <Text style={{fontFamily:'Poppins-Regular', fontSize:15, color:'black'}}>Galery</Text>
                </Pressable>
              </View>
          </View>
        </Modal>
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

const UpGambar = ({openModal, Kategori, openModalGambar, source, photoSize})=> (
    <View style={{ padding:30 }}>
        <Text style={{ marginBottom:7, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Pilih Kategori</Text>
        <Pressable style={{ flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#454545', marginBottom:30 }} onPress={()=>{openModal()}}>
            <AntDesign name='caretdown' size={20} color={'black'} style={{ marginRight:10, marginBottom:5 }}></AntDesign>
            <Text style={{ fontFamily:'Poppins-Light', fontSize:14, color:'black' }}>{Kategori}</Text>
        </Pressable>
        <Text style={{ marginBottom:7, fontFamily:'Poppins-SemiBold', fontSize:16, color:'black' }}>Upload Gambar</Text>
        <Pressable style={{ borderBottomWidth:1, borderColor:'#454545', padding:5 }} onPress={()=>{openModalGambar()}}>
            <Feather name='upload' size={20} color={'black'} style={{ marginRight:10, marginBottom:10 }}></Feather>
            <Image source={source} style={photoSize}></Image>
        </Pressable>
    </View>
)

export default Upload