import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Button } from 'react-native-elements';
import { View } from 'react-native';
import styled from 'styled-components/native'
import { AntDesign as AntIcon } from '@expo/vector-icons';
import IMDBInfo from "./IMDBInfo";
import { IMovie } from "../interfaces";
import useStores from "../../../hooks/useStores";

const FormContainer = styled.View`
  margin-top: 16px;
`

const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
  padding-left: 8px;
  padding-right: 8px;
`

const DeleteButton = styled.View`
  margin-top: 8px;
`

const ShowMovie = inject('moviesStore')(observer((props: any) => {
  const { navigation, route } = props
  const { id } = route.params
  const { moviesStore } = useStores()
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')

  const getMovieState = (): IMovie => ({ title, year })
  const getMovieFromStore = () => moviesStore.getMovieById(id)

  React.useEffect(() => {
    if (id) {
      const movieData = getMovieFromStore()
      if (movieData) {
        setTitle(movieData.title)
        setYear(movieData.year)
      }
    }
  }, [id]);

  const onSavePress = () => moviesStore.updateMovie(id, getMovieState())
  const onDeletePress = () => {
    moviesStore.deleteMovie(id)
    navigation.navigate('TabMoviesScreen')
  }
  return <View>
    <IMDBInfo movie={getMovieFromStore()} />
    <FormContainer>
      <Input placeholder={'Title'} value={title} onChangeText={setTitle} />
      <Input placeholder={'Year'} value={year} onChangeText={setYear} />
    </FormContainer>
    <ButtonsContainer>
      <Button title={'Save'} disabled={!title} onPress={onSavePress} containerStyle={{ width: 220 }} />
      <DeleteButton>
        <AntIcon name={'delete'} size={26} color={'#e63946'} onPress={onDeletePress} />
      </DeleteButton>
    </ButtonsContainer>
  </View>
}))

export default ShowMovie
