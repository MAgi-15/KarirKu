import { Text, View, Image, AsyncStorage } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import axios from 'axios'
import Constant from '../Componen/Constant'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

export class Notifikasi extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listNotifikasi: [],
    }
  }

  UNSAFE_componentWillMount = async () => {
    const value = await AsyncStorage.getItem('users');
    console.log("dari Async storage", value)
    const obj = JSON.parse(value);
    console.log("id_user", obj.data.id_user)
    axios({
      method: 'GET',
      url: Constant.api_url + 'api/notif/getNotifikasi/' + obj.data.id_user
    }).then((parameter) => {
      console.log(JSON.stringify(parameter.data, null, 2))
      let dataNotif = parameter.data.data.reverse()
      this.setState({ listNotifikasi: dataNotif })
    }).catch((error) => {
      console.log("pesan_error", error)
    })
  }

  render() {
    return (
      <View style={{ backgroundColor: '#FFF', flex: 1 }}>
        <Header navigation={this.props.navigation}></Header>
        <ScrollView>
          {/* <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: 'black', marginVertical: 10, marginLeft:10 }}>Today</Text> */}
          {this.state.listNotifikasi.map((item, index) => {
            console.log(item, index)
            return <PesanNotif data={item} key={index} navigation={this.props.navigation}></PesanNotif>
          })}
        </ScrollView>
      </View>
    )
  }
}

const Header = ({ navigation }) => (
  <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingTop: 12, marginBottom: 16, flexDirection: 'row', alignItems: 'center', elevation: 2, borderBottomColor: '#D9D9D9', borderBottomWidth: 0.5 }}>
    <BaseButton style={{ justifyContent: 'flex-start', width: 30, paddingBottom: 12 }} onPress={() => { navigation.navigate('Home') }}>
      <Ionicons name='arrow-back' size={24} color={'#383838'} ></Ionicons>
    </BaseButton>
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#383838', paddingBottom: 12 }}>Notifikasi</Text>
    </View>
    <View style={{ width: 30 }}></View>
  </View>
)

const PesanNotif = ({ data, navigation, }) => (
  <View style={{ paddingHorizontal: 24, paddingVertical: 10 }}>
    <Pressable style={{ backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', borderRadius: 8, marginBottom: 2 }} onPress={() => {
      let kirim = {
        data
      }
      {
        data.id_postingan !== 0
          ?
          navigation.navigate('DetailNotif', kirim)
          : null
      }
      {
        data.id_comment !== 0
          ?
          navigation.navigate('ReplyComment', kirim)
          : null
      }
    }}>
      <Image source={require('../assets/images/photo_profile.png')} style={{ width: 40, height: 40, marginRight: 10 }}></Image>
      <View style={{ width: 310 }}>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, color: 'black' }}>{data.notifikasi}</Text>
        <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12, color: 'black' }}>{data.created_at}</Text>
      </View>
      {/* <View style={{ width: 250 }}>
        <View style={{ flexDirection:'row', alignItems:'center' }}>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13, color: 'black' }}>{data.username_notifikasi}</Text>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, color: 'black' }}>{data.notifikasi}</Text>
        </View>
        <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12, color: 'black' }}>{data.created_at}</Text>
      </View> */}
    </Pressable>
  </View>

)

export default Notifikasi