import type { QuietHoursDay } from '@renderer/types'

/** Mock veri — backend bağlanınca kaldırılacak. */
export const mockDays: QuietHoursDay[] = [
  { day: 'Pazartesi', enabled: true, startTime: '22:00', endTime: '07:00' },
  { day: 'Salı', enabled: true, startTime: '22:00', endTime: '07:00' },
  { day: 'Çarşamba', enabled: true, startTime: '22:00', endTime: '07:00' },
  { day: 'Perşembe', enabled: true, startTime: '22:00', endTime: '07:00' },
  { day: 'Cuma', enabled: true, startTime: '23:00', endTime: '09:00' },
  { day: 'Cumartesi', enabled: false, startTime: '00:00', endTime: '00:00' },
  { day: 'Pazar', enabled: false, startTime: '00:00', endTime: '00:00' }
]

export const mockEmergencyBypassEnabled = false
