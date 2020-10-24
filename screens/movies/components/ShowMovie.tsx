import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Button } from 'react-native-elements';
import styled from 'styled-components/native'
import IMDBInfo from "./IMDBInfo";
import { IMovie } from "../interfaces";

const Container = styled.View`
  padding: 8px;
`

const IMDBInfoContainer = styled.View`
  margin-top: 16px
`

const InfoContainer = styled.View`
  display: flex;
  margin-top: 8px;
`

const ShowMovie = inject('moviesStore')(observer((props: any) => {
  const { moviesStore, navigation, route } = props
  const { id } = route.params
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')

  const getMovieState = (): IMovie => ({ title, author, year })

  React.useEffect(() => {
    if (id) {
      const movieData = moviesStore.getMovieById(id)
      if (movieData) {
        setTitle(movieData.title)
        setAuthor(movieData.author)
        setYear(movieData.year)
      }
    }
  }, [route.params?.id]);

  const onSavePress = () => moviesStore.updateMovie(id, getMovieState())
  const onDeletePress = () => {
    moviesStore.deleteMovie(id)
    navigation.navigate('TabMoviesScreen')
  }
  return <Container>
    <Input placeholder={'Title'} value={title} onChangeText={setTitle} />
    <Input placeholder={'Author'} value={author} onChangeText={setAuthor} />
    <Input placeholder={'Year'} value={year} onChangeText={setYear} />
    <InfoContainer>
      <Button title={'Save'} onPress={onSavePress} />
      <Button title={'Delete'} buttonStyle={{ backgroundColor: '#e63946' }} onPress={onDeletePress} />
      <IMDBInfoContainer>
        <IMDBInfo movie={getMovieState()} />
      </IMDBInfoContainer>
    </InfoContainer>
  </Container>
}))

export default ShowMovie
