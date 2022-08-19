import { StatusBar, Text, View, Image, AsyncStorage } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import axios from 'axios'

export class ProfileSimpan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Username: '',
      IdComment: '',
      data: '',
      listSimpanPostingan: [],
      listPostingan: [],
      masterData: [],
      listLike: [],
      listSimpan: [],
      searchText: '',
      Kategori: '',
      likePost: [],
      SimpanPost: []
    }
  }

  UNSAFE_componentWillMount = async () => {
    const value = await AsyncStorage.getItem('users');
    // console.log("dari async storage", value)
    const obj = JSON.parse(value);
    console.log("Username", obj.data.username)
    this.setState({ Username: obj.data.username })
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/simpan/simpanPostingan/' + obj.data.username
    }).then((parameter) => {
      console.log('param', JSON.stringify(parameter.data, null, 2))
      this.setState({ listSimpanPostingan: parameter.data })
    })
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/like/likePost/' + obj.data.username
    }).then((parameter) => {
      console.log(JSON.stringify(parameter.data, null, 2))
      this.setState({ likePost: parameter.data.data.reverse() })
      console.log('like_user', this.state.likePost)
    })
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/uploadPostingan/postinganbyUsername/' + obj.data.username
    }).then((parameter) => {
      console.log(JSON.stringify(parameter.data, null, 2))
      this.setState({ listUserPostingan: parameter.data.data })
    })
  }

  componentDidMount = () => {
    this.props.navigation.addListener(
      'focus',
      async () => {
        const value = await AsyncStorage.getItem('users');
        // console.log("dari async storage", value)
        const obj = JSON.parse(value);
        console.log("Username", obj.data.username)
        this.setState({ Username: obj.data.username })
        axios({
          method: 'GET',
          url: Constant.api_url + 'api/simpan/simpanPostingan/' + obj.data.username
        }).then((parameter) => {
          console.log('param', JSON.stringify(parameter.data, null, 2))
          this.setState({ listSimpanPostingan: parameter.data })
        })
        axios({
          method: 'GET',
          url: Constant.api_url + 'api/uploadPostingan/postinganbyUsername/' + obj.data.username
        }).then((parameter) => {
          console.log(JSON.stringify(parameter.data, null, 2))
          this.setState({ listUserPostingan: parameter.data.data })
        })
      }
    )
  }

  Like = async (filterId) => {
    console.log("data_id", filterId)
    const value = await AsyncStorage.getItem('users');
    console.log("dari async storage", value)
    const obj = JSON.parse(value);
    console.log("obj", obj.data.username)
    const { id_postingan, username } = this.state
    let PostLike = {
      "id_postingan": filterId,
      "username": obj.data.username
    }
    console.log(Constant.api_url + 'api/like/likelagi')
    console.log('PostLike', PostLike)
    axios({
      method: 'POST',
      url: Constant.api_url + 'api/like/likelagi',
      data: PostLike
    }).then(async (back) => {
      let Like = back.data
      console.log('LIKE', JSON.stringify(Like, null, 2))
      if (back.status === 200) {
        if (back.data.message == 'success like') {
          let like_master = this.state.masterData
          let like_list = this.state.listPostingan
          like_master.map((item, index) => {
            if (item == filterId) { like_master[index]['jumlah_like']++ }
          })
          like_list.map((item, index) => {
            if (item.id_postingan == filterId) { like_list[index]['jumlah_like']++ }
          })
          this.setState({ likePostingan: like_list, masterData: like_master })
        }
        else if (back.data.message == 'success unlike') {
          let like_master = this.state.masterData
          let like_list = this.state.listPostingan
          like_master.map((item, index) => {
            if (item == filterId) { like_master[index]['jumlah_like']-- }
          })
          like_list.map((item, index) => {
            if (item.id_postingan == filterId) { like_list[index]['jumlah_like']-- }
          })
          this.setState({ likePostingan: like_list, masterData: like_master })
        }
        console.log("masuk")
        let like = this.state.listLike
        like = [...like, back.data]
        this.setState({ listLike: like })
        //untuk auto reload
        axios({
          method: 'GET',
          url: Constant.api_url + 'api/like/likePost/' + obj.data.username
        }).then((parameter) => {
          console.log(JSON.stringify(parameter.data, null, 2))
          this.setState({ likePost: parameter.data.data.reverse() })
          console.log('like_user', this.state.likePost)
        })
      } else {
        Alert.alert("Gagal", back.data.message)
      }
    }).catch((error) => {
      console.log("error", error)
    })
  }

  Simpan = async (filterId) => {
    console.log("data_id", filterId)
    const value = await AsyncStorage.getItem('users');
    console.log("dari async storage", value)
    const obj = JSON.parse(value);
    console.log("obj", obj.data.username)
    const { id_postingan, username } = this.state
    let PostSimpan = {
      "id_postingan": filterId,
      "username": obj.data.username
    }
    console.log(Constant.api_url + 'api/simpan/createSimpanPost')
    console.log('PostSimpan', PostSimpan)
    axios({
      method: 'POST',
      url: Constant.api_url + 'api/simpan/createSimpanPost',
      data: PostSimpan
    }).then(async (back) => {
      let Simpan = back.data
      console.log('LIKE', JSON.stringify(Simpan, null, 2))
      if (back.status === 200) {
        if (back.data.message == 'success save') {
          // let simpan_master = this.state.masterData
          // let simpan_list = this.state.listPostingan
          // simpan_master.map((item, index) => {
          //   if (item == filterId) { simpan_master[index]['jumlah_simpan']++ }
          // })
          // simpan_list.map((item, index) => {
          //   if (item.id_postingan == filterId) { simpan_list[index]['jumlah_simpan']++ }
          // })
          // this.setState({ simpanPostingan: simpan_list, masterData: simpan_master })
          this.setState({ simpanPostingan: this.state.simpanPostingan, masterData: this.state.masterData })
        }
        else if (back.data.message == 'success unsave') {
          // let simpan_master = this.state.masterData
          // let simpan_list = this.state.listPostingan
          // simpan_master.map((item, index) => {
          //   if (item == filterId) { simpan_master[index]['jumlah_simpan']-- }
          // })
          // simpan_list.map((item, index) => {
          //   if (item.id_postingan == filterId) { simpan_list[index]['jumlah_simpan']-- }
          // })
          // this.setState({ simpanPostingan: simpan_list, masterData: simpan_master })
          this.setState({ simpanPostingan: this.state.simpanPostingan, masterData: this.state.masterData })
        }
        let simpan = this.state.listSimpan
        simpan = [...simpan, back.data]
        this.setState({ listSimpan: simpan })
        //untuk auto reload
        axios({
          method: 'GET',
          url: Constant.api_url + 'api/simpan/simpanPostingan/' + obj.data.username
        }).then((parameter) => {
          console.log('param', JSON.stringify(parameter.data, null, 2))
          this.setState({ listSimpanPostingan: parameter.data })
        })
      } else {
        Alert.alert("Gagal", back.data.message)
      }
    }).catch((error) => {
      console.log("error", error)
    })
  }

  render() {
    const { listSimpanPostingan } = this.state
    console.log('CCCCCCCCCC', this.state.listSimpanPostingan)
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
          <PhotoProfile navigation={this.props.navigation} Username={this.state.Username}></PhotoProfile>
          {this.state.listSimpanPostingan.map((item, index) => {
            console.log('AAAAAAAAAAAAA ',item, index)
            return <Postingan data={item} key={index} SimpanPost={this.state.SimpanPost} likePost={this.state.likePost} likePostingan={(like) => { this.Like(like) }} simpanPostingan={(simpan) => { this.Simpan(simpan) }} navigation={this.props.navigation}></Postingan>
          })}
        </ScrollView>
        <Footer navigation={this.props.navigation}></Footer>
      </View>
    )
  }
}

