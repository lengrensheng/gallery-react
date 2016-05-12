/**
 * Created by  on 2016/5/12.
 */
import React,{
    Text,
    View,
    RefreshControl,
    ScrollView,
    StyleSheet,
    TouchableOpacity
}from 'react-native'

const styles = StyleSheet.create({
    row: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 20,
        backgroundColor: '#3a5795',
        margin: 5
    },
    text: {
        alignSelf: 'center',
        color: '#fff'
    },
    scrollView: {
        flex: 1
    }
});

const Row = React.createClass({
    _onClick(){
        this.props.onClick(this.props.data);
    },
    render(){
        return (
            <TouchableOpacity onPress={this._onClick}>
                <View style={styles.row}>
                    <Text style={styles.text}>
                        {this.props.data.text + '(' +
                        this.props.data.clicks + ' clicks)'}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
});

const RefreshControlDemo = React.createClass({
    getInitialState(){
        return {
            isRefreshing: false,
            loaded: 0,
            rowData: Array.from(new Array(5)).map(
                (val, i)=>({text: 'Initial row ' + i, clicks: 0})
            )
        }
    },
    _onClick(row){
        row.clicks++;
        this.setState({
            rowData: this.state.rowData,
        })
    },
    render(){
        const rows = this.state.rowData.map((row, ii)=> {
            return <Row key={ii} data={row}
                        onClick={this._onClick}/>
        });
        return (
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing ={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                        enable={true}
                        color={['#ff7575']}
                        progressBackgroundColor="#009999"/>
                }>
                {rows}
            </ScrollView>
        );
    },
    _onRefresh(){
        this.setState({isRefreshing: true});
        setTimeout(()=> {
            const rowData = Array.from(this.state.rowData)
                .concat(Array.from(new Array(5))
                    .map((vai, i)=>({
                        text: 'loaded Row ' + (+this.state.loaded + i),
                        clicks: 0,
                    })));
            this.setState({
                loaded: this.state.loaded + 5,
                isRefreshing: false,
                rowData: rowData,
            });
        }, 3000);
    }
});

export default class RefreshControlLoading extends React.Component {
    render() {
        return (
            <RefreshControlDemo/>
        );
    }
}