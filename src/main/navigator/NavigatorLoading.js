/**
 * Created by  on 2016/5/11.
 */
import React,{
    Component,
    StyleSheet,
    Text,
    View,
    Navigator
}from 'react-native';
import FirstPageComponent from './FirstPageComponent';
export default class NavigatorLoading extends Component{
    render(){
        let defaultName= 'FirstPageComponent';
        let defaultComponent = FirstPageComponent;
        return(
            <Navigator

                initialRoute={{name:defaultName,component:defaultComponent}}
                configureScene={(router)=>{
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route,navigator)=>{
                    let Component = route.component;
                    return <Component{...route.params} navigator={navigator}/>
                }}/>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center"
    }
});