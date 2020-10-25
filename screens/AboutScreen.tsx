import React from 'react';
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  position: relative;
  flex: 1;
  background-color: black;
`

const InnerBlock = styled.View`
  padding: 32px;
  margin: 16px auto;
  background-color: whitesmoke;
`

const TextBlock = styled.Text`
  margin-bottom: 32px;
`

function ListItem ({ name }: { name: string }) {
  return <View style={{ flexDirection: 'row', marginTop: 8 }}>
    <Text>{'\u2022'}</Text>
    <Text style={{paddingLeft: 8}}>{name}</Text>
  </View>
}

export default function AboutScreen() {
  return (
    <Container>
      <InnerBlock>
        <TextBlock>The application is created for training purposes.</TextBlock>
        <View>
          <Text>Еhe application uses these libraries and services:</Text>
          {
            ['React, React Native', 'MobX', 'IMDB API']
            .map(name => <ListItem key={name} name={name} />)
          }
        </View>
      </InnerBlock>
    </Container>
  );
}
