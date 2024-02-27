export const AliTips = ({ className }) => {
  return (
    <div className={className}>
      <div className='text-xs text-assist mb-2 flex-wrap'>1.每笔提现金额至少2元，支付宝官方收取0.6%手续费</div>
      <div className='text-xs text-assist mb-2 flex-wrap'>2.每日账户提现上限为5万元，超出请联系客服</div>
      <div className='text-xs text-assist mb-2 flex-wrap'>3.为保证您的资金安全，提现申请需实名认证</div>
      <div className='text-xs text-assist mb-2 flex-wrap'>4.提现申请平台处理后，将直接转入您指定的支付宝账号</div>
      <div className='text-xs text-assist mb-2 flex-wrap'>5.0-8点是系统升级时间，暂时关闭提现功能</div>
      <div className='text-xs text-assist mb-2 flex-wrap'>6.如需帮助请联系客服 (客服通道）</div>
    </div>
  );
};

export const WyinTips = ({ className }) => {
  console.log(0);
  return (
    <div className={className}>
      <div className='text-xs text-assist mb-2 flex-wrap'>
        1. 每笔提现金额至少2元，在您提现时将扣除支付宝收取的0.6% 手续费后，网盈 (即安徽晟凡信息科技有限公司)作为您的服务 机构协助您对外提供服务并代缴个人所得相关税款，网盈将按
        扣除后的金额收取6.5%的服务费 (合税费) ，合计综合费率为 7.06%，提现申请处理后，将直接转入您指定的支付宝账号， 最终提现到账金额以实际为准。
      </div>
      <div className='text-xs text-assist mb-2 flex-wrap'>2.为保证您的资金安全，提现申请需实名认证，每月账户提现上 限为10万元，超出请联系客服;</div>
      <div className='text-xs text-assist mb-2 flex-wrap'>3.网盈提现仅限于16周岁至70周岁的中华人共和国居民 (不含港澳台地区)使用，如您不符条件请使用其他方式提现；</div>
      <div className='text-xs text-assist mb-2 flex-wrap'>4.每天8点至24点为提现时间，每天0点至8点为系统维护期间无法操作提现；</div>
      <span className='text-xs text-assist mb-2 flex-wrap'>5.如您在提现时，有任何需帮助的，敬请联系客服 (客服通道);{'>'}</span>
    </div>
  );
};
