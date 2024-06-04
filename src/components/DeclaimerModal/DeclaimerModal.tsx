import './DeclaimerModal.scss';

const DeclaimerModal = ({ isVisible, children }: any) => {
  if (!isVisible) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>{children}</div>
    </div>
  );
};

export default DeclaimerModal;
