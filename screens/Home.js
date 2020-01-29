import React from 'react';

import { ScrollView, StyleSheet, Dimensions, ImageBackground } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';

import { Button } from '../components';

const { width, height } = Dimensions.get('screen');

class Home extends React.Component {

  render() {
    const { navigation } = this.props;
    return (
      <Block flex middle>
          <Block flex  center style={{justifyContent:'center'}}>
            <Button color="primary"
              style={styles.createButton}
              onPress={() => navigation.navigate('IncomeDetail')}>
              <Text
                style={{ fontFamily: 'montserrat-bold' }}
                size={14}
                color={nowTheme.COLORS.WHITE}
              >
                Add Income
              </Text>
            </Button>
            <Button color="primary"
              style={styles.createButton}
              onPress={() => navigation.navigate('ExpenseDetail')}>
              <Text
                style={{ fontFamily: 'montserrat-bold' }}
                size={14}
                color={nowTheme.COLORS.WHITE}
              >
                Add Expense
              </Text>
            </Button>
          </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  },
  createButton: {
    width: width * 0.8,
    marginTop: 25,
    marginBottom: 15
  },
});

export default Home;
