
import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Container, Content, Item, Input, Icon, Card, Text, CardItem, Body } from 'native-base';

export default class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <Container>
        <Content>
          <CardItem>
            <Card style={{ padding: 5 }}>
              <Text>{JSON.stringify((this.props.navigation.state.params.data), undefined, 4)}</Text>
            </Card>
          </CardItem>
        </Content>
      </Container>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
