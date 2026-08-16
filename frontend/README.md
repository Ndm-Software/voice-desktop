# frontend

React + TypeScript + Tailwind, Vite ile çalışıyor. Electron'un
yüklediği arayüzün kendisi. Çalışma şekli için proje kökündeki
`README.md`'ye bakılabilir.

```
src/
  pages/auth/          Login, Register
  components/          Login/Register bileşenleri + layout/ (Sidebar, TopBar — tüm ekranlarda ortak)
  app/(dashboard)/      Panel, Takvim, Geçmiş, Profil ekranları
  lib/, mocks/, services/, types/   Ekranlar arası paylaşılan kod
```

```bash
npm install
npm run dev     # http://localhost:5173
```
