import { View,Text,FlatList,Image, TouchableOpacity, ScrollView,Dimensions, Button } from "react-native";
import { StyleSheet } from "react-native";
import { useEffect,useState } from "react";
import { axiosInstance } from "../../services/axios";
import { useRoute } from "@react-navigation/native";
import Svg, { Path } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

export const Room = ({navigation}) => {
    const route = useRoute();
    const {hotel_id} = route.params;
    const [love, setLove] = useState(false);
    console.log(hotel_id);

    const [datas, setDatas] = useState([])
    const [photos, setPhotos] = useState()

    useEffect(() => {
        const fetchData = async() =>{
          const response = await axiosInstance.get("/properties/v2/get-rooms", {
            params: {
              rec_guest_qty:1,
              rec_room_qty:1,
              arrival_date: '2023-12-12',
              departure_date: '2023-12-14',
              hotel_id:hotel_id,
        
            },
          });
    
          setDatas(response?.data);
        
    
    
        }
        fetchData();
      }, [])

      let matchId= 0;
      {datas?.map(infoHotel => (
        matchId = infoHotel?.rooms[hotel_id + '01'] || infoHotel?.rooms[hotel_id + '02'] || infoHotel?.rooms[hotel_id + '03'] || infoHotel?.rooms[hotel_id + '04'] || infoHotel?.rooms[hotel_id + '05']
        // console.log(infoHotel?.rooms)

          
    ))}



    const handleLove = () => {
      setLove(prevLove => !prevLove); 



    };
  
    const renderLoveIcon = () => {
      if (love) {
        return <TouchableOpacity style={styles.loveRound} onPress={()=>handleLove()} >
        <Image source={require("../../assets/heart-fill.png")} style={styles.love} />
       </TouchableOpacity>;
      } else {
        return  <TouchableOpacity style={styles.loveRound} onPress={()=>handleLove()} >
        <Image source={require("../../assets/heart-empty.png")} style={styles.love} />
       </TouchableOpacity>;
      }
    };

   


  return (
    <>
    <ScrollView>
      


    <View> 
        {/* <View style={styles.icon}>
        

        <TouchableOpacity style={styles.arrowRound} onPress={() => navigation.goBack()} >
          <Image source={require("../../assets/left-arrow.png")} style={styles.arrow} />
        </TouchableOpacity>
  
        {renderLoveIcon()}
  
        </View> */}
       <FlatList
       data={matchId?.photos}
       renderItem={({item})=> (
        
        <Image  source={{uri:item.url_original}} style={styles.image}/>
        
        
       )}
       keyExtractor={item => item.id}
       horizontal
       />

        <View style={styles.icon}>
        

        <TouchableOpacity style={styles.arrowRound} onPress={() => navigation.goBack()} >
          <Image source={require("../../assets/left-arrow.png")} style={styles.arrow} />
        </TouchableOpacity>
  
        {renderLoveIcon()}
  
        </View>
        
       
        <View>

        </View>
        <View style={styles.textInCardContainer}>

            <View style={styles.roomInfo}>

              {matchId?.bed_configurations?.map(sizeBed => (
                sizeBed?.bed_types?.map(bedtype => (
                  <Text key={bedtype.id} style={styles.roomName}>{bedtype.description_imperial}</Text>
                ))
              ))}
                
            </View>
            <View style={styles.star}>

              <Text>⭐⭐⭐⭐⭐</Text>
            </View>

        </View>
            <View style={styles.roomDesc}>
                <Text style={styles.title}>Room Description</Text>
                <Text style={styles.textDesc}>{matchId?.description}</Text>
                

            <FlatList
              data={matchId?.photos}
              renderItem={({item})=> (
                <Image  source={{uri:item.url_original}} style={styles.imageDetail}/>
              )}
              keyExtractor={item => item.id}
              horizontal
            />
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.textInButton}>Book Now</Text>
            </TouchableOpacity>

     </View>
    </ScrollView>
    </>


   

  );
};

const styles = StyleSheet.create({
  image:{
      height:400,
      width:screenWidth,
      position:"relative",
  },
  title:{
      fontSize:30,
      fontWeight:600,
      color: "#353840",
      marginTop:50
  },
  textDesc:{
    fontSize:17,
    marginTop:10,
    
  },
  star:{
    position:"absolute",
    marginLeft:150
  },
  imageDetail:{
      width:130,
      height:130,
      marginVertical:20,
      borderRadius:20,
      marginRight:20,
  },

  textInCardContainer:{
    position: 'absolute',
    top: 290,

  },
  roomName:{
    color:'#FFFFFF',
    fontSize:25,
    fontWeight: 'bold',
    paddingBottom:15,
    
  },

  roomInfo:{
    flex: 1, 
    flexDirection: 'row',
    
  },
  roomDesc:{
    marginLeft:20
  },

  button:{
    width:358,
    height:55,
    backgroundColor:"#7C6A46",
    borderRadius:5,
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:25
  },

  textInButton:{
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:"auto",
    marginBottom:"auto",
    color:"#FFFFFF"

  },
  icon:{
    flex:1,
    flexDirection:"row",
    position:"relative",
    
    
  },
  arrow:{
    width:30,
    height:30,
   
  },
  love:{
    width:30,
    height:30,
    
  },

  arrowRound:{
    
    backgroundColor:'#FFFFFF',
    borderRadius:50,
    // position: 'absolute',
  },
  loveRound:{
    marginLeft:'auto',
    backgroundColor:'#FFFFFF',
    borderRadius:50,
    // position: 'absolute',
  }


})
