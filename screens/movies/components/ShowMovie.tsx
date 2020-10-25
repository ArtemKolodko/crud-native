import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { View } from 'react-native';
import IMDBInfo from "./IMDBInfo";
import useStores from "../../../hooks/useStores";
import { EditMovieForm, CallbackDataProps } from "./FormInput";

const ShowMovie = inject('moviesStore')(observer((props: any) => {
  const { navigation, route: { params } } = props
  const { id } = params
  const { moviesStore } = useStores()
  const movie = moviesStore.getMovieById(id)

  const onSavePress = (data: CallbackDataProps) => moviesStore.updateMovie(id, data)
  const onDeletePress = () => {
    moviesStore.deleteMovie(id)
    navigation.navigate('TabMoviesScreen')
  }
  return <View>
    {movie &&
      <View>
          <IMDBInfo movie={movie} />
          <EditMovieForm
              title={movie.title}
              year={movie.year}
              onSavePress={onSavePress}
              onDeletePress={onDeletePress}
          />
      </View>
    }
  </View>
}))

export default ShowMovie
