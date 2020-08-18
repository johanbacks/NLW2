import React, { useState } from 'react';
import { View , ScrollView,Text ,TextInput} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import { Feather } from '@expo/vector-icons';
import AsyncStorage  from '@react-native-community/async-storage';
import PageHeader from '../../components/PageHeader';
import TeacherItem,{Teacher} from '../../components/TeacherItem';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';



function TeacherList() {
  const [teachers , setTeachers ] = useState([]);
  const [favorites , setFavarites] = useState<number[]>([]);
  const [isFiltersVisible , setFilterVisible] = useState(false);

  const [ subject , setSubject ] = useState('');
  const [ week_day , setWeekDay ] = useState('')
  const [ time , setTime ] = useState('')

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeacherIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id
        })
        setFavarites(favoritedTeacherIds)
      }
    });
  }
  useFocusEffect(() => {
    loadFavorites();
  })

  function handleToggleFiltersVisible() {
    setFilterVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites()
  const response = await api.get('classes', {
    params: {
      subject,
      week_day,
      time,
    }
  });
  setFilterVisible(false);
  setTeachers(response.data);
  }
  return (
     <View style={styles.container}>
      <PageHeader 
        title="Proffys Disponíveis" 
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )} 
      >
      { isFiltersVisible && (
        <View style={styles.searchForm}>
          <Text style={styles.label}>Matéria</Text>
            <TextInput 
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder='Qual a Matéria?'
              placeholderTextColor= '#c1bccc'
            />

        <View style={styles.inputGrup}>
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Dia da Semana</Text>
            <TextInput 
              style={styles.input}
              value={week_day}
              onChangeText={text => setWeekDay(text)}
              placeholder='Qual o Dia ?'
              placeholderTextColor= '#c1bccc'
            />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.label}>Horário</Text>
            <TextInput 
              style={styles.input}
              value={time}
              onChangeText={text => setTime(text)}
              placeholder='Qual Horário ?'
              placeholderTextColor= '#c1bccc'
            />
          </View>
        </View>
        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Filtrar</Text>
        </RectButton>
      </View>
   )}
     </PageHeader>
      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal:16,
          paddingBottom:16,
        }}
      >
        {teachers.map((teacher:Teacher) => {
         return (
         <TeacherItem 
         key={teacher.id} 
         teacher={teacher} 
         favorited={favorites.includes(teacher.id)}
         />)
        })}
      </ScrollView>
   </View>
  )
};

export default TeacherList;