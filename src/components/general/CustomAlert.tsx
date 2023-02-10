import {Alert} from 'react-native';

type tProps = {
  title: string;
  message: string;
  buttons: {
    text: string;
    onPress: () => void;
  }[];
};

function CustomAlert(props: tProps) {
  return Alert.alert(props.title, props.message, props.buttons);
}

export default CustomAlert;
