/**
 * Created by  on 2016/5/19.
 */
import React from 'react';
import {
    Component,
    Picker,
    Text,
    View,
    AsyncStorage,
    Alert,
}from 'react-native';

var STORAGE_KEY = '@AsyncStorageLoading:key';
var COLORS = ['red', 'orange', 'yellow', 'green', 'blue'];
var PickerItem = Picker.Item;

var AsyncStorageExample = React.createClass({
    getInitialState(){
        return {
            selectedValue: COLORS[0],
            messages: []
        }
    }
    ,
    async _loadInitialState(){
        try {
            var value = await AsyncStorage.getItem(STORAGE_KEY);
            if (value != null) {
                this.setState({selectedValue: value});
                this._appendMessage('Recovered selection from disk: ' + value);
            } else {
                this._appendMessage('Initialized with no selection on disk.');
            }
        } catch (error) {
            this._appendMessage('AsyncStorage error:' + error.messages);
        }
    },
    _appendMessage(message){
        this.setState({
            messages: this.state.messages.concat(message),
        });
    },
    async _onValueChange(selectedValue){
        this.setState({selectedValue});
        try {
            var exist = AsyncStorage.getItem(STORAGE_KEY);
            Alert.alert(exist.toString());
            await AsyncStorage.setItem(STORAGE_KEY, selectedValue);
            this._appendMessage('Save selection to disk: ' + selectedValue);
        } catch (error) {
            this._appendMessage('AsyncStorage error: ' + error.message);
        }
    },
    async _removeStorage(){
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            this._appendMessage('Selection remove from disk.');
        } catch (error) {
            this._appendMessage('AsyncStorage error: ' + error.messages);
        }
    },
    componentDidMount() {
        this._loadInitialState().done();
    },
    render(){
        var color = this.state.selectedValue;
        return (
            <View>
                <Picker
                    selectedValue={color}
                    onValueChange={this._onValueChange}>
                    {COLORS.map((value)=>(
                        <PickerItem
                            value={value}
                            label={value}
                            key={value}/>
                    ))}
                </Picker>
                <Text>
                    {'Selected: '}
                    <Text style={{color}}>
                        {this.state.selectedValue}
                    </Text>
                </Text>
                <Text>{' '}</Text>
                <Text onPress={this._removeStorage}>
                    Press here to remove from storage
                </Text>
                <Text>{' '}</Text>
                <Text>Message:</Text>
                {this.state.messages.map((m)=><Text key={m}>{m}</Text>)}
            </View>
        );
    }
});
export default class AsyncStorageLoading extends Component {
    render() {
        return (
            <AsyncStorageExample />
        )
    }
}