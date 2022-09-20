import { Text, View, Image, StatusBar, StyleSheet, ScrollView, TextInput, AsyncStorage, Pressable, Alert } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BaseButton } from 'react-native-gesture-handler'
import axios from 'axios'
import Constant from '../Componen/Constant'

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      url: Constant.api_url + 'api/uploadPostingan/postingan'
    }).then((parameter) => {
      console.log(JSON.stringify(parameter.data, null, 2))
      let filterAll = parameter.data.data.reverse()
      // .filter((kategori) => {
      //         return kategori.kategori == "Purwokerto"
      //     })
      console.log(filterAll)
      this.setState({ listPostingan: filterAll, masterData: parameter.data.data.reverse() })
    })
    //action like
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
      url: Constant.api_url + 'api/simpan/simpanPostingan/' + obj.data.username
    }).then((parameter) => {
      console.log('param', JSON.stringify(parameter.data, null, 2))
      this.setState({ SimpanPost: parameter.data.reverse() })
      console.log('simpan_user', this.state.SimpanPost)
    })
  }

  componentDidMount = () => {
    this.props.navigation.addListener(
      'focus',
      async () => {
        console.log('did')
        axios({
          method: 'GET',
          url: Constant.api_url + 'api/uploadPostingan/postingan'
        }).then((parameter) => {
          console.log(JSON.stringify(parameter.data, null, 2))
          let filterAll = parameter.data.data.reverse()
          // .filter((kategori) => {
          //         return kategori.kategori == "Purwokerto"
          //     })
          console.log(filterAll)
          this.setState({ listPostingan: filterAll, masterData: parameter.data.data.reverse() })
        })
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
          this.setState({ SimpanPost: parameter.data.reverse() })
          console.log('simpan_user', this.state.SimpanPost)
        })
        axios({
          method: 'GET',
          url: Constant.api_url + 'api/like/likePost/' + obj.data.username
        }).then((parameter) => {
          console.log(JSON.stringify(parameter.data, null, 2))
          this.setState({ likePost: parameter.data.data.reverse() })
          console.log('like_user', this.state.likePost)
        })
        this.GetAll()
      }
    )
  }

  GetAll = () => {
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/uploadPostingan/postingan'
    }).then((back) => {
      console.log(JSON.stringify(back.data, null, 2))
      let listPostingan = back.data.data.reverse()
      this.setState({ listPostingan: back.data.data.reverse() })
      console.log('listPostingan', listPostingan)
    }).catch((error) => {
      console.log("error", error)
    })
  }

  FilterMethod = (categori) => {
    console.log(categori)
    let filterPostingan = this.state.masterData
    filterPostingan = filterPostingan.filter((kategori) => {
      console.log(kategori.kategori == categori)
      return kategori.kategori == categori
    })
    console.log(filterPostingan)
    this.setState({ listPostingan: filterPostingan, Kategori: categori })
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
        //untuk auto realod
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

  search = (text) => {
    this.setState({ searchText: text })
    if (text === '') {
      axios({
        method: 'GET',
        url: Constant.api_url + 'api/uploadPostingan/postingan'
      }).then((parameter) => {
        console.log(JSON.stringify(parameter.data, null, 2))
        let filterAll = parameter.data.data.reverse()
        console.log(filterAll)
        this.setState({ listPostingan: filterAll, masterData: parameter.data.data.reverse() })
        this.FilterMethod(this.state.Kategori)
      })
    }
  }

  searchPost = () => {
    if (this.state.searchText === '') {
      axios({
        method: 'GET',
        url: Constant.api_url + 'api/uploadPostingan/postingan'
      }).then((parameter) => {
        console.log(JSON.stringify(parameter.data, null, 2))
        let filterAll = parameter.data.data.reverse()
        console.log(filterAll)
        this.setState({ listPostingan: filterAll, masterData: parameter.data.data.reverse() })
        //untuk filter tiap kategori
        this.FilterMethod(this.state.Kategori)
      })
    } else {
      axios({
        method: 'GET',
        url: Constant.api_url + 'api/uploadPostingan/search/' + this.state.searchText
      }).then((parameter) => {
        console.log(JSON.stringify(parameter.data, null, 2))
        let filterAll = parameter.data.data.reverse()
        console.log(filterAll)
        this.setState({ listPostingan: filterAll, masterData: parameter.data.data.reverse() })
        //untuk filter tiap lategori
        this.FilterMethod(this.state.Kategori)
      })
    }
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
        // if (back.data.message == 'success save') {
        //   // let simpan_master = this.state.masterData
        //   // let simpan_list = this.state.listPostingan
        //   // simpan_master.map((item, index) => {
        //   //   if (item == filterId) { simpan_master[index]['jumlah_simpan']++ }
        //   // })
        //   // simpan_list.map((item, index) => {
        //   //   if (item.id_postingan == filterId) { simpan_list[index]['jumlah_simpan']++ }
        //   // })
        //   // this.setState({ simpanPostingan: simpan_list, masterData: simpan_master })
        //   this.setState({ simpanPostingan: this.state.simpanPostingan, masterData: this.state.masterData })
        // }
        // else if (back.data.message == 'success unsave') {
        //   // let simpan_master = this.state.masterData
        //   // let simpan_list = this.state.listPostingan
        //   // simpan_master.map((item, index) => {
        //   //   if (item == filterId) { simpan_master[index]['jumlah_simpan']-- }
        //   // })
        //   // simpan_list.map((item, index) => {
        //   //   if (item.id_postingan == filterId) { simpan_list[index]['jumlah_simpan']-- }
        //   // })
        //   // this.setState({ simpanPostingan: simpan_list, masterData: simpan_master })
        //   this.setState({ simpanPostingan: this.state.simpanPostingan, masterData: this.state.masterData })
        // }
        console.log("masuk")
        let simpan = this.state.listSimpan
        simpan = [...simpan, back.data]
        this.setState({ listSimpan: simpan })
        //untuk auto realod
        axios({
          method: 'GET',
          url: Constant.api_url + 'api/simpan/simpanPostingan/' + obj.data.username
        }).then((parameter) => {
          console.log('param', JSON.stringify(parameter.data, null, 2))
          this.setState({ SimpanPost: parameter.data.reverse() })
          console.log('simpan_user', this.state.SimpanPost)
        })
      } else {
        Alert.alert("Gagal", back.data.message)
      }
    }).catch((error) => {
      console.log("error", error)
    })
  }

  render() {
    return (
      <View style={{ backgroundColor: '#FFF', flex: 1 }}>
        <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
        <Header searchPost={this.searchPost} Filter={(filterkategori) => { this.FilterMethod(filterkategori) }} navigation={this.props.navigation} GetAll={() => { this.GetAll() }} searchText={this.state.searchText} search={(text) => { this.search(text) }}></Header>
        <ScrollView >
          <TextHome></TextHome>
          {this.state.listPostingan.map((item, index) => {
            console.log(item, index)
            return <Postingan SimpanPost={this.state.SimpanPost} likePost={this.state.likePost} data={item} key={index} navigation={this.props.navigation} likePostingan={(like) => { this.Like(like) }} simpanPostingan={(simpan) => { this.Simpan(simpan) }} ></Postingan>
          })}
        </ScrollView>
        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop:-70 }}>
          <BaseButton style={{ backgroundColor: '#7D53F5', elevation: 3, width: 48, height: 48, borderRadius: 100, alignItems: 'center', justifyContent: 'center', margin: 10, marginRight: 20 }} onPress={() => { this.props.navigation.navigate('Notifikasi') }}>
            <Ionicons name='notifications-outline' size={27} color={'#FFF'}></Ionicons>
          </BaseButton>
        </View>
        <Footer navigation={this.props.navigation}></Footer>
      </View>
    )
  }
}

