import { View,Text,FlatList,Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect,useState } from "react";
import { axiosInstance } from "../../services/axios";
import { StyleSheet } from "react-native";
import StarRating from "Components/molecules/Rating";


const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); 
const day = String(today.getDate()).padStart(2, '0')

const twoDaysLater = new Date(today);
twoDaysLater.setDate(today.getDate() + 2);

const year2D = twoDaysLater.getFullYear();
const month2D = String(twoDaysLater.getMonth() + 1).padStart(2, '0');
const day2D = String(twoDaysLater.getDate()).padStart(2, '0');


export const DetailPlace = ({navigation}) => {
  const route = useRoute();

  const { kota,kotaId } = route.params;
  const [datas, setDatas] = useState([])

  useEffect(() => {
    const fetchData = async() =>{
      const response = await axiosInstance.get("/properties/list", {
        params: {
          offset:0,
          arrival_date: `${year}-${month}-${day}`,
          departure_date: `${year2D}-${month2D}-${day2D}`,
          dest_ids:kotaId,
    
        },
      });

      setDatas(response?.data?.result);


    }
    fetchData();
  }, [])

  const handleNavigate = (hotel_id,star) =>{
    // console.log(hotel_id);
    navigation.navigate('Room',{
      hotel_id:hotel_id,
      star:star,
    })
  }

  console.log(datas)
  

  return (
    <View>

      <FlatList
        data={datas}
        renderItem={({item})=>(
          
      <TouchableOpacity style={styles.background} onPress={()=>handleNavigate(item.hotel_id,item.review_score)}  >
        <View style={styles.flexCol} >

          <Image source={{uri:item.main_photo_url}} style={styles.image}/>

        
          <View>

            <Text style={styles.hotelName}  >{item.hotel_name}</Text>
            <Text style={styles.word} >{item.address}</Text>
            <Text style={styles.word} >{item.min_total_price}</Text>
            <View style={styles.star} >
              <StarRating rating={item.review_score}   /> 

            </View>
            <Text style={styles.word} >({item.review_score_word || 'review belum ada'})</Text>
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
  star:{
    marginLeft:10
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
    width:'60%',
    paddingBottom:5
  },
  image:{
    width: 100,
    height: 150,
  }
})
