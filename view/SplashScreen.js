import { Text, View, Image, StatusBar, AsyncStorage, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import { fcmService } from '../src/components/FCMService'
import { localNotificationService } from '../src/components/LocalNotificationService'

export class SplashScreen extends Component {

  constructor(props) {
    super(props)

    this.fcmNotification = null
    this.localNotification = null
  }

  UNSAFE_componentWillMount = async () => {
    const user = await AsyncStorage.getItem('users')
    let userlogin = JSON.parse(user)
    console.log(userlogin.message)
    if (userlogin.message == 'data falid') {
      this.props.navigation.replace('Home')
    } else {

    }
  }

  componentDidMount = async () => {
    this.fcmNotification = fcmService
    this.localNotification = localNotificationService

    await this.fcmNotification.registerAppWithFCM()
    this.fcmNotification.register(this.onRegister, this.onNotification, this.onOpenNotification)

    this.localNotification.createDefaultChannels()
    this.localNotification.configure(this.onOpenNotification)
  }

  onRegister = async (token) => { // fungsi register token utk firebase notifikasi
    console.log("[App] onRegister: ", token);
    await AsyncStorage.setItem('fcmToken', token)
  }

  onNotification(notify) { // fungsi memberikan notifikasi ke device setelah menerima data dari firebase
    console.log("[App] onNotification: ", notify);
    const options = {
      soundName: 'default',
      playSound: true
    }
    let body = notify.body
    localNotificationService.showNotification(
      0,
      notify.title,
      body,
      notify,
      options
    )
  }

  onOpenNotification = () => {

  }
  
  render() {
    return (
      <View>
        <StatusBar backgroundColor={'#000'} barStyle='light-content'></StatusBar>
        <Gambar navigation={this.props.navigation}></Gambar>
      </View>
    )
  }
}

const Gambar = ({ navigation }) => (
  <View>
    <Image source={require('../assets/images/unsplash_2.png')} style={{ width: Dimensions.get('screen').width, height:  Dimensions.get('screen').height, position: 'absolute' }}></Image>
    <View style={{ paddingLeft: 40, paddingTop: 50, marginBottom: 380 }}>
      <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 30, color: '#511AEF' }}>KarirKu</Text>
      <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 30, color: '#FFFFFF' }}>Temukan</Text>
      <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 30, color: '#511AEF' }}>Pekerjaanmu</Text>
      <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 30, color: '#FFFFFF' }}>dengan Mudah</Text>
    </View>
    <BaseButton style={{ alignItems: 'center', justifyContent:'center', marginBottom: 20 }} onPress={() => { navigation.navigate('Login') }}>
      <View style={{ backgroundColor: '#511AEF', borderRadius:8, paddingVertical:8, paddingHorizontal:80, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, color: 'white' }}>Login</Text>
      </View>
    </BaseButton>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#fff', marginRight: 5 }}>Kamu belum punya akun?</Text>
      <BaseButton onPress={() => { navigation.navigate('Register') }}>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#511AEF' }}>Register</Text>
      </BaseButton>
    </View>
  </View>
)

export default SplashScreen