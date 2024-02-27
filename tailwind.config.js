/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/esy-ui/es/**/*.mjs'],
  theme: {
    fontSize: {
      mini: ['0.625rem', '0.875rem'],
      xs: ['0.75rem', '1.125rem'],
      sm: ['0.875rem', '1.375rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.25rem', '1.875rem'],
      xl: ['1.5rem', '2.25rem'],
      '2xl': ['2rem', '3rem'],
      5: '1.25rem',
    },

    extend: {
      minWidth: {
        32.5: '8.15rem',
        28: '7rem',
      },
      maxWidth: {
        20.5: '5.125rem',
        28: '7rem',
        '3/5': '60%',
      },
      width: {
        5.5: '1.375rem',
        50: '12.5rem',
        45: '11.25rem',
        25: '6.25rem',
        26: '6.375rem',
        32.5: '8.15rem',
        21: '5.25rem',
        22: '5.5rem',
        54: '13.5rem',
        86: '21.5rem',
        31: '7.75rem',
        46: '11.5rem',
        75: '18.75rem',
        76: '19rem',
        38: '9.5rem',
        42: '10.5rem',
        70: '17.5rem',
        78: '19.5rem',
        57: '14.25rem',
        62: '15.5rem',
        15: '3.75rem',
      },
      maxHeight: {
        18.5: '4.625rem',
        100: '25rem',
      },
      height: {
        5.5: '1.375rem',
        50: '12.5rem',
        45: '11.25rem',
        46: '11.5rem',
        15: '3.75rem',
        18.5: '4.625rem',
        12.5: '3.125rem',
        19: '4.75rem',
        42: '10.5rem',
        62: '15.5rem',
        82: '20.5rem',
        92: '23rem',
        21: '5.25rem',
        30: '7.5rem',
        164: '41rem',
        25: '6.25rem',
        54: '13.5rem',
        44: '11rem',
      },
      top: {
        50: '12.5rem',
      },
      colors: {
        primary: '#3a7afa',
        'primary-text': '#242424',
        assist: '#888888',
        default: '#f9f9f9',
        'primary-hover': 'rgba(58,122,250, 0.2)',
        success: '#00c48a',
        warning: '#FFC329',
        'chat-act-bg': 'rgba(255,187,34,.51)',
        'active-bg': '#FFF0EC',
        'active-text': '#FF5A31',
        error: '#f44330',
        'disabled-text': '#e0e0e1',
        disabled: '#a5a5a5',
        'input-bg': '#F3F3F3',
        desc: '#c9c9c9',
        label: '#BFBFBF',
        gray: '#c3c3c3',
        chat: '#212228',
        mask: 'rgba(0,0,0,0.6)',
        mask5: 'rgba(0,0,0,0.5)',
        live: '#34343F',
        clear: 'rgba(0,0,0,0.3)',
        placeholder: '#C3C3C3',
        icon: 'gray',
        'table-header': '#f5f5f5',
        'pri-red': '#ff5151',
        guide: '#c3c3c3',
        split: '#ececec',
        'btn-gray': 'b0b0b0',
        gold: '#fdce8b',
        red2: '#BB2207',
        red3: '#76110b',
        red4: '#f33b36',
        price: '#ff6e41',
        start: '#d7b584',
        blue: '#397BFC',
        'vip-word2': '#ffd79c',
        'vip-word1': '#9d630b',
        brown: '#c02d3f',
        brownness: '#9d630b',
        green1: '#00b277',
      },
      animation: {
        'checked-animate': 'checked-animate 0.2s ease-in-out forwards',
        'translate-x-100-0': 'translate-x-100-0 0.3s',
        'translate-x-0-100': 'translate-x-0-100 0.3s forwards',
        'translate-x-m100-0': 'translate-x-m100-0 0.3s',
        skeleton: 'translate-x-m100-0 1s infinite',
        'translate-x-0-m100': 'translate-x-0-m100 0.3s',
        'translate-y-m100-0': 'translate-y-m100-0 0.3s',
        'translate-y-0-m100': 'translate-y-0-m100 0.3s',
        'translate-y-100-0': 'translate-y-100-0 0.3s',
        'translate-y-0-100': 'translate-y-0-100 0.3s',
        'zoom-0-100': 'zoom-0-100 0.3s',
        'zoom-100-0': 'zoom-100-0 0.3s',
        'opacity-100-0': 'opacity-100-0 0.5s ease-in-out infinite alternate',
        'opacity-0-100': 'opacity-0-100 0.3s ease-in-out',
        'rotate-0-360': 'rotate-0-360 0.8s linear infinite',
        'scale-y-1-2': 'scale-y-1-2 0.5s ease-in-out infinite alternate',
        cube: 'cube 1.2s ease-in-out infinite',
        'move-down-to-up': 'move-down-to-up 0.3s',
        'standard-line': 'standard-line 0.25s ease-in-out forwards',
        'scroll-x': 'scroll-x linear infinite',
        'leave-x-in': 'leave-x-in 0.3s forwards',
        'leave-x-out': 'leave-x-out 0.5s forwards',
      },
      keyframes: {
        'checked-animate': {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(0.5)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        'translate-x-100-0': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
        'translate-x-0-100': {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'translate-x-m100-0': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
        'translate-x-0-m100': {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
        'translate-y-m100-0': {
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'translateY(0%)',
          },
        },
        'translate-y-0-m100': {
          '0%': {
            transform: 'translateY(0%)',
          },
          '100%': {
            transform: 'translateY(-100%)',
          },
        },
        'translate-y-100-0': {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0%)',
          },
        },
        'translate-y-0-100': {
          '0%': {
            transform: 'translateY(0%)',
          },
          '100%': {
            transform: 'translateY(100%)',
          },
        },
        'zoom-0-100': {
          '0%': {
            transform: 'scale(0%)',
          },
          '100%': {
            transform: 'scale(100%)',
          },
        },
        'zoom-100-0': {
          '0%': {
            transform: 'scale(100%)',
          },
          '100%': {
            transform: 'scale(0%)',
          },
        },
        'opacity-100-0': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        'opacity-0-100': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'rotate-0-360': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        'scale-y-1-2': {
          '0%': {
            transform: 'scaleY(1)',
          },
          '100%': {
            transform: 'scaleY(2)',
          },
        },
        cube: {
          '0%': {
            transform: 'scale(0.9)',
            opacity: '0.9',
          },
          '100%': {
            transform: 'rotate(90deg) translateY(-100%) scale(0.3)',
            opacity: '0',
          },
        },
        'move-down-to-up': {
          '0%': {
            transform: 'translate(0, -100%)',
            opacity: '0.5',
          },
          '100%': {
            transform: 'translate(0, 0)',
            opacity: '1',
          },
        },
        'standard-line': {
          '0%': {
            transform: 'scaleX(1)',
          },
          '10%': {
            transform: 'scaleX(0)',
          },
          '100%': {
            transform: 'scaleX(1)',
          },
        },
        'scroll-x': {
          '0%': {
            transform: 'attr("data-translatex")',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
        'leave-x-in': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0%)',
            opacity: '1',
          },
        },
        'leave-x-out': {
          '0%': {
            transform: 'translateX(0%)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
        },
      },
      zIndex: {
        1: '1',
        2: '2',
        100: '100',
        101: '101',
        102: '102',
        1000: '1000',
      },
      boxShadow: {
        card: ' 0 3px 1px -2px rgb(0 0 0 / 24%), 0 2px 2px 0 rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 10%)',
        title: '0px 2px 10px 0px rgba(255, 80, 80, 0.3)',
        up: '0px -4px 10px 0px rgba(0, 0, 0, 0.04)',
        down: '0px 1px 4px 0px rgba(0, 0, 0, 0.04)',
        tile: '1px 1px 10px 0px rgba(0, 0, 0, 0.04), -1px -1px 10px 0px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '2/5': '40%',
        half: '50%',
        5: '1.25rem',
        7.5: '1.875rem',
      },
      transitionProperty: {
        border: 'border',
        filter: 'filter',
        'z-index': 'z-index',
        'border-bg-color': 'border-color,background-color',
        'left-top': 'left,top',
      },
      backgroundImage: {
        'white-gray-1': 'linear-gradient(180deg, hsl(0deg 0% 100% / 90%), hsl(0deg 0% 100% / 40%)),linear-gradient(0deg, hsl(0deg 0% 100% / 90%), hsl(0deg 0% 100% / 40%))',
        skeleton: 'linear-gradient(90deg, hsl(0deg 0% 100% / 10%), hsl(0deg 0% 100% / 50%), hsl(0deg 0% 100% / 0%))',
        'grad-red': 'linear-gradient(270deg, #ff3898 0%, #ff5a31 100%)',
        'grad-red2': 'linear-gradient(180deg, #ff2b0a 0%, #db2c2e 100%)',
        'grad-red3': 'linear-gradient(90deg, #FB4E1F 0%, #F00 102.55%)',
        'act-grad2': 'linear-gradient(180deg, #fff8d3 0%, #ffe350 100%)',
        'grad-deepRed': 'linear-gradient(180deg, #ff493f 0%, #9b0900 100%)',
        'grad-orange2': 'linear-gradient(180deg, #ff9333 0%, #ff1200 100%)',
        'grad-orange': 'linear-gradient(180deg,#ffb39b 0%,#ff835e 50.52%, #f5673c 100%)',
        'vip-grad1': 'linear-gradient(180deg, #5f5f5f 0%, #171412 100%)',
        'act-grad1': 'linear-gradient(180deg, #ff718d 0%, #fa1f4a 100%)',
      },
      backgroundPosition: {
        'top-bottom': 'top, bottom',
      },
      spacing: {
        4: '1rem',
        4.5: '1.125rem',
        '1/5': '20%',
        '7/10': '70%',
        '2/5': '40%',
        '3/5': '60%',
        '13/50': '26%',
        '17/20': '85%',
        '2/1': '200%',
        85: '21.25rem',
      },
      scale: {
        85: '85%',
      },
      transitionDuration: {
        250: '250ms',
      },
      flex: {
        '1-0-auto': '1 0 auto',
        '1/3': '33.333333%',
      },
    },
  },
};
