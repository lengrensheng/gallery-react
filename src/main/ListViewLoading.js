/**
 * Created by tiang on 2016/5/9.
 */
import React,{
    Component,
    Text,
    Image,
    ListView,
    View,
    TouchableHighlight,
    StyleSheet
}from 'react-native'

const netImage = {uri: 'http://facebook.github.io/react/img/logo_small_2x.png'};
var ListViewDemo = React.createClass({
    getInitialState:function(){
        var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        return{
            dataSource:ds.cloneWithRows(this._genRows({})),
        }
    },
    componentWillMount: function() {
        this._pressData = {};
    },
    _genRows:function(pressData:{[key:number]:boolean}):Array<String>{
      var dataBlob = [];
        for(var ii=0;ii<50;ii++){
            var pressedText = pressData[ii]?' (pressed)':'';
            dataBlob.push('Row '+ii+pressedText);
        }
        return dataBlob;
    },
    _renderSeparator:function(sectionID: number,rowID: number,adjacentRowHighlighted: bool){
        return(
            <View
                style={{
                    height:adjacentRowHighlighted?4:0.4,
                    backgroundColor:adjacentRowHighlighted?'#3B5998' : '#CCCCCC',
                }}
            />
        );
    },
    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                renderSeparator={this._renderSeparator}/>
        );
    },
    _renderRow:function(rowData:string,sectionID:number,rowID:number,
                        highlightRow: (sectionID: number, rowID: number) => void){
        var rowHash = Math.abs(hashCode(rowData));
        var imgSource = netImage;
        return(
            <TouchableHighlight
                onPress={()=>{
                    this._pressRow(rowID);
                    highlightRow(sectionID,rowID);
                    }}>
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={imgSource}/>
                        <View style={styles.row_text}>
                        <Text style={styles.text}>
                            {rowData+'-'+'rowID:'+rowID+"-sectionID:"+sectionID}
                        </Text>
                            <Text style={styles.text}>
                                {rowData}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    },
    _pressData:({}:{[key:number]:boolean}),
    _pressRow:function(rowID:number){
        this._pressData[rowID] = !this._pressData[rowID];
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this._genRows(this._pressData)),
        });
    },
});

var hashCode =function (str){
    var hash=15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
}
export default class ListViewLoading extends Component {
    render() {
        return (
            <ListViewDemo style={{flex:1,flexDirection:'row'}}/>
        );
    }
}
var styles = StyleSheet.create({
    row: {
        flex:1,
        height:68,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        padding:12,
        backgroundColor: '#F6F6F6',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    thumb: {
        width: 54,
        height: 54,
        alignItems:'center'
    },
    text: {
        fontSize:16
    },
    row_text:{
        flex:1,
        height:68,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        marginLeft:12
    }
});
