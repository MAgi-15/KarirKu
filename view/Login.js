import {
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  AsyncStorage,
} from 'react-native';
import React, {Component} from 'react';
import {BaseButton} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constant from '../Componen/Constant';
import axios from 'axios';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
    };
  }

  loginUser = () => {
    // this.props.navigation.navigate('Home')
    // return
    const {Email, Password} = this.state;
    let PostData = {
      email: Email,
      password: Password,
    };
    console.log('http://192.168.0.111:8000/api/user/login');
    console.log('PostData', PostData);
    axios({
      method: 'POST',
      url: Constant.api_url + 'api/user/login',
      data: PostData,
    })
      .then(async back => {
        let loginUser = back.data;
        await AsyncStorage.setItem('users', JSON.stringify(loginUser));
        if (back.status === 200 && back.data.message === 'data falid') {
          console.log('masuk');
          const value = await AsyncStorage.getItem('users');
          console.log('dari async storage', value);
          this.props.navigation.navigate('Home');
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
        console.log('error', JSON.stringify(error));
      });
  };

  Email = email => {
    this.setState({Email: email});
  };

  Password = pass => {
    this.setState({Password: pass});
  };

  render() {
    const {Email, Password} = this.state;
    console.log(Email, Password);
    return (
      <View style={{backgroundColor: '#FFF', flex: 1}}>
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

const Header = ({navigation}) => (
  <View
    style={{
      paddingHorizontal: 20,
      paddingTop: 20,
      marginBottom: 50,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    }}>
    <BaseButton
      style={{justifyContent: 'flex-start', width: 30}}
      onPress={() => {
        navigation.navigate('SplashScreen');
      }}>
      <Ionicons name="arrow-back" size={30} color={'black'}></Ionicons>
    </BaseButton>
    <View style={{alignItems: 'center', flex: 1}}>
      <Text
        style={{
          fontFamily: 'PlayfairDisplay-Regular',
          fontSize: 30,
          color: 'black',
        }}>
        KarirKu
      </Text>
    </View>
    <View style={{width: 30}}></View>
  </View>
);

const Form = ({navigation, loginUser, Email, Password, email, pass}) => (
  <View style={{padding: 20}}>
    <View style={{alignItems: 'center', marginBottom: 10}}>
      <Image source={require('../assets/images/logo_karrirku.png')}></Image>
      <Text
        style={{fontFamily: 'Poppins-Medium', fontSize: 24, color: 'black'}}>
        Login
      </Text>
    </View>
    <View
      style={{
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      <View style={{marginRight: 10}}>
        <MaterialCommunityIcons
          name="email-outline"
          size={27}
          color={'#454545'}></MaterialCommunityIcons>
      </View>
      <View>
        <TextInput
          value={email}
          placeholder={'Email'}
          onChangeText={email => {
            Email(email);
          }}
          style={{
            fontFamily: 'Poppins-Light',
            fontSize: 16,
            color: '#696969',
            borderBottomWidth: 1,
            borderColor: '#454545',
            width: 280,
            paddingBottom: 0,
          }}></TextInput>
      </View>
    </View>
    <View
      style={{
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 70,
      }}>
      <View style={{marginRight: 10}}>
        <Ionicons
          name="lock-closed-outline"
          size={27}
          color={'black'}></Ionicons>
      </View>
      <View>
        <TextInput
          onChangeText={pass => {
            Password(pass);
          }} value={pass}
          secureTextEntry
          style={{
            fontFamily: 'Poppins-Light',
            fontSize: 16,
            color: '#696969',
            borderBottomWidth: 1,
            borderColor: '#454545',
            width: 280,
            paddingBottom: 0,
          }}
          placeholder={'Password'}></TextInput>
      </View>
    </View>
    <BaseButton
      style={{alignItems: 'center', marginBottom: 20}}
      onPress={() => {
        loginUser();
      }}>
      <View
        style={{
          backgroundColor: '#511AEF',
          height: 45,
          width: 200,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text
          style={{fontFamily: 'Poppins-Regular', fontSize: 16, color: 'white'}}>
          Login
        </Text>
      </View>
    </BaseButton>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
          color: '#0E0E0E',
          marginRight: 5,
        }}>
        Kamu belum punya akun?
      </Text>
      <BaseButton
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: '#511AEF',
          }}>
          Register
        </Text>
      </BaseButton>
    </View>
  </View>
);

export default Login;
