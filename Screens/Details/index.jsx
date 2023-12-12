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
          
      <TouchableOpacity onPress={()=>handleNavigate(item.hotel_id)} >
        <Image source={{uri:item.main_photo_url}} style={styles.image}/>
        <Text style={styles.word} >{item.hotel_name}</Text>
        <Text style={styles.word} >{item.min_total_price}</Text>
        <Text style={styles.word} >{item.review_score}</Text>
    </TouchableOpacity>


        )}
        keyExtractor={items => items.id}
        
        
        />

    </View>

  );
};

const styles = StyleSheet.create({

  word:{
    fontSize: 10,
  },
  image:{
    width: 100,
    height: 100,
  }
})
