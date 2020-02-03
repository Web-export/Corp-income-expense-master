import React from 'react';
import {
  Alert,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from 'react-native';
import { Block, Text, Button as theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { nowTheme } from '../constants';


const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      login_error: '',
      cookie: null
    }
  }

  onLogin() {
    const { username, password } = this.state;

    const get_set_cookies = function (headers) {
      var set_cookies = ''
      for (const [name, value] of headers) {
        if (name === "set-cookie") {
          // set_cookies.push(value)
          set_cookies = value
        }
      }
      return set_cookies
    }

    fetch('http://nuwaco-training.haroob.com/api/method/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usr: username,
        pwd: password,
      })
    })

      .then(async (response) => {
        if (response.ok) {
          this.setState({
            cookie: get_set_cookies(response.headers)
          })
          await AsyncStorage.setItem('cookies', this.state.cookie);
        }
        return response.json()
      })
      .then((json) => {
        if (json.message === 'Logged In') {
          this.props.navigation.navigate('Home');
        }
        else {
          this.setState({
            login_error: 'forget username or password ?',
          });
        }
      }).done();
  }
  render() {

    return (
      <DismissKeyboard>
        <Block flex >
          <Block flex space="evenly">
            <Block flex={0.5} middle space="between">
              <Block center flex={0.9}>
                <Block flex space="between">
                  <Block>
                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <Text style={{ fontFamily: 'montserrat-bold', color: '#386389' }}>Username</Text>
                      <Input
                        placeholder="Username"
                        onChangeText={text => this.setState({ username: text })}
                        style={styles.inputs}
                        iconContent={
                          <Icon
                            size={16}
                            color="#ADB5BD"
                            name="profile-circle"
                            family="NowExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <Text style={{ fontFamily: 'montserrat-bold', color: '#386389' }}>Password</Text>
                      <Input
                        placeholder="Password"
                        onChangeText={text => this.setState({ password: text })}
                        secureTextEntry={true}
                        style={styles.inputs}
                        iconContent={
                          <Icon
                            size={16}
                            color="#ADB5BD"
                            name="caps-small2x"
                            family="NowExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block center>
                      <Button color="primary"
                        style={styles.createButton}
                        onPress={this.onLogin.bind(this)}>
                        <Text
                          style={{ fontFamily: 'montserrat-bold' }}
                          size={14}
                          color={nowTheme.COLORS.WHITE}
                        >
                          Login
                            </Text>
                      </Button>
                      <Text>{this.state.login_error}</Text>
                    </Block>
                  </Block>

                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderColor: '#E3E3E3',
    borderRadius: 5
  },
  createButton: {
    width: width * 0.8,
    marginTop: 25,
    marginBottom: 40
  }
});

export default Register;
