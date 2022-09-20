import { Text, View, Image, AsyncStorage, Alert, StatusBar } from 'react-native'
import React, { Component } from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import axios from 'axios'

export class ReplyComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id_comment: this.props.route.params.data.id_comment,
            dataKomen: [],
            dataReplyKomen: [],
            Komen: '',
            username: '',
            comment: '',
            user_comment: this.props.route.params.data.username
        }
    }

    UNSAFE_componentWillMount = async () => {
        const value = await AsyncStorage.getItem('users');
        console.log("dari async storage", value)
        const obj = JSON.parse(value);
        console.log("username", obj.data.username)
        this.setState({ username: obj.data.username })
        let IdKomen = this.state.id_comment
        console.log("IdKomen", IdKomen)
        console.log('cek', Constant.api_url + 'api/comment/nextcomment/' + IdKomen)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/comment/nextcomment/' + IdKomen
        }).then((parameter) => {
            console.log(JSON.stringify(parameter.data, null, 2))
            this.setState({ dataKomen: parameter.data.data })
            console.log("dataKomen", this.state.dataKomen)
        })
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/replycomment/getreplycomment/' + IdKomen
        }).then((parameter) => {
            console.log(JSON.stringify(parameter.data, null, 2))
            this.setState({ dataReplyKomen: parameter.data.data })
            console.log("dataReplyKomen", this.state.dataReplyKomen)
        })

    }

    ReplyKomen = (komen) => {
        console.log("balasth", komen)
        this.setState({ Komen: komen })
    }

    Comment = async () => {
        const value = await AsyncStorage.getItem('users');
        console.log("dari async storage", value)
        const obj = JSON.parse(value);
        console.log("username", obj.data.username)
        this.setState({ username: obj.data.username })
        const { id_comment, Komen, user_comment } = this.state
        let PostComment = {
            "username_comment": user_comment,
            "id_comment": id_comment,
            "username": obj.data.username,
            "comment": Komen
        }
        console.log(Constant.api_url + 'api/replycomment/tambahreplycomment')
        console.log('PostComment', PostComment)
        axios({
            method: 'POST',
            url: Constant.api_url + 'api/replycomment/tambahreplycomment',
            data: PostComment
        }).then(async (back) => {
            let Comment = back.data
            console.log(Comment)
            if (back.status === 200 && back.data.message === "success") {
                console.log("masuk")
                let Comment = this.state.dataReplyKomen
                Comment = [...Comment, back.data.data]
                this.setState({ dataReplyKomen: Comment, Komen: '' })
            } else {
                Alert.alert("Gagal", back.data.message)
            }
        }).catch((error) => {
            console.log("error", JSON.stringify(error))
        })
    }

    deleteReplyComment = (id_replycomment) => {
        console.log('id_replycomment', id_replycomment)
        console.log(Constant.api_url + 'api/replycomment/deleteReplyComment/' + id_replycomment)
        axios({
          method: 'GET',
          url: Constant.api_url + 'api/replycomment/deleteReplyComment/' + id_replycomment
        }).then((deleteData) => {
          console.log(JSON.stringify(deleteData.data, null, 2))
          if (deleteData.data.message === 'success delete') {
            Alert.alert('Berhasil', 'Komen berhasil dihapus', [
              {
                text: 'oke',
                style: 'default',
                onPress: this.props.navigation.navigate('ReplyComment')
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
            url: Constant.api_url + 'api/replycomment/getreplycomment/' + this.state.id_comment
        }).then((parameter) => {
            console.log(JSON.stringify(parameter.data, null, 2))
            this.setState({ dataReplyKomen: parameter.data.data })
            console.log("dataReplyKomen", this.state.dataReplyKomen)
        })
      }

    // deleteReplyComment = (id_replycomment) => {
    //     console.log('id_replycomment', id_replycomment)
    //     console.log(Constant.api_url + 'api/replycomment/deleteReplyComment' + id_replycomment)
    //     axios({
    //         method: 'GET',
    //         url: Constant.api_url + 'api/replycomment/deleteReplyComment' + id_replycomment
    //     }).then((deleteData) => {
    //         console.log(JSON.stringify(deleteData.data, null, 2))
    //         if (deleteData.data.message === 'success delete') {
    //             Alert.alert('Berhasil', 'Komen berhasil dihapus', [
    //                 {
    //                     text: 'oke',
    //                     style: 'default',
    //                     onPress: this.props.navigation.navigate('ReplyComment')
    //                 }
    //             ])
    //         } else {
    //             Alert.alert('Gagal', 'Komen gagal dihapus')
    //         }
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }

    render() {
        const data = this.props.route.params.data
        console.log("data_kirim", data)
        return (
            <View style={{ backgroundColor: '#FFF', flex: 1 }}>
                <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <ScrollView>
                    {this.state.dataKomen.map((item, index) => {
                        console.log(item, index)
                        return <Komentar data={item} key={index} navigation={this.props.navigation}></Komentar>
                    })}
                    {this.state.dataReplyKomen.map((item, index) => {
                        console.log(item, index)
                        return <ReplyKomen data={item} key={index} deleteReplyComment={(data) => { this.deleteReplyComment(data) }} username={this.state.username} user_post={this.state.user_post}></ReplyKomen>
                    })}
                </ScrollView>
                <Footer KomenPost={(kirimcomment) => { this.ReplyKomen(kirimcomment) }} Comment={() => { this.Comment() }} comment={this.state.Komen} navigation={this.props.navigation}></Footer>
            </View>
        )
    }
}

const Header = ({ navigation }) => (
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', elevation: 1, borderBottomColor: '#D9D9D9', borderBottomWidth: 0.5 }}>
        <BaseButton style={{ justifyContent: 'flex-start', width: 30 }} onPress={() => { navigation.navigate('Home') }}>
            <Ionicons name='arrow-back' size={24} color={'#383838'} ></Ionicons>
        </BaseButton>
        <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#383838' }}>Reply Komen</Text>
        </View>
        <View style={{ width: 30 }}></View>
    </View>
)

const Komentar = ({ data }) => (
    <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <View style={{ flexDirection: 'row' }}>
            <Image source={require('../assets/images/photo_profile.png')} style={{ width: 40, height: 40, marginRight: 10 }}></Image>
            <View style={{ backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 8, marginBottom: 10, elevation: 3, width: 315, borderTopRightRadius: 8, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
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
                        <Pressable style={{ marginBottom: 8 }} android_ripple={{ color: '#ffdddd' }}>
                            <MaterialCommunityIcons name='delete' size={18} color={'#383838'}></MaterialCommunityIcons>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    </View>
)
const ReplyKomen = ({ data, user_post, deleteReplyComment, username }) => (
    <View style={{ paddingLeft: 60, paddingBottom: 10 }}>
        <View style={{ flexDirection: 'row' }}>
            <Image source={require('../assets/images/photo_profile.png')} style={{ width: 40, height: 40, marginRight: 10 }}></Image>
            <View style={{ backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 8, marginBottom: 10, elevation: 2, width: 275, borderTopRightRadius: 8, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
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
                                                    deleteReplyComment(data.id_replycomment)
                                                }
                                            }
                                        ]
                                    )
                                    : null
                            }
                        }}>
                            <MaterialCommunityIcons name='delete' size={16} color={'#383838'}></MaterialCommunityIcons>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    </View>
)
const Footer = ({ Comment, comment, KomenPost }) => (
    <View style={{ backgroundColor: '#FFF', paddingVertical: 10, borderTopColor: '#D9D9D9', borderTopWidth: .8, paddingHorizontal: 10, elevation: 2 }}>
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

export default ReplyComment