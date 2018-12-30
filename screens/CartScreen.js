import React, { Component } from "react";
import {
  Container,
  Content,
  Body,
  Text,
  Left,
  Right,
  List,
  ListItem,
  Thumbnail,
  Form,
  Button,
  Card,
  CardItem,
  Icon
} from "native-base";
import { Image } from "react-native";
import NumericInput from "react-native-numeric-input";

import _ from "lodash";

import { ip } from "../setServer";
import axios from "axios";
import { connect } from "react-redux";
import { ALL_ORDERS } from "../redux/actions/order";

class CartScreen extends Component {
  state = {
    sumAll: 0,
    value: 0,
    price: 0
  };
  componentDidMount() {
    this.props.dispatch(ALL_ORDERS());
  }

  handleCheckout = async order => {
    await this.setState({
      sumAll: _.sumBy(this.props.order.results, e => parseInt(e.price))
    });

    let total = this.state.sumAll;
    let err = false;
    let res = null;


    axios
      .post(`${ip}/api/v1/transaction/`, {
        total: total
      })
      .then(res => {
        this.checkout(res.data.id);
        
      });
  };

  checkout(transaction_id) {
    let res = null;
    let err = false;

    this.props.order.results.map(async rescart => {
      try {
        res = await axios.patch( `${ip}/api/v1/order/` + rescart.id, {
          transaction_id: transaction_id
        });
      } catch (error) {
        err = error.message;
        console.warn(err)
      }

      if (err) {
        alert("Checkout Failed");
      } else {
        alert("Checkout Success");
      }
    });
  }


  render() {
    return (
      <Container>
        <Content>
          {this.props.order.results.map((order, index) => (
            <List key={index}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={{ uri: order.product.image_url }} />
                </Left>
                <Body>
                  <Text>{order.product.name}</Text>
                  <Text note numberOfLines={1}>
                    Rp. {order.product.price}
                  </Text>
                </Body>
                <Right>
                  <Button
                    outline
                    rounded
                    transparent
                    // onPress={() => this.handleClick(product.id, product.price)}
                  >
                    <Text>Qty. &nbsp;{order.qty}</Text>
                    <NumericInput
                      key={index}
                      initValue={this.state.value}
                      value={this.state.value}
                      editable
                      minValue={0}
                      step={1}
                      onChange={value => this.setState({ value, key })}

                     
                    />
                  </Button>
                </Right>
              </ListItem>
            </List>
          ))}
          <Card>
            <CardItem>
              <Body>
                <Button style={{backgroundColor: "#df4362"}}
                  full
                  warning
                  
                  onPress={() => this.handleCheckout()}
                >
                  <Text style={{ fontSize: 20 }}>
                    Checkout &nbsp;{" "}
                    {/* <Icon style={{ color: "white" }} name="cart" /> */}
                  </Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  order: state.orderReducer
});

export default connect(mapStateToProps)(CartScreen);
