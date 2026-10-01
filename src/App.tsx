import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LMSProvider } from './context/LMSContext';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { MyCoursesPage } from './pages/MyCourses/MyCoursesPage';
import { ExploreCoursesPage } from './pages/ExploreCourses/ExploreCoursesPage';
import { CourseDetailsPage } from './pages/CourseDetails/CourseDetailsPage';
import { AssignmentsPage } from './pages/Assignments/AssignmentsPage';
import { GradesPage } from './pages/Grades/GradesPage';
import { CertificatesPage } from './pages/Certificates/CertificatesPage';
import { CalendarPage } from './pages/Calendar/CalendarPage';
import { NotificationsPage } from './pages/Notifications/NotificationsPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { SettingsPage } from './pages/Settings/SettingsPage';
import { MessagesPage } from './pages/Messages/MessagesPage';

export function App() {
  return (
    <LMSProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="my-courses" element={<MyCoursesPage />} />
            <Route path="explore" element={<ExploreCoursesPage />} />
            <Route path="courses/:courseId" element={<CourseDetailsPage />} />
            <Route path="assignments" element={<AssignmentsPage />} />
            <Route path="grades" element={<GradesPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            {/* Fallback to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LMSProvider>
  );
}

export default App;
