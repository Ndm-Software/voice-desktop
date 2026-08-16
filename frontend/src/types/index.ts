/** Backend DB şemasına (USERS, REMINDERS, USER_SETTINGS, REMINDER_HISTORY)
 *  birebir karşılık gelen tipler — backend bağlanınca dönüşüm gerekmez. */

export type ReminderStatus = 'active' | 'completed' | 'missed' | 'cancelled'

export type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'

export type ReminderCategory = 'is' | 'kisisel' | 'saglik' | 'diger'

export interface Reminder {
  reminderId: string
  userId: string
  parentReminderId: string | null
  title: string
  description: string | null
  eventDatetime: string // ISO 8601
  repeatType: RepeatType
  repeatUntil: string | null
  status: ReminderStatus
  isUrgent: boolean
  category: ReminderCategory
  pushEnabled: boolean
  callEnabled: boolean
  createdAt: string
  updatedAt: string
}

export type HistoryType = 'push' | 'call'
export type HistoryStatus = 'delivered' | 'missed' | 'failed' | 'pending'

export interface ReminderHistoryEntry {
  historyId: string
  reminderId: string
  reminderTitle: string
  historyType: HistoryType
  status: HistoryStatus
  provider: string | null
  sentAt: string
  attempt: number
}

export interface User {
  userId: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  phoneVerified: boolean
  createdAt: string
  avatarUrl?: string | null
}

export interface UserSettings {
  userId: string
  languageId: string
  timezone: string
  province: string | null
  notificationsEnabled: boolean
  defaultPushBefore: number
  defaultCallBefore: number
  silentStart: string | null
  silentEnd: string | null
}

export interface PanelSummary {
  activeReminderCount: number
  todaysCallCount: number
  silentHoursActive: boolean
}

/** "Yeni Hatırlatıcı Oluştur" formunun taslak şekli. REMINDERS +
 *  PUSH_NOTIFICATION_SETTINGS + VOICE_CALL_SETTINGS tablolarına karşılık
 *  gelir (minutesBefore alanları o tabloların birebir aynı adlı sütunu). */
export interface ReminderFormInput {
  title: string
  description: string
  date: string // YYYY-MM-DD
  time: string // HH:mm
  repeatType: RepeatType
  pushMinutesBefore: number
  callMinutesBefore: number | null // null = sesli arama kapalı
}

/** DEVICES tablosuna birebir karşılık gelir. */
export type DevicePlatform = 'desktop' | 'web' | 'ios' | 'android'

export interface Device {
  deviceId: string
  userId: string
  platform: DevicePlatform
  deviceName: string
  lastActive: string
  isActive: boolean
}
