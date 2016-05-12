/**
 * Created by  on 2016/5/11.
 */
import React,{
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
}from 'react-native';
import FirstPageComponent from './FirstPageComponent';
const USER_MODELS={
    1:{name:'react',age:'23'},
    2:{name:'native',age:'24'},
}
export default class SecondPageComponent extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            id:null,
        };
      }
    _pressButton(){
        const {navigator} = this.props;
        if(this.props.getUser){
            let user = USER_MODELS[this.props.id];
            this.props.getUser(user);
        }
        if(navigator){
            navigator.pop();
        }
    }

    componentDidMount() {
        this.setState({
            id:this.props.id,
            user:null,
        });
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>获得的参数{this.props.id}</Text>
                <TouchableOpacity onPress={this._pressButton.bind(this)}>
                    <Text style={styles.text}>点击返回FirstPage</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#44858585'
    },
    text:{
        fontSize:20,
        color: '#fff'
    }
});