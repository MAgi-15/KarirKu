import { Text, View, Image, StatusBar, AsyncStorage, Alert } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import axios from 'axios'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

export class CommentScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listComment: [],
      Komen: '',
      id_postingan: this.props.route.params.data.id_postingan,
      username: '',
      comment: '',
      user_post: this.props.route.params.data.username
    }
  }

  //untuk memberi username pada komen
  UNSAFE_componentWillMount = async() => {
    const value = await AsyncStorage.getItem('users');
    console.log("dari async storage", value)
    const obj = JSON.parse(value);
    console.log("username", obj.data.username)
    this.setState({ username: obj.data.username })
    let idPostingan = this.state.id_postingan
    console.log("IdPostingan", idPostingan)
    console.log('cek', Constant.api_url + 'api/comment/tambahcomment/' + idPostingan)
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/comment/tambahcomment/' + idPostingan
    }).then((parameter) => {
      console.log(JSON.stringify(parameter.data, null, 2))
      this.setState({ listComment: parameter.data.data })
    })
  }

  Komen = (komen) => {
    console.log("balasth", komen)
    this.setState({ Komen: komen })
  }

  Comment = async () => {
    const value = await AsyncStorage.getItem('users');
    console.log("dari async storage", value)
    const obj = JSON.parse(value);
    console.log("username", obj.data.username)
    this.setState({ username: obj.data.username })
    const { id_postingan, username, comment, Komen, user_post } = this.state
    let PostComment = {
      "username_postingan": user_post,
      "id_postingan": id_postingan,
      "username": obj.data.username,
      "comment": Komen
    }
    console.log(Constant.api_url + 'api/comment/tambahcommentlagi')
    console.log('PostComment', PostComment)
    axios({
      method: 'POST',
      url: Constant.api_url + 'api/comment/tambahcommentlagi',
      data: PostComment
    }).then(async (back) => {
      let Comment = back.data
      console.log(Comment)
      if (back.status === 200 && back.data.message === "success") {
        console.log("masuk")
        let Comment = this.state.listComment
        Comment = [...Comment, back.data.data]
        this.setState({ listComment: Comment, Komen: '' })
      } else {
        Alert.alert("Gagal", back.data.message)
      }
    }).catch((error) => {
      console.log("error", JSON.stringify(error))
    })
  }

  deleteComment = (id_comment) => {
    console.log('id_comment', id_comment)
    console.log(Constant.api_url + 'api/comment/deleteComment/' + id_comment)
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/comment/deleteComment/' + id_comment
    }).then((deleteData) => {
      console.log(JSON.stringify(deleteData.data, null, 2))
      if (deleteData.data.message === 'success delete') {
        Alert.alert('Berhasil', 'Komen berhasil dihapus', [
          {
            text: 'oke',
            style: 'default',
            onPress: this.props.navigation.navigate('CommentScreen')
          }
        ])
      } else {
        Alert.alert('Gagal', 'Komen gagal dihapus')
      }
    }).catch((error) => {
      console.log(error)
    })
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/comment/tambahcomment/' + this.state.id_postingan
    }).then((parameter) => {
      console.log(JSON.stringify(parameter.data, null, 2))
      this.setState({ listComment: parameter.data.data || [] })
    })
  }

  render() {
    const data_kirim = this.props.route.params.data
    console.log("data kirim", data_kirim)
    return (
      <View style={{ backgroundColor: '#FFF', flex: 1 }}>
        <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
          <Postingan data={data_kirim}></Postingan>
          <Text style={{ paddingHorizontal: 20, paddingVertical: 5, color: 'black', fontFamily: 'Poppins-SemiBold', fontSize: 14 }}>Komentar</Text>
          {this.state.listComment.map((item, index) => {
            console.log(item, index)
            return <Komentar data={item} key={index} deleteComment={(data) => { this.deleteComment(data) }} navigation={this.props.navigation} username={this.state.username}></Komentar>
          })}
        </ScrollView>
        <Footer KomenPost={(kirimcomment) => { this.Komen(kirimcomment) }} Comment={() => { this.Comment() }} comment={this.state.Komen} navigation={this.props.navigation}></Footer>
      </View>
    )
  }
}

