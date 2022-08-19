import { Text, View, Image, AsyncStorage, Alert } from 'react-native'
import React, { Component } from 'react'
import { BaseButton, TextInput } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'

export class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Username: '',
            Email: '',
            IdUser: ''
        }
    }

    UNSAFE_componentWillMount = async () => {
        const value = await AsyncStorage.getItem('users');
        // console.log("dari async storage", value)
        const obj = JSON.parse(value);
        console.log("IdUser", obj.data.id_user)
        this.setState({ IdUser: obj.data.id_user })
        console.log("Username", obj.data.username)
        this.setState({ Username: obj.data.username })
        console.log("Email", obj.data.email)
        this.setState({ Email: obj.data.email })
    }

    componentDidMount = () => {
        this.props.navigation.addListener(
            'focus',
            async () => {
                console.log('did')
                axios({
                    method: 'POST',
                    url: Constant.api_url + 'api/user/EditUser/' + IdUser,
                    data: PostData
                }).then((back) => {
                    console.log(JSON.stringify(back))
                    if (back.status === 200 && back.data.message === "success") {
                        console.log("masuk")
                        this.props.navigation.navigate('SettingProfile')
                    } else {
                        Alert.alert("Gagal", back.data.message)
                    }
                })
            }
        )
    }

    UpdateProfile = () => {
        const { Username, Email, IdUser } = this.state
        let PostData = {
            "username": Username,
            "email": Email
        }
        console.log('http://192.168.0.110:8080/api/user/EditUser/' + IdUser)
        console.log('PostData', PostData)
        axios({
            method: 'POST',
            url: Constant.api_url + 'api/user/EditUser/' + IdUser,
            data: PostData
        }).then(async (back) => {
            console.log(JSON.stringify(back))
            if (back.status === 200 && back.data.message === "data falid") {
                //untuk auto reload
                await AsyncStorage.setItem('users', JSON.stringify(back.data));
                console.log("masuk")
                this.props.navigation.navigate('SettingProfile')
            } else {
                Alert.alert("Gagal", back.data.message)
            }
        }).catch((error) => {
            console.log("error", error)
        })
    }

    SetUsername = (username) => {
        this.setState({ Username: username })
    }
    SetEmail = (email) => {
        this.setState({ Email: email })
    }

    render() {
        return (
            <View style={{ backgroundColor: '#FFF', flex: 1 }}>
                <Header navigation={this.props.navigation}></Header>
                <PhotoProfile></PhotoProfile>
                <Form Username={this.state.Username} Email={this.state.Email} SetUsername={(username) => { this.SetUsername(username) }} SetEmail={(email) => { this.SetEmail(email) }} UpdateProfile={this.UpdateProfile} navigation={this.props.navigation} ></Form>
            </View>
        )
    }
}

const Header = ({ navigation }) => (
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingTop: 12, flexDirection: 'row', alignItems: 'center', elevation: 2, borderBottomColor: '#D9D9D9', borderBottomWidth: 0.5 }}>
        <BaseButton style={{ justifyContent: 'flex-start', width: 30, paddingBottom: 12 }} onPress={() => { navigation.navigate('SettingProfile') }}>
            <Ionicons name='arrow-back' size={24} color={'#383838'} ></Ionicons>
        </BaseButton>
        <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#383838', paddingBottom: 12 }}>Edit Profile</Text>
        </View>
        <View style={{ width: 30 }}></View>
    </View>
)

const PhotoProfile = () => (
    <View style={{ paddingHorizontal: 8, paddingTop: 40, marginBottom:20 }}>
        <View style={{ paddingHorizontal: 0 }}>
            {/* <View style={{ borderBottomWidth:1, borderColor:'#A5A5A5', marginBottom:10 }}></View> */}
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../assets/images/photo_profile.png')}></Image>
            </View>
            {/* <View style={{ borderBottomWidth:1, borderColor:'#A5A5A5', marginBottom:10 }}></View> */}
        </View>
    </View>
)

const Form = ({ navigation, Username, Email, UpdateProfile, SetUsername, SetEmail }) => (
    <View style={{ paddingHorizontal: 8 }}>
        <View style={{ paddingVertical: 20, flexDirection: 'row', justifyContent:'center', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ marginRight: 10 }}>
                <Feather name='user' size={24} color={'#797979'}></Feather>
            </View>
            <View>
                <TextInput value={Username} onChangeText={(username) => { SetUsername(username) }} style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: "#383838", borderBottomWidth: 1, borderColor: '#B5B5B5', width: 280, paddingBottom: 0 }}></TextInput>
            </View>
        </View>
        <View style={{ paddingVertical: 20, flexDirection: 'row', justifyContent:'center', alignItems: 'center', marginBottom: 50 }}>
            <View style={{ marginRight: 10 }}>
                <MaterialCommunityIcons name='email-outline' size={24} color={'#797979'} ></MaterialCommunityIcons>
            </View>
            <View>
                <TextInput value={Email} onChangeText={(email) => { SetEmail(email) }} style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: "#383838", borderBottomWidth: 1, borderColor: '#B5B5B5', width: 280, paddingBottom: 0 }} ></TextInput>
            </View>
        </View>
        <BaseButton style={{ alignItems: 'center', marginBottom: 20 }} onPress={() => { UpdateProfile() }}>
            <View style={{ backgroundColor: '#511AEF', height: 45, width: 200, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderRadius: 8 }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: 'white' }}>Save</Text>
            </View>
        </BaseButton>
    </View>
)

export default EditProfile