import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/HomeScreen';


export default class LoginScreen extends Component {

state = ({
  username: 'prabowo',
  password: '2019gantipresiden',
  inputUsername: '',
  inputPassword: '',
})

  submitLogin(){
    if (this.state.inputUsername == this.state.username && this.state.inputPassword == this.state.password) {
      this.setState({inputUsername: "", inputPassword: ""});
      this.props.navigation.navigate('HomeScreen');
    }else{
      alert("Username atau password salah, silahkan pilih lupa password untuk melihat username dan password");
    }
  }

  static navigationOptions = ({
    title: "Login to PalaBapuk",
    headerStyle: {
      backgroundColor: '#df4362'
    },
    headerTintColor: '#fff',
    headerLeft: null
  })
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
      
        <Text>{"\n"}</Text>
      <TextInput
        value={this.state.inputUsername}
        placeholder="Username"
        style={{
          backgroundColor: "#fff",
          width: 350,
          height: 35,
          borderColor: "#ccc",
          borderBottomWidth: 1,
        }}
        onChangeText={(username) => this.setState({ inputUsername: username })}
      />
      <Text>{"\n"}</Text>
      <TextInput
        secureTextEntry={true}
        value={this.state.inputPassword}
        placeholder="password"
        style={{
          backgroundColor: "#fff",
          width: 350,
          height: 35,
          borderColor: "#ccc",
          borderBottomWidth: 1,
        }}
        onChangeText={(password) => this.setState({ inputPassword: password })}
      />
      <Text>{"\n"}</Text>
      <Button
        title="Masuk"
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "#f90",
          width: 350,
          height: 40,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5
        }}
        containerStyle={{ marginTop: 20 }}
        onPress={() => this.submitLogin()}
      />
      <Text>{"\n"}</Text>
      <TouchableOpacity onPress={()=> alert('Username: prabowo, Password: 2019gantipresiden') }><Text style={{color: '#2b9fdc'}}>Lupa Password?</Text></TouchableOpacity>
      <View style={{width: 350, marginTop: 50, alignItems: 'center'}}>
        <View style={{backgroundColor: '#ffffff', width: '100%', height: 25, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: '#999',backgroundColor: '#ffffff'}}>--------------------- Atau Masuk dengan ---------------------</Text>
        </View>
      </View>
      <View style={{width: 350, marginTop: -8, alignItems: 'center', flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, padding: 5}}>
          <TouchableOpacity style={{backgroundColor: '#09f', height: 40, borderRadius: 5, borderWidth: 0, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1,alignItems: 'center'}}>
                <Icon
                  name='google'
                  size={20}
                  color='#ffffff'
                />
              </View>
              <View style={{flex: 2}}>
                <Text style={{color: '#fff'}}>Google</Text>
              </View>
              </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, padding: 5}}>
            <TouchableOpacity style={{backgroundColor: '#05a', height: 40, borderRadius: 5, borderWidth: 0, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1,alignItems: 'center'}}>
                <Icon
                  name='facebook'
                  size={20}
                  color='#ffffff'
                />
              </View>
              <View style={{flex: 2}}>
                <Text style={{color: '#fff'}}>Facebook</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    );
  }
}

