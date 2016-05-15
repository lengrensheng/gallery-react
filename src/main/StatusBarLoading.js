/**
 * Created by tiang on 2016/5/15.
 */
import React,{
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

const colors = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
];
const basStyles = [
    'default',
    'light-content',
];
const showHideTransition = [
    'fade',
    'slide',
];


function getValue<T > (values:Array < T >, index:number):T{
    return values[index % values.length];
}
const StatusBarExample = React.createClass({
    getInitialState(){
        return {
            animated: true,
            hidden: false,
            showHideTransition: getValue(showHideTransition, 0),
            showBackgroundColor: getValue(colors, 0),
            barStyle: getValue(basStyles, 0),
            showTranslucent: false,
        };
    },
    _showHideTransitionIndex: 0,
    _showBackgroundColorIndex: 0,
    _barStylesIndex: 0,
    _onChangeAnimated(){
        this.setState({animated: !this.state.animated});
    },
    _onChangeHidden(){
        this.setState({hidden: !this.state.hidden});
    },
    _onChangeTranslucent(){
        this.setState({showTranslucent: !this.state.showTranslucent})
    },
    _onChangeTransition(){
        this._showHideTransitionIndex++;
        this.setState({
            showHideTransition: getValue(showHideTransition, this._showHideTransitionIndex),
        });
    },
    _onChangeBackgroundColor(){
        this._showBackgroundColorIndex++,
            this.setState({
                showBackgroundColor: getValue(colors, this._showBackgroundColorIndex),
            });
    },
    render(){
        return (
            <View>
                <StatusBar
                    hidden={this.state.hidden}
                    showHideTransition={this.state.showHideTransition}
                    animated={this.state.animated}
                    backgroundColor={this.state.showBackgroundColor}
                    barStyle={this.state.barStyle}/>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={this._onChangeHidden}>
                    <View style={styles.button}>
                        <Text>hidden:{this.state.hidden ? 'true' : 'false'}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={this._onChangeAnimated}>
                    <View style={styles.button}>
                        <Text>Animated:{this.state.animated ? 'true' : 'false'}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={this._onChangeTranslucent}>
                    <View style={styles.button}>
                        <Text>translucent:{this.state.showTranslucent?'true':'false'}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={this._onChangeBackgroundColor}>
                    <View style={styles.button}>
                        <Text>backgroundColor:{this.state.showBackgroundColor}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
});

export default class StatusBarLoading extends React.Component{
    render(){
        return(
            <StatusBarExample/>
        );
    }
}


var styles = StyleSheet.create({
    wrapper: {
        borderRadius: 5,
        marginBottom: 5,
    },
    button: {
        borderRadius: 5,
        backgroundColor: '#eeeeee',
        padding: 10
    },
});
