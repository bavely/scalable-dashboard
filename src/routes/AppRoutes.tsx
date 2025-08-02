import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import ErrorBoundary from '../components/Shared/ErrorBoundary';
import Main from '../components/Shared/Main';
import { Toaster } from "@/components/ui/sonner"

const UserListPage = lazy(() => import('../pages/UserListPage'));
const AddUserPage = lazy(() => import('../pages/AddUserPage'));

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Main>
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/users" element={<UserListPage />} />
          <Route path="/add" element={<AddUserPage />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
    </Main>
    <Toaster />
  </BrowserRouter>
);

export default AppRoutes;