const Header = ({ navigation }) => (
  <View style={{ backgroundColor: '#FFF', paddingLeft: 20, paddingRight: 25, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 2, borderBottomColor: '#D8D8D8', borderBottomWidth: .8 }}>
    <BaseButton onPress={() => { navigation.navigate('Home') }}>
      <Ionicons name='arrow-back' size={24} color={'#383838'} ></Ionicons>
    </BaseButton>
    <BaseButton onPress={() => { navigation.navigate('SettingProfile') }}>
      <Ionicons name='settings-outline' size={24} color={'#383838'} ></Ionicons>
    </BaseButton>
  </View>
)

const Footer = ({ navigation }) => (
  <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems:'center', borderTopColor: '#D9D9D9', borderTopWidth: .8, paddingHorizontal: 10, paddingVertical:4 }}>
      <BaseButton style={{ alignItems: 'center', justifyContent: 'center', justifyContent: 'space-around' }} onPress={() => { navigation.navigate('Home') }}>
        <Image style={{ width:25, height:25 }} source={require('../assets/icons/home_2.png')}></Image>
        <Text style={{ fontFamily:'Poppins-Regular', fontSize:11, color: '#383838' }}>Home</Text>
      </BaseButton>
      <BaseButton style={{ alignItems: 'center', padding: 3, justifyContent: 'center' }} onPress={() => { navigation.navigate('Upload') }}>
        <Feather name='plus-square' size={35} color={'#383838'}></Feather>
      </BaseButton>
      <View>
        <BaseButton style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => { navigation.navigate('Profile') }}>
          <MaterialCommunityIcons name='account-circle' size={26} color={'#383838'} style={{ marginBottom: -1 }}></MaterialCommunityIcons>
          <Text style={{ fontFamily:'Poppins-Regular', fontSize:11, color: 'black' }}>Profile</Text>
        </BaseButton>
      </View>
    </View>
)

