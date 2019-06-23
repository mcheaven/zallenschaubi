import Autocomplete from 'react-native-autocomplete-input';

import React, { Component } from 'react';
import {
  Picker, Button, View, Text, StyleSheet, TouchableOpacity
} from 'react-native';

export default class AddDrink extends Component {
  state = { drink: '' };

  static renderDrink(drink) {
    const {
      title, alcohol_level, brand, gtin,
    } = drink;

    return (
      <View>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.alcohol_level}>{alcohol_level}</Text>
      </View>
    );
  }

  renderDrinkSuggestion(drink) {
    const {
      title, alcohol_level, brand, gtin,
    } = drink.item;
    console.log("SUGGESTION");
    console.log(drink);

    return (
      <TouchableOpacity onPress={() => this.setState({ query: title })}>
        <Text style={styles.itemText}>
          {brand} {title} ({alcohol_level})
        </Text>
      </TouchableOpacity>
    );
  }

  constructor(props) {
    super(props);
    const drinks = [];
    this.state = {
      drinks,
      query: '',
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.renderDrinkSuggestion = this.renderDrinkSuggestion.bind(this);
  }

  componentDidMount() {
    //First method to be called after components mount
    //fetch the data from the server for the suggestion
    /*
    fetch(`${API}/films/`)
      .then(res => res.json())
      .then(json => {
        const { results: films } = json;
        this.setState({ films });
        //setting the data in the films state
      });
    */
    const drinks = [
      {title: 'pilsner', alcohol_level: 0.4, brand: 'pilsner', key: 'pilsner'},
      {title: 'peterbier', alcohol_level: 0.4, brand: 'pilsner', key: 'peterbier'}
    ];
    this.setState({drinks});
  }

  findDrinksByTitle(query) {
    console.log(`QUER1Y:${query}`);
    if (query === '') {
      return [];
    }

    const { drinks } = this.state;
    console.log('ALL:');
    console.log(drinks);
    const regex = new RegExp(`${query.trim()}`, 'i');
    const drinks_ = drinks.filter(drink => drink.title.search(regex) >= 0);
    console.log("findDrinkByTitle");
    console.log('FOUND:');
    console.log(drinks_);
    return drinks_;
  }

  handleChangeText(text) {
    return this.setState({ query: text });
  }

  render() {
    const { query } = this.state;
    const drinks = this.findDrinksByTitle(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <View style={styles.container}>
        <Autocomplete
          containerStyle={styles.autocompleteContainer}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter your Drink here"
          defaultValue={query}
          onChangeText={this.handleChangeText}
          data={drinks.length === 1 && comp(query, drinks[0].title) ? [] : drinks}
          renderItem={this.renderDrinkSuggestion}
        />
        <View style={styles.descriptionContainer}>
          {drinks.length > 0 ? (
            AddDrink.renderDrink(drinks[0])
          ) : (
            <Text style={styles.infoText}>Enter your Drink here</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
