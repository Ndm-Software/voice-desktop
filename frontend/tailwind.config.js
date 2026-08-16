/** @type {import('tailwindcss').Config} */
// Bu token'lar, paylaşılan Google Stitch tasarımından (Panel/Takvim/Sessiz
// Saatler export'ları) BİREBİR alınmıştır — kendi rakamlarımızı uydurmak
// yerine, Stitch'in kendi tailwind.config'indeki `colors`, `borderRadius`,
// `spacing`, `fontFamily`, `fontSize` nesneleri buraya taşındı. Böylece:
//   1) Panel burada, Stitch'te ne görünüyorsa birebir aynı görünür,
//   2) İleride Takvim / Geçmiş / Sessiz Saatler / Profil eklenince
//      aynı token'lar (örn. `bg-surface-container-lowest`,
//      `rounded-xl`, `p-md`, `text-headline-sm`) tekrar kullanılır —
//      her ekran için yeniden tasarım sistemi kurulmaz.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'status-error-bg': '#FDEDEC',
        'surface-accent': '#D6F0EB',
        outline: '#6f7975',
        'on-tertiary-container': '#c9e3de',
        background: '#fbf9f8',
        'on-secondary-container': '#276e5d',
        'surface-tint': '#056b59',
        error: '#ba1a1a',
        'secondary-container': '#a8eed8',
        'outline-variant': '#bec9c4',
        'interactive-blue': '#0563C1',
        surface: '#fbf9f8',
        'inverse-surface': '#303030',
        'surface-bright': '#fbf9f8',
        'tertiary-container': '#4e6662',
        'surface-container': '#efeded',
        'on-tertiary-fixed-variant': '#344b48',
        'on-primary': '#ffffff',
        'status-error': '#C0392B',
        'on-surface-variant': '#3e4945',
        'surface-container-low': '#f5f3f3',
        'on-secondary': '#ffffff',
        'on-primary-container': '#9aedd6',
        'secondary-fixed': '#aaf0db',
        'surface-dim': '#dbdad9',
        'status-warning': '#F39C12',
        'surface-variant': '#e4e2e2',
        'surface-container-highest': '#e4e2e2',
        'secondary-fixed-dim': '#8fd4bf',
        'on-secondary-fixed': '#002019',
        'primary-fixed-dim': '#84d6c0',
        'primary-fixed': '#a0f2db',
        'surface-subtle': '#F8F9FA',
        'surface-container-lowest': '#ffffff',
        'tertiary-fixed': '#cee8e3',
        'inverse-primary': '#84d6c0',
        'primary-container': '#0d6e5c',
        'status-success-bg': '#D6F0EB',
        primary: '#005445',
        'on-error-container': '#93000a',
        secondary: '#216959',
        'on-surface': '#1b1c1c',
        'on-error': '#ffffff',
        'on-primary-fixed': '#002019',
        'tertiary-fixed-dim': '#b2ccc7',
        'error-container': '#ffdad6',
        'surface-container-high': '#eae8e7',
        tertiary: '#374e4b',
        'on-tertiary-fixed': '#071f1d',
        'on-tertiary': '#ffffff',
        'on-secondary-fixed-variant': '#005142',
        'on-background': '#1b1c1c',
        'on-primary-fixed-variant': '#005143',
        'inverse-on-surface': '#f2f0f0'
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px'
      },
      spacing: {
        xl: '80px',
        'margin-mobile': '16px',
        'margin-desktop': '32px',
        lg: '48px',
        xs: '8px',
        gutter: '24px',
        md: '24px',
        base: '4px',
        sm: '16px'
      },
      fontFamily: {
        'headline-lg-mobile': ['Inter'],
        'body-lg': ['Inter'],
        'headline-sm': ['Inter'],
        'label-sm': ['Inter'],
        'headline-md': ['Inter'],
        'body-md': ['Inter'],
        'headline-lg': ['Inter'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      fontSize: {
        'headline-lg-mobile': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'body-lg': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'headline-sm': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        'label-sm': ['12px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '600' }],
        'headline-md': ['21px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-md': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'headline-lg': ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }]
      },
      boxShadow: {
        // Stitch'teki .custom-shadow / .ambient-card / .card-ambient class'ı
        card: '0px 4px 20px rgba(13, 110, 92, 0.05)'
      }
    }
  },
  plugins: []
}
