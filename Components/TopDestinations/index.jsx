import React from 'react'
import { View,TouchableOpacity,Image } from 'react-native'

export default function TopDestinations({photo,kotaId}) {
    console.log(photo)
  return (
    <View>
        <TouchableOpacity>
            <Image source={photo}/>

        </TouchableOpacity>
    </View>
  )
}
