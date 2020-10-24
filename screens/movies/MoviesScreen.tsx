import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { Text, View } from '../../components/Themed';
import MoviesList from './components/MoviesList'
import BottomPanel from "./components/BottomPanel";
import { observer } from 'mobx-react';
import useStores from '../../hooks/useStores'

const MoviesScreen = (props: any) => {
  const { navigation } = props
  const { moviesStore } = useStores()
  const { movies } = moviesStore
  const showDetails = (id: string) => {
    navigation.navigate('ShowMovieScreen', { id })
  }
  const onAddMoviePressed = () => {
    navigation.navigate('AddMovieScreen')
  }
  return (
    <View style={styles.container}>
      <MoviesList movies={movies} showDetails={showDetails} />
      <BottomPanel>
        <Button onPress={onAddMoviePressed} title={"Add Movie"} />
      </BottomPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  plusButton: {

  }
});

export default observer(MoviesScreen)