const Header = ({ navigation, Filter, GetAll, search, searchText, searchPost }) => (
  <View style={{ backgroundColor: '#FFF', paddingTop: 12, paddingBottom:8, paddingHorizontal: 16, borderBottomColor: '#D9D9D9', borderBottomWidth: 1, elevation: 1 }}>
    <View style={{ marginBottom: 10 }}>
      {/* <BaseButton style={{ paddingRight: 10 }} onPress={() => { navigation.navigate('Notifikasi') }}>
        <Ionicons name='notifications-outline' size={30} color={'#383838'}></Ionicons>
      </BaseButton> */}
      <View style={{ borderWidth: 2, borderColor: '#F3F3F3', borderRadius: 32, paddingRight: 7, paddingLeft: 10, paddingVertical: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <TextInput style={{ fontSize: 15, fontStyle: 'normal', color: "#696969", width:200 }} placeholder={'Cari Pekerjaan'} value={searchText} onChangeText={(text) => { search(text) }} ></TextInput>
          </View>
          {/* <Image style={{ position: 'absolute', padding: 5 }} source={require('../assets/icons/ellipse_search.png')}></Image> */}
          <BaseButton onPress={() => { searchPost() }} style={{ backgroundColor: '#D8D8D8', width: 38, height: 38, padding: 2, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
            <AntDesign name='search1' size={16} color={'black'}></AntDesign>
          </BaseButton>
        </View>
      </View>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 3 }}>
      <BaseButton onPress={() => { GetAll() }}>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#797979', backgroundColor: '#F6F2FF', padding: 2, elevation: 1, minWidth: 100, textAlign: 'center', marginRight: 5 }}>Semua</Text>
      </BaseButton>
      <BaseButton onPress={() => { Filter("Purwokerto") }}>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#797979', backgroundColor: '#F6F2FF', padding: 3, elevation: 1, minWidth: 100, textAlign: 'center', marginRight: 5 }}>Purwokerto</Text>
      </BaseButton>
      <BaseButton onPress={() => { Filter("Jakarta") }}>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#797979', backgroundColor: '#F6F2FF', padding: 3, elevation: 1, minWidth: 100, textAlign: 'center', marginRight: 5 }}>Jakarta</Text>
      </BaseButton>
      <BaseButton onPress={() => { Filter("Yogyakarta") }}>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#797979', backgroundColor: '#F6F2FF', padding: 3, elevation: 1, minWidth: 100, textAlign: 'center', marginRight: 5 }}>Yogyakarta</Text>
      </BaseButton>
      <BaseButton onPress={() => { Filter("Surabaya") }}>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#797979', backgroundColor: '#F6F2FF', padding: 3, elevation: 1, minWidth: 100, textAlign: 'center', marginRight: 5 }}>Surabaya</Text>
      </BaseButton>
      <BaseButton onPress={() => { Filter("Semarang") }}>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#797979', backgroundColor: '#F6F2FF', padding: 3, elevation: 1, minWidth: 100, textAlign: 'center', marginRight: 5 }}>Semarang</Text>
      </BaseButton>
      <BaseButton onPress={() => { Filter("Bandung") }}>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#797979', backgroundColor: '#F6F2FF', padding: 3, elevation: 1, minWidth: 100, textAlign: 'center', marginRight: 5 }}>Bandung</Text>
      </BaseButton>
      <BaseButton onPress={() => { Filter("Bali") }}>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#797979', backgroundColor: '#F6F2FF', padding: 3, elevation: 1, minWidth: 100, textAlign: 'center', marginRight: 5 }}>Bali</Text>
      </BaseButton>
    </ScrollView>
  </View>
)

// const Footer = ({ navigation }) => (
//   <View style={{ flexDirection: 'column' }}>
//     {/* <View style={{ marginTop: -70, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
//       <BaseButton style={{ backgroundColor: '#7D53F5', elevation:3, width: 48, height: 48, borderRadius: 100, alignItems: 'center', justifyContent: 'center', margin: 10, marginRight: 20 }} onPress={() => { navigation.navigate('Notifikasi') }}>
//         <Ionicons name='notifications-outline' size={27} color={'#FFF'}></Ionicons>
//       </BaseButton>
//     </View> */}
//     <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopColor: '#D9D9D9', borderTopWidth: .8, paddingHorizontal: 10, paddingVertical: 4 }}>
//       <BaseButton style={{ alignItems: 'center', justifyContent: 'center', justifyContent: 'center' }} onPress={() => { navigation.navigate('Home') }}>
//         <Image style={{ width: 25, height: 25 }} source={require('../assets/icons/home_1.png')}></Image>
//         <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 11, color: '#383838' }}>Home</Text>
//       </BaseButton>
//       <BaseButton style={{ alignItems: 'center', padding: 3, justifyContent: 'center' }} onPress={() => { navigation.navigate('Upload') }}>
//         <Feather name='plus-square' size={35} color={'#383838'}></Feather>
//       </BaseButton>
//       <View>
//         <BaseButton style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => { navigation.navigate('Profile') }}>
//           <MaterialCommunityIcons name='account-circle-outline' size={25} color={'#383838'}></MaterialCommunityIcons>
//           <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 11, color: 'black' }}>Profile</Text>
//         </BaseButton>
//       </View>
//     </View>
//   </View>
// )

const Footer = ({ navigation }) => (
  <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems:'center', borderTopColor: '#D9D9D9', borderTopWidth: .8, paddingHorizontal: 10, paddingVertical:4 }}>
      <BaseButton style={{ alignItems: 'center', justifyContent: 'center', justifyContent: 'space-around' }} onPress={() => { navigation.navigate('Home') }}>
        <Image style={{ width: 25, height: 25 }} source={require('../assets/icons/home_1.png')}></Image>
        <Text style={{ fontFamily:'Poppins-Regular', fontSize:11, color: '#383838' }}>Home</Text>
      </BaseButton>
      <View style={{ backgroundColor: '#FFF', borderRadius: 50, marginTop: - 20, padding: 3 }}>
        <BaseButton>
          <View style={{ backgroundColor: '#7D53F5', borderRadius: 50, padding: 10 }}>
            <Feather name="plus-square" size={29} color='#FFF'></Feather>
          </View>
        </BaseButton>
      </View>
      <View>
        <BaseButton style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => { navigation.navigate('Profile') }}>
          <MaterialCommunityIcons name='account-circle-outline' size={25} color={'#383838'}></MaterialCommunityIcons>
          <Text style={{ fontFamily:'Poppins-Regular', fontSize:11, color: 'black' }}>Profile</Text>
        </BaseButton>
      </View>
    </View>
)

