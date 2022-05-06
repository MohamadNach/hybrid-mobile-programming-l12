import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// settings
//{
// "lang: "EN" or "FI"
//}

const storeSettings = ({lang = 'EN'}) => {
  const _settings = {
    lang,
  };
  return JSON.stringify(_settings);
};

export const Settings = ({count, lang, dispatch}) => {
  const {t, i18n} = useTranslation();
  const isCurrentLang = _lang => (_lang === lang ? true : false);
  const setLang = async _lang => {
    AsyncStorage.getItem('settings').then(_settings =>
      AsyncStorage.setItem(
        'settings',
        storeSettings({..._settings, lang: _lang}),
      )
        .catch(() =>
          AsyncStorage.setItem('settings', storeSettings({lang: _lang})),
        )
        .finally(() => {
          dispatch({type: _lang});
          i18n.changeLanguage(_lang);
        }),
    );
  };
  return (
    <View>
      <Text style={[styles.main, styles.btn, styles.content]}>
        {t('count')} {count}
      </Text>
      <Button
        title={t('Increment')}
        onPress={() => dispatch({type: 'INCREMENT'})}
      />
      <Text></Text>
      <Button
        title={t('Decrement')}
        onPress={() => dispatch({type: 'DECREMENT'})}
      />
      <Text></Text>
      <Button
        title={t('English')}
        onPress={() => setLang('EN')}
        disabled={isCurrentLang('EN')}
      />
      <Text></Text>
      <Button
        title={t('Finnish')}
        onPress={() => setLang('FI')}
        disabled={isCurrentLang('FI')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    textAlign: 'center',
  },
  btn: {
    color: 'black',
    marginTop: 20,
    marginBottom: 20,
  },
  content: {
    padding: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default Settings;
