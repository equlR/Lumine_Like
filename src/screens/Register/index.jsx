import {useState} from 'react';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {Image, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import {IMAGES} from '../../assets';
import {registerValidationSchema} from '../../utils/validationSchema';
import {api} from '../../api';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomModal from '../../components/CustomModel';
import Text from '../../components/CustomText';
import {showSuccess, showError} from '../../utils/helper';
import {useStyle} from './style';

const RegisterScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const styles = useStyle();

  const handleRegister = async values => {
    setLoading(true);
    try {
      const response = await api.USERS.register({
        data: {
          fullName: values.FullName,
          email: values.Email,
          password: values.Password,
        },
      });
      console.log('-----------Response-----------', response);
      if (response?.status === 'SUCCESS') {
        setModalMessage('Verification mail sent on your registered mail id.');
        setModalVisible(true);
      }
    } catch (error) {
      // showError(error?.response?.data?.message || 'Registration failed');
      console.error('Registration Error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIcon}>
        <Image source={IMAGES.backIcon} style={styles.backArrow} />
      </TouchableOpacity>
      <Image source={IMAGES.RegisterImage} style={styles.registerImage} />
      <View style={styles.mainView}>
        <Text type="bold" style={styles.RegisterText}>
          Register
        </Text>
        <Formik
          initialValues={{
            FullName: '',
            Email: '',
            Password: '',
            ConfirmPassword: '',
          }}
          validationSchema={registerValidationSchema}
          onSubmit={handleRegister}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <>
              <View style={styles.InputContainer}>
                <CustomInput
                  placeholder="Full Name"
                  value={values.FullName}
                  onChangeText={handleChange('FullName')}
                  error={touched.FullName && errors.FullName}
                  autoCapitalize="words"
                  backgroundColor={styles.container.backgroundColor}
                />

                <CustomInput
                  placeholder="Email Address"
                  value={values.Email}
                  onChangeText={handleChange('Email')}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  error={touched.Email && errors.Email}
                  backgroundColor={styles.container.backgroundColor}
                />

                <CustomInput
                  placeholder="Password"
                  value={values.Password}
                  onChangeText={handleChange('Password')}
                  backgroundColor={styles.container.backgroundColor}
                  error={touched.Password && errors.Password}
                  isPassword={true}
                />
                <CustomInput
                  placeholder="Confirm Password"
                  value={values.ConfirmPassword}
                  onChangeText={handleChange('ConfirmPassword')}
                  backgroundColor={styles.container.backgroundColor}
                  error={touched.ConfirmPassword && errors.ConfirmPassword}
                  isPassword={true}
                />
              </View>

              <CustomButton
                title="Register"
                onPress={handleSubmit}
                postfixLogo={IMAGES.register}
                loading={loading}
              />
            </>
          )}
        </Formik>
        <View style={styles.LastRow}>
          <Text style={styles.noAccountText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text type="medium" style={styles.Login}>
              {' '}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomModal
        visible={modalVisible}
        message={modalMessage}
        type="success"
        onClose={() => {
          setModalVisible(false);
          navigation.navigate('Login');
          showSuccess('Registration successful! Please verify your email.');
        }}
      />
    </KeyboardAvoidingScrollView>
  );
};
export default RegisterScreen;
