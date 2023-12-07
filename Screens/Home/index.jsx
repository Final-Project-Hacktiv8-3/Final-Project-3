import { useEffect,useState } from "react";
import { StatusBar, Text, View,Image,TouchableOpacity,FlatList} from "react-native";
import { useSelector } from "react-redux";
import view from '../../assets/view.jpg'

import { StyleSheet } from "react-native";

export const Home = () => {
  const getListHotel = useSelector((state) => state.hotel.location);
  const [location, setLocation] = useState(
    [
      {
        kotaId:-2679652,
        name:"Jakarta",
        photo:require("../../assets/jakarta.jpg")
      },
      {
        kotaId:-2671578,
        name:"Bandung",
        photo:require("../../assets/bandung.jpg")
      },
      {
        kotaId:-2687472,
        name:"Medan",
        photo:require("../../assets/medan.jpg")
      },
      {
        kotaId:-2698521,
        name:"Surabaya",
        photo:require("../../assets/surabaya.jpg")
      },
    ]
    )

  

  return (
    <View >
      <View style={styles.imgContainer} >
        <Image  source={require("../../assets/view.jpg")} style={styles.image}/>
        <View style={styles.imageText}  >

          <Text style={styles.textInImageHead}  >A Hotel for every</Text>
          <Text style={styles.textInImageChild}  >moment rich in emotion.</Text>
          <TouchableOpacity style={styles.buttonInImage} >
            
            <Text style={styles.textInButton} >Book now</Text> 
            
            </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.title}  >TOP DESTINATIONS</Text>
        <FlatList
        data={location}
        renderItem={({item})=>(
          <TouchableOpacity style={styles.cardContainer}  >

            <Image source={item.photo} style={styles.cardImage}/>
            <View style={styles.textInCardContainer}>

            <Text style={styles.textInCard}   >{item.name}</Text>
            </View>
          </TouchableOpacity>


        )}
        keyExtractor={items => items}
        horizontal
        
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  imgContainer:{
    position:"relative",
    display:"inline-block"
  },
  image:{
    width:350,
    height:150,
    marginLeft:"auto",
    marginRight:"auto",
    borderRadius:"5px",
  },
  imageText:{
    position: "absolute",
    top: 20,
    left: 90,

    padding: 10, /* Atur padding teks */
    borderRadius: 5, /* Bulatkan sudut teks jika diinginkan */
  },
  buttonInImage: {
    backgroundColor:"#FFFFFF",
    width:90,
    height:30,
    borderRadius:"20px",
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:"10px"
    
  },
  textInButton:{
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:"auto",
    marginBottom:"auto",
    color:"#7C6A46",
    fontWeight:"600",
  },
  textInImageHead:{
    color:"#FFFFFF",
    fontWeight:"bold",
    fontSize:"18px",
    marginLeft:"auto",
    marginRight:"auto",
  },
  textInImageChild:{
    color:"#FFFFFF",
    fontWeight:"bold",
    fontSize:"18px",
  },
  title:{
    color:"#8C7D5D",
    fontSize:"20px",
    fontWeight:"600",
    marginVertical:"5px",
    marginLeft:"15px",
  },
  cardImage:{
    height:"300px",
    width:"140px",
    objectFit:"contain",
    borderRadius:"5px",
  },
  textInCardContainer:{
    position: "absolute",
    top:275,
    left: 10,

  },
  textInCard:{
    color:"#FFFFFF"
  },
  cardContainer:{
    marginLeft:20,
    
  }


})