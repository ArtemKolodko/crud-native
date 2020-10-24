import React, { useState } from 'react'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native';
import { ListItem, Overlay, Text, Button } from 'react-native-elements'
import { IMovieCreated } from '../interfaces'

interface IMoviesListProps {
    movies: IMovieCreated[];
    showDetails: Function;
}

interface IMovieListItemProps {
    movie: IMovieCreated;
    showDetails: Function;
}

// const ListItem = styled.View`
//     height: 32px;
//     margin-top: 16px;
//     margin-bottom: 16px;
//     font-weight: 500;
//     padding-left: 16px;
//     line-height: 16px;
// `
//
// const Item = styled.Text`
//     display: flex;
// `;
//
// const Title = styled(Item)`
// `

// const Year = styled(Item)`
//     color: #9a9a9a;
//     margin-left: 16px;
// `

function MovieListItem (props: IMovieListItemProps) {
    const { movie, showDetails } = props
    const { id, title, author, year } = movie
    return <ListItem bottomDivider onPress={() => {
        showDetails(id)
    }}>
        <ListItem.Content>
            <ListItem.Title>
                <Text style={{fontWeight: 'bold'}}>{title}</Text>
                <Text style={{ marginLeft: 16 }}>{author}</Text>
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
