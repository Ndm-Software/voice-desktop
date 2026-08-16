import { useRef } from 'react'
import { Camera } from 'lucide-react'

interface AvatarUploadProps {
  avatarSrc: string | null
  initials: string
  onChange: (fileUrl: string) => void
}

/** Gerçek dosya seçici — seçilen görsel tarayıcı içinde (blob URL ile)
 *  önizlenir. Backend'e yükleme henüz yok (sadece client-side önizleme,
 *  web'in gerçek kodundaki davranışla aynı). */
export function AvatarUpload({ avatarSrc, initials, onChange }: AvatarUploadProps): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0]
    if (!file) return
    onChange(URL.createObjectURL(file))
  }

  return (
    <div className="flex shrink-0 flex-col items-center gap-sm">
      <div className="group relative">
        <div className="h-32 w-32 overflow-hidden rounded-2xl border-2 border-surface-accent shadow-lg">
          {avatarSrc ? (
            <img src={avatarSrc} alt="Profil" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface-container text-2xl font-semibold text-primary">
              {initials}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Fotoğraf değiştir"
          className="absolute -bottom-2 -right-2 rounded-lg bg-primary p-2 text-on-primary shadow-md transition-transform hover:scale-110"
        >
          <Camera size={18} strokeWidth={2} />
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary"
      >
        Fotoğrafı Değiştir
      </button>
    </div>
  )
}
