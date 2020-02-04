import React from 'react';
import { StyleSheet, Dimensions, Alert, AsyncStorage } from 'react-native';
import { Block, Text, Input, Button as GaButton } from 'galio-framework';
import DatePicker from 'react-native-datepicker';
import SearchableDropdown from 'react-native-searchable-dropdown';

import { Button } from '../components';
import { nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

var items = [];
var selects = [];

class IncomeDetail extends React.Component {

  state = {
    selectedItem: '',
    date: "2020-01-01",
    Items: [],
    amount: '',
    cookie: ''
  }

  async componentWillMount() {
    this.setState({ cookie: await AsyncStorage.getItem('cookies') });
    fetch('http://nuwaco-training.haroob.com/api/resource/Item?fields=[%22income_account%22,%22item_name%22]&limit_page_length=100', {
      method: 'GET',
      headers: {
        'Cookie': this.state.cookie
      }
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          Items: JSON.parse(JSON.stringify(json.data))
        });
        // console.log(JSON.parse(JSON.stringify(json.data)))
        this.state.Items.map((Item, i) => {
          items.push({ "id": i, "name": Item.item_name });
          selects.push({ "id": i, "account": Item.income_account });
        });
      })
      .catch((error) => {
        console.log(error)
      });
  }
  incomeSubmit() {
    const { selectedItem, date, amount, cookie } = this.state;

    if (selectedItem === '' || amount === '') alert("Not select value!")
    else {
      fetch('http://nuwaco-training.haroob.com/api/resource/Journal%20Entry/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cookie': cookie
        },
        body: JSON.stringify({
          doctype: "Journal Entry",
          total_amount_currency: "USD",
          docstatus: 1,
          accounts: [
            {
              doctype: "Journal Entry Account",
              account: selectedItem,
              credit: amount,
              credit_in_account_currency: amount
            },
            {
              doctype: "Journal Entry Account",
              account: "8552 - TRAVEL EXPENSES - BUS OR VEHICLE CHARGES - LOCAL - NU",
              debit_in_account_currency: amount,
              debit: amount
            }
          ],
          posting_date: date,
          total_debit: amount,
          total_credit: amount,
          difference: 0,
          user_remark: "Test Entry",
          workflow_state: "Approved",
          voucher_type: "Direct Income"
        })
      })
        .then((response) => {
          if (response.ok) {
            alert("Expense Submit Success!");
            this.props.navigation.navigate('Home');
          }
          else alert("Expense Submit Failed!");
          return response.json()
        })
        .then((json) => {
          //Success 
        })
        //If response is not in json then in error
        .catch((error) => {
          //Error 
          console.error(error);
        });
    }
  }

  render() {

    const { navigation } = this.props;

    return (
      <Block flex space="evenly">
        <Block flex center style={{ justifyContent: 'center' }}>
          <Block flex={0.4} middle space="between">
            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
              <Text style={{ fontFamily: 'montserrat-bold', color: '#386389' }}>Income</Text>
              <SearchableDropdown
                onItemSelect={(item) => {
                  selects.map((Item, i) => {
                    if (item.id === i) {
                      this.setState({ selectedItem: Item.account });
                    }
                  });
                }}
                containerStyle={{ padding: 5 }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#eee',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={items}
                resetValue={false}
                textInputProps={
                  {
                    placeholder: "Drop down - list of income items",
                    underlineColorAndroid: "transparent",
                    style: {
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                  }
                }
                listProps={
                  {
                    nestedScrollEnabled: true,
                  }
                }
              />
            </Block>
            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
              <Text style={{ fontFamily: 'montserrat-bold', color: '#386389' }}>Date</Text>
              <DatePicker
                style={{ width: width * 0.82 }}
                date={this.state.date}
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
                    backgroundColor: '#ffffff',
                    borderRadius: 5
                  }
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
              />
            </Block>
            <Block width={width * 0.8} style={{ marginBottom: 25 }}>
              <Text style={{ fontFamily: 'montserrat-bold', color: '#386389' }}>Amount</Text>
              <Input style={styles.inputs}
                onChangeText={text => this.setState({ amount: text })} />
            </Block>
            <Block center >
              <Button color="primary"
                style={{ width: width * 0.8 }}
                onPress={this.incomeSubmit.bind(this)}>
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
    );
  }
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
    borderColor: '#ababab',
    borderRadius: 5
  },
  info: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: height * 0.8
  },
});

export default IncomeDetail;

