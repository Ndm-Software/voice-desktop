import { AlertTriangle, X } from 'lucide-react'

interface DeleteAccountModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

/** Açılma/kapanma gerçekten çalışıyor. "Evet, Hesabımı Sil" backend'e
 *  bağlanana kadar sadece modalı kapatır — gerçek silme işlemi yapmaz. */
export function DeleteAccountModal({ open, onClose, onConfirm }: DeleteAccountModalProps): JSX.Element | null {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-2xl border border-outline-variant bg-surface-container-lowest p-lg shadow-panel">
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-md top-md flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high"
        >
          <X size={16} strokeWidth={2} />
        </button>

        <div className="mb-md flex h-14 w-14 items-center justify-center rounded-2xl bg-status-error-bg">
          <AlertTriangle size={26} strokeWidth={2} className="text-status-error" />
        </div>

        <h3 className="mb-sm font-headline-sm text-headline-sm text-on-surface">Hesabı Sil</h3>
        <p className="mb-lg font-body-md text-body-md leading-relaxed text-on-surface-variant">
          Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve{' '}
          <span className="font-semibold text-status-error">tüm verileriniz kalıcı olarak silinir.</span>
        </p>

        <div className="flex items-center gap-sm">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl bg-surface-container px-md py-sm font-body-md text-body-md font-bold text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            İptal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-status-error px-md py-sm font-body-md text-body-md font-bold text-white transition-colors hover:opacity-90"
          >
            Evet, Hesabımı Sil
          </button>
        </div>
      </div>
    </div>
  )
}
