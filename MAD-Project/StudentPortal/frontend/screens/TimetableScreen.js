// frontend/screens/TimetableScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, colors } from '../styles/GlobalStyles';
import { getStudentProfile, getCurrentUser } from '../services/firebaseService';

const TimetableScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timetable, setTimetable] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfile();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchProfile = async () => {
    try {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const result = await getStudentProfile(currentUser.uid);
        if (result.success) {
          setProfile(result.data);
          generateTimetable(result.data.enrolledCourses || []);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateTimetable = (courses) => {
    if (!courses || courses.length === 0) {
      setTimetable([]);
      return;
    }

    // Correct Instructor Mapping
    const instructorMap = {
      'CS101': 'Ms. Hajra Murtaza',
      'CS102': 'Ms. Seemab Karim',
      'CS103': 'Ms. Elma Afsar',
      'CS104': 'Ms. Anum Aleem',
      'CS105': 'Ms. Sabahat Ajaz',
      'CS106': 'Ms. Shabeya Kanwal',
      'CS107': 'Ms. Kausar Nasreen Khattak',
      'CS108': 'Ms. Sidra Zubair',
    };

    // Fallback if code isn't available, try name
    const instructorNameMap = {
      'Parallel and Distributed Computing': 'Ms. Hajra Murtaza',
      'Data Structures': 'Ms. Seemab Karim',
      'Database Systems': 'Ms. Elma Afsar',
      'Operating Systems': 'Ms. Anum Aleem',
      'Software Engineering': 'Ms. Sabahat Ajaz',
      'Applied Physics': 'Ms. Shabeya Kanwal',
      'Mobile App Development': 'Ms. Kausar Nasreen Khattak',
      'Digital Logic & Design': 'Ms. Sidra Zubair',
    };

    // 1.5 hour slots
    const timeSlots = [
      '08:00 AM - 09:30 AM',
      '09:30 AM - 11:00 AM',
      '11:00 AM - 12:30 PM',
      '12:30 PM - 02:00 PM',
      '02:00 PM - 03:30 PM',
      '03:30 PM - 05:00 PM'
    ];

    const generatedTimetable = [];

    courses.forEach((course, index) => {
      const courseName = course.name || course;
      const courseCode = course.code;

      // Determine instructor
      let instructor = 'TBA';
      if (courseCode && instructorMap[courseCode]) {
        instructor = instructorMap[courseCode];
      } else if (instructorNameMap[courseName]) {
        instructor = instructorNameMap[courseName];
      } else if (course.instructor && course.instructor !== 'Not specified') {
        instructor = course.instructor;
      } else {
        instructor = 'Faculty';
      }

      const room = `Room ${Math.floor(Math.random() * 50) + 1}`;

      // Assign two distinct slots per course
      // Strategy: 
      // Slot 1: Day = index % 5. Time = index % 4
      // Slot 2: Day = (index + 2) % 5. Time = (index + 1) % 4 (stagger time too)

      const day1Index = index % 5;
      const day2Index = (index + 2) % 5;

      const slot1Index = index % 6; // Use mod 6 for 6 slots
      const slot2Index = (index + 3) % 6; // Shift time significantly for second class

      // Class 1
      generatedTimetable.push({
        id: `${index}-1`,
        day: days[day1Index],
        time: timeSlots[slot1Index],
        slotIndex: slot1Index, // For sorting
        course: courseName,
        room: room,
        instructor: instructor
      });

      // Class 2
      generatedTimetable.push({
        id: `${index}-2`,
        day: days[day2Index],
        time: timeSlots[slot2Index],
        slotIndex: slot2Index, // For sorting
        course: courseName,
        room: room,
        instructor: instructor
      });
    });

    setTimetable(generatedTimetable);
  };

  const handleEnrollNow = () => {
    navigation.navigate('CourseEnrollment', { initialTab: 'add' });
  };

  if (loading) {
    return (
      <View style={GlobalStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={GlobalStyles.loadingText}>Loading timetable...</Text>
      </View>
    );
  }

  const hasCourses = timetable.length > 0;

  // Filter and sort classes for the selected day
  const todaysClasses = timetable
    .filter(item => item.day === selectedDay)
    .sort((a, b) => a.slotIndex - b.slotIndex);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Text style={styles.headerTitle}>My Timetable</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CourseEnrollment', { initialTab: 'add' })}
          style={styles.enrollButton}
        >
          <Ionicons name="add-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {hasCourses ? (
        <>
          {/* Day Toggles */}
          <View style={styles.dayToggleContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }}>
              {days.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    selectedDay === day && styles.dayButtonActive
                  ]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text style={[
                    styles.dayButtonText,
                    selectedDay === day && styles.dayButtonTextActive
                  ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Timetable Summary for Selected Day */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{selectedDay}'s Schedule</Text>
            <Text style={styles.classCountText}>{todaysClasses.length} Classes</Text>
          </View>

          {/* Dynamic Content */}
          <View style={styles.section}>
            {todaysClasses.length > 0 ? (
              <View style={styles.timetableCard}>
                {todaysClasses.map((item) => (
                  <View key={item.id} style={styles.timetableItem}>
                    <View style={styles.timeColumn}>
                      <Text style={styles.timeStart}>{item.time.split(' - ')[0]}</Text>
                      <Text style={styles.timeEnd}>{item.time.split(' - ')[1]}</Text>
                    </View>

                    <View style={styles.dividerVertical} />

                    <View style={styles.timetableContent}>
                      <Text style={styles.courseName}>{item.course}</Text>
                      <View style={styles.timetableDetails}>
                        <View style={styles.detailItem}>
                          <Ionicons name="business" size={14} color={colors.gray} />
                          <Text style={styles.detailText}>{item.room}</Text>
                        </View>
                        <View style={styles.detailItem}>
                          <Ionicons name="person" size={14} color={colors.gray} />
                          <Text style={styles.detailText}>{item.instructor}</Text>
                        </View>
                        <View style={styles.detailItem}>
                          <Ionicons name="time" size={14} color={colors.gray} />
                          <Text style={styles.detailText}>1 hr 30 min</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.noClassesContainer}>
                <Ionicons name="happy-outline" size={48} color={colors.gray} />
                <Text style={styles.noClassesText}>No classes scheduled for {selectedDay}.</Text>
                <Text style={styles.noClassesSubText}>Enjoy your free time!</Text>
              </View>
            )}
          </View>

          {/* Overall Summary Card (Moved down) */}


        </>
      ) : (
        /* Empty Timetable State */
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="calendar" size={80} color={colors.secondary} />
          </View>
          <Text style={styles.emptyTitle}>No Timetable Available</Text>
          <Text style={styles.emptyText}>
            Your timetable will appear here once you enroll in courses.
          </Text>
          <TouchableOpacity style={styles.enrollNowButton} onPress={handleEnrollNow}>
            <Ionicons name="book" size={20} color={colors.white} />
            <Text style={styles.enrollNowText}>Enroll in Courses Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginTop: 30,
  },
  enrollButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  // Day Toggle Styles
  dayToggleContainer: {
    marginTop: 20,
    marginBottom: 10,
    height: 50,
  },
  dayButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: colors.white,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dayButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray,
  },
  dayButtonTextActive: {
    color: colors.white,
  },
  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  classCountText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  section: {
    paddingHorizontal: 16,
  },
  timetableCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timetableItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray || '#f0f0f0',
    alignItems: 'center',
  },
  timeColumn: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeStart: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  timeEnd: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  dividerVertical: {
    width: 2,
    height: '100%',
    backgroundColor: colors.lightGray || '#f0f0f0',
    marginHorizontal: 12,
  },
  timetableContent: {
    flex: 1,
    justifyContent: 'center',
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 6,
  },
  timetableDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  detailText: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 4,
  },
  // No Classes State
  noClassesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  noClassesText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray,
    marginTop: 10,
  },
  noClassesSubText: {
    fontSize: 14,
    color: colors.secondary,
    marginTop: 5,
  },
  // Summary Card (Bottom)
  summaryCard: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginVertical: 20,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryTextBold: {
    marginLeft: 10,
    fontWeight: '700',
    color: colors.darkGray,
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.lightGray || '#f0f0f0',
  },
  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  enrollNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  enrollNowText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default TimetableScreen;