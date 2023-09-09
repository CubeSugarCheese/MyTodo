import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type Task = {
  title: string;
  detail: string;
  finish: boolean;
};

export type TaskWithID = {
  id: string;
} & Task;

export type EditScreenParam = {
  taskID: string;
};

export type RootStackParamList = {
  Main: undefined;
  Edit: EditScreenParam;
  Create: undefined;
};

export type NavigateProps<RouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, RouteName>;

export default NavigateProps;
