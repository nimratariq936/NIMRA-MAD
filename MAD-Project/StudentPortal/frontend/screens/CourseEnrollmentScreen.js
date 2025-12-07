// frontend/screens/CourseEnrollmentScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { GlobalStyles, colors } from '../styles/GlobalStyles';
import { getAllCourses, enrollInCourses, getCurrentUser, getStudentProfile } from '../services/firebaseService';

const CourseEnrollmentScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState(route.params?.initialTab || 'enrolled'); // 'enrolled' or 'add'
  const [selectedCourses, setSelectedCourses] = useState([]); // Courses selected in 'add' tab
  const [enrolledCourses, setEnrolledCourses] = useState([]); // Courses already enrolled
  const [totalCredits, setTotalCredits] = useState(0); // Total credits (enrolled + selected)
  const [courses, setCourses] = useState([]); // All available courses
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const user = getCurrentUser();

      // 1. Fetch All Courses
      const coursesResult = await getAllCourses();
      let allCourses = [];
      if (coursesResult.success) {
        allCourses = coursesResult.courses;
        setCourses(coursesResult.courses);
      } else {
        Alert.alert('Error', 'Failed to fetch courses. Using sample data.');
        allCourses = getMockCourses();
        setCourses(allCourses);
      }

      // 2. Fetch User Profile/Enrollments if logged in
      if (user) {
        const profileResult = await getStudentProfile(user.uid);
        if (profileResult.success && profileResult.data) {
          const userData = profileResult.data;
          let userEnrollments = userData.enrolledCourses || [];
          const userCredits = userData.totalCredits || 0;

          // 3. ENRICH ENROLLED COURSES WITH FULL COURSE DATA
          // This ensures enrolled courses have instructor, description, and detail
          userEnrollments = userEnrollments.map(enrolledCourse => {
            // Find the full course data from allCourses
            const fullCourse = allCourses.find(c => c.id === enrolledCourse.id);

            // If we found the full course, merge the data
            if (fullCourse) {
              return {
                ...enrolledCourse,
                // Use Firebase data first, fallback to mock data
                instructor: enrolledCourse.instructor || fullCourse.instructor || "Not specified",
                description: enrolledCourse.description || fullCourse.description || "No description available.",
                detail: enrolledCourse.detail || fullCourse.detail || "No detailed information available."
              };
            }

            // If not found, add default values
            return {
              ...enrolledCourse,
              instructor: enrolledCourse.instructor || "Not specified",
              description: enrolledCourse.description || "No description available.",
              detail: enrolledCourse.detail || "No detailed information available."
            };
          });

          setEnrolledCourses(userEnrollments);
          setTotalCredits(userCredits);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'An error occurred while loading data');
    } finally {
      setLoading(false);
    }
  };

  const getMockCourses = () => {
    return [
      {
        id: 'course1',
        name: 'Parallel and Distributed Computing',
        credits: 3,
        code: 'CS101',
        instructor: 'Ms. Hajra Murtaza',
        description: 'Computing tasks shared across multiple systems.',
        detail: 'This course explores how complex problems are solved efficiently by distributing tasks across multiple processors and systems. Learn principles and techniques for designing scalable, high-performance applications. Includes both theory and practical implementations with hands-on experience. Marks breakup: Assignment (10%), Quizzes (20%), Class Participation (5%), Midterm (20%), Endterm (30%), Project + Lab (15%). 75% attendance required for final exam eligibility.'
      },
      {
        id: 'course2',
        name: 'Data Structures',
        credits: 3,
        code: 'CS102',
        instructor: 'Ms. Seemab Karim',
        description: 'Study of data organization and algorithms.',
        detail: 'Covers fundamental data structures including dynamic arrays, linked lists, stacks, queues, trees, heaps, and tables. Implement structures in C++ and learn to select appropriate data structures for various scenarios. Course prerequisites: Object Oriented Programming. Grading: Quizzes (10%), Assignments (10%), Lab (20%), Project (10%), Midterm (15%), Final (30%), Participation (5%).'
      },
      {
        id: 'course3',
        name: 'Database Systems',
        credits: 3,
        code: 'CS103',
        instructor: 'Ms. Elma Afsar',
        description: 'Introduction to database management systems.',
        detail: 'Learn database design, management, and SQL querying. Create and optimize relational databases for efficient data storage and retrieval. Develop practical skills for real-world data management applications. Grading: Quizzes (15%), Midterm (20%), Lab (20%), Project (10%), Final (30%), Attendance (5%). Contact hours: Tuesday after 12:00 PM.'
      },
      {
        id: 'course4',
        name: 'Operating Systems',
        credits: 3,
        code: 'CS104',
        instructor: 'Ms. Anum Aleem',
        description: 'Study of operating system concepts',
        detail: 'Study core operating system principles including process management, memory management, file systems, and resource allocation. Gain practical insights into system-level programming for efficient control and optimization of system resources. Grading: Quizzes (15%), Assignments (10%), Labs (25%), Midterm (20%), Final (30%). Contact: Monday-Thursday 11:00 AM - 3:00 PM.'
      },
      {
        id: 'course5',
        name: 'Software Engineering',
        credits: 3,
        code: 'CS105',
        instructor: 'Ms. Sabahat Ajaz',
        description: 'Software development lifecycle and methodologies',
        detail: 'Learn software development methodologies, project management, and system design principles. Course includes 2 hours Thursday (11:30 AM - 1:30 PM) and 1 hour Tuesday (2:50 PM - 3:50 PM). Grading: Quizzes (15%), Assignment (5%), Project (15%), Presentation (10%), Midterm (25%), Final (30%). 75% attendance required.'
      },
      {
        id: 'course6',
        name: 'Applied Physics',
        credits: 3,
        code: 'CS106',
        instructor: 'Ms. Shabeya Kanwal',
        description: 'Practical concepts of physics in applications.',
        detail: 'Physics fundamentals for engineering applications. Develop problem-solving skills in mathematics, physics, and chemistry for undergraduate engineering contexts. Course code: MT-1323. Grading: Quizzes (10%), Assignments (10%), Midterm (30%), Final (50%). Instructor has 8+ years teaching experience.'
      },
      {
        id: 'course7',
        name: 'Mobile App Development',
        credits: 3,
        code: 'CS107',
        instructor: 'Ms. Kausar Nasreen Khattak',
        description: 'Developing mobile applications for iOS and Android',
        detail: 'Build modern mobile applications with hands-on exercises and practical projects. Learn dynamic and efficient app development techniques. Grading: Quizzes (15%), Assignments (15%), Midterm (20%), Final (30%), Project (20%). Consultation: Wednesday 11:00 AM - 1:00 PM, Friday 1:00 PM - 3:30 PM.'
      },
      {
        id: 'course8',
        name: 'Digital Logic & Design',
        credits: 3,
        code: 'CS108',
        instructor: 'Ms. Sidra Zubair',
        description: 'Introduction to digital circuits and logic.',
        detail: 'Introduction to digital systems including combinational logic, arithmetic circuits, sequential circuits, and state machines. Study logic gates, flip-flops, counters, registers, and modern logic devices. Grading: Quizzes (10%), Project (10%), Lab (10%), Midterm (30%), Final (40%). Contact hours: Friday 9:00 AM - 10:00 AM.'
      },
    ];
  };

  // Callback to refresh data when returning from CourseDetail (after withdraw)
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  // Update active tab if explicitly requested via navigation params
  React.useEffect(() => {
    if (route.params?.initialTab) {
      setActiveTab(route.params.initialTab);
      // Reset param to avoid sticking to this tab on subsequent renders if needed
      navigation.setParams({ initialTab: undefined });
    }
  }, [route.params?.initialTab]);

  const toggleCourse = (course) => {
    const isSelected = selectedCourses.some(c => c.id === course.id);

    if (isSelected) {
      setSelectedCourses(selectedCourses.filter(c => c.id !== course.id));
      setTotalCredits(totalCredits - course.credits);
    } else {
      if (totalCredits + course.credits > 20) {
        Alert.alert('Credit Limit', 'You cannot exceed 20 credit hours');
        return;
      }
      setSelectedCourses([...selectedCourses, course]);
      setTotalCredits(totalCredits + course.credits);
    }
  };

  const handleEnrollment = async () => {
    if (selectedCourses.length === 0) {
      Alert.alert('Selection Required', 'Please select at least one course to enroll');
      return;
    }

    const user = getCurrentUser();
    if (!user) {
      Alert.alert('Authentication Required', 'You need to login first', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => navigation.navigate('Login') }
      ]);
      return;
    }

    setEnrolling(true);

    try {
      // Merge previously enrolled courses with newly selected ones
      const finalCourseList = [...enrolledCourses, ...selectedCourses];
      const finalCredits = totalCredits;

      const result = await enrollInCourses(user.uid, finalCourseList, finalCredits);

      if (result.success) {
        Alert.alert(
          'Success',
          `Successfully enrolled in new courses. Total Credits: ${finalCredits}`,
          [
            {
              text: 'OK',
              onPress: () => {
                // Refresh data to update "Enrolled" tab and clear selection
                fetchData();
                setSelectedCourses([]);
                setActiveTab('enrolled');
              }
            }
          ]
        );
      } else {
        Alert.alert('Enrollment Failed', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during enrollment');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <View style={GlobalStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={GlobalStyles.loadingText}>Loading data...</Text>
      </View>
    );
  }

  // Filter out already enrolled courses for the "Add" view
  const availableCourses = courses.filter(
    course => !enrolledCourses.some(e => e.id === course.id)
  );

  return (
    <View style={[GlobalStyles.screenContainer, { padding: 0 }]}>
      <View style={{ marginTop: 10, padding: 20, paddingBottom: 10 }}>
        <Text style={GlobalStyles.header}>Course Enrollment</Text>
      </View>

      {/* Tabs */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 15 }}>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 12,
            alignItems: 'center',
            backgroundColor: activeTab === 'enrolled' ? colors.primary : '#e0e0e0',
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
          onPress={() => setActiveTab('enrolled')}
        >
          <Text style={{
            color: activeTab === 'enrolled' ? '#fff' : '#333',
            fontWeight: '600'
          }}>
            Enrolled Courses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 12,
            alignItems: 'center',
            backgroundColor: activeTab === 'add' ? colors.primary : '#e0e0e0',
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }}
          onPress={() => setActiveTab('add')}
        >
          <Text style={{
            color: activeTab === 'add' ? '#fff' : '#333',
            fontWeight: '600'
          }}>
            Add Courses
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}>

        {activeTab === 'enrolled' && (
          <View style={GlobalStyles.card}>
            <Text style={GlobalStyles.subHeader}>
              Your Enrolled Courses ({enrolledCourses.length})
            </Text>

            {enrolledCourses.length === 0 ? (
              <Text style={[GlobalStyles.text, { fontStyle: 'italic', textAlign: 'center', marginTop: 20 }]}>
                You haven't enrolled in any course yet.
              </Text>
            ) : (
              enrolledCourses.map((course, index) => (
                <View key={index} style={{
                  padding: 15,
                  marginVertical: 5,
                  backgroundColor: colors.background,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#ddd',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                      // SOLUTION 4: Ensure we have all required fields before navigation
                      // Find full course data with instructor, description, and detail
                      const fullCourseData = courses.find(c => c.id === course.id) || course;

                      // Ensure we have all required fields with fallbacks
                      const courseToSend = {
                        ...fullCourseData,
                        instructor: fullCourseData.instructor || course.instructor || "Not specified",
                        description: fullCourseData.description || course.description || "No description available.",
                        detail: fullCourseData.detail || course.detail || "No detailed information available."
                      };

                      navigation.navigate('CourseDetail', {
                        course: courseToSend
                      });
                    }}
                  >
                    <View>
                      <Text style={[GlobalStyles.text, { fontWeight: '600', textDecorationLine: 'underline' }]}>
                        {course.name} ({course.code})
                      </Text>
                      <Text style={[GlobalStyles.text, { color: colors.primary }]}>
                        {course.credits} Credit Hours
                      </Text>
                      <Text style={{ fontSize: 10, color: 'gray', marginTop: 2 }}>
                        Tap for details &amp; actions
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Withdraw Button Removed */}
                </View>
              ))
            )}
          </View>
        )}

        {activeTab === 'add' && (
          <View style={GlobalStyles.card}>
            <Text style={GlobalStyles.subHeader}>
              Available Courses (Selected: {totalCredits}/20)
            </Text>

            {availableCourses.map((course) => {
              const isSelected = selectedCourses.some(c => c.id === course.id);

              return (
                <TouchableOpacity
                  key={course.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 15,
                    marginVertical: 5,
                    backgroundColor: isSelected ? 'rgba(79, 142, 247, 0.2)' : colors.background,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: isSelected ? colors.primary : '#ddd',
                  }}
                  onPress={() => toggleCourse(course)}
                  disabled={enrolling}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: colors.primary,
                      backgroundColor: isSelected ? colors.primary : 'transparent',
                      marginRight: 15,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[GlobalStyles.text, { fontWeight: '600' }]}>
                      {course.name} ({course.code})
                    </Text>
                    <Text style={[GlobalStyles.text, { color: colors.primary }]}>
                      {course.credits} Credit Hours
                    </Text>
                    {course.description && (
                      <Text style={GlobalStyles.textSmall}>
                        {course.description}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}

            {availableCourses.length === 0 && (
              <Text style={[GlobalStyles.text, { fontStyle: 'italic', textAlign: 'center', marginTop: 20 }]}>
                No more courses available to enroll.
              </Text>
            )}

            <TouchableOpacity
              style={[GlobalStyles.button, { marginTop: 20 }]}
              onPress={handleEnrollment}
              disabled={enrolling || selectedCourses.length === 0}
            >
              {enrolling ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={GlobalStyles.buttonText}>
                  {selectedCourses.length === 0 ? 'Select Courses' : `Enroll in ${selectedCourses.length} New Course(s)`}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CourseEnrollmentScreen;