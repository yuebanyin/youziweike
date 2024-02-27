/** 左文右图格式 开始学习-最近学习/全部课程/已购课程 */

import { useState } from 'react';
import { Img } from '@/components';
import Modal from './Modal';

function DelView({ isShow }: any) {
  const [open, setOpen] = useState(false);

  if (!isShow) return null;

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
          // console.log(1111111);
        }}
        className=' absolute right-0 top-0 br-t-r-8 roun bg-split flex items-center justify-center w-5 h-5 z-1 br-b-l-16'
      >
        <div className='w-3.5 h-0.5 bg-white rounded' />
      </div>
      <Modal
        open={open}
        cancleText='取消'
        okText='移除'
        title='是否移除学习记录？'
        onCancel={() => {
          setOpen(false);
          // console.log(222);
        }}
        onOk={() => setOpen(false)}
      />
    </>
  );
}

const TextImg = (props) => {
  const { data, onClickItem, isDelete, type } = props;

  return data.map((it) => (
    <div
      onClick={() => {
        onClickItem && onClickItem(it);
      }}
      className='flex items-center justify-between relative shadow-lg p-2 rounded-lg bg-white mb-3 cursor-pointer'
      key={it.id}
    >
      <DelView isShow={isDelete} />
      <div className='flex flex-col justify-between mr-2 flex-1'>
        <div className='text-sm text-primary-text line-clamp-2'>
          {it.zl && <span className='text-sm text-assist px-1 py-0.5 border border-split rounded'>专栏</span>}
          {it.contentTitle || it.title}
        </div>
        {type === 1 && it.totalLength && (
          <div className='mt-2.5'>
            <text className='text-sm text-primary-text'>{parseInt(`${(it.currNode / it.totalLength) * 100}`)}%</text>
            {/* <AtProgress isHidePercent percent={parseInt(`${(it.currNode / it.totalLength) * 100}`)} strokeWidth={4} color='#ff5a31' /> */}
          </div>
        )}
        {type !== 1 && (it.createTime || it.time) && <span className='text-sm text-assist mt-2.5'>{it.createTime || it.time}</span>}
      </div>
      <Img src={it.coverUrl} className='h-16 w-28 rounded' isNoTheme />
    </div>
  ));
};

export default TextImg;
