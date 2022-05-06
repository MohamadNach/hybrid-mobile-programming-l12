import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {} from '../utils/myfs';
import {useTranslation} from 'react-i18next';

export const Dev = ({count}) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.container, styles.content]}>
      <Text style={styles.content}>{t('We are Developing this section.')}</Text>
      <Text style={styles.content}>
        {t('count')} {count}
      </Text>
      <ActivityIndicator size="large" color="#505050" />
    </View>
  );
};

const styles = StyleSheet.create({
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
  content: {
    padding: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#505050',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default Dev;
