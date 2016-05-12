/**
 * Created by  on 2016/5/12.
 */
import React,{
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
RefreshControl,
}from 'react-native'

var ScrollViewDemo = React.createClass({
    getInitialState(){
        return{
            rowData:Array.from(new Array(10)).map(
                (vai,i)=>({
                    id:(i+1),
                    text:'item number:'+i,
                    image:{uri:'http://facebook.github.io/react/img/logo_small_2x.png'},
                })
            )
        }
    },
    render(){
        const rows = this.state.rowData.map((row,ii)=>{
           return<Row id={ii} data={row}/>
        });
        return (
            <ScrollView
                automaticallyAdjustContentInsets={false}
                onScroll={()=>{console.log('onScroll!')}}
                scrollEventThrottle={200}
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing ={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                        enable={true}
                        color={['#ff7575']}
                        progressBackgroundColor="#009999"/>}
                >
                {rows}
            </ScrollView>
        );
    }
});
const Row = React.createClass({
    _onPress(){
      ToastAndroid.show("点击按钮："+(+this.props.data.id)+"===>imageUrl:"+this.props.data.image.toJSON(),ToastAndroid.SHORT);
    },
    render(){
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={styles.row}>
                    <Image source={this.props.data.image} style={styles.image}/>
                    <Text id={this.props.data.id} style={styles.text}>{this.props.data.text}</Text>
                    <Image style={styles.image} source={this.props.data.image}/>
                </View>
            </TouchableOpacity>
        )
    },
});
export default class ScrollViewLoading extends React.Component{
     render(){
        return(<ScrollViewDemo />)
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        height: 47,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        width: 36,
        height: 36
    },
    text: {
        fontSize: 20,
        color: 'black'
    }
});
