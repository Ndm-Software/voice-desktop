import type { User } from '@renderer/types'

/** Paylaşılan mock kullanıcı — Sidebar/TopBar ve Panel aynısını kullanır.
 *  TODO(backend): useCurrentUser() hook'una dönüşecek. */
export const mockCurrentUser: User = {
  userId: 'usr_mock_1',
  firstName: 'Selin',
  lastName: 'Aydın',
  email: 'selin.aydin@voia.com',
  phoneNumber: '+90 532 123 45 67',
  phoneVerified: true,
  createdAt: '2024-01-12T00:00:00',
  avatarUrl: null
}
