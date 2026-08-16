import type { ReminderHistoryEntry } from '@renderer/types'
import { getOffsetLocalDateString } from '@renderer/lib/localDate'

/** Mock veri — backend bağlanınca kaldırılacak. */
const todayIso = getOffsetLocalDateString(0)
const yesterdayIso = getOffsetLocalDateString(-1)

export const mockHistoryEntries: ReminderHistoryEntry[] = [
  {
    historyId: 'hist_1',
    reminderId: 'rem_101',
    reminderTitle: 'Sabah İlaç Hatırlatması',
    historyType: 'call',
    status: 'delivered',
    provider: 'twilio',
    sentAt: `${todayIso}T08:00:00`,
    attempt: 1
  },
  {
    historyId: 'hist_2',
    reminderId: 'rem_102',
    reminderTitle: 'Doktor Randevusu Kontrolü',
    historyType: 'call',
    status: 'missed',
    provider: 'twilio',
    sentAt: `${todayIso}T10:30:00`,
    attempt: 2
  },
  {
    historyId: 'hist_3',
    reminderId: 'rem_103',
    reminderTitle: 'Haftalık Market Listesi Senkronizasyonu',
    historyType: 'push',
    status: 'delivered',
    provider: 'fcm',
    sentAt: `${todayIso}T14:15:00`,
    attempt: 1
  },
  {
    historyId: 'hist_4',
    reminderId: 'rem_104',
    reminderTitle: 'Çiçekleri Sula',
    historyType: 'push',
    status: 'delivered',
    provider: 'fcm',
    sentAt: `${yesterdayIso}T09:00:00`,
    attempt: 1
  },
  {
    historyId: 'hist_5',
    reminderId: 'rem_105',
    reminderTitle: 'Köpekle Akşam Yürüyüşü',
    historyType: 'call',
    status: 'missed',
    provider: 'twilio',
    sentAt: `${yesterdayIso}T19:30:00`,
    attempt: 2
  }
]
