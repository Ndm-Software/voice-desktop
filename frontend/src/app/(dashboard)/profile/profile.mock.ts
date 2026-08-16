import { mockCurrentUser } from '@renderer/mocks/currentUser.mock'
import type { Device, UserSettings } from '@renderer/types'

/** Mock veri — backend bağlanınca kaldırılacak.
 *  mockUser, Sidebar/TopBar/Panel ile aynı kullanıcıyı paylaşsın diye
 *  mocks/currentUser.mock.ts'ten geliyor. */
export const mockUser = mockCurrentUser

export const mockUserSettings: UserSettings = {
  userId: mockCurrentUser.userId,
  languageId: 'tr',
  timezone: 'Europe/Istanbul',
  province: 'İstanbul',
  notificationsEnabled: true,
  defaultPushBefore: 30,
  defaultCallBefore: 0,
  silentStart: null,
  silentEnd: null
}

/** DEVICES tablosuna karşılık gelir. İlk kayıt "bu cihaz" (Electron
 *  masaüstü) — web'deki mockta "Web/Tarayıcı" yazıyordu, burada doğru
 *  platforma göre (Desktop) uyarlandı. */
export const mockDevices: Device[] = [
  {
    deviceId: 'dev_1',
    userId: mockCurrentUser.userId,
    platform: 'desktop',
    deviceName: 'Windows 11 • Voia Masaüstü',
    lastActive: new Date().toISOString(),
    isActive: true
  },
  {
    deviceId: 'dev_2',
    userId: mockCurrentUser.userId,
    platform: 'ios',
    deviceName: 'iPhone 14 Pro • Voia App',
    lastActive: '2026-08-14T05:30:00',
    isActive: false
  }
]
