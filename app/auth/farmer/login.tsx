import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../../constants/colors';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { router } from 'expo-router';

export default function FarmerLoginScreen() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaCode, setCaptchaCode] = useState('ABCD12');
  const [loading, setLoading] = useState(false);

  const refreshCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let newCaptcha = '';
    for (let i = 0; i < 6; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(newCaptcha);
  };

  const handleLogin = () => {
    if (!mobile || !password || !captcha) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (captcha.toUpperCase() !== captchaCode) {
      Alert.alert('Error', 'Invalid captcha code');
      return;
    }

    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      router.replace('/farmer/home');
    }, 1500);
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Reset link will be sent to your registered mobile number');
  };

  const handleDeactivate = () => {
    Alert.alert(
      'Deactivate Account',
      'Are you sure you want to deactivate your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Deactivate', style: 'destructive' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Farmer Login</Text>
        <Text style={styles.subtitle}>किसान लॉगिन</Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Mobile Number"
          placeholder="Enter 10-digit mobile number"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          maxLength={10}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.captchaContainer}>
          <Text style={styles.captchaLabel}>Captcha</Text>
          <View style={styles.captchaBox}>
            <Text style={styles.captchaText}>{captchaCode}</Text>
            <TouchableOpacity onPress={refreshCaptcha} style={styles.refreshButton}>
              <Text style={styles.refreshIcon}>🔄</Text>
            </TouchableOpacity>
          </View>
          <Input
            placeholder="Enter captcha code"
            value={captcha}
            onChangeText={setCaptcha}
            style={styles.captchaInput}
          />
        </View>

        <Button
          title="Login"
          onPress={handleLogin}
          loading={loading}
          style={styles.loginButton}
        />

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>|</Text>
          <TouchableOpacity onPress={() => router.push('/auth/farmer/register')}>
            <Text style={styles.linkText}>New User? Register</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleDeactivate} style={styles.deactivateButton}>
          <Text style={styles.deactivateText}>Deactivate Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.content,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.gray,
  },
  form: {
    gap: 20,
  },
  captchaContainer: {
    gap: 10,
  },
  captchaLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.content,
  },
  captchaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 8,
    padding: 15,
  },
  captchaText: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 5,
    color: COLORS.content,
  },
  refreshButton: {
    padding: 5,
  },
  refreshIcon: {
    fontSize: 24,
  },
  captchaInput: {
    marginTop: 10,
  },
  loginButton: {
    marginTop: 20,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginVertical: 20,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    color: COLORS.gray,
    fontSize: 16,
  },
  deactivateButton: {
    alignSelf: 'center',
    paddingVertical: 10,
  },
  deactivateText: {
    color: COLORS.error,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});