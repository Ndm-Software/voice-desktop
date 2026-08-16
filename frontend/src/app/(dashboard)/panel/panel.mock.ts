import type { PanelSummary, Reminder } from '@renderer/types'
import { mockCurrentUser } from '@renderer/mocks/currentUser.mock'
import { getTodayLocalDateString } from '@renderer/lib/localDate'

/** Mock veri — backend bağlanınca kaldırılacak.
 *  mockUser, Sidebar/TopBar ile aynı kullanıcıyı paylaşsın diye
 *  mocks/currentUser.mock.ts'ten geliyor. */
export const mockUser = mockCurrentUser

export const mockPanelSummary: PanelSummary = {
  activeReminderCount: 12,
  todaysCallCount: 4,
  silentHoursActive: false
}

const todayIso = getTodayLocalDateString()

export const mockUpcomingReminders: Reminder[] = [
  {
    reminderId: 'rem_1',
    userId: mockUser.userId,
    parentReminderId: null,
    title: 'Doktor Randevusu - Diş Hekimi',
    description: 'Şehir Diş Merkezi',
    eventDatetime: `${todayIso}T14:30:00`,
    repeatType: 'none',
    repeatUntil: null,
    status: 'active',
    isUrgent: false,
    category: 'saglik',
    pushEnabled: true,
    callEnabled: true,
    createdAt: todayIso,
    updatedAt: todayIso
  },
  {
    reminderId: 'rem_2',
    userId: mockUser.userId,
    parentReminderId: null,
    title: 'Market Alışveriş Listesi',
    description: 'Konum bazlı hatırlatma',
    eventDatetime: `${todayIso}T10:00:00`,
    repeatType: 'none',
    repeatUntil: null,
    status: 'active',
    isUrgent: false,
    category: 'kisisel',
    pushEnabled: true,
    callEnabled: false,
    createdAt: todayIso,
    updatedAt: todayIso
  },
  {
    reminderId: 'rem_3',
    userId: mockUser.userId,
    parentReminderId: 'rem_series_1',
    title: 'Anneyi Ara - Doğum Günü',
    description: 'Tekrarlayan hatırlatma',
    eventDatetime: `${todayIso}T18:00:00`,
    repeatType: 'yearly',
    repeatUntil: null,
    status: 'active',
    isUrgent: false,
    category: 'kisisel',
    pushEnabled: true,
    callEnabled: true,
    createdAt: todayIso,
    updatedAt: todayIso
  }
]

/** Mini takvimde nokta ile işaretlenecek günler (ayın günü, 1-31). */
export const mockMarkedDays = [4, 11, 15, 17, 22, 28]
