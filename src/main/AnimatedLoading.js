/**
 * Created by Administrator on 2016/5/17.
 */

import React from 'react';
import{
    View,
    Text,
    Animated,
    StyleSheet,
    Easing,
    TouchableOpacity,
    Alert
}from 'react-native';

export default class AnimatedLoading extends React.Component {
    render() {
        return (
            <FadeInView/>
        )
    }
}

var FadeInView = React.createClass({
    getInitialState(){
        return (
            this.state = {
                fadeAnim: new Animated.Value(0),
                opacity:1,
            }
        );
    },
    componentWillMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: this.state.opacity,
                duration: 2000,
            }
        ).start();
    },
    _onPress(){
        this.setState({
            opacity:this.state.opacity>0?0:1,
        });
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: this.state.opacity,
                duration: 2000,
            }
        ).start();
    },
    render(){
        return (
            <TouchableOpacity style={{flex:1,flexDirection:'column',alignItems:"center",justifyContent:"center"}}
                              onPress={this._onPress}>
                <Animated.Image
                    source={require('../image/logo_og.png')}
                    style={{opacity:this.state.fadeAnim,alignItems:'center'
                    ,justifyContent:'center',width:68,height:68}}>
                    {this.props.children}
                </Animated.Image>
            </TouchableOpacity>
        )
    },
});