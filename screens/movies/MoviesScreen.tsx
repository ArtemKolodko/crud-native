import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { View } from '../../components/Themed';
import MoviesList from './components/MoviesList'
import BottomPanel from "./components/BottomPanel";
import { observer } from 'mobx-react';
import useStores from '../../hooks/useStores'
import { TabMoviesParamList } from "../../types";

type MoviesScreenNavigationProp = StackNavigationProp<TabMoviesParamList, 'TabMoviesScreen'>;

interface MoviesScreenProps {
  navigation: MoviesScreenNavigationProp;
}

const MoviesScreen = ({ navigation }: MoviesScreenProps) => {
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
        <Button
          title={"Add Movie"}
          containerStyle={{ width: 220 }}
          onPress={onAddMoviePressed}
        />
      </BottomPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default observer(MoviesScreen)
