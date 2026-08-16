import { Monitor, Smartphone } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import type { Device } from '@renderer/types'

const PLATFORM_ICON: Record<Device['platform'], typeof Monitor> = {
  desktop: Monitor,
  web: Monitor,
  ios: Smartphone,
  android: Smartphone
}

interface DeviceListItemProps {
  device: Device
}

/** DEVICES tablosundaki tek bir kaydı gösterir. Aktif cihaz (bu cihaz)
 *  vurgulu, diğerleri "son görülme" bilgisiyle nötr gösterilir. */
export function DeviceListItem({ device }: DeviceListItemProps): JSX.Element {
  const Icon = PLATFORM_ICON[device.platform]

  return (
    <div
      className={[
        'relative flex items-center gap-md overflow-hidden rounded-xl p-md',
        device.isActive
          ? 'border border-primary/20 bg-surface-accent/30'
          : 'border border-outline-variant bg-surface-subtle'
      ].join(' ')}
    >
      {device.isActive && <span className="absolute bottom-0 left-0 top-0 w-1 bg-primary" />}
      <div
        className={[
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
          device.isActive ? 'bg-surface-accent text-primary' : 'bg-surface-container text-on-surface-variant'
        ].join(' ')}
      >
        <Icon size={20} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="flex items-center gap-xs font-body-md text-body-md font-bold text-on-surface">
          {device.deviceName}
          {device.isActive && (
            <span className="rounded-full bg-primary-container px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              Aktif
            </span>
          )}
        </p>
        <p className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">
          {device.isActive
            ? 'Şu anda kullanılıyor'
            : `Son görülme: ${formatDistanceToNow(new Date(device.lastActive), { locale: tr, addSuffix: true })}`}
        </p>
      </div>
    </div>
  )
}
