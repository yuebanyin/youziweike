import { memo } from 'react';
import block from '@/assets/images/common/start-learn/block.png';
import fire from '@/assets/images/common/start-learn/fire.png';
import title from '@/assets/images/common/start-learn/title.png';
import { Img } from '@/components';

function StudyNow() {
  return (
    <div className='bg-gray'>
      <div className='h-95vh m-4 rounded-lg bg-white py-4 px-3'>
        <Img src={block} className='w-80 h-56 rounded-lg mb-4' isNoTheme />
        <div className='text-base mb-3'>5天【家庭教育指导师】体验营，增收创收，孩子也收益！</div>
        <div className='text-assist text-sm mb-3'>(报名后一定要加班班微信，拉你进学习群领课前资料!)2022年黄金行业[家庭教育指导师] ，国家资深心理咨询师李哲老师...</div>
        <div className='flex items-center justify-center mb-4'>
          <div className='mr-4 flex items-center justify-center'>
            <Img src={fire} className='w-4 h-4' isNoTheme />
            <span className='text-start text-sm'>101346人</span>
          </div>
          <div className='flex items-center justify-center'>
            <Img src={title} className='w-4 h-4' isNoTheme />
            <span className='text-start text-sm'>新客专属课程</span>
          </div>
        </div>
        <div className='w-25 h-25 rounded-lg bg-error absolute bottom-8 left-0 right-0'>
          <div>
            <div className='text-white h-8 text-lg'>免费领取</div>
            <div className='text-white h-6 td-lt text-base'>￥1</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(StudyNow);
