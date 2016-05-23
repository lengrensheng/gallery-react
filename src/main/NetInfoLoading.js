/**
 * Created by  on 2016/5/23.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    Switch,
    StyleSheet,
    TouchableWithoutFeedback,
    NetInfo
} from 'react-native';

var NetInfoExample = React.createClass({
   getInitialState(){
       return({
          show:true,
       });
   } ,
    _handleChange(){
        this.setState({
            show:!this.state.show,
        });
    },
    render(){
        const contentView = this.state.show?(
                <View style={[styles.item_container,{flexDirection:'column',justifyContent:'flex-start'},{alignItems: 'flex-start'}]}>
                    <ConnectionInfoSubscription/>
                    <ConnectionInfoCurrent/>
                    <IsConnected/>
                    <IsConnectionExpensive/>
                </View>
            ):<View style={styles.item_container}><Text>关闭网络监听</Text></View>;
        return(
           <View style={styles.container}>
               <View style={styles.item_container}>
                   <Text style={styles.item_text}>是否打开网络监听</Text>
                   <Switch value={this.state.show}
                        onValueChange={this._handleChange}/>
               </View>
               <Text style={[styles.item_text,{marginLeft:10}]}>
                   开启状态：{this.state.show?'true':'false'}
               </Text>
               {contentView}
           </View>
        );
    }
});

const ConnectionInfoSubscription = React.createClass({
   getInitialState(){
       return{
           connectionInfoHistory:[],
       }
   } ,
    _handleConnectionInfoChange(connectionInfo){
        const connectionInfoHistory = this.state.connectionInfoHistory.slice();
        connectionInfoHistory.push(connectionInfo);
        this.setState({
            connectionInfoHistory:connectionInfoHistory,
        });
    },
    componentDidMount(){
      NetInfo.addEventListener('change',this._handleConnectionInfoChange);
        console.log('DidMount');
    },
    componentWillUnMount(){
        NetInfo.removeEventListener('change',this._handleConnectionInfoChange);
    },
    render(){
        return(
            <View>
                <Text>{JSON.stringify(this.state.connectionInfoHistory)}</Text>
            </View>
        )
    }
});

const ConnectionInfoCurrent = React.createClass({
   getInitialState(){
       return {
           connectionInfo: null,
       };
   },
    _handleConnectionInfo(connectionInfo){
      this.setState({
          connectionInfo:connectionInfo,
      })
    },
    componentDidMount(){
        NetInfo.addEventListener('change',this._handleConnectionInfo);
        NetInfo.fetch().done(
            (connectionInfo)=>{this.setState({connectionInfo});}
        );
    },
    componentWillUnMount(){
        NetInfo.removeEventListener('change',this._handleConnectionInfo);
    },
    render(){
        return(
            <View>
                <Text>{this.state.connectionInfo}</Text>
            </View>
        )
    }
});
const IsConnected = React.createClass({
   getInitialState(){
      return{
          isConnected:null,
      } ;
   } ,
    componentDidMount(){
        NetInfo.isConnected.addEventListener('change',this._handleConnectivityChange);
        NetInfo.isConnected.fetch().done(
            (isConnected)=>{this.setState({isConnected:isConnected});}
        );
    },
    componentWillUnMount(){
        NetInfo.removeEventListener('change',this._handleConnectivityChange);
    }
    ,
    _handleConnectivityChange(isConnected){
        this.setState({
            isConnected:isConnected,
        });
    },
    render(){
        return(
            <View>
                <Text>{this.state.isConnected?'online':'offline'}</Text>
            </View>
        );
    }
});
const IsConnectionExpensive = React.createClass({
    getInitialState() {
        return {
            isConnectionExpensive: (null : ?boolean),
        };
    },
    _checkIfExpensive() {
        NetInfo.isConnectionExpensive(
            (isConnectionExpensive) => { this.setState({isConnectionExpensive}); }
        );
    },
    render() {
        return (
            <View>
                <TouchableWithoutFeedback onPress={this._checkIfExpensive}>
                    <View>
                        <Text>Click to see if connection is expensive:
                            {this.state.isConnectionExpensive === true ? 'Expensive' :
                                this.state.isConnectionExpensive === false ? 'Not expensive'
                                    : 'Unknown'}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
});
export default class NetInfoLoading extends Component{
    render(){
        return(
            <NetInfoExample/>
        );
    }
}
var styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column'
    },
    item_container:{
        flexDirection:'row',
        height:60,
        margin:10,
        justifyContent:'space-between',
        alignItems:'center',
    },
    item_text:{
      fontSize:20
    }
});