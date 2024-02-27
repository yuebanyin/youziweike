import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { Img } from '@/components';
import { useGlobalStore } from '@/mobx';
import findPng from '@/assets/images/common/find.png';
import findActPng from '@/assets/images/common/find-active.png';
import minePng from '@/assets/images/common/mine.png';
import mineActPng from '@/assets/images/common/mine-active.png';
import studyPng from '@/assets/images/common/study.png';
import studyActPng from '@/assets/images/common/study-active.png';
import { useFormatText, useNavigation } from '@/hooks';

const tabbar = [
  {
    icon: findPng,
    active: findActPng,
    path: '/',
    id: 1,
    text: '发现',
    key: 'find',
  },
  {
    icon: studyPng,
    active: studyActPng,
    path: '/start-learn',
    id: 2,
    text: '开始学习',
    key: 'start_study',
  },
  {
    icon: minePng,
    active: mineActPng,
    path: '/mine',
    id: 3,
    text: '个人中心',
    key: 'mine',
  },
];

function Footer() {
  const { showFooter } = useGlobalStore();
  const { pathname } = useLocation();
  const text = useFormatText();
  const navigation = useNavigation();

  if (!showFooter.test(pathname)) return null;

  const handleClick = (info) => {
    if (pathname !== info.path) {
      navigation(info.path);
    }
  };

  return (
    <div className='w-full h-12.5 bg-white py-1.5 flex items-center shadow-lg'>
      {tabbar.map((it) => (
        <div
          className='flex flex-1 flex-col justify-center items-center cursor-pointer'
          onClick={() => {
            handleClick(it);
          }}
          key={it.id}
        >
          <Img className={`w-6 h-6 ${pathname === it.path ? 'hidden' : 'block'}`} src={it.icon} isNoTheme />
          <Img className={`w-6 h-6 ${pathname === it.path ? 'block' : 'hidden'}`} src={it.active} isNoTheme />
          <div className={`text-xs ${pathname === it.path ? 'text-active-text' : 'text-assist'}`}>{text({ text: it.text, key: it.key })}</div>
        </div>
      ))}
    </div>
  );
}

export default observer(Footer);
