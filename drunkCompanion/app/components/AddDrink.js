import Autocomplete from 'react-native-autocomplete-input';

import React, {Component} from 'react';
import {Picker, Button, View, Text, StyleSheet} from 'react-native';

export default class AddDrink extends Component {

    static renderDrink(film) {
        const { title, alcohol_level, brand, gtin} = film;
    
        return (
          <View>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.alcohol_level}>{alcohol_level}</Text>
          </View>
        );
    }


    constructor(props) {
        super(props);
        this.state = {
          drinks: [],
          query: ''
        };
    }

    findDrinkByTitle(query) {
        if (query === '') {
          return [];
        }
    
        const { drinks } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return drinks.filter(drink => drink.title.search(regex) >= 0);
    }

    state = {drink: ''}
    render(){
        
        const { query } = this.state;
        const drinks = this.findDrink(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return(
            <View style={styles.container}>
                <Text style={{fontSize: 20}}>What are you drinking?</Text>
                <View>
                    <View style={styles.autocompleteContainer}>
                        <Autocomplete 
                        autoCapitalize="none"
                        autoCorrect={true} 
                        placeholder="Enter your Drink here"
                        defaultValue={query}
                        data={comp(query, drinks[0]) ? [] : drinks}
                        />
                    </View>
                    <View style={styles.descriptionContainer}>
                            {drinks.length > 0 ? (
                                AddDrink.renderDrink(films[0])
                            ) : (
                                <Text style={styles.infoText}>
                                Enter your Drink here
                                </Text>
                            )}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'baseline',
      backgroundColor: '#4458',
      flexDirection: 'column'
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
      }
});