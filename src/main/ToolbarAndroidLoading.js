/**
 * Created by tiang on 2016/5/15.
 */
import React,{
    Text,
    View,
    Image,
    ToolbarAndroid,
    StyleSheet
}from 'react-native';

var toolbarActions = [
    {title: 'Create', icon: require('image!ic_create_black_48dp'), show: 'always'},
    {title: 'Filter'},
    {title: 'Settings', icon: require('image!ic_settings_black_48dp'), show: 'always'},
]
var ToolbarExample = React.createClass({
    getInitialState(){
        return {
            actionText: 'Example app with toolbar component',
            colorProps: {
                titleColor: '#3b5995',
                subtitleColor: '#6a7180'
            }
        }
    },
    _onActionSelected(position){
        this.setState({
            actionText: 'Selected:' + toolbarActions[position].title,
        });
    },
    render(){
        return (
            <View>
                <ToolbarAndroid
                    actions={toolbarActions}
                    navIcon={require('image!ic_menu_black_24dp')}
                    onActionSelected={this._onActionSelected}
                    onIconClicked={()=>{
                        this.setState({
                            actionText:'icon clicked',
                        });
                    }}
                    style={styles.toolbar}
                    subtitle={this.state.actionText}
                    title="ToolbarAndroid"/>
                <Text>{this.state.actionText}</Text>
            </View>
        )
    }
});
export default class ToolbarAndroidLoading extends ToolbarAndroid {
    render() {
        return (
            <ToolbarExample/>
        );
    }
}

var styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#e9eaed',
        height: 56,
    },
});
