/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      defaultTheme: 'light',
      // themes: {
      //   modern: {
      //     extend: 'light', // <- inherit default values from dark theme
      //     colors: {
      //       background: '#0D001A',
      //       foreground: '#ffffff',
      //       primary: {
      //         50: '#A5D1AE',
      //         100: '#DBEDDF',

      //         DEFAULT: '#68A392',
      //         foreground: '#ffffff',
      //       },
      //       // focus: '#F182F6',
      //     },
      //   },
      // },
      // layout: {
      //   spacingUnit: 4, // in px
      //   disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
      //   dividerWeight: '1px', // h-divider the default height applied to the divider component
      //   fontSize: {
      //     tiny: '0.75rem', // text-tiny
      //     small: '0.875rem', // text-small
      //     medium: '1rem', // text-medium
      //     large: '1.125rem', // text-large
      //   },
      //   lineHeight: {
      //     tiny: '1rem', // text-tiny
      //     small: '1.25rem', // text-small
      //     medium: '1.5rem', // text-medium
      //     large: '1.75rem', // text-large
      //   },
      //   radius: {
      //     small: '8px', // rounded-small
      //     medium: '12px', // rounded-medium
      //     large: '14px', // rounded-large
      //   },
      //   borderWidth: {
      //     small: '1px', // border-small
      //     medium: '2px', // border-medium (default)
      //     large: '3px', // border-large
      //   },
      // },
    }),
  ],
}
