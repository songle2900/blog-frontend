import React from 'react';
import AskModal from '../common/AskModal';

const AskRemoveModal = ({ visible, onConfirm, onCancle }) => {
    return (
        <AskModal
            visible={visible}
            title="Post delete"
            description="Are you srue you want to delete this post?"
            confirmText="Delete"
            onConfirm={onConfirm}
            onCancle={onCancle}
        />
    );
};

export default AskRemoveModal;