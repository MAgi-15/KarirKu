import {
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  AsyncStorage,
  Alert,
} from 'react-native';
import React, { Component } from 'react';
import { BaseButton } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Constant from '../Componen/Constant';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
    };
  }

  loginUser = async () => {
    // this.props.navigation.navigate('Home')
    // return
    let token = await AsyncStorage.getItem('fcmToken')
    const { Email, Password } = this.state;
    let PostData = {
      email: Email,
      password: Password,
      token
    };
    console.log('http://192.168.0.111:8000/api/user/login');
    console.log('PostData', PostData);
    axios({
      method: 'POST',
      url: Constant.api_url + 'api/user/login',
      data: PostData,
      timeout: 5000
    })
      .then(async back => {
        let loginUser = back.data;
        await AsyncStorage.setItem('users', JSON.stringify(loginUser));
        if (back.status === 200 && back.data.message === 'data falid') {
          console.log('masuk');
          const value = await AsyncStorage.getItem('users');
          console.log('dari async storage', value);
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0, routes: [{
                name: 'Home'
              }]
            })
          )
          //line 4o - 43 utk menghapus inputan
          this.setState({
            Email: '',
            Password: '',
          });
        } else {
          Alert.alert('Gagal', back.data.message);
        }
      })
      .catch(error => {
        if (error.response) {
          console.log(JSON.stringify(error.response, null, 2))
        }
        console.log('error', JSON.stringify(error));
      });
  };

  Email = email => {
    this.setState({ Email: email });
  };

  Password = pass => {
    this.setState({ Password: pass });
  };

  render() {
    const { Email, Password } = this.state;
    console.log(Email, Password);
    return (
      <View style={{ backgroundColor: '#FFF', flex: 1 }}>
        <StatusBar backgroundColor={'#fff'} barStyle="dark-content"></StatusBar>
        <Header navigation={this.props.navigation}></Header>
        <Form
          Email={email => {
            this.Email(email);
          }}
          email={this.props.email}
          Password={pass => {
            this.Password(pass);
          }}
          pass={this.props.pass}
          loginUser={this.loginUser}
          navigation={this.props.navigation}></Form>
      </View>
    );
  }
}

const Header = ({ navigation }) => (
  <View style={{ backgroundColor:'#fff', paddingHorizontal: 20, paddingVertical:16, flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
    <BaseButton style={{ justifyContent: 'flex-start', width: 30 }}
      onPress={() => { navigation.navigate('SplashScreen') }}>
      <Ionicons name="arrow-back" size={24} color={'#383838'}></Ionicons>
    </BaseButton>
  </View>
);

const Form = ({ navigation, loginUser, Email, Password, email, pass }) => (
  <View style={{ padding: 20 }}>
    <View style={{ alignItems: 'center', marginBottom: 10 }}>
      <Image style={{ width: 285, height: 190 }} source={require('../assets/images/working.png')}></Image>
    </View>
    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 26, color: '#383838', marginLeft: 20 }}>Login</Text>
    <View
      style={{ padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <View style={{ marginRight: 10 }}>
        <MaterialCommunityIcons name="email-outline" size={24} color={'#797979'}></MaterialCommunityIcons>
      </View>
      <View>
        <TextInput value={email} placeholder={'Email'} onChangeText={email => { Email(email) }}
          style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: '#383838', borderBottomWidth: 1, borderColor: '#B5B5B5', width: 280, paddingBottom: 0 }}></TextInput>
      </View>
    </View>
    <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 90 }}>
      <View style={{ marginRight: 10 }}>
        <Ionicons name="lock-closed-outline" size={27} color={'#797979'}></Ionicons>
      </View>
      <View>
        <TextInput
          onChangeText={pass => { Password(pass) }} value={pass} secureTextEntry
          style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: '#383838', borderBottomWidth: 1, borderColor: '#B5B5B5', width: 280, paddingBottom: 0 }}
          placeholder={'Password'}></TextInput>
      </View>
    </View>
    <BaseButton style={{ alignItems: 'center', marginBottom: 20 }}
      onPress={() => { loginUser() }}>
      <View style={{ backgroundColor: '#511AEF', paddingVertical: 8, paddingHorizontal: 80, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderRadius: 8 }}>
        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, color: 'white' }}>Login</Text>
      </View>
    </BaseButton>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#0E0E0E', marginRight: 5 }}>Kamu belum punya akun?</Text>
      <BaseButton
        onPress={() => { navigation.navigate('Register') }}>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#511AEF', }}>Register</Text>
      </BaseButton>
    </View>
  </View>
);

export default Login;
