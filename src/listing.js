
import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Container, Header, Item, Input, Icon, Card, Text, CardItem, Body } from 'native-base';
import { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['url', 'title', 'author'];
export default class Listing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            totalPages: 0,
            searchTerm: '',
            storyData: []
        }
    }

    componentDidMount() {
        this.getData()
        setInterval(() => this.getData(), 10000)
    }


    getData = () => {
        if (this.state.totalPages <= 50) {
            fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.page}`)
                .then((res) => res.json())
                .then((response) => {
                    this.setState({
                        totalPages: response.nbPages,
                        storyData: response.hits.concat(this.state.storyData),
                        page: this.state.page + 1
                    })
                }).catch((error) => {
                    console.log('error', error)
                })
        }
    }

    loadMore = () => {
        this.getData()
    }

    _renderItem = ({ item, index }) => (
        <Card>
            <CardItem button onPress={() => this.props.navigation.navigate('Details', { data: item })}>
                <Body>
                    <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>Title: </Text>{item.title}</Text>
                    <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>URL: </Text>{item.url}</Text>
                    <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>Created at: </Text>{item.created_at}</Text>
                    <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>Author: </Text>{item.author}</Text>
                </Body>
            </CardItem>
        </Card>
    )

    render() {
        const filterData = this.state.storyData.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Input
                            placeholder="Search"
                            value={this.state.searchTerm}
                            onChangeText={(val) => { this.setState({ searchTerm: val }) }}
                        />
                        <Icon name="ios-search" />
                    </Item>
                </Header>
                <FlatList
                    style={{ margin: 10 }}
                    data={filterData}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    legacyImplementation={true}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.01}
                />
            </Container>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        backgroundColor: '#ccc',
        //borde

    }
});
