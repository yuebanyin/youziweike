import { memo } from 'react';
import { useFormatText, useNavigation } from '@/hooks';

function Search() {
  const navigation = useNavigation();
  const text = useFormatText();

  const goHotSearch = () => {
    navigation('/hot-serach');
  };

  return (
    <div onClick={goHotSearch} className='mx-4 px-4 rounded-full bg-input-bg flex items-center text-placeholder text-sm h-8 my-2 cursor-pointer'>
      <div />
      <div className='ml-2'>{text({ text: '搜索课程/专栏/直播间', key: 'home_search-p' })}</div>
    </div>
  );
}

export default memo(Search);
