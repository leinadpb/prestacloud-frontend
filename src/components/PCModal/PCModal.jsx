import React from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';

const ModalWrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: white;
`;

class PCModal extends React.Component {
  render() {
    return(
      <>
        <Modal
          aria-labelledby={this.props.title}
          aria-describedby={this.props.description}
          open={this.props.open}
          onClose={this.props.handleClose}
          style={{ position: 'absolute', top: '34px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <ModalWrapper width={this.props.width} height={this.props.height}>
            { this.props.children }
          </ModalWrapper>
        </Modal>
      </>
    );
  }
}

export default PCModal;