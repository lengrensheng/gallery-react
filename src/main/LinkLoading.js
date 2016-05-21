/**
 * Created by  on 2016/5/21.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    Linking,
    StyleSheet,
    Alert,
} from 'react-native';

var OpenURLButton = React.createClass({
    propsTypes: {
        url: React.PropTypes.string,
    },
    handleClick(){
        console.log('链接地址：'+this.props.url);
        Linking.canOpenURL(this.props.url)
            .then(supported=> {
                if (supported) {
                    Linking.openURL(this.props.url);
                } else {
                    Alert.alert("不支持该链接：" + this.props.url);
                }
            });
    },
    render(){
        return(
            <TouchableNativeFeedback
                onPress={this.handleClick}>
                <View style={styles.button}>
                    <Text style={styles.text}>Open {this.props.url}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
});

export default class LinkLoading extends Component{
    render(){
        return(
            <View style={styles.container}>
                <OpenURLButton url={'http://www.baidu.com'}/>
                <OpenURLButton url={'http://www.jandan.com'}/>
                <OpenURLButton url={'http://www.facebook.com'}/>
                <OpenURLButton url={'fb://notifications'}/>
                <OpenURLButton url={'geo:37.484847,-122.148386'} />
                <OpenURLButton url={'tel:9876543210'} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        paddingTop: 30,
    },
    button: {
        padding: 10,
        backgroundColor: '#3B5998',
        marginBottom: 10,
    },
    text: {
        color: 'white',
    },
});