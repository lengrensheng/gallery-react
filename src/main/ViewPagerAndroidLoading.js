/**
 * Created by tiang on 2016/5/16.
 */
import React,{
    View,
    Text,
    Image,
    StyleSheet,
    ViewPagerAndroid,
    TouchableNativeFeedback,
    TouchableOpacity
}from 'react-native';

const PAGE_SIZE = 5;
const BACK_GROUND_COLORS = ['#fdc08e', '#fff6b9', '#99d1b7', '#dde5fe', '#f79273'];
const IMAGE_URIS = [
    'http://apod.nasa.gov/apod/image/1410/20141008tleBaldridge001h990.jpg',
    'http://apod.nasa.gov/apod/image/1409/volcanicpillar_vetter_960.jpg',
    'http://apod.nasa.gov/apod/image/1409/m27_snyder_960.jpg',
    'http://apod.nasa.gov/apod/image/1409/PupAmulti_rot0.jpg',
    'http://apod.nasa.gov/apod/image/1510/lunareclipse_27Sep_beletskycrop4.jpg',
];
var LikeCount = React.createClass({
    getInitialState(){
        return {
            likes: 7,
        }
    },
    _onClick(){
        this.setState({
            likes: this.state.likes + 1,
        });
    },
    render(){
        var thumbsUp = '\uD83D\uDC4D';
        return (
            <View style={styles.likeContainer}>
                <TouchableOpacity onPress={this._onClick}
                                  style={styles.likeButton}>
                    <Text style={styles.likesText}>{thumbsUp + ' Liked'}</Text>
                </TouchableOpacity>
                <Text style={styles.likesText}>{this.state.likes + ' likes'}</Text>
            </View>
        );
    }
});

var Button = React.createClass({
    _handlePress(){
        if (this.props.enable && this.props.onPress) {
            this.props.onPress();
        }
    },
    render(){
        return (
            <TouchableNativeFeedback
                onPress={this._handlePress}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={[styles.button,this.props.enable?{}:styles.buttonDisable]}>
                    <Text style={styles.buttonText}>{this.props.text}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
});

var progressBar = React.createClass({
    render(){
        var fractionPosition = (this.props.progress.position + this.props.progress.offset);
        var progressBarSize = (fractionalPosition / (PAGE_SIZE - 1)) * this.props.size;
        return (
            <View style={[style.progressBarContainer,{width:this.props.size}]}>
                <View style={[styles.progressBar,{width:progressBarSize}]}></View>
            </View>
        );
    }
});

var ViewPagerExample = React.createClass({
    getInitialState(){
        return{
            page:0,
            animationsAreEnable:true,
            progress:{
                position:0,
                offset:0,
            },
        }
    },
    _onPageSelected:function(e){
        this.setState({
            page: e.nativeEvent.position,
        })
    },
    _onPageScroll(e){
        this.setState({progress: e.nativeEvent});
    },
    _move(delta){
        var page = this.state.page+delta;
        this._go(page);
    },
    _go(page){
        if(this.state.animationsAreEnable){
            this.viewPager.setPage(page);
        }else{
            this.viewPager.setPageWithoutAnimation(page);
        }
        this.setState({
           page
        });
    },
    render(){
        var pages=[];
        for(var i=0;i<PAGE_SIZE;i++){
            var pageStyle={
                backgroundColor:BACK_GROUND_COLORS[i%BACK_GROUND_COLORS.length],
                alignItems:'center',
                padding:20,
            }
            pages.push(
                <View key={i} style={pageStyle} collapsable={false}>
                    <Image style={styles.image}
                           source={{uri:IMAGE_URIS[i%IMAGE_URIS.length]}}/>
                    <LikeCount/>
                </View>
            );
        }
        var {page,animationsAreEnabled} = this.state;
        return(
            <View style={styles.container}>
                <ViewPagerAndroid
                    style={styles.viewPager}
                    initialPage={0}
                    onPageScroll={this._onPageScroll}
                    onPageSelected={this._onPageSelected}
                    ref={viewPager=>{this.viewPager=viewPager;}}>
                    {pages}
                </ViewPagerAndroid>
            </View>
        );
    }
});

export default class ViewPagerAndroidLoading extends React.Component {
    render() {
        return (
            <ViewPagerExample/>
        )
    }
}
var styles = StyleSheet.create({
    buttons:{
        flexDirection:'row',
        height:30,
        backgroundColor:'black',
        alignItems:'center',
        justifyContent:'space-between'
    },
    button:{
        flex:1,
        width:0,
        margin:5,
        borderColor:'grey',
        borderWidth:1,
        backgroundColor:'grey',
    },
    buttonDisabled: {
        backgroundColor: 'black',
        opacity: 0.5,
    },
    buttonText: {
        color: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: 300,
        height: 200,
        padding: 20,
    },
    likeButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: '#333333',
        borderWidth: 1,
        borderRadius: 5,
        flex: 1,
        margin: 8,
        padding: 8,
    },
    likeContainer: {
        flexDirection: 'row',
    },
    likesText: {
        flex: 1,
        fontSize: 18,
        alignSelf: 'center',
    },
    progressBarContainer: {
        height: 10,
        margin: 10,
        borderColor: '#eeeeee',
        borderWidth: 2,
    },
    progressBar: {
        alignSelf: 'flex-start',
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    viewPager: {
        flex: 1,
    },
});