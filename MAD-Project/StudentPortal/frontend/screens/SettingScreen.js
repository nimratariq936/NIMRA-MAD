// frontend/screens/SettingScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, colors } from '../styles/GlobalStyles';
import {
  HomeIcon,
  UserIcon,
  BookIcon,
  CalendarIcon,
  StarIcon,
  HelpIcon,
  LogoutIcon,
  ChevronRightIcon,
  NotificationsIcon,
  EmailIcon,
  PhoneIcon,
  LocationIcon,
} from '../components/Icon';

const SettingScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', type: '' });

  const menuSections = [
    {
      title: 'Main',
      items: [
        { icon: <HomeIcon size={22} color={colors.primary} />, title: 'Home', screen: 'HomeTab', stack: 'App' },
        { icon: <UserIcon size={22} color={colors.primary} />, title: 'My Profile', screen: 'ProfileTab', stack: 'App' },
        { icon: <BookIcon size={22} color={colors.primary} />, title: 'Course Enrollment', screen: 'CoursesTab', stack: 'App' },
        { icon: <StarIcon size={22} color={colors.primary} />, title: 'Motivational Quotes', screen: 'QuotesTab', stack: 'App' },
      ]
    },
    {
      title: 'Tools',
      items: [
        { icon: <CalendarIcon size={22} color={colors.primary} />, title: 'My Timetable', screen: 'TimetableTab', stack: 'App' },
        { icon: <NotificationsIcon size={22} color={colors.primary} />, title: 'Notifications', screen: 'Notifications' },
        { icon: <EmailIcon size={22} color={colors.primary} />, title: 'Messages', screen: 'Messages' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: <HelpIcon size={22} color={colors.primary} />, title: 'Help & Support', screen: 'Help' },
        { icon: <PhoneIcon size={22} color={colors.primary} />, title: 'Contact Us', screen: 'Contact' },
      ]
    }
  ];

  const handleMenuItemPress = (item) => {
    if (item.screen === 'Logout') {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: () => navigation.replace('Login')
          }
        ]
      );
    } else if (item.screen === 'Notifications') {
      Alert.alert('No Notifications', `You have no new notifications right now.`);
    } else if (item.screen === 'Messages') {
      Alert.alert('No Messages', `You don't have any messages yet.`);
    } else if (item.screen === 'Contact') {
      setModalContent({ title: 'Contact Us', type: 'contact' });
      setModalVisible(true);
    } else if (item.screen === 'Help') {
      setModalContent({ title: 'Help & Support', type: 'help' });
      setModalVisible(true);
    } else {
      // Logic to navigate to Tab screens or Stack screens
      if (item.stack === 'App') {
        navigation.navigate('App', { screen: item.screen });
      } else {
        navigation.navigate(item.screen);
      }
    }
  };

  const renderMenuItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.menuItem}
      onPress={() => handleMenuItemPress(item)}
    >
      <View style={styles.iconContainer}>
        {item.icon}
      </View>
      <Text style={styles.menuText}>{item.title}</Text>
      <ChevronRightIcon size={18} color={colors.gray} style={styles.chevron} />
    </TouchableOpacity>
  );

  const renderModalContent = () => {
    if (modalContent.type === 'help') {
      return (
        <View>
          <Text style={[GlobalStyles.textSmall, { fontSize: 18, lineHeight: 30, marginBottom: 20 }]}>
            The Riphah Student Portal Help Center provides self-service support, step-by-step guidance, and quick solutions for all portal features, including course enrollment, profile updates, notifications, and academic information. You can explore FAQs, troubleshoot common issues, and get instructions for using every section of the portal.
          </Text>
          <Text style={[GlobalStyles.textSmall, { fontSize: 18, lineHeight: 28, color: colors.darkGray }]}>
            For more information, please contact the administration office or use the 'Contact Us' section.
          </Text>
        </View>
      );
    }

    if (modalContent.type === 'contact') {
      return (
        <View>
          <Text style={[GlobalStyles.subHeader, { marginBottom: 15 }]}>Get in Touch</Text>

          <View style={styles.contactRow}>
            <EmailIcon size={24} color={colors.primary} />
            <Text style={styles.contactText}>support@riphah.edu.pk</Text>
          </View>
          <View style={styles.contactRow}>
            <PhoneIcon size={24} color={colors.primary} />
            <Text style={styles.contactText}>+92 51 111 510 510</Text>
          </View>

          <View style={{ height: 1, backgroundColor: '#eee', marginVertical: 20 }} />

          <Text style={[GlobalStyles.subHeader, { marginBottom: 15 }]}>Social Media</Text>

          <TouchableOpacity style={styles.socialRow}>
            <Ionicons name="logo-instagram" size={28} color="#C13584" />
            <Text style={styles.socialText}>@riphah_university</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialRow}>
            <Ionicons name="logo-facebook" size={28} color="#4267B2" />
            <Text style={styles.socialText}>/RiphahInternationalUniversity</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialRow}>
            <Ionicons name="logo-twitter" size={28} color="#1DA1F2" />
            <Text style={styles.socialText}>@Riphah_Univ</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, itemIndex) =>
                renderMenuItem(item, itemIndex)
              )}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure you want to logout?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Logout',
                  style: 'destructive',
                  onPress: () => navigation.replace('Login')
                }
              ]
            );
          }}
        >
          <LogoutIcon size={20} color={colors.white} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <LocationIcon size={16} color={colors.gray} />
            <Text style={styles.footerText}>Gulberg Green Campus, Islamabad</Text>
          </View>
          <Text style={styles.footerVersion}>Riphah Student Portal v1.0</Text>
        </View>
      </ScrollView>

      {/* Custom Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{modalContent.title}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color={colors.gray} />
                </TouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                {renderModalContent()}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkGray,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray || '#f0f0f0',
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    marginLeft: 12,
    fontWeight: '500',
  },
  chevron: {
    opacity: 0.6,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 10,
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 13,
    color: colors.gray,
    marginLeft: 8,
  },
  footerVersion: {
    fontSize: 12,
    color: colors.gray,
    opacity: 0.7,
    marginTop: 16,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  modalBody: {
    padding: 20,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactText: {
    fontSize: 16,
    color: colors.darkGray,
    marginLeft: 15,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5,
  },
  socialText: {
    fontSize: 16,
    color: colors.primary,
    marginLeft: 15,
    fontWeight: '500',
  },
});

export default SettingScreen;