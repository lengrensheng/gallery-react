/**
 * Created by  on 2016/5/12.
 */
import React,{
    Text,
    View,
    ProgressBarAndroid,
    StyleSheet
}from 'react-native';
var TimmerMixin = require('react-timer-mixin');
var MovingBar = React.createClass({
   mixins:[TimmerMixin],
    getInitialState(){
        return({
            progress:0,
        })
    },
    componentDidMount(){
      this.setInterval(
          ()=>{
              var progress = (this.state.progress+0.02)%1;
              this.setState({progress:progress});
          },500);
    },
    componentWillUnMount(){
        this.clearInterval();
    },
    render(){
        return(
            <ProgressBarAndroid style={{width:200}} progress={this.state.progress} {...this.props}/>
        )
    }

});
var ProgressBarDemo = React.createClass({
    render(){
        return (
            <View style={styles.container}>
                <ProgressBarAndroid />
                <Text style={styles.text}>默认ProgressBar</Text>
                <ProgressBarAndroid styleAttr="Small"/>
                <Text style={styles.text}>Small ProgressBar</Text>
                <ProgressBarAndroid styleAttr="Large"/>
                <Text style={styles.text}>Large ProgressBar</Text>
                <ProgressBarAndroid styleAttr="Inverse"/>
                <Text style={styles.text}>Inverse ProgressBar</Text>
                <ProgressBarAndroid styleAttr="SmallInverse"/>
                <Text style={styles.text}>SmallInverse ProgressBar</Text>
                <ProgressBarAndroid styleAttr="LargeInverse"/>
                <Text style={styles.text}>LargeInverse ProgressBar</Text>
                <MovingBar styleAttr="Horizontal" indeterminate={false} color="red"/>
                <Text style={styles.text}>Horizontal ProgressBar</Text>
            </View>
        )
    }
});
export default class ProgressLoading extends React.Component {
    render() {
        return ( <ProgressBarDemo/>)
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'space-between',
        padding:20
    },
    text:{
        fontSize:16
    }
});