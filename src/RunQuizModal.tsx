
import React from "react";
import {
    Modal,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    ImageBackground,
    Image,
    Dimensions,
    Clipboard
} from "react-native";

interface IProps{
    show:boolean;
    onClose:Function;

}
const height=Dimensions.get('window').height;
export default class RunQuizModal extends React.Component<IProps>{
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {

    }

    state={
        copied:false,
    }

    copyLink(url:string){
        Clipboard.setString(url);
        this.setState({copied:true})
        setTimeout(()=>{
            this.setState({copied:false})
            this.props.onClose();
        },2000)
    }
    render() {
        return(
            <Modal transparent={true} visible={this.props.show}>
                <View style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.6)'}}>
                    <View style={{width:'90%',backgroundColor:'white',padding:10}}>
                        <TouchableOpacity onPress={()=>this.props.onClose()}>
                            <Text style={{fontSize:20,fontWeight:'600'}}>X</Text>
                        </TouchableOpacity>
                        {
                            this.state.copied&&<Text style={{textAlign:'center',fontSize:16,fontWeight:'600',color:'#000'}}> Link was copied to clipboard</Text>

                        }
                        <TouchableOpacity onPress={()=>this.copyLink('https://hackthon.boost-tech.app/index.html?isExam=true')}  style={{width:'100%',height:35,justifyContent:'center',alignItems:'center',borderRadius:5,backgroundColor:'#E0A125',marginTop:15}}>
                            <Text style={{color:'#000',fontWeight:'600'}}>Run as exam</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.copyLink('https://hackthon.boost-tech.app/index.html?isExam=false')}  style={{width:'100%',height:35,marginBottom:10,justifyContent:'center',alignItems:'center',borderRadius:5,backgroundColor:'#E0A125',marginTop:15}}>
                            <Text style={{color:'#000',fontWeight:'600'}}>Run as self-exercise</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}
