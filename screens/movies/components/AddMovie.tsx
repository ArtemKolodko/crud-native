import { View } from 'react-native';
import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Button } from 'react-native-elements';
import useStores from "../../../hooks/useStores";
import styled from "styled-components/native";

interface AddMovieProps {
  navigation: any;
}

const FormContainer = styled.View`
  margin-top: 8px;
`

const ButtonsContainer = styled.View`
  text-align: center;
  margin-top: 16px;
  padding-left: 8px;
  padding-right: 8px;
`

const AddMovie = inject('moviesStore')(observer(({ navigation }: AddMovieProps) => {
  const { moviesStore } = useStores()
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [titleError, setTitleError] = useState('')
  const onAddPress = () => {
    if (title) {
      setTitleError('')
      const { id } = moviesStore.addMovie({ title, year })
      navigation.pop() // Remove last stacked item in history
      navigation.navigate('ShowMovieScreen', { id })
    } else {
      setTitleError('Title is required')
    }
  }
  return <View>
    <FormContainer>
      <Input
        placeholder={'Movie title. For example: Avengers'}
        value={title}
        errorMessage={titleError}
        onChangeText={setTitle}
      />
      <Input placeholder={'Release year. Optional'} value={year} onChangeText={setYear} />
    </FormContainer>
    <ButtonsContainer>
      <Button title={'Add'} onPress={onAddPress} />
    </ButtonsContainer>
  </View>
}))

export default AddMovie
