import {t} from 'i18next';
import React from 'react';
import {ActivityIndicator, Button, View, StyleSheet} from 'react-native';

export class TriggerLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  startLoading() {
    if (this.state.isLoading) {
      // still loading something
      console.log('still loading');
    } else {
      // its not loading, can be triggered
      this.setState({isLoading: true});
      setTimeout(() => {
        this.setState({isLoading: false});
      }, 3000);
      // some async/promise operation

      // after completed, do something about it
      // response msg
      // actions based on response
      // finally set isLoading state to false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <ActivityIndicator size="large" color="white" /> */}
        <Button
          style={[styles.button, styles.buttonText]}
          disabled={this.state.isLoading}
          title={t('loading')}
          onPress={() => {
            this.startLoading();
          }}
        />
      </View>
    );
  }
}

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
});

export default TriggerLoading;
