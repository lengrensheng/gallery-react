/**
 * Created by tiang on 2016/5/8.
 */
import React,{
    Component,
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

const netImage = {uri: 'http://facebook.github.io/react/img/logo_small_2x.png'};
const defaultImage = require('../image/logo_og.png');
var NetLoadingImage = React.createClass({
    getInitialState: function () {
        return {
            error: false,
            loading: false,
            progress: 0
        };
    },
    render: function () {
        var loader = this.state.loading ?
            <View style={styles.progress}>
                <Text style={[styles.text]}>{this.state.progress}%</Text>
            </View> : <Text style={styles.text}>{this.props.text}</Text>;
        return this.state.error ?
            <Text>{this.state.error}</Text> :
            <View style={styles.container}>
                <Image source={this.props.source} style={styles.base}
                       onLoadStart={(e)=>this.setState({loading:true})}
                       onLoadEnd={()=>this.setState({loading:false,error:false})}
                       onLoad={()=>this.setState({loading:false,error:false})}
                       onProgress={(e)=>{this.setState({progress: Math.round(100 * e.nativeEvent.loaded / e.nativeEvent.total)});
                                            Console.info('loaded:'+e.nativeEvent.loaded+"===>total:"+e.nativeEvent.total);
                                            if(this.state.progress===100){
                                                alert('loading finish');
                                            }}}
                       onError={(e)=>this.setState({loading:false,error:e.nativeEvent.error})}/>
                {loader}
            </View>
    }
});
export default class ImageLoading extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    onPress = ()=> {
        const {onPress} = this.props;
        onPress();
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onPress}>
                    <NetLoadingImage source={netImage} text='网络Image'/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
        base: {
            width: 90,
            height: 90,
            borderRadius: 80
        },
        progress: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            width: 100,
            justifyContent: 'center',
        },
        container: {
            flex: 1,
            justifyContent: 'center',
        },
        image: {
            width: 80,
            height: 80,
            borderRadius: 100
        },
        text: {
            color: 'black',
            textAlign: 'center',
        }
    }
);