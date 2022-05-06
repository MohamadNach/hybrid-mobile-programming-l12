import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {writeNote} from '../utils/myfs';
import {TriggerLoading} from './triggerLoading';
import {Loading} from './loading';
import Icon from 'react-native-vector-icons/FontAwesome';

export const CreateNote = () => {
  const {t} = useTranslation();
  const _tin = {min: 1, max: 10, format: '.txt'}; // min,max title size
  const [title, titleChange] = React.useState('');
  const [content, contentChange] = React.useState('');

  const save = () => {
    if (_tin.min <= title.length <= _tin.max) {
      writeNote(title, content, _tin.format)
        .then(() => console.log('success write note'))
        .catch(() => console.log('failed write note'));
    } else {
      // handle bad topic
      console.log('bad topic');
      console.log({title, _tin});
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const toggleLoading = () => {
    setIsLoading(!isLoading);
    setTimeout(() => {
      setIsLoading(isLoading);
    }, 3000);
  };

  return (
    <ScrollView>
      <TextInput
        style={styles.tinput}
        onChangeText={titleChange}
        value={title}
        placeholder={t('title')}
      />
      <TextInput
        style={styles.tarea}
        placeholder={t('content')}
        onChangeText={contentChange}
        value={content}
        multiline={true}
      />
      <TouchableOpacity
        style={styles.container}
        title={t('Hello Save')}
        onPress={() => {
          save();
          toggleLoading();
        }}>
        <View
          style={{
            ...styles.button,
            backgroundColor: isLoading ? '#0c99f7' : '#0c99f7',
          }}>
          {isLoading && <ActivityIndicator size="small" color="white" />}
          <Text style={styles.buttonText}>
            {isLoading ? t('saving') : t('save')}
          </Text>
        </View>
      </TouchableOpacity>

      <Text></Text>
      {/* <TriggerLoading /> */}

      {/* <Loading /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tarea: {
    height: 160,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  tinput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 150,
    height: 50,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CreateNote;
