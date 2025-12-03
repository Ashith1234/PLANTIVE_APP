import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { COLORS } from '../../constants/colors';
import { router } from 'expo-router';

export default function FarmerHomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Weather Card */}
      <View style={styles.weatherCard}>
        <View style={styles.weatherHeader}>
          <Text style={styles.weatherTitle}>Today's Weather</Text>
          <Text style={styles.weatherLocation}>📍 Your Location</Text>
        </View>
        <View style={styles.weatherContent}>
          <View style={styles.weatherMain}>
            <Text style={styles.temperature}>28°C</Text>
            <Text style={styles.weatherCondition}>Partly Cloudy</Text>
          </View>
          <View style={styles.weatherDetails}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherLabel}>Rainfall</Text>
              <Text style={styles.weatherValue}>0 mm</Text>
            </View>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherLabel}>Humidity</Text>
              <Text style={styles.weatherValue}>65%</Text>
            </View>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherLabel}>Wind</Text>
              <Text style={styles.weatherValue}>12 km/h</Text>
            </View>
          </View>
        </View>
        <Text style={styles.weatherForecast}>Next 3 days: 🌤️ 🌧️ ⛅</Text>
      </View>

      {/* Alert Banner */}
      <View style={styles.alertBanner}>
        <Text style={styles.alertIcon}>⚠️</Text>
        <Text style={styles.alertText}>Possible rain in 24 hours</Text>
      </View>

      {/* Insurance Coverage */}
      <View style={styles.insuranceCard}>
        <Text style={styles.insuranceTitle}>Insurance Coverage</Text>
        <View style={styles.insuranceDetails}>
          <View style={styles.insuranceItem}>
            <Text style={styles.insuranceLabel}>Scheme</Text>
            <Text style={styles.insuranceValue}>PMFBY - Kharif</Text>
          </View>
          <View style={styles.insuranceItem}>
            <Text style={styles.insuranceLabel}>Sum Insured</Text>
            <Text style={styles.insuranceValue}>₹ 40,000</Text>
          </View>
          <View style={styles.insuranceItem}>
            <Text style={styles.insuranceLabel}>Premium</Text>
            <Text style={styles.insuranceValue}>₹ 2,000</Text>
          </View>
          <View style={styles.insuranceItem}>
            <Text style={styles.insuranceLabel}>Valid Till</Text>
            <Text style={styles.insuranceValue}>Dec 2024</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.coverageButton}>
          <Text style={styles.coverageButtonText}>View Coverage Details</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/farmer/capture')}
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>📸</Text>
            </View>
            <Text style={styles.actionTitle}>Capture Crop</Text>
            <Text style={styles.actionDescription}>Upload crop image for AI analysis</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/farmer/status')}
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>📊</Text>
            </View>
            <Text style={styles.actionTitle}>Track Status</Text>
            <Text style={styles.actionDescription}>Check claim progress</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>📞</Text>
            </View>
            <Text style={styles.actionTitle}>Call Support</Text>
            <Text style={styles.actionDescription}>Contact agriculture officer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/farmer/history')}
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>📋</Text>
            </View>
            <Text style={styles.actionTitle}>History</Text>
            <Text style={styles.actionDescription}>View past submissions</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.recentContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.recentList}>
          <View style={styles.recentItem}>
            <View style={styles.recentIcon}>
              <Text style={styles.recentIconText}>✅</Text>
            </View>
            <View style={styles.recentContent}>
              <Text style={styles.recentTitle}>Image Submitted</Text>
              <Text style={styles.recentTime}>2 hours ago</Text>
            </View>
            <Text style={styles.recentStatus}>Processing</Text>
          </View>
          <View style={styles.recentItem}>
            <View style={styles.recentIcon}>
              <Text style={styles.recentIconText}>🌾</Text>
            </View>
            <View style={styles.recentContent}>
              <Text style={styles.recentTitle}>AI Analysis Complete</Text>
              <Text style={styles.recentTime}>Yesterday</Text>
            </View>
            <Text style={styles.recentStatus}>Healthy</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 15,
  },
  weatherCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  weatherTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.content,
  },
  weatherLocation: {
    fontSize: 14,
    color: COLORS.gray,
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherMain: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  weatherCondition: {
    fontSize: 16,
    color: COLORS.gray,
  },
  weatherDetails: {
    gap: 10,
  },
  weatherItem: {
    alignItems: 'flex-end',
  },
  weatherLabel: {
    fontSize: 12,
    color: COLORS.gray,
  },
  weatherValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.content,
  },
  weatherForecast: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    fontSize: 14,
    color: COLORS.gray,
  },
  alertBanner: {
    backgroundColor: COLORS.warning + '20',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  alertIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  alertText: {
    fontSize: 14,
    color: COLORS.content,
    flex: 1,
  },
  insuranceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insuranceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.content,
    marginBottom: 15,
  },
  insuranceDetails: {
    gap: 12,
    marginBottom: 20,
  },
  insuranceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insuranceLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  insuranceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.content,
  },
  coverageButton: {
    backgroundColor: COLORS.tertiary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  coverageButtonText: {
    color: COLORS.content,
    fontWeight: '600',
  },
  actionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.content,
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  actionCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionIconText: {
    fontSize: 24,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.content,
    marginBottom: 5,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 16,
  },
  recentContainer: {
    marginBottom: 30,
  },
  recentList: {
    gap: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  recentIconText: {
    fontSize: 18,
  },
  recentContent: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.content,
    marginBottom: 2,
  },
  recentTime: {
    fontSize: 12,
    color: COLORS.gray,
  },
  recentStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.success,
  },
});