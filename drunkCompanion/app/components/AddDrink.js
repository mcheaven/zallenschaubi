import Autocomplete from 'react-native-autocomplete-input';

import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';

export default class AddDrink extends Component {
  state = { drink: '' };

  static renderDrink(drink) {
    const {
      title, alcohol_level, brand, gtin,
    } = drink.item;
    console.log("RENDER DRINK");
    console.log(drink);
    return (
      <View>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.alcohol_level}>{alcohol_level}</Text>
      </View>
    );
  }

  static keyExtractor(item, i) {
    return String(item.id);
  }

  renderDrinkSuggestion(drink) {
    const {
      title, alcohol_level, brand, gtin,
    } = drink.item;
    console.log("SUGGESTION");
    console.log(drink);

    return (
      <TouchableOpacity style={styles.suggestionContainer} 
        onPress={() => this.setState({ query: title, chosenDrink: drink})}>
        <Text style={styles.itemText}>{brand}</Text>
        <Text style={styles.itemText}>{title}</Text>
        <Text style={styles.alcohol_levelText}>alc {alcohol_level}%</Text>
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
    const dummy_data = [
      {title: 'pilsner', alcohol_level: 0.4, brand: 'pilsner', id: 1, gtin: ''},
      {title: 'peterbier', alcohol_level: 0.4, brand: 'pilsner', id: 2, gtin: 'ABCD'},
      {title: 'wasser', alcohol_level: 0.4, brand: 'bex', id: 3, gtin: 'ABCE'},
      {title: 'radler', alcohol_level: 0.4, brand: 'bex', id: 4, gtin: 'ABCF'},
      {title: 'pils', alcohol_level: 0.4, brand: 'bex', id: 5, gtin: 'ABCG'},
      {title: 'export', alcohol_level: 0.4, brand: 'bex', id: 6, gtin: 'ABCH'}
    ];
    this.setState({drinks: dummy_data});
  }

  chooseDrink = (drink) => {
    
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
    const { query, chosenDrink } = this.state;
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
          keyExtractor={AddDrink.keyExtractor}
        />
        <View style={styles.descriptionContainer}>
            {chosenDrink ? (AddDrink.renderDrink(chosenDrink)): null }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch"
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  suggestionContainer: {
    flexDirection: "row"
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  alcohol_levelText: {
    fontSize: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  }
});
