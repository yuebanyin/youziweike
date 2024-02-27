import { isArray, Dialog } from 'esy-ui';
import { useEffect, useState } from 'react';
import delPng from '@/assets/images/common/del.png';
import hotPng from '@/assets/images/common/Vector.png';
import searchPng from '@/assets/images/common/search.png';
import { Img } from '@/components';
import { getHotSearch } from '@/services';
import { formatW, ssGetJsonItem, ssSetJsonItem } from '@/utils';
import { useFormatText, useNavigation } from '@/hooks';

export const defaultSearchValue = '110元奖学金待领取';

function HotSearch() {
  const [val, setVal] = useState('');
  const [historys, setHistorys] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [hotTexts, setHotTexts] = useState<any[]>([]);
  const navigation = useNavigation();
  const text = useFormatText();

  useEffect(() => {
    const hs = ssGetJsonItem('search-history');
    if (isArray(hs) && hs.length) {
      setHistorys(hs);
    }
  }, []);

  console.warn(val, open);

  useEffect(() => {
    getHotSearch({})
      .then((res: any) => {
        setHotTexts(res?.data?.data);
      })
      .catch(() => {
        setHotTexts([]);
      });
  }, []);

  //
  const changeValue = (e) => {
    setVal(e?.target?.value);
  };

  const activeClick = () => {
    if (val && val !== defaultSearchValue) {
      navigation(`detail?search=${val}`);
    } else {
      navigation({ url: '/packQuickview/scholarship/index' });
    }
    const value = val || defaultSearchValue;
    const newHistorys: string[] = [];
    historys.forEach((his) => {
      if (newHistorys.length >= 7) {
        //
      } else if (his === value) {
        // 其他位置
      } else {
        newHistorys.push(his);
      }
    });
    setHistorys([value, ...newHistorys]);
    ssSetJsonItem('search-history', [value, ...newHistorys]);
    val && setVal('');
  };

  const getColor = (i) => {
    if (i === 0) {
      return 'text-error';
    }
    if (i === 1) {
      return 'text-active-text';
    }
    if (i === 2) {
      return 'text-warn';
    }
    return 'text-assist';
  };

  const itemClick = (t) => {
    if (t === defaultSearchValue) {
      navigation({ url: '/packQuickview/scholarship/index' });
    } else {
      navigation(`detail?search=${t}`);
    }
    const newHistorys: string[] = [];
    historys.forEach((his) => {
      if (newHistorys.length >= 7) {
        //
      } else if (his === t) {
        // 其他位置
      } else {
        newHistorys.push(his);
      }
    });
    setHistorys([t, ...newHistorys]);
    ssSetJsonItem('search-history', [t, ...newHistorys]);
    setVal('');
  };

  const onHotSearch = (info) => {
    if (info.type === 1) {
      // 详情页
      navigation({
        url: `/packDetail/lessonDetail/index?classId=${info.configData}`,
      });
    } else if (info.type === 2) {
      // 福利页
      navigation({
        url: `/packQuickview/welFare/index?id=${info.configData}`,
      });
    }
  };

  return (
    <div className='bg-white w-full h-full py-4'>
      <Dialog
        classNames={{ 'box:center': 'left-12 right-12 rounded-lg overflow-hidden' }}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        direction='center'
      >
        <div className='p-6'>
          <div className='text-center font-bold text-base text-primary-text'>{text({ text: '确定清除历史搜索记录吗？', key: 'confirm_clear_historys' })}</div>
          <div className='flex items-center justify-between mt-4'>
            <div
              onClick={() => {
                setOpen(false);
              }}
              className='flex-1 flex items-center justify-center text-assist text-sm bg-default rounded-full mr-2 h-10'
            >
              {text({ text: '取消', key: 'cancel' })}
            </div>
            <div
              onClick={() => {
                setHistorys([]);
                ssSetJsonItem('search-history', '');
                setOpen(false);
              }}
              className='flex-1 flex items-center justify-center text-white text-sm bg-active-text rounded-full h-10'
            >
              {text({ text: '清除', key: 'clear' })}
            </div>
          </div>
        </div>
      </Dialog>
      <div className='flex items-center justify-between mx-4'>
        <div className='flex items-center py-1 px-4 bg-default rounded-full flex-1 h-8'>
          <Img src={searchPng} isNoTheme className='w-6 h-6 mr-2' />
          <input
            value={val}
            onChange={changeValue}
            placeholder={defaultSearchValue}
            className='bg-default w-full placeholder:text-xs placeholder:text-assist text-primary-text text-sm outline-0 border-0'
          />
        </div>
        <div onClick={activeClick} className='px-4 h-8 bg-active-text text-white text-sm flex items-center justify-center ml-2 rounded-full cursor-pointer'>
          {text({ text: '搜索', key: 'search' })}
        </div>
      </div>
      {isArray(historys) && historys.length > 0 && (
        <div className='mx-4'>
          <div className='flex items-center justify-between my-2'>
            <div className='text-base'>{text({ text: '搜索历史', key: 'search_historys' })}</div>
            <Img
              onClick={() => {
                setOpen(true);
              }}
              src={delPng}
              className='w-4 h-4'
              isNoTheme
            />
          </div>
          <div className='flex items-center flex-wrap'>
            {isArray(historys) &&
              historys.map((his, i) => (
                <div key={0 || i} className='text-xs text-assist py-0.1 px-2 rounded-full bg-default mr-2 mb-2 text-center truncate' onClick={() => itemClick(his)}>
                  {his}
                </div>
              ))}
          </div>
        </div>
      )}
      {isArray(hotTexts) && hotTexts.length > 0 && (
        <div className='my-4 mx-4'>
          <div className='text-base mb-4'>{text({ text: '热门搜索', key: 'hot_search' })}</div>
          {hotTexts.map((it, i) => (
            <div onClick={() => onHotSearch(it)} className='flex items-center justify-between mb-3' key={0 || i}>
              <div className='flex items-center text-sm'>
                <div className={`mr-2 w-5 h-5 flex items-center justify-center  ${getColor(i)}`}>{i + 1}</div>
                <div>{it.keyWord}</div>
              </div>
              <div className='flex items-center text-xs text-assist'>
                <Img src={hotPng} className='w-3.5 h-3.5 mr-2' isNoTheme />
                {formatW(it.popularCount)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HotSearch;
