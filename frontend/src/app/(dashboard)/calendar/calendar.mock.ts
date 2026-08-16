import { getTodayLocalDateString } from '@renderer/lib/localDate'

/** Mock veri — backend bağlanınca kaldırılacak. */

export type CalendarCategory = 'is' | 'kisisel'
export type CalendarDetailIcon = 'transcribe' | 'location' | 'language'

export interface CalendarReminder {
  id: string
  title: string
  time: string
  category: CalendarCategory
  detailLabel: string
  detailIcon: CalendarDetailIcon
}

const today = new Date()
export const mockVisibleYear = today.getFullYear()
export const mockVisibleMonth = today.getMonth()
/** Stitch export'unda ayın 11'i seçili gösteriliyordu — bugüne sabitledik. */
export const mockSelectedDay = today.getDate()

export const mockRemindersByDay: Record<number, CalendarReminder[]> = {
  4: [
    {
      id: 'cal_4_1',
      title: 'Fatura Ödemesi',
      time: '11:00',
      category: 'kisisel',
      detailLabel: 'Otomatik Ödeme Talimatı',
      detailIcon: 'location'
    }
  ],
  [mockSelectedDay]: [
    {
      id: 'cal_sel_1',
      title: 'Marketing Sync Call',
      time: '09:30',
      category: 'is',
      detailLabel: 'Çok Dilli Deşifre Aktif',
      detailIcon: 'transcribe'
    },
    {
      id: 'cal_sel_2',
      title: 'Diş Randevusu',
      time: '14:15',
      category: 'kisisel',
      detailLabel: 'Şehir Diş Merkezi',
      detailIcon: 'location'
    },
    {
      id: 'cal_sel_3',
      title: 'Almanca Brief Çevirileri',
      time: '16:45',
      category: 'is',
      detailLabel: 'Voia AI Entegrasyonu',
      detailIcon: 'language'
    }
  ],
  17: [
    {
      id: 'cal_17_1',
      title: 'Araç Bakımı',
      time: '10:00',
      category: 'is',
      detailLabel: 'Yetkili Serviste Randevu',
      detailIcon: 'location'
    }
  ]
}

export const mockTodayIso = getTodayLocalDateString()
