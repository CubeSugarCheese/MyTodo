import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {IconOutline} from '@ant-design/icons-react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {alignSelf: 'center', borderRadius: 100},
  button: {
    borderRadius: 100,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },
  icon: {
    alignSelf: 'center',
    fontSize: 25,
  },
});

interface Props {
  callback?: () => void;
}

export default function EditButton({callback}: Props): React.JSX.Element {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={callback !== undefined ? callback : () => {}}>
      <View style={styles.button}>
        <IconOutline name="more" style={styles.icon} />
      </View>
    </TouchableHighlight>
  );
}
