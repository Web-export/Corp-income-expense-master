import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Block, Text, Button as theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Register extends React.Component {
  state={
    username:"",
    password:""
  }
  render() {

    const { navigation } = this.props;

    return (
      <DismissKeyboard>
        <Block flex >
            <Block flex space="evenly">
              <Block flex={0.5} middle space="between">
                <Block center flex={0.9}>
                  <Block flex space="between">
                    <Block>
                      <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                        <Text style={{fontFamily: 'montserrat-bold',color:'#386389'}}>Username</Text>
                        <Input
                          placeholder="Username"
                          onChangeText={text => this.setState({username:text})}
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
                        <Text style={{fontFamily: 'montserrat-bold',color:'#386389'}}>Password</Text>
                        <Input
                          placeholder="Password"
                          onChangeText={text => this.setState({password:text})}
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
                          onPress={() => navigation.navigate('Home')}>
                          <Text
                            style={{ fontFamily: 'montserrat-bold' }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Login
                            </Text>
                        </Button>
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
    // borderWidth: 1,
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
