/**
 * Created by tiang on 2016/5/8.
 */
import React,{
    Component,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
}from 'react-native';
export default class Button extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            disable:false
        };
    }
    _enable = ()=>{
        this.setState({
            disable:false,
        });
    }
    _disable = ()=>{
        this.setState({
            disable:true,
        });
    }
    onPress = ()=> {
       /* const {onPress} = this.props;
        onPress();*/
        //第二种实现方式
        const {onPress} = this.props;
        this._disable();//都是异步执行
        onPress(this._enable);
    }

    render() {
        const { text,backgroundColor,width} = this.props;//解构 const text = this.props.text
        return (
            <View style={[styles.container]}>
                <TouchableOpacity
                    disable={this.state.disable}
                    style={[styles.button,{backgroundColor: backgroundColor},
                    this.state.disable&&styles.disable,]}
                    onPress={this.onPress}>
                    <Text style={styles.buttonText}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 150,
        borderRadius: 20,
        backgroundColor: 'blue',
        justifyContent: 'center',
    },
    buttonWidth:{
        width:220
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    disable:{
        backgroundColor:'grey',
    }
});
