import React from 'react';

const Modal = ({ showModal, hideModal }) => {
    return (
        showModal && (
            <div className="modalBackground"  >
                <div className="modalContainer">
                    <div className="modalHeader">
                        <h2>Titre</h2>
                    </div>
                    <div className="modalBody">
                        <h2>Contenue</h2>
                    </div>
                    <div className="modalFooter">
                        <button
                            className="modalBtn"
                            onClick={hideModal} >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        )

    );
};

export default Modal;
