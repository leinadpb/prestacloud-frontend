import React from 'react';
import axios from 'axios';
import { ApiServer } from '../../Defaults';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  padding: 16px;
  grid-template-columns: auto  auto;
  grid-template-rows: 1fr 3fr 1fr;
  grid-template-areas: 
    "title title"
    "content content"
    "footer footer";
`;

const Title = styled.div`
  grid-area: title;
  margin: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  & > span {
    font-size: 1.44rem;
    font-weight: 600;
  }
`;

const Footer = styled.div`
  grid-area: footer;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SaveButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  grid-area: content;
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 24px;
  margin-left: 24px;
  flex-direction: column;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  & > input {
    border: solid 1px rgb(0, 0, 0, 0.36);
    border-radius: 8px;
    padding: 8px;
    font-size: 1.15rem;
    width: calc(100% - 320px);
  }
`;

const Label = styled.div`
  margin-right: 8px;
  min-width: 180px;
  & > span {
    font-weight: 600;
    font-size: 1.24rem;
  }
`;

class CreateClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      goverment_id: this.props.goverment_id
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  create = () => {
    const { first_name, last_name, phone, email, goverment_id } = this.state;
    axios.post(`${ApiServer}/api/v1/client`, {
      client: {
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        email: email,
        goverment_id: goverment_id
      }
    }).then(data => {
      this.props.setClient(data.data.client);
    })
  }
  render() {
    const { first_name, last_name, phone, email, goverment_id } = this.state;
    return (
      <Wrapper>
        <Title>
          <span>
            Crear cliente nuevo
          </span>
        </Title>
        <Content>
          <Group>
            <Label>
              <span>Cedula:</span>
            </Label>
            <input id="goverment_id" onChange={this.handleChange} type="text" value={goverment_id} />
          </Group>
          <Group>
            <Label>
              <span>Primer nombre:</span>
            </Label>
            <input id="first_name" onChange={this.handleChange} type="text" value={first_name} />
          </Group>
          <Group>
            <Label><span>Primer apellido:</span></Label>
            <input id="last_name" onChange={this.handleChange} type="text" value={last_name} />
          </Group>
          <Group>
            <Label><span>Telefono:</span></Label>
            <input id="phone" onChange={this.handleChange} type="text" value={phone} />
          </Group>
          <Group>
            <Label><span>Correo electronico:</span></Label>
            <input id="email" onChange={this.handleChange} type="email" value={email} />
          </Group>
        </Content>
        <Footer>
          <CancelButton>
            <Button variant="contained" color="primary" onClick={this.props.handleClose}>
              Cancelar
            </Button>
          </CancelButton>
          <SaveButton>
            <Button variant="contained" color="secondary" onClick={this.create}>
              Agregar
            </Button>
          </SaveButton>
        </Footer>
      </Wrapper>
    );
  }
}

export default CreateClient;