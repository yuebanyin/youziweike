function Modal(props: any) {
  const { open, title, content, cancleText, okText, onCancel, onOk } = props;

  if (!open) return null;

  return (
    <div className='fixed bg-mask left-0 right-0 top-0 bottom-0 flex items-center justify-center z-1000'>
      <div className='mx-8 p-3 bg-white rounded-xl flex-1'>
        {title && <div className='text-lg py-3 text-center font-bold'>{title}</div>}
        {content && <div className='text-lg py-3'>{content}</div>}
        <div className='mt-2 flex items-center justify-center'>
          {cancleText && (
            <div onClick={onCancel} className='mx-2 text-base text-assist bg-gray rounded-3xl py-2 flex-1 text-center'>
              {cancleText}
            </div>
          )}
          {okText && (
            <div onClick={onOk} className='text-base bg-error text-white rounded-3xl py-2 flex-1 text-center mx-2'>
              {okText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
