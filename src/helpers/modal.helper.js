import NiceModal from '@ebay/nice-modal-react';
import LoadingModal from 'src/commons/components/LoadingModal';

export const showLoadingModal = () => {
  NiceModal.show(LoadingModal);
};

export const hideLoadingModal = () => {
  NiceModal.hide(LoadingModal);
};
