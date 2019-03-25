import React, { Component } from 'react';
import { eq } from 'lodash';
import cx from 'classnames';


class Modal extends Component {
    componentDidUpdate = (prevProps) => {
        if(!eq(prevProps.open, this.props.open)){
            if(this.props.open){
                document.body.classList.add('modal-open');
                const elemDiv = document.createElement('div');
                elemDiv.className = 'modal-backdrop fade show';
                document.body.appendChild(elemDiv);
            }else{
                document.body.classList.remove('modal-open');
                document.querySelector('.modal-backdrop').remove();
            }
        }
    };

    render() {
        const { open, title, body, footer, closeModal } = this.props;

        return (
            <div
                className={cx("modal fade", { show: open })}
                id="exampleModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: open ? 'block': 'none' }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{ title }</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" onClick={closeModal}>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            { body }
                        </div>
                        <div className="modal-footer">
                            { footer }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
