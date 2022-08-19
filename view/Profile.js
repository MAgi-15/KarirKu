import { StatusBar, Text, View, Image, Modal, Button, AsyncStorage, Alert } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import axios from 'axios'
import Constant from '../Componen/Constant'

export class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      StatusModal: false,
      Username: '',
      listUserPostingan: [],
      data: '',
      kirim: '',
      masterData: [],
      listLike: [],
      likePost: []
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
      url: Constant.api_url + 'api/uploadPostingan/postinganbyUsername/' + obj.data.username
    }).then((parameter) => {
      console.log(JSON.stringify(parameter.data, null, 2))
      this.setState({ listUserPostingan: parameter.data.data })
    })
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/like/likePost/' + obj.data.username
    }).then((parameter) => {
      console.log(JSON.stringify(parameter.data, null, 2))
      this.setState({ likePost: parameter.data.data.reverse() })
      console.log('like_user', this.state.likePost)
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
        //untuk auto reload jumlah like
        axios({
          method: 'GET',
          url: Constant.api_url + 'api/uploadPostingan/postinganbyUsername/' + obj.data.username
        }).then((parameter) => {
          console.log(JSON.stringify(parameter.data, null, 2))
          this.setState({ listUserPostingan: parameter.data.data })
        })
        axios({
          method: 'POST',
          url: Constant.api_url +'api/user/EditUser/' + IdUser,
          data: PostData
      }).then((back) => {
          console.log(JSON.stringify(back))
          if (back.status===200&& back.data.message === "success" ){
            console.log("masuk")
            this.props.navigation.navigate('SettingProfile')
          } else{
            Alert.alert("Gagal", back.data.message)
          }
      })
        // axios({
        //   method: 'GET',
        //   url: Constant.api_url + 'api/uploadPostingan/postingan'
        // }).then((back) => {
        //   console.log(JSON.stringify(back.data, null, 2))
        //   let listPostingan = back.data.data.reverse()
        //   this.setState({ listPostingan: back.data.data.reverse() })
        //   console.log('listPostingan', listPostingan)
        // }).catch((error) => {
        //   console.log("error", error)
        // })
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
          let like_list = this.state.listUserPostingan
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
          let like_list = this.state.listUserPostingan
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
        //untuk auto reload action like
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

  deletePostingan = (id_postingan) => {
    console.log(id_postingan)
    console.log(Constant.api_url + 'api/uploadPostingan/deletePostingan/' + id_postingan)
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/uploadPostingan/deletePostingan/' + id_postingan
    }).then((deleteData) => {
      console.log(JSON.stringify(deleteData.data, null, 2))
      if (deleteData.data.message === 'success') {
        Alert.alert('Berhasil', 'Postingan berhasil dihapus', [
          {
            text: 'oke',
            style: 'default',
            onPress: this.props.navigation.navigate('Profile')
          }
        ])
      } else {
        Alert.alert('Gagal', 'Postingan gagal dihapus')
      }
    }).catch((error) => {
      console.log(error)
    })
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/uploadPostingan/postinganbyUsername/' + this.state.Username
    }).then((parameter) => {
      console.log(JSON.stringify(parameter.data, null, 2))
      this.setState({ listUserPostingan: parameter.data.data })
    })
  }


  render() {
    const { listUserPostingan, kirim } = this.state
    console.log(listUserPostingan, kirim)
    return (
      <View style={{ backgroundColor: '#FFF', flex: 1 }}>
        <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
          <PhotoProfile navigation={this.props.navigation} Username={this.state.Username}></PhotoProfile>
          {this.state.listUserPostingan?.map((item, index) => {
            console.log(item, index)
            return <Postingan data={item} key={index} likePost={this.state.likePost} deletePostingan={(data) => { this.deletePostingan(data) }} likePostingan={(like) => { this.Like(like) }} navigation={this.props.navigation}></Postingan>
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
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'black', marginBottom: 14 }}>{Username}</Text>
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
            <MaterialCommunityIcons name='folder-upload' size={26} color={'#383838'} style={{}} ></MaterialCommunityIcons>
          </BaseButton>
          <View style={{ borderColor: '#D8D8D8', borderWidth: .8, height:32 }}></View>
          <BaseButton onPress={() => { navigation.navigate('ProfileSimpan') }}>
            <Ionicons name='bookmark-outline' size={23} color={'#383838'} style={{}} ></Ionicons>
          </BaseButton>
        </View>
      </View>
    </View>
  </View>
)

const Postingan = ({ navigation, data, likePostingan, deletePostingan, likePost }) => {
  let like = false
  likePost.map(item => {
    if (data.id_postingan == item.id_postingan) {
      like = true
    } else {

    }
  })
  return (
    <View style={{ paddingHorizontal: 16, marginBottom:8 }}>
      <View style={{ flexDirection: "row", backgroundColor: '#FFF', paddingVertical: 8, paddingHorizontal: 8, elevation: 2, borderRadius: 8, marginBottom:5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ width: 100, height: 100, margin: 8, marginRight: 20, borderRadius: 8 }} source={{ uri: Constant.api_url + data.gambar }}></Image>
          <View>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#511AEF', marginRight: 10, width: 210 }}>{data.nama_pekerjaan}</Text>
            <BaseButton style={{ marginBottom: 10 }} onPress={() => {
              let kirim = ({
                data
              })
              navigation.navigate('DetailHome', kirim)
            }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, color: 'black', width: 210 }}>{data.judul}</Text>
              <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12, color: 'black', borderBottomColor: 'black', marginTop: 5 }}>{data.created_at}</Text>
            </BaseButton>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <BaseButton style={{ flexDirection: 'row', alignContent: 'center', marginRight: 20 }} onPress={() => { likePostingan(data.id_postingan) }}>
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
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black' }}>{data.jumlah_comment}</Text>
              </BaseButton>
            </View>
          </View>
        </View>
        <View>
          <Pressable android_ripple={{ color: '#ffdddd' }} onPress={() => {
            Alert.alert('Edit dan Delete', 'Anda mau edit atau delete???',
              [
                {
                  text: 'Cancel',
                  style: 'cancel'
                },
                {
                  text: 'Hapus',
                  style: 'default',
                  onPress: () => {
                    deletePostingan(data.id_postingan)
                  }
                },
                {
                  text: 'Edit',
                  style: 'default',
                  onPress: () => {
                    let kirim = ({
                      data
                    })
                    navigation.navigate('EditPostingan1', kirim)
                  }
                }
              ]
            )
          }}>
            <Entypo name='dots-three-vertical' size={18} color={'#511AEF'}></Entypo>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
export default Profile