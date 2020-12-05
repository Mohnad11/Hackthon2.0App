import React from "react";
import {Modal, TouchableOpacity, View, Text, TextInput} from "react-native";

interface IProps{
    show:boolean;
    onClose:Function;
    onSubmit:Function;
}
export default class SaveWorkSheetModal extends React.Component<IProps>{
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {
        if(prevProps.show!=this.props.show && this.props.show){
            this.setState({text:''})
        }
    }

    state={
        text:'',
    }
    render() {
        return(
            <Modal transparent={true} visible={this.props.show}>
                <View style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.6)'}}>
                    <View style={{width:'70%',backgroundColor:'white',padding:10}}>
                        <TouchableOpacity onPress={()=>this.props.onClose()}>
                            <Text style={{fontSize:20,fontWeight:'600'}}>X</Text>
                        </TouchableOpacity>
                        <TextInput onChangeText={text => this.setState({text:text})} placeholder={'enter worksheet name'} placeholderTextColor={'#949494'}  style={{width:'100%',marginTop:15,color:'#000',height:35,borderBottomWidth:2,borderBottomColor:'#E0A125',textAlign:'center'}}></TextInput>

                        <TouchableOpacity disabled={this.state.text==''} onPress={()=>this.props.onSubmit(this.state.text)} style={{width:'100%',height:30,justifyContent:'center',alignItems:'center',borderRadius:5,backgroundColor:this.state.text!=''?'#E0A125':'#dbdbd9',marginTop:15}}>
                            <Text style={{color:'#000',fontWeight:'600'}}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}
