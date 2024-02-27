import { Swiper as NSwiper, SwiperSlide, SwiperProps } from 'swiper/react';
import { isArray } from 'esy-ui';
import { Autoplay, Pagination, Navigation, Scrollbar } from 'swiper';
import { useMemo } from 'react';
import { Img } from '../img';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export type SwiperType<T> = {
  [P in keyof T]?: T[P];
} & { list: { url?: string; imgUrl?: string; text?: string; to?: string; id?: number; linkType?: number }[]; imgClassName?: string; isImgLayzed?: boolean; autoModules?: string };

export function Swiper(props: SwiperType<SwiperProps>) {
  const { list, autoModules = 'navigation,autoplay', initialSlide = 0, imgClassName, autoplay = true, pagination = true, ...rest } = props;

  const mergeModule = useMemo(() => {
    const mds = [];
    if (autoModules.indexOf('navigation') !== -1) {
      mds.push(Navigation);
    }
    if (autoModules.indexOf('scrollbar') !== -1) {
      mds.push(Scrollbar);
    }
    if (autoModules.indexOf('pagination') !== -1) {
      mds.push(Pagination);
    }
    if (autoModules.indexOf('autoplay') !== -1) {
      mds.push(Autoplay);
    }
    return mds;
  }, [autoModules]);

  return (
    <NSwiper modules={mergeModule} initialSlide={initialSlide} spaceBetween={0} autoplay={autoplay} pagination={pagination} {...rest}>
      {isArray(list) &&
        list.map((it: any, i: number) => (
          <SwiperSlide key={`${it.id}-${i + 1}`}>
            <Img className={imgClassName} src={it.url || it.imgUrl} isNoTheme />
          </SwiperSlide>
        ))}
    </NSwiper>
  );
}
