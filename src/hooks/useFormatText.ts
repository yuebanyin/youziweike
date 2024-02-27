import { useCallback } from 'react';
// import { useTranslation } from 'react-i18next';

interface TextProps {
  text: string;
  key?: string;
  isFormat?: boolean;
}

export const useFormatText = () => {
  // const { t } = useTranslation();

  /**
   * 对项目文字做一层处理，
   * @param children 文字内容
   * @param text 文字内容
   * @param key 国际化的key
   * @param isFormat 是否是数字需要千分位或者其他特殊处理
   * @returns
   */
  const text = useCallback(({ text, isFormat, key }: TextProps) => {
    console.warn({ key, isFormat });
    return text;
  }, []);

  return text;
};
