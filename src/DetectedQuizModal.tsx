
import React from "react";
import {Modal, TouchableOpacity, View, Text, TextInput, ImageBackground, Image, Dimensions} from "react-native";

interface IProps{
    show:boolean;
    onClose:Function;
    onSubmit:Function;
}
const height=Dimensions.get('window').height;
export default class DetectedQuizModal extends React.Component<IProps>{
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {

    }

    state={

    }
    render() {
        return(
            <Modal transparent={true} visible={this.props.show}>
                <View style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.6)'}}>
                    <View style={{width:'90%',backgroundColor:'white',padding:10}}>
                        <TouchableOpacity onPress={()=>this.props.onClose()}>
                            <Text style={{fontSize:20,fontWeight:'600'}}>X</Text>
                        </TouchableOpacity>
                        <Text style={{marginTop:30,fontSize:16,fontWeight:'600'}}>Fill using words bank quiz detected </Text>
                        <Image resizeMode={"contain"} source={require('./assets/quizImg.jpeg')} style={{width:'100%',height:height*0.5}}>

                        </Image>
                        <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                            <TouchableOpacity  onPress={()=>this.props.onSubmit()} style={{flex:0.47,height:30,justifyContent:'center',alignItems:'center',borderRadius:5,backgroundColor:'#E0A125',marginTop:15}}>
                                <Text style={{color:'#000',fontWeight:'600'}}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=>this.props.onClose()} style={{flex:0.47,height:30,justifyContent:'center',alignItems:'center',borderRadius:5,backgroundColor:'#E0A125',marginTop:15}}>
                                <Text style={{color:'#000',fontWeight:'600'}}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}
