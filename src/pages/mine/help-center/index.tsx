import { useNavigation } from '@/hooks';
import { getLinkList } from '@/services';
import { RightOutlined } from 'esy-ui';
import { memo, useEffect, useState } from 'react';

// const defaultSearchValue = '输入关键词搜索';

const list = [
  {
    id: 1,
    text: '如何入驻柚子微课',
    icon: 'right',
    link: '',
  },
  {
    id: 2,
    text: '如何入驻柚子微课',
    icon: 'right',
    link: '',
  },
  {
    id: 3,
    text: '如何入驻柚子微课',
    icon: 'right',
    link: '',
  },
  {
    id: 4,
    text: '如何入驻柚子微课',
    icon: 'right',
    link: '',
  },
  {
    id: 5,
    text: '如何入驻柚子微课',
    icon: 'right',
    link: '',
  },
];
const HelpCenter = () => {
  const [val, setVal] = useState('');
  const [data, setData] = useState(list);

  const navigation = useNavigation();

  useEffect(() => {
    getLinkList()
      .then((res: any) => {
        if (res?.code === 210) {
          setData(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err, val, setData);
      });
  }, []);

  const changeSearch = (v) => {
    setVal(v);
  };
  return (
    <div>
      <div className='search-bar-auto' onChange={changeSearch} onClick={() => {}} />

      <div className='px-4 py-3 text-assist text-sm'>热点问题</div>

      <div>
        {data &&
          data.map((item: any) => {
            return (
              <div
                onClick={() => {
                  navigation(item.link);
                }}
                key={`line${item.id}`}
                className='w-full bg-white px-4 py-3 border-b-[1px] border-split'
              >
                <div className={`flex items-center justify-between h-10`}>
                  <div className='text-sm text-primary-text'>{item.title}</div>
                  <div className='flex items-center justify-center'>
                    <RightOutlined className='text-guide mr-0.5' />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default memo(HelpCenter);
