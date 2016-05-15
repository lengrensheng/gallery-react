/**
 * Created by tiang on 2016/5/15.
 */
import React,{
    Text,
    View,
    TextInput,
    StyleSheet
}from 'react-native';
var TextInputExample = React.createClass({
    getInitialState(){
      return{
          curText:'<No Event>',
          preText:'<No Event>',
          prev2Text:'<No Event>'
      }
    },
    updateText(text){
      this.setState({
          curText:text,
          preText:this.state.curText,
          prev2Text:this.state.preText,
      })
    },

    render(){
        return(
            <View>
                <TextInput
                    autoCapitalize="none"
                    placeholder="Enter text to see events"
                    placeholderTextColor='#ff0000'
                    selectionColor="#0000ff"
                    autoCorrect={false}
                    onFoucs={()=>this.updateText('onFocus')}
                    onBlur={()=>this.updateText('onBlur')}
                    onChange={(event)=>this.updateText(
                        'onChange text:'+event.nativeEvent.text
                    )}
                    onEndEditing={(event)=>this.updateText(
                        'onEndEditing text:'+event.nativeEvent.text
                    )}
                    keyboardType='email-address'
                    maxLength={22}
                    defaultValue="最大限制长度22"
                    style={styles.singleLine}/>
                    <Text>
                        {this.state.curText}{'\n'}
                        (pre:{this.state.preText}){'\n'}
                        (prev2:{this.state.prev2Text}){'\n'}
                    </Text>
            </View>
        );
    }
});

export default class TextInputLoading extends React.Component{
    render(){
        return(
            <TextInputExample/>
        );
    }
}

var styles = StyleSheet.create({
    singleLine: {
        fontSize: 16,
        padding: 4,
    },
});