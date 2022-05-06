import AsyncStorage from '@react-native-async-storage/async-storage';
import '../i18n';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Button, StyleSheet} from 'react-native';
import {screenkeys} from './_index';

const settingsOpts = (opts = {lang: 'EN'}) => {
  const _settings = {
    lang: opts.lang,
  };
  return _settings;
};
export const Home = ({navigation, dispatch, lang}) => {
  const [settings, initSettings] = React.useState(settingsOpts());
  const {t, i18n} = useTranslation();

  React.useEffect(() => {
    AsyncStorage.getItem('settings')
      .then(settingsJSON => {
        const _settings = settingsOpts(JSON.parse(settingsJSON));
        i18n.changeLanguage(_settings.lang);
        dispatch({type: _settings.lang});
      })
      .catch(() => {
        const _settings = settingsOpts();
        i18n.changeLanguage(_settings.lang);
        dispatch({type: _settings.lang});
      });
  }, []);
  return (
    <View style={styles.main}>
      {screenkeys.map(
        skey =>
          skey !== 'home' && (
            <View style={styles.btn} key={'home-' + skey}>
              <Button
                style={styles.btn}
                title={t(skey)}
                onPress={() => navigation.navigate(skey)}
              />
            </View>
          ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    textAlign: 'center',
  },
  btn: {
    marginTop: 16,
  },
});

export default Home;
