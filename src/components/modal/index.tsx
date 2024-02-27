import { ReactNode } from 'react';

interface ModalProps {
  open?: boolean;
  title?: string;
  cancleText?: string;
  okText?: string;
  content?: ReactNode;
  onCancel: Function;
  onOk?: Function;
}

export const Modal = (props: ModalProps) => {
  const { open, title, content, cancleText, okText, onCancel, onOk } = props;

  if (!open) return null;

  return (
    <div className='fixed bg-black/50 left-0 right-0 top-0 bottom-0 flex items-center justify-center z-1000'>
      <div className='mx-7 p-3 bg-white rounded-[10px] flex-1'>
        {title && <div className='text-lg py-3 text-center font-bold'>{title}</div>}
        {content && <div className='text-lg py-3'>{content}</div>}
        <div className='flex items-center justify-center mt-2'>
          {cancleText && (
            <div
              onClick={() => {
                onCancel();
              }}
              className='mx-2 text-base text-assist bg-default rounded-7.5 py-2 flex-1 text-center'
            >
              {cancleText}
            </div>
          )}
          {okText && (
            <div
              onClick={() => {
                onOk();
              }}
              className='text-base bg-active-text text-white rounded-7.5 py-2 flex-1 text-center mx-2'
            >
              {okText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
