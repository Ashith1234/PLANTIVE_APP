// /home/ashith/Plantive/app/auth/farmer/register.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';

// Import your constants
import { INDIAN_STATES } from '../../../constants/states-districts';
import { FARMER_TYPES, FARMER_CATEGORIES } from '../../../constants/languages';

// Colors
const COLORS = {
  primary: '#38a856',
  secondary: '#76a06a',
  tertiary: '#98be91',
  background: '#eff3ec',
  content: '#062905',
  white: '#ffffff',
  gray: '#888888',
  lightGray: '#e0e0e0',
  error: '#ff4444',
};

// TypeScript Interfaces
interface FormData {
  fullName: string;
  relationship: string;
  relativeName: string;
  mobileNumber: string;
  otp: string;
  age: string;
  gender: string;
  farmerType: string;
  farmerCategory: string;
  state: string;
  district: string;
  subDistrict: string;
  address: string;
  villageTown: string;
  pincode: string;
  idType: string;
  uidNumber: string;
  pmfbyId: string;
  hasIFSC: string;
  ifscCode: string;
  bankState: string;
  bankDistrict: string;
  bankName: string;
  branchName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  captcha: string;
  agreeTerms: boolean;
}

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad';
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  important?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  editable?: boolean;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

// InputField Component
const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  maxLength,
  important = false,
  autoCapitalize = 'sentences',
  secureTextEntry = false,
  editable = true
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>
      {label}
      {important && <Text style={styles.important}> *</Text>}
    </Text>
    <TextInput
      style={[
        styles.input,
        multiline && styles.multilineInput,
        !editable && styles.disabledInput,
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.gray}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={numberOfLines}
      maxLength={maxLength}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      editable={editable}
    />
  </View>
);

// Section Component
const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={styles.sectionLine} />
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionLine} />
    </View>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

