import { Common } from '@/components';
// import fire from '@/assets/images/common/fire.png';
// import { formatW } from '@/utils/digit';

function ImgTextList({ data, type }: any) {
  if (!Array.isArray(data)) return null;

  return <Common contentClassName='pt-4' contents={data} type={type} />;
}
export default ImgTextList;
