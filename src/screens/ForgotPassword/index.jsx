import {Image, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../../assets';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import CustomInput from '../../components/CustomInput';
import {Formik} from 'formik';
import CustomButton from '../../components/CustomButton';
import {useState} from 'react';
import {showError, showSuccess} from '../../utils/helper';
import Text from '../../components/CustomText';
import {useStyle} from './style';
import {api} from '../../api';

const styles = useStyle();

const ForgotPasswordScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const emailFromLogin = route.params?.email || '';

  const handleForgotPassword = async values => {
    setLoading(true);
    try {
      const response = await api.USERS.forgot_password({
        data: {
          email: values.Email,
        },
      });
      if (response?.status === 'SUCCESS') {
        showSuccess('Reset password link sent to your email!');
        navigation.navigate('Login');
      }
    } catch (error) {
      showError(error?.response?.data?.message || 'Failed to reset password');
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
      <Image source={IMAGES.RegisterImage} style={styles.forgotImage} />
      <Text type="bold" style={styles.forgotText}>
        Forgot Password
      </Text>
      <Formik
        initialValues={{
          Email: emailFromLogin, // Use email from login screen
        }}
        onSubmit={handleForgotPassword}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <View style={styles.InputContainer}>
            <CustomInput
              placeholder="Email"
              value={values.Email}
              onChangeText={handleChange('Email')}
              error={touched.Email && errors.Email}
              backgroundColor={styles.container.backgroundColor}
            />
            <CustomButton
              title="Reset Password"
              onPress={handleSubmit}
              postfixLogo={IMAGES.forgotpassword}
              loading={loading}
            />
          </View>
        )}
      </Formik>
      <View style={styles.LastRow}>
        <Text style={styles.goback}>Go back to</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text type="medium" style={styles.login}>
            {' '}
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingScrollView>
  );
};

export default ForgotPasswordScreen;
