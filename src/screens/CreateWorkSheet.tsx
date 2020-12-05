import React from "react";
import {
    SafeAreaView,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image,
    Alert,
    AsyncStorage,
    FlatList
} from "react-native";
import IWorkSheet from "../types/IWorkSheet";
import SaveWorkSheetModal from "../SaveWorkSheetModal";
import IQuiz from "../types/IQuiz";

export default class CreateWorkSheet extends React.Component<any, any>{
    state={
        data:[],
        showSaveModal:false
    }
    async save(text:string){
        //Alert.alert(text)
        this.setState({showSaveModal:false})
        let json=await  AsyncStorage.getItem('worksheets');
        let arr:IWorkSheet[]=[];
        if(json!="" && json!=null) {
            arr=JSON.parse(json);
        }
        let id=1;
        if(arr.length>0){
            id=arr[arr.length-1].id+1;
        }
        let date=new Date();
        let str=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        let quiz:IQuiz[]=this.state.data
        let newWorkSheet:IWorkSheet={id:id,name:text,date:str,quiz:quiz}
         arr.push(newWorkSheet)
        await AsyncStorage.setItem('worksheets',JSON.stringify(arr))
        this.props.navigation.goBack()
    }
    componentDidMount() {
        AsyncStorage.removeItem('quiz')
        this.props.navigation.addListener('focus',async ()=>{
            let json= await AsyncStorage.getItem('quiz');
            let arr=[];
            if(json!="" && json!=null) {
                arr=JSON.parse(json);
            }
            this.setState({data:arr})


        })
    }

    render() {
        return(
            <SafeAreaView style={{width:'100%',height:'100%',backgroundColor:'white',position:'relative'}}>
                <View style={{width:'100%',height:'100%',backgroundColor:'white'}}>
                    <View style={{flexDirection:'row',width:'100%',height:35}}>
                        <View style={{flex:0.2,justifyContent:"center"}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.backBtn}>
                                <Image style={{width:35,height:35}} source={require('../assets/previous.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.pageTitle}>
                            <Text style={styles.pageTitleText}>New Worksheet</Text>
                        </View>
                        <View style={{flex:0.2}}>

                        </View>
                    </View>
                    <View style={{marginTop:15}}>
                        <FlatList
                            contentContainerStyle={{padding:10}}
                            data={this.state.data}
                            renderItem={({item})=><View style={styles.listItem}>
                                <View style={styles.listItemInfoWrap}>
                                    <Text style={{fontSize:15,fontWeight:'600'}}>{item.name}</Text>
                                </View>
                                <View style={styles.listItemActionsWrap}>

                                    <TouchableOpacity style={styles.listItemActionTab}>
                                        <Image style={styles.listItemActionTabImg} source={require('../assets/edit.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.listItemActionTab}>
                                        <Image style={styles.listItemActionTabImg} source={require('../assets/remove.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>}
                        />
                    </View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Scanner')} style={styles.flatButton}>
                        <Image source={require('../assets/scan.png')} style={styles.flatButtonLabel}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.state.data.length==0} onPress={()=>this.setState({showSaveModal:true})} style={this.state.data.length>0?styles.scanBtn:styles.scanBtnUnActive}>
                        <Text style={styles.scanBtnText}>save</Text>
                    </TouchableOpacity>
                    <SaveWorkSheetModal show={this.state.showSaveModal} onClose={()=>this.setState({showSaveModal:false})} onSubmit={(text:string)=>this.save(text)}/>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    pageTitle:{
        backgroundColor:'#E0A125',flex:0.6,
        height:35,justifyContent:'center',
        alignItems:'center',alignSelf:'center',
        borderRadius:5,borderBottomColor:'black',borderBottomWidth:3,
        shadowColor:'black',shadowOpacity:0.5,shadowOffset:{width:0,height:0},shadowRadius:5
    },
    listItem:{
        width:'100%',marginTop:15,paddingBottom:10,paddingTop:10,backgroundColor:'white',
        shadowColor:'black',shadowOpacity:0.5,shadowOffset:{width:0,height:0},
        shadowRadius:5,paddingRight:10,paddingLeft:10,borderRadius:3
    },
    listItemInfoWrap:{
        flexDirection:'row',alignItems:'center',justifyContent:'center',height:30
    },
    listItemActionsWrap:{
        width:"70%",
        alignSelf:'center',
        flexDirection:'row',
        marginTop:5,
        borderTopColor:'#d2d2d2',borderTopWidth:1,paddingTop:5
    },
    listItemActionTab:{
        flex:0.5,height:30,justifyContent:"center",alignItems:'center'
    },
    listItemActionTabImg:{
        width:25,height:25
    },
    pageTitleText:{
        fontSize:16,fontWeight:'700'
    },
    flatButton:{
        justifyContent:"center",
        alignItems:'center',
        width:50,height:50,
        borderRadius:50,backgroundColor:'#E0A125',
        position:'absolute',bottom:40,right:15,
        shadowColor:'black',shadowOpacity:0.5,shadowOffset:{width:0,height:0},shadowRadius:5
    },
    flatButtonLabel:{
        width:25,height:25
    },
    backBtn:{
        backgroundColor:'black',width:35,height:35,borderRadius:35,marginLeft:15,
        shadowColor:'black',shadowOpacity:0.5,shadowOffset:{width:0,height:0},shadowRadius:5
    },
    scanBtnUnActive:{
        width:'70%',height:30,backgroundColor:'#dbdbd9',alignSelf:'center',borderRadius:5
        ,justifyContent:'center',alignItems:'center',
        position:'absolute',bottom:0
    },
    scanBtn:{
        width:'70%',height:30,backgroundColor:'#E0A125',alignSelf:'center',borderRadius:5
        ,justifyContent:'center',alignItems:'center',
        position:'absolute',bottom:0
    },
    scanBtnText:{
        fontSize:16,fontWeight:'500'
    },
});
