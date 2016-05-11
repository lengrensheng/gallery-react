/**
 * Created by tiang on 2016/5/11.
 */
/**
 * Modal可以将RN写的部分覆盖在原生视图上显示
 * 如果根视图就开始使用RN则应该Navigator代替Modal
 *
 */

import React,{
    Component,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    Switch,
    Modal
} from 'react-native'

var Button = React.createClass({
    getInitialState(){
        return {
            active: false,
        };
    },
    _onHighlight(){
        this.setState({active: true});
    },
    _onUnHighlight(){
        this.setState({active: false});
    },
    render(){
        var colorStyle = {
            color: this.state.active ? '#fff' : '#000',
        };
        return (
            <TouchableHighlight
                onHideUnderlay={this._onUnHighlight}
                onPress={this.props.onPress}
                onShowUnderlay={this._onHighlight}
                style={[styles.button]}
                underlayColor='#a9d9d4'>
                <Text style={[styles.buttonText,colorStyle]}>{this.props.children}</Text>
            </TouchableHighlight>
        );
    }
});

var ModalDemo = React.createClass({
    getInitialState(){
        return {
            animated: true,
            modalVisible: false,
            transparent: false,
        };
    },
    _setModalVisible(visible){
        this.setState({
            modalVisible: visible,
        })
    },
    _toggleAnimated(){
        this.setState({animated: !this.state.animated});
    },
    _toggleTransparent(){
        this.setState({transparent: !this.state.transparent})
    },
    render(){
        var modalBackground = {
            backgroundColor: this.state.transparent ? 'rgba(0,0,0,0.5)' : '#f5fcff',
        };
        var innerContainerTransparentStyle = this.state.transparent ? {
            backgroundColor: '#fff', padding: 20
        } : null;
        return (
            <View>
                <Modal
                    animated={this.state.animated}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={()=>{this._setModalVisible(false)}}>
                    <View style={[styles.container,modalBackground]}>
                        <View style={[styles.innerContainer,innerContainerTransparentStyle]}>
                            <Text>this modal was presented {this.state.animated ? 'with' : 'without'} animation.</Text>
                            <Button onPress={this._setModalVisible.bind(this,false)}
                                    style={styles.modalButton}>Close</Button>
                        </View>
                    </View>
                </Modal>

                <View style={styles.row}>
                    <Text style={styles.rowTitle}>Animated</Text>
                    <Switch value={this.state.animated} onValueChange={this._toggleAnimated}/>
                </View>

                <View style={styles.row}>
                    <Text style={styles.rowTitle}>Transparent</Text>
                    <Switch value={this.state.transparent} onValueChange={this._toggleTransparent}/>
                </View>
                <Button onPress={this._setModalVisible.bind(this,true)}>
                    Present
                </Button>
            </View>
        );
    }
});
export default class ModalLoading extends Component {
    render() {
        return (
           <ModalDemo/>
        )
    }
};
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    rowTitle: {
        flex: 1,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
    modalButton: {
        marginTop: 10,
    },
});
