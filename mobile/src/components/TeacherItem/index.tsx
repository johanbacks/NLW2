import React, { useState } from 'react'; 
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage  from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles'

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}
interface TeacherItemProps {
  teacher : Teacher;
  favorited: boolean;
}


const TeacherItem: React.FC<TeacherItemProps> = ({teacher, favorited}) => {
  const [isFavorited , setIsFavorite ] = useState(favorited)

  async function handleToggleFavorite() {
    if (isFavorited) {

    } else {
      const favorites = await AsyncStorage.getItem('favorites')

     let favoritesArray = [];
     if (favorites) {

      favoritesArray = JSON.parse(favorites)
     }

     favoritesArray.push(teacher);
     setIsFavorite(true)
     await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
        style={styles.avatar}
        source={{uri: teacher.avatar }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>
            {teacher.name}
          </Text>
          <Text style={styles.subject}>
            {teacher.subject}
          </Text>
        </View>
      </View>
      <Text style={styles.bio}> 
        {teacher.bio}
      </Text>
      <View style={styles.footer}> 
        <Text style={styles.price}>
          Preço/Hora {'   '}
  <Text style={styles.priceValue}>R${teacher.cost}</Text>
        </Text>
        <View style={styles.buttonsContainer}> 
          <RectButton style={[styles.favoriteButton, styles.favorited]}>
            {/*<Image source={heartOutlineIcon} />*/}
           <Image source={unfavoriteIcon} />
          </RectButton>

          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon}  />
            <Text style={styles.contactButtonText}> Entrar em Contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;