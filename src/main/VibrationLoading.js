/**
 * Created by tiang on 2016/5/24.
 */

import React,{Component} from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    Vibration,
    StyleSheet
}from 'react-native';

export default class VibrationLoading extends Component{
    render(){
        return(
          <TouchableHighlight
              style={styles.wrapper}
              onPress={()=>Vibration.vibrate(200)}>
              <View style={styles.button}>
                  <Text>Vibrate</Text>
              </View>
          </TouchableHighlight>
        );
    }
};
var styles = StyleSheet.create({
    wrapper: {
        borderRadius: 5,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#eeeeee',
        padding: 10,
    },
});