import React, { useEffect, useState } from 'react';
import { IMovie } from "../interfaces";
import { Text, View, Linking, Dimensions } from "react-native";
import { Image, Button } from 'react-native-elements';
import axios from 'axios'

interface IMDBMovie {
  id: string;
  image: string;
  cast: string;
}

interface IMDBInfoProps {
  movie: IMovie;
}

const parseIMDBResponse = (data: string, q: string) => {
  const startStr = `imdb$${q}(`
  const formattedStr = data.slice(startStr.length).slice(0, -1)
  return JSON.parse(formattedStr)
}

const filterMoviesByYear = (list: any[], year: string) => {
  const withExactYear = list.find(item => item.y.toString() === year)
  if (withExactYear) {
    return withExactYear
  }
  return list[0]
}

const getMovieData = async (movie: IMovie) => {
  const { title, year } = movie
  const t = title.toLowerCase()
  // try {
  //   const {data: testData} = await axios.get('https://httpbin.org/get')
  //   console.log('testData', testData)
  //   alert('TEST passed'+ testData.origin)
  // } catch (e) {
  //   alert(e.message)
  // }
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
          image: data.i[0],
          cast: data.s
        })
        setLoadingError(null)
      } catch (e) {
        setLoadingError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    if (movie.title) {
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

  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 3 / 4);
  const imageWidth = dimensions.width;

  return <View>
    {imdbData &&
    <View style={{ display: 'flex' }}>
        <Image
            source={{uri: imdbData.image}}
            style={{ width: imageWidth, height: imageHeight }}
        />
        <View style={{ marginTop: 16 }}>
            <Text>Cast: {imdbData.cast}</Text>
            <Button
                style={{ marginTop: 8 }}
                title="Open on IMDB"
                onPress={()=>{ Linking.openURL(`https://www.imdb.com/title/${imdbData.id}`)}}
            />
        </View>
    </View>
    }
  </View>
}

export default IMDBInfo
