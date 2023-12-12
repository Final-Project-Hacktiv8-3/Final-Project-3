import { View,Text,FlatList,Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect,useState } from "react";
import { axiosInstance } from "../../services/axios";
import { StyleSheet } from "react-native";

export const DetailPlace = ({navigation}) => {
  const route = useRoute();

  const { kota,kotaId } = route.params;
  const [datas, setDatas] = useState([])

  useEffect(() => {
    const fetchData = async() =>{
      const response = await axiosInstance.get("/properties/list", {
        params: {
          offset:0,
          arrival_date: '2023-12-12',
          departure_date: '2023-12-14',
          dest_ids:kotaId,
    
        },
      });

      setDatas(response?.data?.result);


    }
    fetchData();
  }, [])

  const handleNavigate = (hotel_id) =>{
    // console.log(hotel_id);
    navigation.navigate('Room',{
      hotel_id:hotel_id
    })
  }

  console.log(datas)
  

  return (
    <View>

      <FlatList
        data={datas}
        renderItem={({item})=>(
          
      <TouchableOpacity style={styles.background} onPress={()=>handleNavigate(item.hotel_id)} >
        <View style={styles.flexCol} >

          <Image source={{uri:item.main_photo_url}} style={styles.image}/>

        
          <View>

            <Text style={styles.hotelName}  >{item.hotel_name}</Text>
            <Text style={styles.word} >{item.address}</Text>
            <Text style={styles.word} >{item.min_total_price}</Text>
            <Text style={styles.word} >{item.review_score}({item.review_score_word || 'review belum ada'})</Text>
            <Text style={styles.word} >Rp.{item.price_breakdown.all_inclusive_price.toLocaleString('id-ID')}</Text>
          </View>
        </View>
       
    </TouchableOpacity>


        )}
        keyExtractor={items => items.id}
        
        
        />

    </View>

  );
};

const styles = StyleSheet.create({
  background:{
    marginLeft:"auto",
    marginRight:"auto",
    backgroundColor:"#FFFF",
    marginBottom:10,
    width:360,
    
  },
  flexCol:{
    flex: 1, 
    flexDirection: 'row',
  },
 
  hotelName:{
    fontSize: 20,
    flexWrap:"wrap",
    margin:10,
    width:'70%',
  },

  word:{
    fontSize: 15,
    marginHorizontal:10,
    width:'70%',
    paddingBottom:5
  },
  image:{
    width: 100,
    height: 150,
  }
})
