import {useState} from 'react';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {Image, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import {IMAGES} from '../../assets';
import {loginValidationSchema} from '../../utils/validationSchema';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useStyle} from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showSuccess, showError} from '../../utils/helper';
import Text from '../../components/CustomText';
import {api} from '../../api';
import {useDispatch} from 'react-redux';
import {setToken, setUserData} from '../../redux/reducers/authslice';

const styles = useStyle();
const LoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = async values => {
    setLoading(true);
    try {
      const response = await api.USERS.login({
        data: {
          email: values.Email,
          password: values.Password,
        },
      });
      if (response?.data?.token) {
        await AsyncStorage.setItem('token', response?.data?.token);
        await new Promise(resolve => {
          dispatch(setToken(response?.data?.token));
          dispatch(setUserData(response?.data?.user));
          resolve();
        });
        showSuccess('Login Successful');
      }
    } catch (error) {
      showError(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.imageView}>
        <Image source={IMAGES.LoginImage} style={styles.loginImage} />
      </View>
      <View style={styles.mainView}>
        <Text type="bold" style={styles.LoginText}>
          Login
        </Text>
        <Formik
          initialValues={{
            Email: '',
            Password: '',
          }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}>
          {({handleChange, handleSubmit, values, errors, touched}) => {
            return (
              <>
                <View style={styles.InputContainer}>
                  <CustomInput
                    placeholder="Email"
                    keyboardType="email-address"
                    value={values.Email}
                    onChangeText={handleChange('Email')}
                    error={touched?.Email && errors?.Email}
                    backgroundColor={styles.container.backgroundColor}
                  />
                  <CustomInput
                    placeholder="Password"
                    value={values.Password}
                    onChangeText={handleChange('Password')}
                    isPassword={true}
                    error={touched?.Password && errors?.Password}
                    backgroundColor={styles.container.backgroundColor}
                  />
                </View>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ForgotPassword', {email: values.Email})
                  }
                  style={styles.ForgotPasswordContainer}>
                  <Text type="mediumitalic" style={styles.ForgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                <CustomButton
                  title="Login"
                  onPress={handleSubmit}
                  postfixLogo={IMAGES.login}
                  loading={loading}
                />
              </>
            );
          }}
        </Formik>
        <View style={styles.LastRow}>
          <Text style={styles.noAccountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text type="medium" style={styles.Register}>
              {' '}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingScrollView>
  );
};

export default LoginScreen;
