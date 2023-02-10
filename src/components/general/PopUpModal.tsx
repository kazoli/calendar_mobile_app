import React from 'react';
import {Modal} from 'react-native';

type tProps = {
  visible: boolean;
  children: React.ReactNode;
};

function PopUpModal(props: tProps) {
  return (
    <Modal animationType="fade" transparent={false} visible={props.visible}>
      {props.children}
    </Modal>
  );
}

export default PopUpModal;
