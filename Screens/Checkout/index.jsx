import { useRoute } from '@react-navigation/native'
import React from 'react'
import { useSelector } from 'react-redux'
import { Text, TextInput, View,StyleSheet } from 'react-native'
import { formattedPrice } from 'utils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { addHistory } from 'redux/history/history'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

export const Checkout = ({navigation}) => {
    const route = useRoute();
    const {prices,image,title,rating} = route.params;
    const dispatch = useDispatch();
    
    const { fullName, email} = useSelector(
        (state) => state.auth
      );

      const handlePay = ()=>{
        dispatch(
            addHistory({
              image: image,
              title: title,
              price: prices,
              rating: rating,
            })
          );
          navigation.navigate('Home')
         
      }
    
    return(
        <View>
            <View>
                <Text style={styles.title}>CONTACT INFORMATION</Text>
                <TextInput style={styles.input} value={fullName}></TextInput>
                <TextInput style={styles.input} value={email}></TextInput>
            </View>
                <Text style={styles.title}>PRICE SUMMARY</Text>
            <View style={styles.priceSect} >
                <View style={styles.inTab}>
                    <Text >Total:</Text>
                    <Text  style={styles.price}>Rp.{formattedPrice( prices)}</Text>
                    
                </View>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', width: '100%', alignSelf: 'center' }} />
                <View style={styles.inTab}>
                    <Text >Payable Now:</Text>
                    <Text  style={styles.price}>Rp.{formattedPrice( prices)}</Text>
                    
                </View>
                
            </View>

            <TouchableOpacity style={styles.button} onPress={()=>handlePay()} >
              <Text style={styles.textInButton}>
                Pay
              </Text>
            </TouchableOpacity>


        </View>
        
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      padding: 10,
      backgroundColor:'#FFFFFF',
      borderRadius:5
    },
    title:{
        color:'#7C6A46',
        fontSize:20,
        fontWeight:'bold',
        margin:15,
    },
    priceSect:{
        backgroundColor:'#FFFFFF',
        width:350,
        height:100,
        margin: 12,
        borderRadius:10,
    },
    price:{
        marginLeft:'auto',
        fontWeight:"600",
    },
    inTab:{
        flexDirection:'row',
        marginTop:20,
        margin:15,
        
    },
    button: {
        width: 358,
        height: 55,
        backgroundColor: "#7C6A46",
        borderRadius: 5,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 25,
      },
    
      textInButton: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        color: "#FFFFFF",
      },
  });