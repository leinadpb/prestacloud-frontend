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

class CreateArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      article_type_id: 3,
      real_price: 0,
      agreement_price: 0,
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  add = () => {
    const { real_price, agreement_price, name, description, article_type_id } = this.state;
    if (real_price !== 0 && agreement_price !== 0 && !!article_type_id && !!name && !!description) {
      this.props.appendArticle(this.state);
      this.cleanForm();
    }
  }
  cleanForm = () => {
    this.setState({
      name: '',
      description: '',
      article_type_id: 3,
      real_price: 0,
      agreement_price: 0,
    })
  }
  render() {
    const { name, description, real_price, agreement_price, article_type_id } = this.state;
    return (
      <Wrapper>
        <Title>
          <span>
            Agregar articulo
          </span>
        </Title>
        <Content>
          <Group>
            <Label>
              <span>Nombre:</span>
            </Label>
            <input id="name" onChange={this.handleChange} type="text" value={name} />
          </Group>
          <Group>
            <Label>
              <span>Descripcion</span>
            </Label>
            <input id="description" onChange={this.handleChange} type="text" value={description} />
          </Group>
          <Group>
            <Label><span>Precio real</span></Label>
            <input id="real_price" onChange={this.handleChange} type="number" value={real_price} />
          </Group>
          <Group>
            <Label><span>Precio acordado</span></Label>
            <input id="agreement_price" onChange={this.handleChange} type="number" value={agreement_price} />
          </Group>
          <Group>
            <Label><span>Tipo</span></Label>
            <select id="article_type_id" onChange={this.handleChange}>
              <option value="1">Electrodomestico</option>
              <option value="2">Mueble</option>
              <option value="3">Joya</option>
            </select>
          </Group>
        </Content>
        <Footer>
          <CancelButton>
            <Button variant="contained" color="primary" onClick={this.props.handleClose}>
              Cancelar
            </Button>
          </CancelButton>
          <SaveButton>
            <Button variant="contained" color="secondary" onClick={this.add}>
              Agregar
            </Button>
          </SaveButton>
        </Footer>
      </Wrapper>
    );
  }
}

export default CreateArticle;