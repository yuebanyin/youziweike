import { BgImg } from '@/components';
import { memo } from 'react';
// import memberBg from '../../../assets/detail/memberBg.png';

const memberBg = 'https://yz-files.szdy1688.cn/StaticFiles/icon/20240110182148292.png';

const MemberBlock = () => {
  return (
    <>
      <BgImg url={memberBg} className='flex items-center w-86 h-12 px-5 mt-2'>
        <div className='w-52 mr-4'>
          <div className='flex mb-1'>
            <div className='text-vip-word2 bg-vip-grad1 text-mini w-12 h-5 br-1 flex items-center justify-center mr-1'>会员免费</div>
            <div className='text-vip-word1 text-mini'>本课程会员全年免费，上千套课程</div>
          </div>
          <div className='flex'>
            <div className='text-pri-red text-mini mr-1'>每天仅需要0.5元，</div>
            <div className='text-vip-word1 text-mini'>{`了解更多权益>>`}</div>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <div className='w-20 h-8 bg-grad-red'>
            <div>
              <div className='text-white text-mini'>¥199</div>
              <div className='text-white text-mini'>开通会员</div>
            </div>
          </div>
        </div>
      </BgImg>
    </>
  );
};

export default memo(MemberBlock);
