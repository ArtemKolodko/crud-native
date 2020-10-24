import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Button } from 'react-native-elements';

const AddMovie = inject('moviesStore')(observer((props: any) => {
  const { moviesStore } = props
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const onPress = () => {
    moviesStore.addMovie({ title, author, year })
  }
  return <View>
    <Text>Enter movie info</Text>
    <Input placeholder={'Title'} value={title} onChangeText={setTitle} />
    <Input placeholder={'Author'} value={author} onChangeText={setAuthor} />
    <Input placeholder={'Year'} value={year} onChangeText={setYear} />
    <Button title={'Add'} onPress={onPress} />
  </View>
}))

export default AddMovie
