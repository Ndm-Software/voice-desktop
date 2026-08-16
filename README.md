# Voia Desktop

Voia'nın masaüstü uygulaması. `electron/` (pencereyi açan ana süreç) ve
`frontend/` (React + TypeScript + Tailwind arayüz, Vite ile çalışıyor)
olmak üzere iki ayrı paketten oluşuyor.


```bash
# frontend/ içinde
npm install && npm run dev     # http://localhost:5173

# electron/ içinde (frontend çalışırken)
npm install && npm start
```

Sadece arayüzü incelemek için Electron'a gerek yok — Vite sunucusu
çalışırken `http://localhost:5173` bir tarayıcıda da açılabilir.

## Ekranlar

`frontend/src/app/(dashboard)/` altında, her biri kendi klasöründe:

| Ekran | Route |
|---|---|
| Panel | `/panel` |
| Takvim | `/calendar` |
| Yeni Hatırlatıcı Oluştur | `/calendar/new` |
| Geçmiş | `/history` |
| Profil | `/profile` |