export default function FarmerRegister() {
  const router = useRouter();
  
  // Form states
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    relationship: 'S/O',
    relativeName: '',
    mobileNumber: '',
    otp: '',
    age: '',
    gender: 'Male',
    farmerType: 'marginal',
    farmerCategory: 'owner',
    state: '',
    district: '',
    subDistrict: '',
    address: '',
    villageTown: '',
    pincode: '',
    idType: 'UID',
    uidNumber: '',
    pmfbyId: '',
    hasIFSC: 'yes',
    ifscCode: '',
    bankState: '',
    bankDistrict: '',
    bankName: '',
    branchName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    captcha: '',
    agreeTerms: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [filteredDistricts, setFilteredDistricts] = useState<any[]>([]);
  const [filteredBankDistricts, setFilteredBankDistricts] = useState<any[]>([]);

  // Generate random captcha
  function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Handle state selection for residential address
  useEffect(() => {
    if (formData.state) {
      const state = INDIAN_STATES.find(s => s.code === formData.state);
      setFilteredDistricts(state ? state.districts : []);
      setFormData(prev => ({ ...prev, district: '', subDistrict: '' }));
    }
  }, [formData.state]);

  // Handle state selection for bank details
  useEffect(() => {
    if (formData.bankState) {
      const state = INDIAN_STATES.find(s => s.code === formData.bankState);
      setFilteredBankDistricts(state ? state.districts : []);
      setFormData(prev => ({ ...prev, bankDistrict: '' }));
    }
  }, [formData.bankState]);

  // Send OTP
  const handleSendOTP = () => {
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setOtpSent(true);
    Alert.alert(
      'OTP Sent',
      `OTP 123456 has been sent to ${formData.mobileNumber} (Demo Mode)`,
      [{ text: 'OK' }]
    );
  };

  // Verify OTP
  const handleVerifyOTP = () => {
    if (formData.otp === '123456') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setVerified(true);
      Alert.alert('Success', 'Mobile number verified successfully!');
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validation
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid mobile number');
      return;
    }
    if (!verified) {
      Alert.alert('Error', 'Please verify your mobile number with OTP');
      return;
    }
    if (!formData.state) {
      Alert.alert('Error', 'Please select your state');
      return;
    }
    if (!formData.district) {
      Alert.alert('Error', 'Please select your district');
      return;
    }
    if (!formData.pmfbyId.trim()) {
      Alert.alert('PMFBY ID Required', 
        'You need a PMFBY ID to register. Would you like to visit the PMFBY website?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Visit Website', 
            onPress: () => {
              Alert.alert('Redirect', 'Redirecting to pmfby.gov.in');
              setTimeout(() => {
                Alert.alert('Demo', 'In a real app, this would open pmfby.gov.in');
              }, 500);
            }
          }
        ]
      );
      return;
    }
    if (formData.captcha !== captchaCode) {
      Alert.alert('Error', 'Captcha code is incorrect');
      setCaptchaCode(generateCaptcha());
      return;
    }
    if (!formData.agreeTerms) {
      Alert.alert('Error', 'You must agree to the terms and conditions');
      return;
    }

    setLoading(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Registration Successful',
        'Your farmer account has been created successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/farmer/home')
          }
        ]
      );
    }, 2000);
  };

  // Refresh captcha
  const refreshCaptcha = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCaptchaCode(generateCaptcha());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={[COLORS.background, COLORS.white]}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.content} />
            </TouchableOpacity>
            <Text style={styles.title}>Farmer Registration</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.formContainer}>
            {/* Personal Details */}
            <Section title="Personal Details">
              <InputField
                label="Full Name"
                value={formData.fullName}
                onChangeText={(text) => setFormData({...formData, fullName: text})}
                placeholder="Enter your full name"
                important={true}
              />
              
              <View style={styles.row}>
                <View style={[styles.halfInput, { marginRight: 8 }]}>
                  <Text style={styles.label}>Relationship</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={formData.relationship}
                      onValueChange={(value) => setFormData({...formData, relationship: value})}
                      style={styles.picker}
                    >
                      <Picker.Item label="S/O" value="S/O" key="so" />
                      <Picker.Item label="D/O" value="D/O" key="do" />
                      <Picker.Item label="W/O" value="W/O" key="wo" />
                      <Picker.Item label="C/O" value="C/O" key="co" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.halfInput}>
                  <InputField
                    label="Relative Name"
                    value={formData.relativeName}
                    onChangeText={(text) => setFormData({...formData, relativeName: text})}
                    placeholder="Father/Husband name"
                  />
                </View>
              </View>

              {/* Mobile & OTP */}
              <View style={styles.otpContainer}>
                <View style={styles.mobileInput}>
                  <InputField
                    label="Mobile Number"
                    value={formData.mobileNumber}
                    onChangeText={(text) => setFormData({...formData, mobileNumber: text.replace(/[^0-9]/g, '')})}
                    placeholder="10-digit mobile number"
                    keyboardType="phone-pad"
                    maxLength={10}
                    important={true}
                  />
                </View>
                <TouchableOpacity
                  style={[styles.otpButton, !otpSent && styles.otpButtonActive]}
                  onPress={handleSendOTP}
                  disabled={otpSent}
                >
                  <Text style={styles.otpButtonText}>
                    {otpSent ? 'Sent' : 'Send OTP'}
                  </Text>
                </TouchableOpacity>
              </View>

              {otpSent && (
                <View style={styles.otpContainer}>
                  <View style={styles.mobileInput}>
                    <InputField
                      label="Enter OTP"
                      value={formData.otp}
                      onChangeText={(text) => setFormData({...formData, otp: text.replace(/[^0-9]/g, '')})}
                      placeholder="6-digit OTP"
                      keyboardType="number-pad"
                      maxLength={6}
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.otpButton, styles.verifyButton]}
                    onPress={handleVerifyOTP}
                  >
                    <Text style={styles.otpButtonText}>
                      {verified ? 'Verified ✓' : 'Verify'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.row}>
                <View style={[styles.halfInput, { marginRight: 8 }]}>
                  <InputField
                    label="Age"
                    value={formData.age}
                    onChangeText={(text) => setFormData({...formData, age: text.replace(/[^0-9]/g, '')})}
                    placeholder="Age"
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.halfInput}>
                  <Text style={styles.label}>Gender</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={formData.gender}
                      onValueChange={(value) => setFormData({...formData, gender: value})}
                      style={styles.picker}
                    >
                      <Picker.Item label="Male" value="Male" key="male" />
                      <Picker.Item label="Female" value="Female" key="female" />
                      <Picker.Item label="Other" value="Other" key="other" />
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.halfInput, { marginRight: 8 }]}>
                  <Text style={styles.label}>Farmer Type</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={formData.farmerType}
                      onValueChange={(value) => setFormData({...formData, farmerType: value})}
                      style={styles.picker}
                    >
                      {FARMER_TYPES.map(type => (
                        <Picker.Item 
                          key={type.id} 
                          label={type.en}  
                          value={type.id} 
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={styles.halfInput}>
                  <Text style={styles.label}>Farmer Category</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={formData.farmerCategory}
                      onValueChange={(value) => setFormData({...formData, farmerCategory: value})}
                      style={styles.picker}
                    >
                      {FARMER_CATEGORIES.map(category => (
                        <Picker.Item 
                          key={category.id} 
                          label={category.en}  
                          value={category.id} 
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
            </Section>

            {/* Residential Details */}
            <Section title="Residential Details">
              <Text style={styles.label}>State</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.state}
                  onValueChange={(value) => setFormData({...formData, state: value})}
                  style={styles.picker}
                >
                  <Picker.Item label="Select State" value="" key="select-state" />
                  {INDIAN_STATES.map(state => (
                    <Picker.Item key={state.code} label={state.name} value={state.code} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>District</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.district}
                  onValueChange={(value) => setFormData({...formData, district: value})}
                  style={styles.picker}
                  enabled={!!formData.state}
                >
                  <Picker.Item label="Select District" value="" key="select-district" />
                  {filteredDistricts.map(district => (
                    <Picker.Item key={district.code} label={district.name} value={district.code} />
                  ))}
                </Picker>
              </View>

              <InputField
                label="Sub-district/Block"
                value={formData.subDistrict}
                onChangeText={(text) => setFormData({...formData, subDistrict: text})}
                placeholder="Enter sub-district or block"
              />

              <InputField
                label="Village/Town"
                value={formData.villageTown}
                onChangeText={(text) => setFormData({...formData, villageTown: text})}
                placeholder="Enter village or town"
              />

              <InputField
                label="Address"
                value={formData.address}
                onChangeText={(text) => setFormData({...formData, address: text})}
                placeholder="Enter complete address"
                multiline={true}
                numberOfLines={3}
              />

              <InputField
                label="Pincode"
                value={formData.pincode}
                onChangeText={(text) => setFormData({...formData, pincode: text.replace(/[^0-9]/g, '')})}
                placeholder="6-digit pincode"
                keyboardType="number-pad"
                maxLength={6}
              />
            </Section>

            {/* Farmer Identification */}
            <Section title="Farmer Identification">
              <Text style={styles.label}>ID Type</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.idType}
                  onValueChange={(value) => setFormData({...formData, idType: value})}
                  style={styles.picker}
                >
                  <Picker.Item label="UID (Aadhaar)" value="UID" key="uid" />
                  <Picker.Item label="Voter ID" value="VOTER" key="voter" />
                  <Picker.Item label="Driving License" value="DL" key="dl" />
                </Picker>
              </View>

              <InputField
                label="UID Number"
                value={formData.uidNumber}
                onChangeText={(text) => setFormData({...formData, uidNumber: text.replace(/[^0-9]/g, '')})}
                placeholder="12-digit Aadhaar number"
                keyboardType="number-pad"
                maxLength={12}
              />

              <InputField
                label="PMFBY Farmer ID"
                value={formData.pmfbyId}
                onChangeText={(text) => setFormData({...formData, pmfbyId: text})}
                placeholder="Enter PMFBY ID"
                important={true}
              />
              <Text style={styles.note}>
                * If you don't have PMFBY ID, you'll be redirected to pmfby.gov.in
              </Text>
            </Section>

            {/* Bank Details */}
            <Section title="Bank Details">
              <Text style={styles.label}>Do you have IFSC Code?</Text>
              <View style={styles.radioContainer}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setFormData({...formData, hasIFSC: 'yes'})}
                >
                  <View style={styles.radioCircle}>
                    {formData.hasIFSC === 'yes' && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioLabel}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setFormData({...formData, hasIFSC: 'no'})}
                >
                  <View style={styles.radioCircle}>
                    {formData.hasIFSC === 'no' && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioLabel}>No</Text>
                </TouchableOpacity>
              </View>

              {formData.hasIFSC === 'yes' && (
                <>
                  <InputField
                    label="IFSC Code"
                    value={formData.ifscCode}
                    onChangeText={(text) => setFormData({...formData, ifscCode: text.toUpperCase()})}
                    placeholder="11-character IFSC"
                    autoCapitalize="characters"
                  />
                </>
              )}

              <Text style={styles.label}>Bank State</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.bankState}
                  onValueChange={(value) => setFormData({...formData, bankState: value})}
                  style={styles.picker}
                >
                  <Picker.Item label="Select State" value="" key="select-bank-state" />
                  {INDIAN_STATES.map(state => (
                    <Picker.Item key={`bank-${state.code}`} label={state.name} value={state.code} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Bank District</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.bankDistrict}
                  onValueChange={(value) => setFormData({...formData, bankDistrict: value})}
                  style={styles.picker}
                  enabled={!!formData.bankState}
                >
                  <Picker.Item label="Select District" value="" key="select-bank-district" />
                  {filteredBankDistricts.map(district => (
                    <Picker.Item key={`bank-${district.code}`} label={district.name} value={district.code} />
                  ))}
                </Picker>
              </View>

              <InputField
                label="Bank Name"
                value={formData.bankName}
                onChangeText={(text) => setFormData({...formData, bankName: text})}
                placeholder="Enter bank name"
              />

              <InputField
                label="Branch Name"
                value={formData.branchName}
                onChangeText={(text) => setFormData({...formData, branchName: text})}
                placeholder="Enter branch name"
              />

              <InputField
                label="Savings Account Number"
                value={formData.accountNumber}
                onChangeText={(text) => setFormData({...formData, accountNumber: text.replace(/[^0-9]/g, '')})}
                placeholder="Enter account number"
                keyboardType="number-pad"
              />

              <InputField
                label="Confirm Account Number"
                value={formData.confirmAccountNumber}
                onChangeText={(text) => setFormData({...formData, confirmAccountNumber: text.replace(/[^0-9]/g, '')})}
                placeholder="Re-enter account number"
                keyboardType="number-pad"
              />
            </Section>

            {/* Captcha */}
            <Section title="Security Verification">
              <View style={styles.captchaContainer}>
                <View style={styles.captchaDisplay}>
                  <Text style={styles.captchaText}>{captchaCode}</Text>
                  <TouchableOpacity onPress={refreshCaptcha} style={styles.refreshButton}>
                    <Ionicons name="refresh" size={20} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
                <InputField
                  label="Enter Captcha"
                  value={formData.captcha}
                  onChangeText={(text) => setFormData({...formData, captcha: text})}
                  placeholder="Enter the code above"
                  autoCapitalize="characters"
                />
              </View>
            </Section>

            {/* Terms & Conditions */}
            <View style={styles.termsContainer}>
              <CheckBox
                value={formData.agreeTerms}
                onValueChange={(value) => setFormData({...formData, agreeTerms: value})}
                color={formData.agreeTerms ? COLORS.primary : undefined}
              />
              <Text style={styles.termsText}>
                I agree to the Terms & Conditions and Privacy Policy
              </Text>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.submitGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {loading ? (
                  <Text style={styles.submitButtonText}>Processing...</Text>
                ) : (
                  <>
                    <Text style={styles.submitButtonText}>Register</Text>
                    <Ionicons name="arrow-forward" size={20} color={COLORS.white} style={{ marginLeft: 8 }} />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => router.push('/auth/farmer/login')}
            >
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginTextBold}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.content,
    textAlign: 'center',
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.content,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  sectionContent: {
    gap: 15,
  },
  inputContainer: {
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.content,
    marginBottom: 8,
  },
  important: {
    color: COLORS.error,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: COLORS.content,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: COLORS.gray,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
  },
  pickerContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: COLORS.content,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  mobileInput: {
    flex: 1,
  },
  otpButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
  },
  otpButtonActive: {
    backgroundColor: COLORS.tertiary,
  },
  verifyButton: {
    backgroundColor: COLORS.secondary,
  },
  otpButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  radioLabel: {
    fontSize: 16,
    color: COLORS.content,
  },
  note: {
    fontSize: 12,
    color: COLORS.gray,
    fontStyle: 'italic',
    marginTop: 5,
  },
  captchaContainer: {
    gap: 10,
  },
  captchaDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  captchaText: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 3,
    color: COLORS.content,
  },
  refreshButton: {
    padding: 5,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.content,
    lineHeight: 20,
  },
  submitButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitGradient: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    alignItems: 'center',
    marginBottom: 40,
  },
  loginText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
  },
  loginTextBold: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});