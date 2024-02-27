import { useNavigation } from '@/hooks';
import { getUserApplyWithdrawal } from '@/services';
import { memo, useState } from 'react';
import { Input, Toast } from 'esy-ui';
import { AliTips, WyinTips } from './aliWithdrawTips';

const btnList = [
  {
    id: 1,
    title: '平台提现',
  },
  {
    id: 2,
    title: '网银提现',
  },
];
const params = {
  Amount: '',
  WithdrawalInfo: {
    ApplyType: 1,
    AccountName: '',
    AccountNo: '',
    AccountBindName: '',
  },
};
const GetAli = () => {
  const navigation = useNavigation();

  const [actId, setActId] = useState(1);
  const [pageInfo, setPageInfo] = useState<any>(params);

  // 切换提现方式
  const handleBtn = (item) => {
    console.log(item, '+++++++++++++');
    if (item.id !== actId) {
      setActId(item.id);

      setPageInfo({
        ...params,
        WithdrawalInfo: { ...params.WithdrawalInfo, ApplyType: item.id },
      });
    }
  };

  //填入信息
  const handleTextareaChange = (type, e) => {
    // 如果输入的内容超过 300 字，截取前 300 字
    const value = e.target.value;
    console.log(type, value);

    switch (type) {
      case 'Amount':
        setPageInfo({ ...pageInfo, Amount: value });
        break;
      case 'AccountName':
        setPageInfo({
          Amount: pageInfo.Amount,
          WithdrawalInfo: { ...pageInfo.WithdrawalInfo, AccountName: value },
        });
        break;
      case 'AccountNo':
        setPageInfo({
          Amount: pageInfo.Amount,
          WithdrawalInfo: { ...pageInfo.WithdrawalInfo, AccountNo: value },
        });
        break;
      case 'AccountBindName':
        setPageInfo({
          Amount: pageInfo.Amount,
          WithdrawalInfo: {
            ...pageInfo.WithdrawalInfo,
            AccountBindName: value,
          },
        });
        break;
      default:
        break;
    }
  };

  // 提现
  const handleWithdraw = () => {
    getUserApplyWithdrawal(pageInfo)
      .then((res: any) => {
        console.log('rrrrrrrrrr', res);

        Toast.show({
          content: res.message,
          duration: 1500,
          type: 'success',
        });

        // 提交成功后 重置数据
        setPageInfo({
          ...params,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className='p-4 pb-24'>
        <div className='flex justify-between mb-4'>
          {btnList.map((item: any) => {
            return (
              <div
                key={item.id}
                className={`w-40 h-12 flex items-center justify-center text-base rounded-lg border-[1px] ${
                  item.id === actId ? 'text-active-text border-active-text bg-active-bg' : 'text-assist border-split'
                }`}
                onClick={() => {
                  handleBtn(item);
                }}
              >
                {item.title}
              </div>
            );
          })}
        </div>

        <div className='flex justify-between mb-6'>
          <div className='flex items-center'>
            <div className='w-1 h-4 rounded-5 bg-active-text mr-1'></div>
            <div className='text-base text-primary-text'>支付宝提现</div>
          </div>
          <div
            onClick={() => {
              // Taro.navigateTo({
              //   url: `/packMine/rebate/withdrawRecords/index`,
              // });
              navigation('');
            }}
            className='text-xs text-assist rounded-2xl px-2 py-1 border-[1px] border-split'
          >
            提现记录
          </div>
        </div>

        <div className='text-base text-primary-text mb-2'>提现金额</div>
        <Input
          placeholder='请输入您的提现金额，最少为2元'
          value={pageInfo.Amount}
          type='number'
          onChange={(value) => handleTextareaChange('Amount', value)}
          mode='standard'
          classNames={{
            'standard:normal': 'bg-split peer-focus:bg-active-text peer-focus:h-px peer-focus:animate-standard-line hidden',
            input: 'border-0 bg-transparent w-full outline-0 placeholder:text-placeholder peer text-left',
          }}
        />
        <div className='text-base text-primary-text mb-2'>收款方实名</div>
        <Input
          placeholder='请输入您支付宝实名认证的真实姓名'
          value={pageInfo.WithdrawalInfo.AccountName}
          type='number'
          onChange={(value) => handleTextareaChange('AccountName', value)}
          mode='standard'
          classNames={{
            'standard:normal': 'bg-split peer-focus:bg-active-text peer-focus:h-px peer-focus:animate-standard-line hidden',
            input: 'border-0 bg-transparent w-full outline-0 placeholder:text-placeholder peer text-left',
          }}
        />
        <div className='text-base text-primary-text mb-2'>{actId === 1 ? '支付宝账号' : '收款人卡号'}</div>
        <Input
          placeholder={actId === 1 ? '手机号/邮箱' : '收款人卡号'}
          value={pageInfo.WithdrawalInfo.AccountNo}
          type='text'
          onChange={(value) => handleTextareaChange('AccountNo', value)}
          mode='standard'
          classNames={{
            'standard:normal': 'bg-split peer-focus:bg-active-text peer-focus:h-px peer-focus:animate-standard-line hidden',
            input: 'border-0 bg-transparent w-full outline-0 placeholder:text-placeholder peer text-left',
          }}
        />
        {actId === 2 && (
          <>
            <div className='text-base text-primary-text mb-2'>收款银行</div>
            <Input
              placeholder='请输入收款银行'
              value={pageInfo.WithdrawalInfo.AccountBindName}
              type='text'
              onChange={(value) => handleTextareaChange('AccountBindName', value)}
              mode='standard'
              classNames={{
                'standard:normal': 'bg-split peer-focus:bg-active-text peer-focus:h-px peer-focus:animate-standard-line hidden',
                input: 'border-0 bg-transparent w-full outline-0 placeholder:text-placeholder peer text-left',
              }}
            />
          </>
        )}

        {actId === 1 ? <AliTips className='mt-6 mb-4' /> : <WyinTips className='mt-6 mb-4' />}
      </div>
      <div className='px-4 pt-1 pb-7 fixed bottom-0 bg-white'>
        <div
          className='w-86 h-12 flex items-center justify-center text-white text-lg bg-active-text rounded-7.5 m-0'
          onClick={() => {
            handleWithdraw();
          }}
        >
          确定提现
        </div>
      </div>
    </>
  );
};

export default memo(GetAli);
