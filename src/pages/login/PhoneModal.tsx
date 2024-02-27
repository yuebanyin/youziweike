import { Dialog } from 'esy-ui';
import PhoneLogin from './PhoneLogin';

function PhoneModal(props: any) {
  const { open, onClose } = props;

  return (
    <Dialog classNames={{ mask: 'fixed inset-0 z-1000 bg-mask top-0', 'box:center': 'left-0 right-0 mx-8 p-4 rounded-lg' }} open={open} onClose={onClose} direction='center'>
      <PhoneLogin onClose={onClose} />
    </Dialog>
  );
}

export default PhoneModal;
