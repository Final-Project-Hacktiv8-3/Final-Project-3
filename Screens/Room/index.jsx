import { View,Text,FlatList,Image, TouchableOpacity, ScrollView,Dimensions, Button } from "react-native";
import { StyleSheet } from "react-native";
import { useEffect,useState } from "react";
import { axiosInstance } from "../../services/axios";
import { useRoute } from "@react-navigation/native";

const screenWidth = Dimensions.get('window').width;

export const Room = () => {
    const route = useRoute();
    const {hotel_id} = route.params;
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



    console.log(matchId)


  return (
    <>
    <ScrollView>


    <View> 
       <FlatList
       data={matchId?.photos}
       renderItem={({item})=> (
        <Image  source={{uri:item.url_original}} style={styles.image}/>
       )}
       keyExtractor={item => item.id}
       horizontal
       />

       
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
      width:screenWidth
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
      margin:20,
      borderRadius:20,
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

  }
})
