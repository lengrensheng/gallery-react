/**
 * Created by tiang on 2016/5/12.
 */
import React,{
    Text,
    View,
    Slider,
    StyleSheet
}from 'react-native';
var SliderDemo = React.createClass({
    getDefaultProps(){
        return {
            value: 0,
        }
    },
    getInitialState(){
        return {
            value: this.props.value,
        }
    },
    render(){
        return (
            <View>
                <Text style={styles.text}>
                    {this.state.value && +this.state.value.toFixed(3)}
                </Text>
                <Slider
                    {...this.props}
                    onValueChange={(value)=>
                    this.setState({value:value})}/>
            </View>
        )
    }
});

var SliderItem = React.createClass({
    getInitialState(){
        return {
            slideCompletionValue: 0,
            slideCompletionCount: 0
        }
    },
    render(){
        return (
            <View >
                <SliderDemo
                    {...this.props}
                    onSlidingComplete={(value)=>this.setState({
                    slideCompletionValue:value,
                    slideCompletionCount:this.state.slideCompletionCount+1,
                })}/>
                <Text>
                    Completions: {this.state.slideCompletionCount} Value: {this.state.slideCompletionValue}
                </Text>
            </View>
        );
    }
});

export default class SliderLoading extends React.Component {
    render() {
        return (
            <SliderItem/>
        )
    }
};
var styles = StyleSheet.create({
    slider: {
        height: 10,
        margin: 10,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
        margin: 10,
    },
});
