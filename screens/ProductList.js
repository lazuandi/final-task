import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Right,
  Icon,
  Button,
  Fab,
  Footer
} from "native-base";
import { Image } from "react-native";
import NumericInput from "react-native-numeric-input";

// Redux Dependencies
import axios from "axios";
import { connect } from "react-redux";
import { ALL_PRODUCTS } from "../redux/actions/product";

// Set server
import { ip } from "../setServer";

// Import component
// import HeaderScreen from "./HomeScreen"

class ProductList extends Component {
  state = {
    value: 0,
    product_id: 0
  };
  componentDidMount() {
    this.props.dispatch(ALL_PRODUCTS());
  }

  handleSubmit(id, price, value) {
    const hargaProduct = price * value;

    axios
      .post(ip + "/api/v1/order", {
        product_id: id,
        qty: value,
        price: hargaProduct,
        // transaction_id: 1
      })
      .then(res => {
        this.props.dispatch(ALL_PRODUCTS());
      });
    this.setState({ value: 0 });
  }

  // handleAdd = (value) => {
  //   this.setState({ value:value })
  // }

  render() {
    return (
      <Container>
        {/* <HeaderScreen /> */}
        <Content>
          {this.props.product.results.map((product, index) => (
            <Card key={index} style={{ padding: 10}}>
              {/* Image Section */}
              <CardItem cardBody>
                <Image
                  source={{
                    uri: product.image_url
                  }}
                  style={{ height: 150, width: "100%", flex: 1 }}
                />
              </CardItem>

              {/* Detail Section */}
              <CardItem bordered>
                <Text>{product.name}</Text>
              </CardItem>
              <CardItem bordered>
                <Text style={{fontSize: 10}}>Rp. {product.price}</Text>
              </CardItem>

              {/* Qty Section */}
              <CardItem bordered style={{ justifyContent: "center" }}>
                <NumericInput
                  initValue={this.state.value}
                  value={this.state.value}
                  editable
                  minValue={0}
                  step={1}
                  onChange={value => this.setState({ value })}

                  
                />
              </CardItem>

              {/* Button Section */}
              <CardItem>
                <Body>
                  <Button style={{backgroundColor: '#df4362'}}
                    full
                    onPress={() =>
                      this.handleSubmit(
                        product.id,
                        product.price,
                        this.state.value
                      )
                    }
                  >
                    <Text style={{ fontSize: 15 }}>
                      Add to Cart &nbsp;{" "}
                      <Icon style={{ color: "white" }} name="cart" />
                    </Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
          ))}
        </Content>

        
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  product: state.productReducer
});

export default connect(mapStateToProps)(ProductList);