const PhotoProfile = ({ navigation, Username }) => (
  <View style={{ marginTop: 24, paddingHorizontal: 20, marginBottom:16 }}>
    <View style={{ paddingHorizontal: 10 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image style={{ marginBottom: 15, flexDirection: 'row' }} source={require('../assets/images/photo_profile.png')}></Image>
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'black', marginBottom: 15 }}>{Username}</Text>
      </View>
    </View>
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <BaseButton style={{ alignItems: 'center', marginBottom: 20 }} onPress={() => { navigation.navigate('EditProfile') }}>
        <View style={{ backgroundColor: '#FFF', borderColor: '#D8D8D8', borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 8, paddingVertical:2 , paddingHorizontal:130}}>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black' }}>Edit profile</Text>
        </View>
      </BaseButton>
      <View style={{ borderBottomColor: '#DADADA', borderBottomWidth: 1, width: 420, paddingVertical: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <BaseButton onPress={() => { navigation.navigate('Profile') }}>
            <MaterialCommunityIcons name='folder-upload-outline' size={26} color={'#383838'} style={{}} ></MaterialCommunityIcons>
          </BaseButton>
          <View style={{ borderColor: '#D8D8D8', borderWidth: .6, height:32 }}></View>
          <BaseButton onPress={() => { navigation.navigate('ProfileSimpan') }}>
            <Ionicons name='bookmark' size={23} color={'#383838'} style={{}} ></Ionicons>
          </BaseButton>
        </View>
      </View>
    </View>
  </View>
)

const Postingan = ({ navigation, data, likePostingan, simpanPostingan, likePost, SimpanPost }) => {
  let like = false
  likePost.map(item => {
    if (data.id_postingan == item.id_postingan) {
      like = true
    } else {

    }
  })

  let simpan = false
  SimpanPost.map(item => {
    if (data.id_postingan == item.id_postingan) {
      simpan = true
    } else {

    }
  })

  if (data.id_postingan===10) {
    console.log('BBBBBBBBBBBBBBB ', data.jumlah_like)
  }
  return (
    <View style={{ paddingHorizontal: 16, paddingBottom:8 }}>
      <View style={{ flexDirection: "row", backgroundColor: '#FFF', padding: 8, elevation: 2, borderRadius: 8, marginBottom:5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ width: 100, height: 100, margin: 10, marginRight: 20, borderRadius: 8 }} source={{ uri: Constant.api_url + data.gambar }}></Image>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#511AEF', width: 210 }}>{data.nama_pekerjaan}</Text>
              <View>
                <BaseButton style={{ marginBottom: 10 }} onPress={() => {
                  let kirim = ({
                    data
                  })
                  navigation.navigate('DetailHome', kirim)
                }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'black', width: 210 }}>{data.judul}</Text>
                  <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12, color: 'black', borderBottomColor: 'black', marginTop: 5 }}>{data.created_at}</Text>
                </BaseButton>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>{console.log("data like", data.id_postingan)}
              <BaseButton style={{ flexDirection: 'row', alignContent: 'center', marginRight: 20 }} onPress={() => { likePostingan(data.id_postingan) }}>
                {/* <AntDesign name='like2' size={17} color={'black'} style={{ marginRight: 5 }}></AntDesign> */}
                {
                  like == true
                    ? <AntDesign name='like1' size={17} color={'black'} style={{ marginRight: 5 }}></AntDesign>
                    : <AntDesign name='like2' size={17} color={'black'} style={{ marginRight: 5 }}></AntDesign>
                }
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'black' }}>{data.jumlah_like}</Text>
              </BaseButton>
              <BaseButton style={{ flexDirection: 'row', alignContent: 'center' }} onPress={() => {
                let kirim = ({
                  data
                })
                navigation.navigate('CommentScreen', kirim)
              }}>
                <Feather name='message-square' size={17} color={'black'} style={{ marginRight: 5 }}></Feather>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'black' }}>{data.jumlah_comment}</Text>
              </BaseButton>
            </View>
          </View>
        </View>
        <View style={{}}>
          <BaseButton onPress={() => { simpanPostingan(data.id_postingan) }}>
            {
              simpan == true
                ? <Ionicons name='bookmark-outline' size={20} color={'#511AEF'} style={{ marginRight: 5 }}></Ionicons>
                : <Ionicons name='bookmark' size={20} color={'#511AEF'} style={{ marginRight: 5 }}></Ionicons>
            }
            {/* <Ionicons name='bookmark-outline' size={23} color={'#4416C7'} onPress={() => { simpanPostingan(data.id_postingan) }}></Ionicons> */}
          </BaseButton>
        </View>
      </View>
    </View>
  )
}

export default ProfileSimpan