import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import axios from 'axios';
import { ApiServer } from '../../../Defaults';
import Button from '@material-ui/core/Button';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin: 32px;
  & > h2 {

  }
`;

const TableWrapper = styled.div`
  padding: 16px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class ClientPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: []
    }
  }
  componentWillMount = () => {
    axios.get(`${ApiServer}/api/v1/client`).then(data => {
      console.log(data.data.clients);
      this.setState({
        clients: data.data.clients
      });
    });
  }

  render() {
    const { clients } = this.state;
    return (
      <PageWrapper>
        <Title>
          <h2>Todos los clientes</h2>
        </Title>
        <TableWrapper>
          <table class="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cédula</th>
                <th>Teléfono</th>
                <th>Total de préstamos</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                clients.map(client => (
                  <tr>
                    <td>{client.first_name}</td>
                    <td>{`${client.last_name} ${client.last_name}`}</td>
                    <td>{client.goverment_id}</td>
                    <td>{client.phone}</td>
                    <td>{client.loans.length}</td>
                    <td>
                      <Button type="secondary" variant="outlined">Ver préstamos</Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </TableWrapper>
      </PageWrapper>
    );
  }
}

export default ClientPage;