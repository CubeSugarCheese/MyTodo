import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button, WhiteSpace, WingBlank} from '@ant-design/react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 20,
  },
  detail: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    flex: 1, // 填充剩余所有空间
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    fontSize: 15,
  },
  confirmButton: {
    padding: 10,
  },
});

interface Props {
  title: string;
  setTitle: (text: string) => void;
  detail: string;
  setDetail: (text: string) => void;
  callback: () => void;
}

export default function TaskControlScreen({
  title,
  setTitle,
  detail,
  setDetail,
  callback,
}: Props): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <WhiteSpace />
      <WingBlank style={{flex: 1}} size="lg">
        <TextInput
          placeholder="任务标题"
          value={title}
          onChangeText={text => setTitle(text)}
          style={styles.title}
        />
        <WhiteSpace />
        <TextInput
          multiline
          placeholder="详细说明（可选）"
          value={detail}
          onChangeText={text => setDetail(text)}
          style={styles.detail}
        />
        <WhiteSpace />
        <Button onPress={callback}>确定</Button>
        <WhiteSpace />
      </WingBlank>
    </SafeAreaView>
  );
}
