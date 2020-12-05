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
    Animated,
    Easing, Dimensions
} from "react-native";
import { RNCamera, FaceDetector } from 'react-native-camera';
import DetectedQuizModal from "../DetectedQuizModal";
let height=Dimensions.get('window').height;
export default class Scanner extends React.Component<any, any>{
    state={
        animation: new Animated.Value(0),
        showModal:false,
    }

    componentDidMount() {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.animation, {
                    toValue: 1,
                    duration: 4000,
                    easing: Easing.linear,
                    useNativeDriver:true
                }),
                Animated.timing(this.state.animation, {
                    toValue: 0,
                    duration: 4000,
                    easing: Easing.linear,
                    useNativeDriver:true
                })
            ]),
        ).start()
    }

    async addQuiz(){
        this.setState({showModal:false})
       let json= await AsyncStorage.getItem('quiz');
       let arr=[];
       if(json!="" && json!=null){
           arr=JSON.parse(json);
       }
       let len=arr.length+1;
       arr.push({
           name:"quiz"+len
       })
        await AsyncStorage.setItem('quiz',JSON.stringify(arr));
        this.props.navigation.goBack()
    }
    render() {
        return(
            <View style={{width:'100%',height:'100%',backgroundColor:'white',position:'relative'}}>
                <RNCamera style={{width:'100%',height:'100%'}}
                          type={RNCamera.Constants.Type.back}
                          flashMode={RNCamera.Constants.FlashMode.on}

                >
                   <SafeAreaView style={{width:'100%',height:'100%'}}>
                       <View style={{flexDirection:'row',width:'100%',height:35}}>
                           <View style={{flex:0.2,justifyContent:"center"}}>
                               <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.backBtn}>
                                   <Image style={{width:35,height:35}} source={require('../assets/previous.png')}/>
                               </TouchableOpacity>
                           </View>

                           <View style={{flex:0.2}}>

                           </View>
                       </View>
                       <View style={{width:'90%',marginTop:15,alignSelf:'center',height:'85%',borderWidth:1,borderColor:'white',borderRadius:5}}>
                           <Animated.View style={[styles.scanLine,{transform:[{translateY:this.state.animation.interpolate({
                                       inputRange: [0, 1],
                                       outputRange: [20, height-220]
                                   })}]}]}>

                           </Animated.View>
                       </View>
                       <TouchableOpacity onPress={()=>this.setState({showModal:true
                       })} style={styles.scanBtn}>
                           <Text style={styles.scanBtnText}>scan</Text>
                       </TouchableOpacity>
                       <DetectedQuizModal show={this.state.showModal} onClose={()=>this.setState({showModal:false})} onSubmit={()=>this.addQuiz()}></DetectedQuizModal>
                   </SafeAreaView>

                </RNCamera>
            </View>
        );
    }
}
const styles = StyleSheet.create({

    scanLine:{
        width:'95%',alignSelf:'center',
        backgroundColor:'#b74f4f'
        ,borderRadius:3,height:3,
        shadowColor:'red',shadowOpacity:0.8,shadowOffset:{width:0,height:0},shadowRadius:7,
    },
    scanBtn:{
        width:'70%',height:30,backgroundColor:'#E0A125',alignSelf:'center',borderRadius:5
        ,justifyContent:'center',alignItems:'center',
        position:'absolute',bottom:40
    },
    scanBtnText:{
      fontSize:16,fontWeight:'500'
    },
    backBtn:{
        backgroundColor:'black',width:35,height:35,borderRadius:35,marginLeft:15,
        shadowColor:'black',shadowOpacity:0.5,shadowOffset:{width:0,height:0},shadowRadius:5
    }
});
