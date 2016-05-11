/**
 * Created by tiang on 2016/5/9.
 */
import React,{
    Component,
    View,
    Text,
    DrawerLayoutAndroid
} from 'react-native'

export default class DrawerLayoutLoading extends Component{
    render(){
        var navigationView = (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Text style={{margin:10,fontSize:15,textAlign:'left'}}>
                    I am in the Drawer !
                </Text>
            </View>
        );
        return (
            <DrawerLayoutAndroid
                drawerWidth={200}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <View style={{flex: 1,alignItems: 'center',backgroundColor:'grey',width:200}}>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello World!</Text>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>需要配合NavigationView</Text>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}