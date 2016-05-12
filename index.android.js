/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    AlertIOS,
    Platform
} from 'react-native';
const AndroidOS = "android";
import Button from './src/component/Button';
import ImageLoading from  './src/main/ImageLoading'
import DrawerLayoutLoading from './src/main/DrawerLayoutLoading'
import ListViewLoading from './src/main/ListViewLoading'
import ModalLoading from './src/main/ModalLoading'
import PickerLoading from './src/main/PickerLoading'
import NavigatorLoading from './src/main/navigator/NavigatorLoading'
import ProgressBarLoading from './src/main/ProgressLoading'
class demo extends React.Component {
    fetchData = ()=> {
        //禁用按钮
        ToastAndroid.show("ToastTest", ToastAndroid.SHORT);
        this.refs.btnConfirm._disable();
        this._timer = setTimeout(()=> {
            this.refs.btnConfirm._enable();
        }, 3000);
        //获取完数据启用按钮
    };

    fetchDataOther = (enableCallBack)=> {
        this._timer = setTimeout(()=> {
            enableCallBack();//带括号表示立即执行
        }, 3000);
    };
    onPress = ()=> {
        if (Platform.OS === AndroidOS) {
            ToastAndroid.show("click Android", ToastAndroid.SHORT);
        } else {
            AlertIOS.alert("click IOS");
        }
    };

    componentWillUnMount() {
        this._timer && clearTimeout(this._timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title_bar}/>
                <ProgressDemo/>
            </View>
        );
    }
}
var ProgressDemo = React.createClass({
   render(){
       return(
           <ProgressBarLoading/>
       )
   }
});
var NavigatorDemo = React.createClass({
        render(){
            return (
                <NavigatorLoading/>
            )
        }
    }
);
var ModalDemo = React.createClass({
    render()
    {
        return (
            <ModalLoading style={{flex:1}}/>
        )
    }
});
var ListView = React.createClass({
    render(){
        return (
            <ListViewLoading style={styles.listView}/>
        )
    }
});
var ButtonView = React.createClass({
    render(){
        return (
            <View style={{flex:1}}>
                <Button ref="btnConfirm" text="确定" backgroundColor="red" onPress={this.fetchData}/>
                <Button ref="btnCancel" text="取消" backgroundColor="blue" onPress={this.fetchDataOther}/>
                <ImageLoading onPress={this.onPress}/>
            </View>
        )
    }
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
    title_bar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 47,
        backgroundColor: 'grey'
    },
    listView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('demo', () => demo);
