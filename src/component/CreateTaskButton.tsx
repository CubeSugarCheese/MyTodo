import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {IconOutline} from '@ant-design/icons-react-native';

const styles = StyleSheet.create({
  container: {alignSelf: 'center', borderRadius: 100},
  button: {
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },
  icon: {
    alignSelf: 'center',
    fontSize: 30,
  },
});

interface Props {
  callback?: () => void;
}

export default function CreateTaskButton({callback}: Props): React.JSX.Element {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={callback !== undefined ? callback : () => {}}>
      <View style={styles.button}>
        <IconOutline name="plus" style={styles.icon} />
      </View>
    </TouchableHighlight>
  );
}
