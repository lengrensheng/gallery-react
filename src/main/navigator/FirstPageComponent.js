/**
 * Created by  on 2016/5/11.
 */
import React,{
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
}from 'react-native';
import SecondPageComponent from './SecondPageComponent';
export default class FirstPageComponent extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            id:2,
            user:null,
        };
      }
    _pressButton(){
        let _this =this;
       const {navigator} = this.props;
        if(navigator){
            navigator.push({
                name:'SecondPageComponent',
                component:SecondPageComponent,
                params:{
                    id:this.state.id,
                    getUser:function(user){
                        _this.setState({
                            user:user
                        })
                    },
                }
            })
        }
    }
    render(){
        if(this.state.user){
            return(
                <View style={styles.container}>
                    <Text style={[styles.text,{color:'black'}]}>用户信息：{JSON.stringify(this.state.user)}</Text>
                </View>
            );
        }else {
            return (
                <View
                    style={[styles.container,{backgroundColor:'#4485faf7'}]}>
                    <TouchableOpacity onPress={this._pressButton.bind(this)}>
                        <Text style={styles.text}>跳转到第二页,传递ID</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}
var styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:20,
        color: '#fff'
    }
});