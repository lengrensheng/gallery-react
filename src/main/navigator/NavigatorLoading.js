/**
 * Created by  on 2016/5/11.
 */
import React,{
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    BackAndroid,
    Platform
}from 'react-native';
import FirstPageComponent from './FirstPageComponent';
export default class NavigatorLoading extends Component{
    componentDidMount() {
      if(Platform.OS==='android'){
          BackAndroid.addEventListener('hardwareBackPress',this.onBackPressed);
      }
    }
    componentWillUnMount() {
     if(Platform.OS==='android'){
         BackAndroid.removeEventListener('hardwareBackPress',this.onBackPressed);
     }
    }
    onBackPressed=()=>{
        const nav = this.navigator;
        const route = nav.getCurrentRoutes();
        if(route.length>1){
            nav.pop();
            return true;
        }
        return false;
    }
    render(){
        let defaultName= 'FirstPageComponent';
        let defaultComponent = FirstPageComponent;
        return(
            <Navigator
                ref={nav=>{this.navigator=nav;}}
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