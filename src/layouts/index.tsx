import { useOutlet } from 'react-router-dom';
import { ConfigProvider } from 'esy-ui';
import { useEffect } from 'react';
import { useChangeTheme } from '@/hooks';
import Header from './header';
import Footer from './footer';
import GlobalStatus from './GlobalStatus';
import { CommonLoading } from '@/components';

function Layout() {
  const CurrentOutlet = useOutlet();
  const { initTheme } = useChangeTheme();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <ConfigProvider isRipple={false}>
      <div className='w-full h-full flex flex-col overflow-hidden bg-default'>
        <CommonLoading />
        <GlobalStatus />
        <Header />
        <div className='flex-1 overflow-y-auto'>{CurrentOutlet}</div>
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default Layout;
