/**
 * Created by tiang on 2016/5/12.
 */
import React,{
    Text,
    View,
    Picker,
}from 'react-native';

var PickerDemo = React.createClass({
    getInitialState(){
        return ({
            language1: 'key0',
            language2: 'key0',
        })
    },
    onValueChange(key:string, value:string) {
        const newState = {};
        newState[key] = value;
        this.setState(newState);
    },
    render(){
        return (
            <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                <Picker
                    style={{width:100}}
                    selectedValue={this.state.language1}
                    onValueChange={this.onValueChange.bind(this,'language1')}
                    mode="dialog">
                    <Picker.Item label="Java" value="key0"/>
                    <Picker.Item label="JavaScript" value="key1"/>
                    <Picker.Item label="Android" value="key2"/>
                    <Picker.Item label="C++" value="key3"/>
                </Picker>
                <Picker
                    style={{width:100,marginTop:100}}
                    selectedValue={this.state.language2}
                    onValueChange={this.onValueChange.bind(this,'language2')}
                    mode="dropdown"
                    prompt="Pick one, just one">
                    <Picker.Item label="Java" value="key0"/>
                    <Picker.Item label="JavaScript" value="key1"/>
                    <Picker.Item label="Android" value="key2"/>
                    <Picker.Item label="C++" value="key3"/>
                </Picker>
            </View>
        );
    }
});
export default class PickerLoading extends React.Component {
    render() {
        return (
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <PickerDemo/>
            </View>
        )
    }
}