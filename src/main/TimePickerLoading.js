/**
 * Created by  on 2016/5/23.
 */
import React,{Component} from 'react';
import {
    TimePickerAndroid,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
}from 'react-native';

function _formatTime(hour, minute){
    return hour + ":" + (minute < 10 ? '0' + minute : minute);
};
var TimePickerAndroidExample = React.createClass({
    getInitialState(){
        return {
            isoFormatText: 'pick a time (24-hour format)',
            presetHour: 4,
            presetMinute: 4,
            presetText: 'pick a time, default:4:04AM',
            simpleText: 'pick a time',
        }
    },
    async showPicker(stateKey, option){
        try {
            const {action,minute,hour} = await TimePickerAndroid.open(option);
            var newState = {};
            if (action === TimePickerAndroid.timeSetAction) {
                newState[stateKey + 'Text'] = _formatTime(hour, minute);
                newState[stateKey + 'Hour'] = hour;
                newState[stateKey + 'Minute'] = minute;
            } else if (action === TimePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            }
            this.setState(newState);
        } catch ({code, message}){
            console.warn(`Error in example '${stateKey}':`, message);
        }
    },
    render(){
        return (
            <View>
                <TouchableOpacity
                    onPress={this.showPicker.bind(this,'simple')}>
                    <Text style={styles.text}>{this.state.simpleText}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.showPicker.bind(this,'preset',{
                    hour:this.state.presetHour,
                    minute:this.state.presetMinute
                  })}>
                    <Text style={styles.text}>{this.state.presetText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.showPicker.bind(this,'isoFormat',{
                    hour:this.state.isoFormatHour,
                    minute:this.state.isoFormatMinute,
                    is24Hour:false,
                  })}>
                    <Text style={styles.text}>{this.state.isoFormatText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
});

export default class TimePickerLoading extends Component {
    render() {
        return (
            <TimePickerAndroidExample/>
        );
    }
};
var styles = StyleSheet.create({
    text: {
        color: 'black',
        margin: 20
    },
});
