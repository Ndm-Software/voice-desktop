import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";

import DashboardLayout from "./app/(dashboard)/layout";
import PanelPage from "./app/(dashboard)/panel/page";
import CalendarPage from "./app/(dashboard)/calendar/page";
import NewReminderPage from "./app/(dashboard)/calendar/new/page";
import HistoryPage from "./app/(dashboard)/history/page";
import ProfilePage from "./app/(dashboard)/profile/page";
import QuietHoursPage from "./app/(dashboard)/quiet-hours/page";

// Backend bağlandığında gerçek query/mutation'ları (reminders, history,
// settings...) cache'lemek için kullanılacak.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
  },
});

/**
 * Login/Register (Ayşe Sude'nin kodu) hiç değişmedi. Panel/Takvim/Yeni
 * Hatırlatıcı/Geçmiş/Profil/Sessiz Saatler (app/(dashboard)/...) eklendi,
 * ortak bir Sidebar+TopBar kabuğu (DashboardLayout) içinde.
 *
 * Yeni bir dashboard ekranı eklerken: `app/(dashboard)/<ad>/` klasörü aç,
 * buraya import + <Route> ekle. Login/Register'a dokunma.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<DashboardLayout />}>
            <Route path="/panel" element={<PanelPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/calendar/new" element={<NewReminderPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/quiet-hours" element={<QuietHoursPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
}
