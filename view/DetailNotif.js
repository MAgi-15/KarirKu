import { Text, View, Image, AsyncStorage, Alert, StatusBar } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import axios from 'axios'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

export class DetailNotif extends Component {
    constructor(props) {
        super(props)
        this.state = {
            masterData: [],
            listPostingan: [],
            listLike: [],
            listSimpan: [],
            likePost: [],
            SimpanPost: [],
            id_postingan: this.props.route.params.data.id_postingan,
            dataPost: [],
            listComment: [],
            Komen: '',
            username: '',
            comment: '',
            user_post: this.props.route.params.data.username,
            id_comment: this.props.id_comment
        }
    }

    UNSAFE_componentWillMount = async () => {
        const value = await AsyncStorage.getItem('users');
        console.log("dari async storage", value)
        const obj = JSON.parse(value);
        console.log("username", obj.data.username)
        this.setState({ username: obj.data.username })
        let IdPost = this.state.id_postingan
        console.log('IdPost', IdPost)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/uploadPostingan/getpostId/' + IdPost
        }).then((parameter) => {
            console.log(JSON.stringify(parameter.data, null, 2))
            let detailPost = parameter.data.data.reverse()
            console.log('detailPost', detailPost)
            this.setState({ dataPost: detailPost })
            console.log("cek", this.state.dataPost)
        })
        console.log("user_post", this.state.user_post)
        axios({
            method: 'GET',
            url: Constant.api_url + 'api/comment/tambahcomment/' + IdPost
        }).then((parameter) => {
            console.log(JSON.stringify(parameter.data, null, 2))
            this.setState({ listComment: parameter.data.data })
        })
        console.log("Username", this.state.username)
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
            url: Constant.api_url + 'api/simpan/simpanPostingan/' + this.state.username
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
                const value = await AsyncStorage.getItem('users');
                console.log("dari async storage", value)
                const obj = JSON.parse(value);
                console.log("username", obj.data.username)
                this.setState({ username: obj.data.username })
                let IdPost = this.state.id_postingan
                console.log('IdPost', IdPost)
                axios({
                    method: 'GET',
                    url: Constant.api_url + 'api/like/likePost/' + obj.data.username
                }).then((parameter) => {
                    console.log(JSON.stringify(parameter.data, null, 2))
                    this.setState({ likePost: parameter.data.data.reverse() })
                    console.log('like_user', this.state.likePost)
                })
                //untuk auto reload jumlah like
                axios({
                    method: 'GET',
                    url: Constant.api_url + 'api/uploadPostingan/getpostId/' + IdPost
                }).then((parameter) => {
                    console.log(JSON.stringify(parameter.data, null, 2))
                    let detailPost = parameter.data.data.reverse()
                    console.log('detailPost', detailPost)
                    this.setState({ dataPost: detailPost })
                    console.log("cek", this.state.dataPost)
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
        )
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
                        onPress: this.props.navigation.navigate('DetailNotif')
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
            this.setState({ listComment: parameter.data.data })
        })
    }

    Like = async (Id_Post) => {
        console.log("data_id", Id_Post)
        const value = await AsyncStorage.getItem('users');
        console.log("dari async storage", value)
        const obj = JSON.parse(value);
        console.log("obj", obj.data.username)
        let PostLike = {
            "id_postingan": Id_Post,
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
                        if (item == Id_Post) { like_master[index]['jumlah_like']++ }
                    })
                    like_list.map((item, index) => {
                        if (item.id_postingan == Id_Post) { like_list[index]['jumlah_like']++ }
                    })
                    this.setState({ likePostingan: like_list, masterData: like_master })
                }
                else if (back.data.message == 'success unlike') {
                    let like_master = this.state.masterData
                    let like_list = this.state.listPostingan
                    like_master.map((item, index) => {
                        if (item == Id_Post) { like_master[index]['jumlah_like']-- }
                    })
                    like_list.map((item, index) => {
                        if (item.id_postingan == Id_Post) { like_list[index]['jumlah_like']-- }
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

    Simpan = async (Id_Post) => {
        console.log("data_id", Id_Post)
        const value = await AsyncStorage.getItem('users');
        console.log("dari async storage", value)
        const obj = JSON.parse(value);
        console.log("obj", obj.data.username)
        let PostSimpan = {
            "id_postingan": Id_Post,
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
        const data_kirim = this.props.route.params.data
        console.log("data kirim", data_kirim)
        return (
            <View style={{ backgroundColor: '#FFF', flex: 1 }}>
                <StatusBar backgroundColor={'#fff'} barStyle='dark-content'></StatusBar>
                <Header navigation={this.props.navigation}></Header>
                <ScrollView>
                    {this.state.dataPost.map((item, index) => {
                        console.log(item, index)
                        return <Postingan data={item} key={index} navigation={this.props.navigation} dataPost={this.state.dataPost} likePost={this.state.likePost} likePostingan={(like) => { this.Like(like) }} SimpanPost={this.state.SimpanPost} simpanPostingan={(simpan) => { this.Simpan(simpan) }} ></Postingan>
                    })}
                    <Text style={{ paddingHorizontal: 20, paddingVertical: 5, color: 'black', fontFamily: 'Poppins-SemiBold', fontSize: 14 }}>Komentar</Text>
                    {this.state.listComment.map((item, index) => {
                        console.log(item, index)
                        return <Komentar data={item} key={index} navigation={this.props.navigation} listComment={this.state.listComment} deleteComment={(data) => { this.deleteComment(data) }} user_post={this.state.user_post}></Komentar>
                    })}
                </ScrollView>
                <Footer KomenPost={(kirimcomment) => { this.Komen(kirimcomment) }} Comment={() => { this.Comment() }} comment={this.state.Komen} navigation={this.props.navigation}></Footer>
            </View>
        )
    }
}

const Header = ({ navigation }) => (
    <View style={{ backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 12, marginBottom: 5, flexDirection: 'row', alignItems: 'center', elevation: 1, borderBottomColor: '#D9D9D9', borderBottomWidth: 0.5 }}>
        <BaseButton style={{ justifyContent: 'flex-start', width: 30 }} onPress={() => { navigation.navigate('Notifikasi') }}>
            <Ionicons name='arrow-back' size={30} color={'#383838'} ></Ionicons>
        </BaseButton>
        <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 18, color: '#383838' }}>Komentar</Text>
        </View>
        <View style={{ width: 30 }}></View>
    </View>
)

const Postingan = ({ data, navigation, likePostingan, likePost, simpanPostingan, SimpanPost }) => {
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
        <View style={{ backgroundColor: '#FFF', paddingVertical: 16, paddingHorizontal: 20, marginBottom: 8, elevation: 1 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: 'black', marginBottom: 16, width: 340 }}>{data.judul}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Image style={{ width: 370, height: 200 }} source={{ uri: Constant.api_url + data.gambar }}></Image>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BaseButton style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }} onPress={() => { likePostingan(data.id_postingan) }}>
                        {
                            like == true
                                ? <AntDesign name='like1' size={17} color={'#383838'} style={{ marginRight: 5 }}></AntDesign>
                                : <AntDesign name='like2' size={17} color={'#383838'} style={{ marginRight: 5 }}></AntDesign>
                        }
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#383838' }}>{data.jumlah_like}</Text>
                    </BaseButton>
                    <BaseButton style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                        let kirim = ({
                            data
                        })
                        navigation.navigate('CommentScreen', kirim)
                    }}>
                        <Feather name='message-square' size={17} color={'#383838'} style={{ marginRight: 5 }}></Feather>
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#383838' }}>{data.jumlah_comment}</Text>
                    </BaseButton>
                </View>
                <BaseButton onPress={() => { simpanPostingan(data.id_postingan) }}>
                    {
                        simpan == true
                            ? <Ionicons name='bookmark' size={23} color={'#511AEF'} style={{ marginRight: 5 }}></Ionicons>
                            : <Ionicons name='bookmark-outline' size={23} color={'#B5B5B5'} style={{ marginRight: 5 }}></Ionicons>
                    }
                </BaseButton>
            </View>
            <View style={{ marginBottom: 15 }}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'black', marginRight: 10 }}>Kategori :</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, color: 'black' }}>{data.kategori}</Text>
            </View>
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'black', marginRight: 10 }}>Pekerjaan :</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, color: 'black', width: 250 }}>{data.nama_pekerjaan}</Text>
            </View>
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'black', marginRight: 10 }}>Deskripsi :</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, color: 'black', width: 340 }}>{data.deskripsi}</Text>
            </View>
            <View style={{ backgroundColor: 'white', padding: 10, borderColor: '#D9D9D9', borderWidth: 1, borderRadius: 10, flexDirection: 'column', alignItems: 'center' }}>
                <Image style={{ flexDirection: 'row', width: 40, height: 40, marginRight: 10, marginBottom: 8 }} source={require('../assets/images/photo_profile.png')}></Image>
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: '#511AEF' }}>{data.username}</Text>
            </View>
        </View>
    )
}

