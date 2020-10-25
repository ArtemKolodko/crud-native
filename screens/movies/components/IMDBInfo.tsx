import React, { useEffect, useState } from 'react';
import { IMovie, IMovieCreated } from "../interfaces";
import { Text, View, Linking, Dimensions } from "react-native";
import { Image } from 'react-native-elements';
import axios from 'axios'
import styled from "styled-components/native";

interface IMDBMovie {
  id: string;
  title: string;
  year: number;
  image: string;
  cast: string;
}

interface IMDBInfoProps {
  movie: IMovie;
}

const Link = styled.Text`
  color: blue;
`

const Cast = styled.Text`
  color: gray;
`

const MovieInfo = styled.View`
  margin-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
`

const InlineRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const parseIMDBResponse = (data: string, q: string) => {
  const startStr = `imdb$${q}(`
  const formattedStr = data.slice(startStr.length).slice(0, -1)
  return JSON.parse(formattedStr)
}

const filterMoviesByYear = (list: any[], year: string) => {
  const withExactYear = list.find(item => item.y && item.y.toString() === year)
  if (withExactYear) {
    return withExactYear
  }
  return list[0]
}

const calculateImageDimensions = () => {
  const dimensions = Dimensions.get('window');
  return {
    width: dimensions.width,
    height: Math.round(dimensions.width * 10 / 16)
  }
}

const getMovieData = async (movie: IMovie) => {
  const { title, year } = movie
  const t = title.toLowerCase()
  const q = t.replace(' ', '_')
  const url = `https://sg.media-imdb.com/suggests/${t[0]}/${q}.json`
  const { data } = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  const parsedData = parseIMDBResponse(data, q)
  return filterMoviesByYear(parsedData.d, year)
}

function IMDBInfo(props: IMDBInfoProps) {
  const { movie } = props
  const [isLoading, setIsLoading] = useState(false)
  const [lastLoadedMovie, setLastLoadedMovie] = useState<null | IMovie>(null)
  const [loadingError, setLoadingError] = useState(null)
  const [imdbData, setIMDBData] = useState<null | IMDBMovie>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const data = await getMovieData(movie)
        // console.log('imdbData', data)
        setIMDBData({
          id: data.id,
          title: data.l,
          year: data.y,
          image: data.i ? data.i[0] : undefined,
          cast: data.s ? data.s.split(',').slice(0, 2).join(',') : ''
        })
        setLoadingError(null)
        setLastLoadedMovie(movie)
      } catch (e) {
        setLoadingError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    const isMovieChanged = lastLoadedMovie && movie && (
      lastLoadedMovie.title !== movie.title || lastLoadedMovie.year !== movie.year
    )
    if ((!lastLoadedMovie) || (!isLoading && isMovieChanged)) {
      fetchData()
    }
  }, [movie])

  if (isLoading) {
    return <View><Text>Loading data from IMDB...</Text></View>
  }

  if (!imdbData) {
    return <View>
      <Text>
        No movies found on IMDB
      </Text>
      {loadingError &&
        <Text>Error: {loadingError}</Text>
      }
    </View>
  }

  const { width, height } = calculateImageDimensions()
  return <View>
    {imdbData &&
    <View>
        <Image
            source={{uri: imdbData.image}}
            style={{ width, height }}
        />
        <MovieInfo>
            <InlineRow>
                <Cast>{imdbData.title} ({imdbData.year})</Cast>
                <Link onPress={() => {
                  Linking.openURL(`https://www.imdb.com/title/${imdbData.id}`)}
                }>Show on IMDB</Link>
            </InlineRow>
            <Text>{imdbData.cast}</Text>
        </MovieInfo>
    </View>
    }
  </View>
}

export default IMDBInfo
