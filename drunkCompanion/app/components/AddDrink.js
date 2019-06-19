import React, {Component} from 'react';
import {Picker} from 'react-native';

export default class AddDrink extends Component {
    render(){
        return(
            <Picker>
                <Picker.Item label="Beer" value="beer" />
                <Picker.Item label="Wine" value="wine" />
                <Picker.Item label="Shot" value="shot" />
            </Picker>
        );
    }
}