const Komentar = ({ data, deleteComment, navigation, user_post }) => (
    <View style={{ paddingHorizontal: 20, paddingVertical: 8, borderBottomWidth: 1, borderColor: '#D9D9D9', marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/images/photo_profile.png')} style={{ width: 40, height: 40, marginRight: 10 }}></Image>
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
                        data.username === user_post
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
)

const Footer = ({ Comment, comment, KomenPost }) => (
    <View style={{ backgroundColor: '#FFF', paddingVertical: 10, elevation: 1, borderTopColor: '#D9D9D9', borderTopWidth: 1, paddingHorizontal: 10, elevation: 5 }}>
        <View style={{ borderWidth: 2, borderColor: '#F3F3F3', borderRadius: 32, paddingRight: 20, paddingLeft: 10, paddingVertical: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{}}>
                    <TextInput style={{ fontSize: 15, fontStyle: 'normal', color: "#696969", width: 330 }} placeholder={'Beri Komentar'} value={comment} onChangeText={(komenpost) => { KomenPost(komenpost) }}></TextInput>
                </View>
                <BaseButton style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                    console.log("Comment")
                    //isi dari fungsi
                    Comment()
                }}>
                    {/* <Image style={{ position:'absolute', padding:5 }} source={require('../assets/icons/ellipse_search.png')}></Image> */}
                    <View style={{ backgroundColor: '#511AEF', width: 38, height: 38, padding: 5, borderRadius: 100, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <Ionicons name='send-sharp' size={20} color={'#FFF'}></Ionicons>
                    </View>
                </BaseButton>
            </View>
        </View>
    </View>
)

export default DetailNotif