import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {writeNote, readNote, deleteFiles} from '../utils/myfs';

// props.route.params.filename
export const NoteEditor = props => {
  const {t} = useTranslation();
  const _tin = {min: 1, max: 10, format: '.txt'}; // min,max title size
  const [title, titleChange] = React.useState('');
  const [content, contentChange] = React.useState('');

  React.useEffect(() => {
    let isSubscribed = true;
    if (
      props.route.params.filename &&
      typeof props.route.params.filename === 'string'
    ) {
      readNote(props.route.params.filename).then(_content => {
        if (isSubscribed) {
          titleChange(props.route.params.filename);
          contentChange(_content);
        }
      });
    }
    return () => (isSubscribed = false);
  }, []);

  const save = () => {
    if (_tin.min <= title.length <= _tin.max) {
      writeNote(title, content, _tin.format)
        .then(() => console.log('success write note'))
        .catch(() => console.log('failed write note'));
      console.log('new note');
    } else {
      // handle bad topic
      console.log('bad topic');
      console.log({title, _tin});
    }
  };

  const deleteNote = () => {
    deleteFiles(title);
    console.log('delete a note');
  };

  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const saveLoading = () => {
    setSaveIsLoading(!saveIsLoading);
    setTimeout(() => {
      setSaveIsLoading(saveIsLoading);
    }, 3000);
  };

  const [isLoading, setIsLoading] = useState(false);
  const deleteLoading = () => {
    setIsLoading(!isLoading);
    setTimeout(() => {
      setIsLoading(isLoading);
    }, 3000);
  };

  return (
    <View>
      <TextInput
        style={styles.tinput}
        onChangeText={titleChange}
        value={title}
        placeholder={t('title')}
      />
      <TextInput
        style={styles.tarea}
        onChangeText={contentChange}
        value={content}
        placeholder={t('content')}
        multiline={true}
      />
      <Text></Text>
      <Text></Text>
      <Text></Text>
      {/* <Button title={t('save')} onPress={() => save()} /> */}
      <TouchableOpacity
        style={styles.container}
        //title={t('Save')}
        onPress={() => {
          save();
          saveLoading();
        }}>
        <View
          style={{
            ...styles.button,
            backgroundColor: saveIsLoading ? '#0c99f7' : '#0c99f7',
          }}>
          {saveIsLoading && <ActivityIndicator size="small" color="white" />}
          <Text style={styles.buttonText}>
            {saveIsLoading ? t('saving') : t('save')}
          </Text>
        </View>
      </TouchableOpacity>
      <Text></Text>
      <Text></Text>

      <TouchableOpacity
        style={styles.container}
        //title={t('Delete')}
        onPress={() => {
          deleteNote();
          deleteLoading();
        }}>
        <View
          style={{
            ...styles.button,
            backgroundColor: isLoading ? '#0c99f7' : '#0c99f7',
          }}>
          {isLoading && <ActivityIndicator size="small" color="white" />}
          <Text style={styles.buttonText}>
            {isLoading ? t('deleting') : t('delete')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
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
    flexDirection: 'row',
    marginLeft: 20,
    //alignItems: 'center',
    justifyContent: 'space-evenly',
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

export default NoteEditor;
