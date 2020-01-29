import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Block, Text, Input, Button as GaButton } from 'galio-framework';
import DatePicker from 'react-native-datepicker';

import { Button } from '../components';
import { nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const ExpenseDetail = (props) => {
  
  const [getDate, setDate] = useState("2020-01-01");

  const handleChangeDate = (date) => {
    setDate(date);
  }

  gotoExpenseList = () => {
    props.navigation.navigate('ExpenseList');   
  }

  return (
    <Block flex space="evenly">
      <Block flex  center style={{justifyContent:'center'}}>
        <Block flex={0.4} middle space="between">
          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
            <Text style={{fontFamily: 'montserrat-bold',color:'#386389'}}>Expense</Text>
            <Input style={styles.inputs} />
          </Block>
          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
            <Text style={{fontFamily: 'montserrat-bold',color:'#386389'}}>Date</Text>
            <DatePicker
              style={{ width: width * 0.82 }}
              date={getDate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2016-05-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                    position: 'absolute',
                    right: 5,
                    top: 4,
                    marginRight: 10
                },
                dateInput: {
                    marginRight: 10,
                    backgroundColor:'#ffffff',
                    borderRadius:5
                }
              }}
              onDateChange={handleChangeDate}
            />
          </Block>
          <Block width={width * 0.8} style={{ marginBottom: 25 }}>
            <Text style={{fontFamily: 'montserrat-bold',color:'#386389'}}>Amount</Text>
            <Input style={styles.inputs} />
          </Block>
          <Block center >
            <Button color="primary"
              style={{width: width*0.8}}
              onPress={this.gotoExpenseList}>
              <Text
                style={{ fontFamily: 'montserrat-bold' }}
                size={14}
                color={nowTheme.COLORS.WHITE}
              >
                Submit
            </Text>
            </Button>
          </Block>
        </Block>
      </Block>     
    </Block>


  )
}





const styles = StyleSheet.create({

  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width,
    height: height
  },
  inputs: {
    // borderWidth: 1,
    borderColor: '#ababab',
    borderRadius: 5
  },
  info: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: height * 0.8
  },
});

export default ExpenseDetail;
