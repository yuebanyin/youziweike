/**
 * @description Img 该组件是为了统一处理图片路径，主要用于本地的图片
 * @param src 图片地址，默认都是以主题文件夹下一层开头
 * @param alt 加载错误提示，可以不传
 * @param borderRadius 图片圆角
 * @param width 图片宽度
 * @param height 图片高度
 * @param className 图片样式
 * @param style 图片行内样式
 * @param onClick 图片点击事件
 * @param cursor 图片鼠标移上事件鼠标形状
 * @param isNoTheme 图片是否需要支持换肤（注：不需要支持换肤的直接把src赋值给img标签）
 * @param isImgLayzed 是否开启懒加载
 */
import { useMemo, MouseEventHandler, ReactNode } from 'react';
import { Img as EsyImg, BgImg as EsyBgImg } from 'esy-ui';
import { observer } from 'mobx-react-lite';
// import imgDef from '@/assets/images/common/img-def.png';
// import imgError from '@/assets/images/common/img-error.png';
import { useGlobalStore } from '@/mobx';

export interface ImgProps {
  src: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: Record<string, string>;
  cursor?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
  isNoTheme?: boolean;
  alt?: string;
  isImgLayzed?: boolean;
  isDefaultBg?: boolean;
  classNames?: any;
}

export const Img = observer((props: ImgProps) => {
  const { src, isNoTheme, ...rest } = props;
  const { theme } = useGlobalStore();

  // 赋值路径dataUrl
  const dataUrl = useMemo(() => {
    if (src) {
      // 和原生img标签一样
      if (isNoTheme) {
        return src;
      }
      // 需要换肤的在这里统一做处理
      if (theme) {
        const imgUrl = `${theme}${src}`;
        return require(`@/assets/images/${imgUrl}`);
      }
    }
    return '';
  }, [theme, src, isNoTheme]);

  return <EsyImg src={dataUrl} {...rest} />;
});

/**
 * BgImg 该组件挂在Img组件上，api也是继承Img，特殊的只有一个url
 * @param url 图片地址，默认都是img开头
 */

interface BgImgProps extends Omit<ImgProps, 'src'> {
  url: string;
  children?: ReactNode;
  isNoTheme?: boolean;
}

// 对于需要支持换肤的背景图的组件封装
export const BgImg = observer((props: BgImgProps) => {
  const { url, className, children, isNoTheme, ...rest } = props;
  const { theme } = useGlobalStore();

  // 重新赋值路径
  const dataBgUrl = useMemo(() => {
    // if (typeof IntersectionObserver === 'function') {
    if (url) {
      // 不需要换肤，也就是外链的图片
      if (isNoTheme) {
        return url;
      }
      // 换肤的图片
      if (theme) {
        const imgUrl = `${theme}${url}`;
        return require(`@/assets/images/${imgUrl}`);
      }
    }
    // }
    return '';
  }, [theme, url, isNoTheme]);

  return (
    <EsyBgImg url={dataBgUrl} {...rest}>
      {children}
    </EsyBgImg>
  );
});
