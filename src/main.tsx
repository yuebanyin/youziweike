import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { routes } from '@/routes';
import { zh, en } from '@/locales';
import { lsGetItem, initRem } from '@/utils';
import '@/styles/global.scss';
import '@/styles/tailwindcss.scss';

// 设置多语言
const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};

// 初始化多语言包
i18n.use(initReactI18next).init({
  resources,
  lng: lsGetItem('lang') || 'zh',
  fallbackLng: 'zh',
  interpolation: {
    escapeValue: false,
  },
});

// 开发环境增加调试工具
if (process.env.NODE_ENV === 'development') {
  let vc = null;
  const script: HTMLScriptElement = document.createElement('script');
  if (script) {
    script.setAttribute('src', 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('async', 'async');
    script.setAttribute('defer', 'defer');
    script.setAttribute('charset', 'URT-8');
    script.onload = () => {
      const VConsole = window?.VConsole;
      if (VConsole && !vc) {
        // vc = new VConsole();
      } else {
        vc = null;
      }
    };
    document.body.append(script);
  }
}

const container = document.getElementById('root');

const root = createRoot(container);

// 适配
initRem();

root.render(
  <React.Suspense fallback={null}>
    <RouterProvider router={createBrowserRouter(routes, { basename: '/web-h5' })} />
  </React.Suspense>
);
