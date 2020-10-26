import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import styled from "styled-components/native";
import { AntDesign as AntIcon } from "@expo/vector-icons";

enum Mode {
  create = 'create',
  edit = 'edit'
}

export interface CallbackDataProps {
  title: string;
  year: string;
}

interface FormProps {
  title?: string;
  year?: string;
  onSavePress?: (data: CallbackDataProps) => void;
  onDeletePress?: () => void;
}

interface BaseFormProps extends FormProps {
  mode: Mode;
}

const FormContainer = styled.View`
  margin-top: 16px;
`

const ButtonsContainer = styled.View`
  margin-top: 4px;
  padding-left: 8px;
  padding-right: 8px;
`

const EditButtonsContainer = styled(ButtonsContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const DeleteButton = styled.View`
  margin-top: 8px;
`

const defaultFormErrors = { title: '', year: '' }

function BaseForm (props: BaseFormProps) {
  const { mode } = props
  const [title, setTitle] = useState<string>(props.title || '')
  const [year, setYear] = useState<string>(props.year || '')
  const [formErrors, setFormErrors] = useState(defaultFormErrors)

  const onSavePress = () => {
    if (props.onSavePress) {
      if (!title || title.replace(/\s/g, '').length === 0) {
        setFormErrors({...defaultFormErrors, title: 'Title is required'})
      } else if (!/^[A-Za-z0-9 ]*$/.test(title)) {
        setFormErrors({...defaultFormErrors, title: 'Only english language is supported'})
      } else if(year && !/^[0-9]*$/.test(year)) {
        setFormErrors({...defaultFormErrors, year: 'You must enter digits or left field empty'})
      } else {
        setFormErrors(defaultFormErrors)
        props.onSavePress({ title, year })
      }
    }
  }
  const onDeletePress = () => {
    if (props.onDeletePress) {
      props.onDeletePress()
    }
  }

  const saveButtonProps = {
    disabled: !title,
    onPress: onSavePress
  }

  return <View>
    <FormContainer>
      <Input
        placeholder={'Movie title, for example: Avengers'}
        value={title}
        errorMessage={formErrors.title}
        onChangeText={setTitle}
      />
      <Input
        placeholder={'Release year, optional'}
        value={year}
        errorMessage={formErrors.year}
        onChangeText={setYear}
      />
    </FormContainer>
    {mode === Mode.create &&
      <ButtonsContainer>
          <Button
            {...saveButtonProps}
            title={'Add'}
          />
      </ButtonsContainer>
    }
    {mode === Mode.edit &&
      <EditButtonsContainer>
          <Button
            {...saveButtonProps}
            title={'Save'}
            containerStyle={{ width: 260 }}
          />
          <DeleteButton>
              <AntIcon name={'delete'} size={26} color={'#e63946'} onPress={onDeletePress} />
          </DeleteButton>
      </EditButtonsContainer>
    }
  </View>
}

const AddMovieForm = (props: FormProps) => <BaseForm {...props} mode={Mode.create} />
const EditMovieForm = (props: FormProps) => <BaseForm {...props} mode={Mode.edit} />

export {
  AddMovieForm,
  EditMovieForm
}
