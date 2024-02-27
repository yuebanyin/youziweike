import { useState, useEffect, useCallback } from 'react';
import { isArray, Dialog } from 'esy-ui';
import { CommonPay, Img } from '@/components';
import { getProductList } from '@/services';
import { useFormatText } from '@/hooks';
import { formatDigit } from '@/utils';
import NullBlock from '@/components/null-block';

interface GoodsProps {
  open?: boolean;
  liveId?: string | number;
  handleCloseGoods: any;
  goodsIdArr?: any[];
  cb?: Function;
  endTime?: string;
  startTime?: string;
  sendBuyMsg?: Function;
}

// 直播间展示商品
function Goods(props: GoodsProps) {
  const { open, liveId, handleCloseGoods, endTime, startTime, sendBuyMsg } = props;
  const [page, setPage] = useState(1);
  const [goodList, setGoodList] = useState<any>([]); // 物品列表
  const [total, setTotal] = useState([]); // 物品总数目
  const text = useFormatText();

  console.warn(page, total, liveId);

  // 获取当前直播物品列表
  const getDataList = useCallback(
    (pageIndex, id) => {
      if (open && typeof id === 'number') {
        setPage(pageIndex);
        getProductList({ pageIndex, pageSize: 100, liveId: id })
          .then((res: any) => {
            setGoodList(res.data);
            setTotal(res.count); // 设置总的数目
          })
          .catch(() => {});
      }
    },
    [open]
  );

  const refreshList = useCallback(() => {
    if (sendBuyMsg) {
      sendBuyMsg('购买了');
    }
    getDataList(1, liveId);
  }, [getDataList, liveId, sendBuyMsg]);

  useEffect(() => {
    getDataList(1, liveId);
  }, [getDataList, liveId]);

  return (
    <Dialog classNames={{ 'box:bottom': 'h-96 w-full bottom-0 left-0 right-0 rounded-t-3xl' }} direction='bottom' open={open} onClose={handleCloseGoods} className='pt-5'>
      <div className='flex flex-col h-full'>
        {/* <CloseIcon onClick={handleCloseGoods} /> */}
        <div className='w-10 h-1 mx-auto my-4 bg-gray rounded-full' />
        <div className='flex items-center mx-4 mb-4'>
          <div className='w-1 h-4 rounded-full bg-active-text mr-1' />
          <div className='text-base text-primary-text font-bold mr-2'>{text({ text: '商品列表', key: 'goods' })}</div>
          {/* <div className='text-assist text-xsa' /> */}
        </div>
        {goodList?.length > 0 ? (
          <div className='overflow-y-auto px-4 flex-1'>
            {isArray(goodList) &&
              goodList.map((item: any) => (
                <div key={`product-${item.id}`} className='flex bg-default rounded-lg p-2 mb-2'>
                  <Img src={item.coverUrl} className='w-28 h-16 rounded-lg' isNoTheme />
                  <div className='flex-1 flex flex-col justify-between ml-3'>
                    <div className='text-sm w-52 text-primary-text line-clamp-2 mb-2'>{item.title}</div>
                    <div className='flex items-baseline justify-between h-6'>
                      <div>
                        <span className={`${item?.discountInfo?.discountPrice ? 'text-xs text-assist' : 'text-base text-active-text'}`}>￥{formatDigit(item.lecturePrice)}</span>
                        {item?.discountInfo?.discountPrice ? <span className='text-base text-active-text'>￥{formatDigit(item?.discountInfo?.discountPrice)}</span> : null}
                      </div>
                      <CommonPay
                        id={liveId}
                        {...item}
                        refreshList={refreshList}
                        endTime={endTime}
                        startTime={startTime}
                        disPrice={item?.discountInfo?.discountPrice}
                        price={item.lecturePrice}
                        sendBuyMsg={sendBuyMsg}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <NullBlock>
            <div className='text-assist text-sm text-center'> 暂无推荐商品</div>
          </NullBlock>
        )}
      </div>
    </Dialog>
  );
}

export default Goods;
