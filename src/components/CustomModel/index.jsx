import {Modal, View, TouchableOpacity} from 'react-native';
import {useStyle} from './style';
import Text from '../CustomText';

const styles = useStyle();

const CustomModal = ({
  visible,
  message,
  onClose,
  onConfirm,
  showConfirmButtons = false,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text type="medium" style={styles.modalText}>
            {message}
          </Text>

          {showConfirmButtons ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={onClose}
                style={[styles.button, styles.cancelButton]}>
                <Text style={styles.cancelButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onConfirm?.();
                  onClose();
                }}
                style={[styles.button, styles.confirmButton]}>
                <Text style={styles.confirmButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={onClose} style={styles.singleButton}>
              <Text style={styles.singleButtonText}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
