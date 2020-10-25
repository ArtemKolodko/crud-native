import { View } from 'react-native';
import React from 'react';
import { observer, inject } from 'mobx-react';
import useStores from "../../../hooks/useStores";
import { AddMovieForm } from "./FormInput";
import { IMovie } from "../interfaces";

interface AddMovieProps {
  navigation: any;
}

const AddMovie = inject('moviesStore')(observer(({ navigation }: AddMovieProps) => {
  const { moviesStore } = useStores()
  const onAddPress = (movie: IMovie) => {
    const { id } = moviesStore.addMovie(movie)
    navigation.pop() // Remove last stacked item from history
    navigation.navigate('ShowMovieScreen', { id })
  }
  return <View>
    <AddMovieForm
      onSavePress={onAddPress}
    />
  </View>
}))

export default AddMovie
