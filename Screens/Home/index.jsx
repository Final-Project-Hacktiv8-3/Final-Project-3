import { useEffect,useState } from "react";
import { StatusBar, Text, View,Image,TouchableOpacity,FlatList, ScrollView} from "react-native";
import { useSelector } from "react-redux";
import view from '../../assets/view.jpg'

import { StyleSheet } from "react-native";



export const Home = ({ navigation }) => {
  const getListHotel = useSelector((state) => state.hotel.location);
  const [locationTop, setLocation] = useState(
    [
      {
        id:1,
        kotaId:-2679652,
        name:"Jakarta",
        photo:require("../../assets/jakarta.jpg")
      },
      {
        id:2,
        kotaId:-2671578,
        name:"Bandung",
        photo:require("../../assets/bandung.jpg")
      },
      {
        id:3,
        kotaId:-2687472,
        name:"Medan",
        photo:require("../../assets/medan.jpg")
      },
      {
        id:4,
        kotaId:-2698521,
        name:"Surabaya",
        photo:require("../../assets/surabaya.jpg")
      },
    ]
    )

    const [locationPop, setLocationPop] = useState(
      [
        {
          id:1,
          kotaId:-2701757,
          name:"Bali",
          photo:require("../../assets/bali.jpg")
        },
        {
          id:2,
          kotaId:-2685677,
          name:"Lombok",
          photo:require("../../assets/lombok.jpg")
        },
        {
          id:3,
          kotaId:7435,
          name:"Raja Ampat",
          photo:require("../../assets/rajampat.jpg")
        },
        {
          id:4,
          kotaId:15519,
          name:"Wakatobi",
          photo:require("../../assets/wakatobi.jpg")
        },
      ]
      )


      const handleNavigate = (kotaId,kota)=>{
        
        console.log(kota)
        navigation.navigate('Details',{
          kota: kota,
          kotaId: kotaId,
        });
        
      }


  

  return (
    <ScrollView>


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
        data={locationTop}
        renderItem={({item})=>(
          <TouchableOpacity style={styles.cardContainer} onPress={()=>handleNavigate(item?.kotaId,item?.name)} >

            <Image source={item.photo} style={styles.cardImage}/>
            <View style={styles.textInCardContainer}>

            <Text style={styles.textInCard}   >{item.name}</Text>
            </View>
          </TouchableOpacity>


        )}
        keyExtractor={items => items.id}
        horizontal
        
        />
      </View>
      <View>
        <Text style={styles.title}  >POPULAR DESTINATIONS</Text>
        <FlatList
        data={locationPop}
        renderItem={({item})=>(
          <TouchableOpacity style={styles.cardContainer} onPress={()=>handleNavigate(item?.kotaId,item?.name)}  >

            <Image source={item.photo} style={styles.cardImage}/>
            <View style={styles.textInCardContainer}>

            <Text style={styles.textInCard}   >{item.name}</Text>
            </View>
          </TouchableOpacity>


        )}
        keyExtractor={items => items.id }
        horizontal
        
        />
      </View>
    </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  imgContainer:{
    position:"relative",
    display:"inline-block",
    marginTop:50
  },
  image:{
    width:350,
    height:150,
    marginLeft:"auto",
    marginRight:"auto",
    borderRadius:5,
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
    borderRadius:20,
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:10
    
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
    fontSize:18,
    marginLeft:"auto",
    marginRight:"auto",
  },
  textInImageChild:{
    color:"#FFFFFF",
    fontWeight:"bold",
    fontSize:18,
  },
  title:{
    color:"#8C7D5D",
    fontSize:20,
    fontWeight:"600",
    marginVertical:5,
    marginLeft:20,
    
  },
  cardImage:{
    height:300,
    width:140,
    borderRadius:5,
  },
  textInCardContainer:{
    position: "absolute",
    top:275,
    left: 10,

  },
  textInCard:{
    color:"#FFFFFF",
    fontWeight:"bold",
  },
  cardContainer:{
    marginLeft:20,
    
  }


})