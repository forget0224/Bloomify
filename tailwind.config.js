/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js', // datepicker
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['NotoSerifTC', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar-variants'),
    require('@gradin/tailwindcss-scrollbar')({
      size: '5px', // width or height, default '5px'
      // track: {
      //   background: 'white', // default '#f1f1f1'
      //   // add other css attributes here,
      //   // will be merged to ::-webkit-scrollbar-track
      // },
      // thumb: {
      //   background: '#272727', // default '#c1c1c1'
      //   borderRadius: '5px',
      //   // add other css attributes here,
      //   // will be merged to ::-webkit-scrollbar-thumb
      // },
      // hover: {
      //   background: '#272727', // default '#a8a8a8'
      //   borderRadius: '5px',
      //   // add other css attributes here,
      //   // will be merged to ::-webkit-scrollbar-thumb:hover
      // },
    }),
    nextui({
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: {
              100: '#68A392',
              200: '#A5D1AE',
              300: '#DBEDDF',
              400: '#F6FBF7',
              DEFAULT: '#68A392',
            },
            secondary: {
              100: '#FFC1B4',
              200: '#FFEBE7',
              300: '#FFFBFA',
              DEFAULT: '#FFEBE7',
            },
            tertiary: {
              black: '#272727',
              blue: '#394A54',
              'gray-100': '#959595',
              'gray-200': '#E4E4E4',
            },
            danger: {
              DEFAULT: '#FF7C7C',
            },
          },
        },
      },
      layout: {
        fontSize: {
          // xxs: '0.625rem',
          // xs: '0.75rem',
          // sm: '0.875rem',
          // base: '1rem',
          tiny: '0.75rem', //12
          small: '0.875rem', //14
          medium: '1rem', //16
          large: '1.125rem', //18
        },
      },
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
