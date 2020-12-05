import React from "react";
import {SafeAreaView, TouchableOpacity, View, Text, StyleSheet, FlatList, Image, AsyncStorage} from "react-native";
import IWorkSheet from "../types/IWorkSheet";
import RunQuizModal from "../RunQuizModal";
interface IState{
    data:IWorkSheet[],
    showModal:boolean;
}
export default class Home extends React.Component<any, any>{
    state:IState={
        data:[],
        showModal:false
    }
    componentDidMount() {
        this.fetch();
        this.props.navigation.addListener('focus',async ()=>{

            this.fetch();
        })
    }
    async fetch(){
        let json=await  AsyncStorage.getItem('worksheets');
        let arr:IWorkSheet[]=[];
        if(json!="" && json!=null) {
            arr=JSON.parse(json);
        }
        this.setState({data:arr})
    }
    async removeItem(id:number){
        let data=this.state.data;
        data=data.filter(d=>d.id!=id);
        this.setState({data:data})
        await AsyncStorage.setItem('worksheets',JSON.stringify(data))
    }
    render() {

        return(
            <SafeAreaView style={{width:'100%',height:'100%',backgroundColor:'white',position:'relative'}}>
                <View style={{width:'100%',height:'100%',backgroundColor:'white'}}>
                    <View style={styles.pageTitle}>
                        <Text style={styles.pageTitleText}>My work sheets</Text>
                    </View>
                    <View style={{marginTop:15}}>
                        <FlatList
                            contentContainerStyle={{padding:10}}
                            data={this.state.data}
                            renderItem={({item})=><View style={styles.listItem}>
                                <View style={styles.listItemInfoWrap}>
                                    <Text style={{fontSize:15,fontWeight:'600'}}>{item.name}</Text>
                                    <Text style={{fontSize:15,fontWeight:'500'}}>{item.date}</Text>
                                </View>
                                <View style={styles.listItemActionsWrap}>
                                    <TouchableOpacity onPress={()=>this.setState({showModal:true})} style={styles.listItemActionTab}>
                                        <Image style={styles.listItemActionTabImg} source={require('../assets/play.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.listItemActionTab}>
                                        <Image style={styles.listItemActionTabImg} source={require('../assets/edit.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.removeItem(item.id)} style={styles.listItemActionTab}>
                                        <Image style={styles.listItemActionTabImg} source={require('../assets/remove.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>}
                        />
                    </View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreateWorkSheet')} style={styles.flatButton}>
                        <Text style={styles.flatButtonLabel}>+</Text>
                    </TouchableOpacity>
                    <RunQuizModal show={this.state.showModal} onClose={()=>this.setState({showModal:false})}></RunQuizModal>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    listItem:{
        width:'100%',marginTop:15,paddingBottom:10,paddingTop:10,backgroundColor:'white',
        shadowColor:'black',shadowOpacity:0.5,shadowOffset:{width:0,height:0},
        shadowRadius:5,paddingRight:10,paddingLeft:10,borderRadius:3
    },
    listItemInfoWrap:{
        flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:30
    },
    listItemActionsWrap:{
        width:"90%",
        alignSelf:'center',
        flexDirection:'row',
        marginTop:5,
        borderTopColor:'#d2d2d2',borderTopWidth:1,paddingTop:5
    },
    listItemActionTab:{
        flex:0.3333,height:30,justifyContent:"center",alignItems:'center'
    },
    listItemActionTabImg:{
        width:25,height:25
    },
    pageTitle:{
        backgroundColor:'#E0A125',
        height:35,justifyContent:'center',
        alignItems:'center',width:'60%',alignSelf:'center',
        borderRadius:5,borderBottomColor:'black',borderBottomWidth:3,
        shadowColor:'black',shadowOpacity:0.5,shadowOffset:{width:0,height:0},shadowRadius:5
    },
    pageTitleText:{
        fontSize:16,fontWeight:'700'
    },
    flatButton:{
        justifyContent:"center",
        alignItems:'center',
        width:50,height:50,
        borderRadius:50,backgroundColor:'#E0A125',
        position:'absolute',bottom:30,right:15,
        shadowColor:'black',shadowOpacity:0.5,shadowOffset:{width:0,height:0},shadowRadius:5
    },
    flatButtonLabel:{
        fontSize:33,marginBottom:3,fontWeight:'500'
    }
});
