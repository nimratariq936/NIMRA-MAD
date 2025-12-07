// frontend/services/firebaseService.js
import { auth, database } from '../config/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  ref,
  set,
  get,
  update,
  push,
  remove,
  query,
  orderByChild,
  equalTo
} from 'firebase/database';

// ========== AUTHENTICATION SERVICES ==========

// Sign up new student
export const signUpStudent = async (email, password, studentData) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create student profile in Realtime Database
    await set(ref(database, `users/${user.uid}`), {
      ...studentData,
      email: email,
      sapId: studentData.sapId,
      fullName: studentData.fullName,
      createdAt: new Date().toISOString(),
      role: 'student',
      enrolledCourses: [],
      totalCredits: 0
    });

    return { success: true, user };
  } catch (error) {
    console.error('Sign up error:', error);
    let errorMessage = 'An error occurred during signup';

    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already registered';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters';
    }

    return { success: false, error: errorMessage };
  }
};

// Login student
export const loginStudent = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login error:', error);
    let errorMessage = 'An error occurred during login';

    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = 'Invalid email or password';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed attempts. Try again later';
    }

    return { success: false, error: errorMessage };
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Auth state listener
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// ========== DATABASE SERVICES ==========

// Get student profile
export const getStudentProfile = async (userId) => {
  try {
    const snapshot = await get(ref(database, `users/${userId}`));

    if (snapshot.exists()) {
      return { success: true, data: snapshot.val() };
    } else {
      return { success: false, error: 'Profile not found' };
    }
  } catch (error) {
    console.error('Get profile error:', error);
    return { success: false, error: error.message };
  }
};

// Update student profile
export const updateStudentProfile = async (userId, profileData) => {
  try {
    await update(ref(database, `users/${userId}`), profileData);
    return { success: true };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, error: error.message };
  }
};

// ========== COURSE SERVICES ==========

// Get all available courses
export const getAllCourses = async () => {
  try {
    const snapshot = await get(ref(database, 'courses'));

    if (snapshot.exists()) {
      const courses = [];
      snapshot.forEach((childSnapshot) => {
        courses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      return { success: true, courses };
    } else {
      return { success: true, courses: [] };
    }
  } catch (error) {
    console.error('Get courses error:', error);
    return { success: false, error: error.message };
  }
};

// Enroll in courses
export const enrollInCourses = async (userId, courses, totalCredits) => {
  try {
    // Create enrollment record
    const enrollmentRef = push(ref(database, 'enrollments'));
    const enrollmentId = enrollmentRef.key;

    await set(enrollmentRef, {
      userId: userId,
      courses: courses.map(course => ({
        id: course.id,
        name: course.name,
        credits: course.credits,
        code: course.code
      })),
      totalCredits: totalCredits,
      enrolledAt: new Date().toISOString(),
      semester: 'Fall 2024'
    });

    // Update user's enrolled courses
    await update(ref(database, `users/${userId}`), {
      enrolledCourses: courses.map(course => ({
        id: course.id,
        name: course.name,
        credits: course.credits,
        code: course.code
      })),
      totalCredits: totalCredits,
      lastEnrollment: new Date().toISOString()
    });

    return { success: true, enrollmentId };
  } catch (error) {
    console.error('Enrollment error:', error);
    return { success: false, error: error.message };
  }
};

// Get student's enrolled courses
export const getStudentEnrollments = async (userId) => {
  try {
    const snapshot = await get(ref(database, 'enrollments'));

    if (snapshot.exists()) {
      const enrollments = [];
      snapshot.forEach((childSnapshot) => {
        const enrollment = childSnapshot.val();
        if (enrollment.userId === userId) {
          enrollments.push({
            id: childSnapshot.key,
            ...enrollment
          });
        }
      });
      return { success: true, enrollments };
    } else {
      return { success: true, enrollments: [] };
    }
  } catch (error) {
    console.error('Get enrollments error:', error);
    return { success: false, error: error.message };
  }
};

// ========== QUOTES SERVICE ==========

// Save favorite quote (optional)
export const saveFavoriteQuote = async (userId, quote, author) => {
  try {
    const quoteRef = push(ref(database, `users/${userId}/favoriteQuotes`));
    await set(quoteRef, {
      quote: quote,
      author: author,
      savedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Save quote error:', error);
    return { success: false, error: error.message };
  }
};

// Get favorite quotes
export const getFavoriteQuotes = async (userId) => {
  try {
    const snapshot = await get(ref(database, `users/${userId}/favoriteQuotes`));

    if (snapshot.exists()) {
      const quotes = [];
      snapshot.forEach((childSnapshot) => {
        quotes.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      return { success: true, quotes };
    } else {
      return { success: true, quotes: [] };
    }
  } catch (error) {
    console.error('Get quotes error:', error);
    return { success: false, error: error.message };
  }
};

// Get students enrolled in a specific course
export const getStudentsForCourse = async (courseId) => {
  try {
    // Note: In a production app with many users, you would query using an index.
    // For this size, fetching all users and filtering is acceptable.
    const snapshot = await get(ref(database, 'users'));

    if (snapshot.exists()) {
      const students = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        if (user.role === 'student' && user.enrolledCourses) {
          const isEnrolled = user.enrolledCourses.some(c => c.id === courseId);
          if (isEnrolled) {
            students.push({
              uid: childSnapshot.key,
              name: user.fullName || 'Unknown',
              email: user.email,
              sapId: user.sapId || 'N/A'
            });
          }
        }
      });
      return { success: true, students };
    } else {
      return { success: true, students: [] };
    }
  } catch (error) {
    console.error('Get students for course error:', error);
    return { success: false, error: error.message };
  }
};

export default {
  signUpStudent,
  loginStudent,
  logoutUser,
  getCurrentUser,
  onAuthStateChange,
  getStudentProfile,
  updateStudentProfile,
  getAllCourses,
  enrollInCourses,
  getStudentEnrollments,
  saveFavoriteQuote,
  getFavoriteQuotes,
  getStudentsForCourse
};