const Header = ({ navigation }) => (
  <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingTop: 12, flexDirection: 'row', alignItems: 'center', elevation: 2, borderBottomColor: '#D9D9D9', borderBottomWidth: 0.5 }}>
    <BaseButton style={{ justifyContent: 'flex-start', width: 30, paddingBottom: 12 }} onPress={() => { navigation.navigate('Home') }}>
      <Ionicons name='arrow-back' size={24} color={'#383838'} ></Ionicons>
    </BaseButton>
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#383838', paddingBottom: 12 }}>Komentar</Text>
    </View>
    <View style={{ width: 30 }}></View>
  </View>
)

const Postingan = ({ data }) => (
  <View style={{ backgroundColor: '#FFF', paddingVertical: 16, marginBottom: 8, elevation: 2, paddingHorizontal: 20 }}>
    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: 'black', marginBottom: 16, width: 340 }}>{data.judul}</Text>
    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
      <Image style={{ width: 370, height: 200 }} source={{ uri: Constant.api_url + data.gambar }}></Image>
    </View>
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'black', marginRight: 10 }}>Kategori :</Text>
      <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, color: 'black' }}>{data.kategori}</Text>
    </View>
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'black', marginRight: 10 }}>Pekerjaan :</Text>
      <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, color: 'black', width: 250 }}>{data.nama_pekerjaan}</Text>
    </View>
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'black', marginRight: 10 }}>Deskripsi :</Text>
      <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, color: 'black', width: 340 }}>{data.deskripsi}</Text>
    </View>
  </View>
)

const Komentar = ({ data, deleteComment, username, navigation }) => (
  <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
    <View style={{ flexDirection: 'row' }}>
    <Image source={require('../assets/images/photo_profile.png')} style={{ width: 40, height: 40, marginRight: 10 }}></Image>
    <View style={{ backgroundColor:'#FFF', paddingHorizontal: 16, paddingVertical: 8, marginBottom: 10, elevation: 2, width: 315, borderTopRightRadius: 8, borderBottomLeftRadius: 8, borderBottomRightRadius: 8  }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column' }}>
          <View>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13, color: 'black', width: 200 }}>{data.username}</Text>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: 'black' }}>{data.comment}</Text>
          </View>
          <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12, color: 'black' }}>{data.created_at}</Text>
        </View>
      </View>
      <View style={{}}>
        <Pressable style={{ marginBottom: 8 }} android_ripple={{ color: '#ffdddd' }} onPress={() => {
          {
            data.username === username
              // console.log("user_login", data_kirim.username)
              ?
              Alert.alert('Hapus komen', 'Anda yakin ingin menghapus komentar ini???',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  },
                  {
                    text: 'Hapus',
                    style: 'default',
                    onPress: () => {
                      deleteComment(data.id_comment)
                    }
                  }
                ]
              )
              : null
          }
        }}>
          <MaterialCommunityIcons name='delete' size={16} color={'#383838'}></MaterialCommunityIcons>
        </Pressable>
        <BaseButton onPress={() => {
          let kirim = ({
            data
          })
          navigation.navigate('ReplyComment', kirim)
        }}>
          <Entypo name='reply' size={16} color={'#383838'}></Entypo>
        </BaseButton>
      </View>
    </View>
    </View>
    </View>
  </View>
)

const Footer = ({ Comment, comment, KomenPost }) => (
  <View style={{ backgroundColor: '#FFF', paddingVertical: 10, borderTopColor: '#D9D9D9', borderTopWidth: 0.8, paddingHorizontal: 10, elevation: 2 }}>
      <View style={{ borderWidth: 2, borderColor: '#F3F3F3', borderRadius: 32, paddingRight: 20, paddingLeft: 10, paddingVertical: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextInput style={{ fontSize: 15, fontStyle: 'normal', color: "#696969", width: 330 }} placeholder={'Beri Komentar'} value={comment} onChangeText={(komenpost) => { KomenPost(komenpost) }}></TextInput>
              <BaseButton onPress={() => {
                  console.log("Comment")
                  //isi dari fungsi
                  Comment()
              }}>
                  <View style={{ backgroundColor: '#511AEF', width: 35, height: 35, padding: 5, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name='send-sharp' size={18} color={'#FFF'}></Ionicons>
                  </View>
              </BaseButton>
          </View>
      </View>
  </View>
)

export default CommentScreen