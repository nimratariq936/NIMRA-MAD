// frontend/screens/CourseDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform, ActivityIndicator } from 'react-native';
import { GlobalStyles, colors } from '../styles/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';
import { getStudentsForCourse, getCurrentUser, getStudentProfile, updateStudentProfile } from '../services/firebaseService';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

const CourseDetailScreen = ({ route, navigation }) => {
    const { course } = route.params;
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const result = await getStudentsForCourse(course.id);
            if (result.success) {
                setStudents(result.students);
            } else {
                Alert.alert('Error', 'Failed to load enrolled students');
            }
        } catch (error) {
            console.error('Fetch students error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = () => {
        Alert.alert(
            'Confirm Withdrawal',
            `Are you sure you want to withdraw from ${course.name}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes, Withdraw',
                    style: 'destructive',
                    onPress: processWithdrawal
                }
            ]
        );
    };

    const processWithdrawal = async () => {
        const user = getCurrentUser();
        if (!user) {
            Alert.alert('Error', 'You must be logged in to withdraw.');
            return;
        }

        setProcessing(true);

        try {
            const profileResult = await getStudentProfile(user.uid);

            if (profileResult.success && profileResult.data) {
                const userData = profileResult.data;
                const currentEnrolled = userData.enrolledCourses || [];
                const currentCredits = userData.totalCredits || 0;

                const newEnrolledList = currentEnrolled.filter(c => c.id !== course.id);

                if (newEnrolledList.length === currentEnrolled.length) {
                    Alert.alert('Info', 'You are not enrolled in this course.');
                    navigation.goBack();
                    return;
                }

                const newCredits = currentCredits - course.credits;

                const updateResult = await updateStudentProfile(user.uid, {
                    enrolledCourses: newEnrolledList,
                    totalCredits: newCredits
                });

                if (updateResult.success) {
                    Alert.alert('Success', `Withdrawn from ${course.name}`, [
                        { text: 'OK', onPress: () => navigation.goBack() }
                    ]);
                } else {
                    Alert.alert('Error', 'Failed to withdraw course');
                }
            } else {
                Alert.alert('Error', 'Failed to fetch user profile');
            }
        } catch (error) {
            console.error('Withdrawal error:', error);
            Alert.alert('Error', 'An error occurred during withdrawal');
        } finally {
            setProcessing(false);
        }
    };

    const generateAndShareCSV = async () => {
        try {
            let csvContent = "Name,Email,SAP ID\n";
            students.forEach(student => {
                csvContent += `"${student.name}","${student.email}","${student.sapId}"\n`;
            });

            const fileName = `${course.code}_Students.csv`;

            if (Platform.OS === 'web') {
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                const fileUri = FileSystem.documentDirectory + fileName;
                await FileSystem.writeAsStringAsync(fileUri, csvContent, {
                    encoding: 'utf8',
                });

                const isAvailable = await Sharing.isAvailableAsync();
                if (isAvailable) {
                    await Sharing.shareAsync(fileUri);
                } else {
                    Alert.alert('Error', 'Sharing is not available on this device');
                }
            }
        } catch (error) {
            console.error('CSV export error details:', error);
            Alert.alert('Export Error', `Failed to export CSV: ${error.message}`);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Course Header Info */}
            <View style={styles.headerCard}>
                <View style={styles.titleRow}>
                    <Text style={styles.courseCode}>{course.code}</Text>
                    <View style={styles.creditBadge}>
                        <Text style={styles.creditText}>{course.credits} Credits</Text>
                    </View>
                </View>
                <Text style={styles.courseName}>{course.name}</Text>

                {/* Instructor Info */}
                <Text style={styles.instructorText}>
                    Instructor: {course.instructor || "Not specified"}
                </Text>

                {/* Short Description */}
                <View style={styles.descriptionSection}>
                    <Text style={styles.sectionSubtitle}>Course Overview</Text>
                    <Text style={styles.descriptionText}>
                        {course.description || "No description available."}
                    </Text>
                </View>

                {/* Detailed Description */}
                <View style={styles.detailSection}>
                    <Text style={styles.sectionSubtitle}>Course Details</Text>
                    <Text style={styles.detailText}>
                        {course.detail || "No detailed information available for this course."}
                    </Text>
                </View>
            </View>

            {/* Student List Preview */}
            <View style={styles.listSection}>
                <Text style={styles.sectionTitle}>Enrolled Students ({students.length})</Text>
                {loading ? (
                    <Text style={styles.loadingText}>Loading students...</Text>
                ) : students.length === 0 ? (
                    <Text style={styles.emptyText}>No other students enrolled yet.</Text>
                ) : (
                    <View style={styles.studentList}>
                        {students.map((student, index) => (
                            <View key={index} style={styles.studentItem}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>
                                        {student.name.charAt(0).toUpperCase()}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.studentName}>{student.name}</Text>
                                    <Text style={styles.studentEmail}>{student.email}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            {/* Action Section */}
            <View style={styles.actionSection}>
                <Text style={styles.sectionTitle}>Course Actions</Text>
                <TouchableOpacity
                    style={styles.csvButton}
                    onPress={generateAndShareCSV}
                    disabled={loading}
                >
                    <Ionicons name="download-outline" size={24} color={colors.white} />
                    <Text style={styles.csvButtonText}>Download Student List (CSV)</Text>
                </TouchableOpacity>
            </View>

            {/* Withdraw Button */}
            <View style={styles.footerSection}>
                <TouchableOpacity
                    style={styles.withdrawButton}
                    onPress={handleWithdraw}
                    disabled={processing}
                >
                    {processing ? (
                        <ActivityIndicator color={colors.white} />
                    ) : (
                        <>
                            <Ionicons name="trash-outline" size={20} color={colors.white} />
                            <Text style={styles.withdrawButtonText}>Withdraw Course</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerCard: {
        backgroundColor: colors.white,
        padding: 20,
        margin: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    courseCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.gray,
    },
    creditBadge: {
        backgroundColor: colors.secondary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    creditText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '600',
    },
    courseName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 8,
    },
    instructorText: {
        fontSize: 15,
        color: colors.primary,
        fontWeight: '600',
        marginBottom: 16,
        fontStyle: 'italic',
    },
    descriptionSection: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    detailSection: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    sectionSubtitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 15,
        color: colors.text || '#333',
        lineHeight: 22,
        textAlign: 'left',
        marginBottom: 4,
    },
    detailText: {
        fontSize: 14,
        color: colors.text || '#444',
        lineHeight: 22,
        textAlign: 'justify',
    },
    actionSection: {
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.black,
        marginBottom: 12,
        marginLeft: 4,
    },
    csvButton: {
        flexDirection: 'row',
        backgroundColor: '#27ae60',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    csvButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    listSection: {
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    loadingText: {
        textAlign: 'center',
        color: colors.gray,
        marginTop: 20,
    },
    emptyText: {
        fontStyle: 'italic',
        color: colors.gray,
        marginLeft: 4,
    },
    studentList: {
        backgroundColor: colors.white,
        borderRadius: 12,
        overflow: 'hidden',
    },
    studentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    studentName: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.black,
    },
    studentEmail: {
        fontSize: 12,
        color: colors.gray,
    },
    footerSection: {
        paddingHorizontal: 16,
        paddingBottom: 40,
        marginTop: 10,
    },
    withdrawButton: {
        flexDirection: 'row',
        backgroundColor: '#ff4444',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    withdrawButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    }
});

export default CourseDetailScreen;