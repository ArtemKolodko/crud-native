import React from 'react'
import { ScrollView } from 'react-native';
import { ListItem, Text } from 'react-native-elements'
import { IMovieCreated } from '../interfaces'

interface IMoviesListProps {
    movies: IMovieCreated[];
    showDetails: Function;
}

interface IMovieListItemProps {
    movie: IMovieCreated;
    showDetails: Function;
}

function MovieListItem (props: IMovieListItemProps) {
    const { movie, showDetails } = props
    const { id, title, year } = movie
    return <ListItem bottomDivider onPress={() => {
        showDetails(id)
    }}>
        <ListItem.Content>
            <ListItem.Title>
                <Text style={{fontWeight: 'bold'}}>{title}</Text>
            </ListItem.Title>
            <ListItem.Subtitle>{year}</ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
}

export default (props: IMoviesListProps) => {
    const { showDetails } = props
    return <ScrollView>
        {!props.movies.length &&
            <Text>No movies found</Text>
        }
        {props.movies.map(movie => <MovieListItem
          key={movie.id}
          movie={movie}
          showDetails={showDetails}
        />)}
    </ScrollView>
}
