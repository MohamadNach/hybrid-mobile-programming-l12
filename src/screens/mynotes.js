import React from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {listNotes} from '../utils/myfs';
import {useTranslation} from 'react-i18next';

export const MyNotes = ({navigation}) => {
  const {t} = useTranslation();
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    let isSubscribed = true;
    listNotes().then(_notes => {
      console.log({_notes});
      if (isSubscribed) {
        setNotes(_notes);
      }
    });
    return () => (isSubscribed = false);
  }, []);

  const openEditor = note => {
    console.log(`open note: ${note}`);
    navigation.navigate('noteEditor', {filename: note});
  };

  return (
    <ScrollView>
      <Text style={styles.content}>{t('click on the file to edit')}</Text>
      {notes.map((note, i) => (
        <View style={styles.btn} key={`note-${i}`}>
          <Button
            style={styles.btn}
            title={note}
            onPress={() => openEditor(note)}></Button>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    textAlign: 'center',
  },
  btn: {
    marginTop: 16,
  },
  content: {
    padding: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#505050',
    justifyContent: 'center',
    textAlign: 'left',
  },
});

export default MyNotes;
