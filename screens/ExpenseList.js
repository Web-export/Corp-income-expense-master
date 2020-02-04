import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

let array = [];

export default class ExpenseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      Items: [],
      Items1: [],
      Items2: [],
      cookie: null,
      tableHead: ['Date', 'Expense Item', 'Amount'],
      tableData: [
        ['', '', ''],
      ]
    }
  }

  async componentDidMount() {
    this.setState({ cookie: await AsyncStorage.getItem('cookies') });
    fetch('http://nuwaco-training.haroob.com/api/resource/Journal Entry/?fields=["posting_date","name"]&filters=[["voucher_type","=","Direct Expense"]]', {
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
        this.state.Items.map((Item) => {
          var date = Item.posting_date;
          var URL = 'http://nuwaco-training.haroob.com/api/resource/Journal Entry Account/?fields=["against_account","credit"]&filters=[["parent","=","' + Item.name + '"],["credit",">","0"]]'
          fetch(URL)
            .then((response) => response.json())
            .then((json) => {
              this.setState({
                Items1: JSON.parse(JSON.stringify(json.data))
              });
              this.state.Items1.map((Item) => {
                var amount = Item.credit;
                var URL1 = 'http://nuwaco-training.haroob.com/api/resource/Expense Claim Account?fields=["parent"]&filters=[["default_account","=","' + Item.against_account + '"]]'
                fetch(URL1)
                  .then((response) => response.json())
                  .then((json) => {
                    this.setState({
                      Items2: JSON.parse(JSON.stringify(json.data))
                    });
                    this.state.Items2.map((Item) => {
                      var expenseitem = Item.parent;
                      array.push([date, expenseitem, '$' + amount]);
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });
            })
            .catch((error) => {
              console.log(error);
            });

        });
        this.setState({ tableData: array });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <ScrollView>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
            {
              array.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                    ))
                  }
                </TableWrapper>
              ))
            }
          </Table>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});
