import React from 'react'
import {View,ScrollView,Text,TextInput,StyleSheet,Button, ActivityIndicator,Alert} from 'react-native'
import firebase from 'firebase'
import {AdMobBanner} from 'expo-ads-admob'


class LoginPage extends React.Component{

    constructor(props){
        super(props)
        
        this.state = {
            email:'',
            senha:'',
            loading:false,
            singUp:false
        }
    }

    componentDidMount(){
        var firebaseConfig = {
            apiKey: "AIzaSyCGTFIWtTYJWZQt1CCKZ3Fl7bDRhNFK5zo",
            authDomain: "apppo-c3bf7.firebaseapp.com",
            databaseURL: "https://apppo-c3bf7.firebaseio.com",
            projectId: "apppo-c3bf7",
            storageBucket: "apppo-c3bf7.appspot.com",
            messagingSenderId: "186264646098",
            appId: "1:186264646098:web:85fff50bbc7c554948d80b",
            measurementId: "G-6DB3JY8V3C"
        }
        firebase.initializeApp(firebaseConfig)

    }

    onChangeHandler(field,value){
        this.setState({
            [field]:value
        })
    }

    CriarUsuario(email,senha){
        firebase
            .auth()
            .createUserWithEmailAndPassword(email,senha)
            .then(user => {
                this.setState({loading:false})
                this.props.navigation.replace('VDPage')
                Alert.alert('Parabéns','Sua conta foi registrada, espero que goste do aplicativo!!!')
            })
            .catch(error => {
                this.setState({loading:false})
                Alert.alert(
                    'Erro',
                    error.message
                    )
                })
    }

    tryLogin(email,senha){
        this.setState({loading:true})
        firebase
            .auth()
            .signInWithEmailAndPassword(email,senha)
            .then(user => {
                this.setState({loading:false})
                this.props.navigation.replace('VDPage')
            })
            .catch(error =>{
                if(error.code === 'auth/user-not-found'){
                        Alert.alert(
                            "Usuário não encontrado",
                            'Deseja criar um cadastro com as informações inseridas?',
                            [{
                                text:'Não'
                            },{text:'Sim',onPress: ()=>{
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(this.state.email,this.state.senha)
                                    .then(user => this.props.navigation.replace('VDPage'))
                                    .catch(error => {
                                        Alert.alert(
                                            'Erro',
                                            error.message
                                        )
                                    })
                            }}],
                            {cancelable:false}
                        )
                    }
                else {
                    Alert.alert(
                        'Erro',
                        error.message
                    )
                }
            })
    }

    LoginComGoogle(){
        firebase.auth().GoogleAuthProvider()
    }

    RenderBotão(email,senha){
        if(this.state.loading===true){
            return <ActivityIndicator/>
        }else if(this.state.singUp){
            return <Button color = '#123D1A' title='Registrar Conta' onPress ={()=>{
                this.setState({loading:true})
                this.CriarUsuario(this.state.email,this.state.senha)
            }}/>
        }else{
            return <Button color = '#123D1A' title='Entrar' onPress={()=>this.tryLogin(email,senha)}/>
        }
    }

    render(){
    
        return (
            <View style={styles.caixa}>
                <View style={styles.cardLogin}>
                    <Text style={styles.textoTitulo}>{this.state.singUp?'Criar Conta':'Fazer Login'}</Text>
                    <Text style={styles.texto}>{'Email'}</Text>
                    <TextInput 
                        style={styles.texto}
                        value = {this.state.email}
                        onChangeText = {value => this.onChangeHandler('email',value)}
                        placeholder = "user@gmail.com"
                        keyboardType='email-address'
                        autoCapitalize='none'/>
                    <Text style={styles.texto}>{'Senha'}</Text>
                    <TextInput
                        style={styles.texto}
                        value = {this.state.senha}
                        onChangeText = {value => this.onChangeHandler('senha',value)}
                        placeholder = "******" 
                        secureTextEntry = {true}/>
                    <View style={styles.viewBtn}>
                        {
                          this.RenderBotão(this.state.email,this.state.senha)
                        }
                    </View>  
                </View>
                <View style={styles.BtnCriarConta}>
                    <Button color = '#123D1A' title={this.state.singUp?'Fazer Login':'Criar Conta'} onPress={()=>this.setState({singUp:!this.state.singUp})}/>
                </View>
                <AdMobBanner
                    bannerSize="mediumRectangle"
                    adUnitID="ca-app-pub-4141291741681792/1833283278"
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={console.log('deu ruim nessa merda')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    caixa:{
        backgroundColor:'#c8efc2',
        flex:1
    },
    cardLogin:{
        backgroundColor:'white',
        margin:10,
        borderRadius:5,
        elevation:1
    },
    textoTitulo:{
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold'
    },
    texto:{
        fontSize:20
    },
    viewBtn:{
        display:'flex',
        marginBottom:5,
        marginTop:5,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    BtnCriarConta:{
        marginLeft:10,
        marginRight:10,
        marginBottom:10
    },
    anuncio:{
        marginTop:20
    }

})


export default LoginPage