const TextHome = () => (
  <View style={{ marginHorizontal: 16, marginBottom: 16, marginTop: 10 }}>
    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 28, color: 'black', marginBottom: -12 }}>Temukan Pekerjaan</Text>
    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 28, color: 'black' }}>yang kamu inginkan</Text>
    <Text style={{ fontFamily: 'Poppins-Light', fontSize: 14, color: 'black' }}>Menjadi salah satu bagian dari perusahaan</Text>
    <Text style={{ fontFamily: 'Poppins-Light', fontSize: 14, color: 'black' }}>impianmu</Text>
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
  return (
    <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
      <View style={{ flexDirection: "row", backgroundColor: '#FFF', padding: 8, elevation: 2, borderRadius: 8, marginBottom: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ width: 100, height: 100, margin: 8, marginRight: 20, borderRadius: 8 }} source={{ uri: Constant.api_url + data.gambar }}></Image>
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
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, color: 'black', width: 210 }}>{data.judul}</Text>
                  <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12, color: 'black', borderBottomColor: 'black', marginTop: 5 }}>{data.created_at}</Text>
                </BaseButton>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>{console.log("data like", data.id_postingan)}
              <BaseButton style={{ flexDirection: 'row', alignContent: 'center', marginRight: 20 }} onPress={() => { likePostingan(data.id_postingan) }}>
                {/* <AntDesign name='like2' size={17} color={'black'} style={{ marginRight: 5 }}></AntDesign> */}
                {
                  like == true
                    ? <AntDesign name='like1' size={17} color={'#383838'} style={{ marginRight: 5 }}></AntDesign>
                    : <AntDesign name='like2' size={17} color={'#383838'} style={{ marginRight: 5 }}></AntDesign>
                }
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#383838' }}>{data.jumlah_like}</Text>
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
                ? <Ionicons name='bookmark' size={20} color={'#511AEF'} style={{ marginRight: 5 }}></Ionicons>
                : <Ionicons name='bookmark-outline' size={20} color={'#B5B5B5'} style={{ marginRight: 5 }}></Ionicons>
            }
            {/* <Ionicons name='bookmark-outline' size={23} color={'#4416C7'} onPress={() => { simpanPostingan(data.id_postingan) }}></Ionicons> */}
          </BaseButton>
        </View>
      </View>
    </View>
  )
}


export default Home