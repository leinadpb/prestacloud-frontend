import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import axios from 'axios';
import { ApiServer } from '../../Defaults';

const Title = styled.div`
  width: 100%;
  margin: 24px;
  & > span {
    font-weight: 600;
    font-size: 1.67rem;
  }
`;

class QuotesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
    }
  }

  componentWillMount = () => {
    const { loan } = this.props;
    if (!!loan) {
      axios.get(`${ApiServer}/api/v1/quote`, {
        params: {
          loan_id: loan.id
        }
      }).then(data => {
        this.setState({
          quotes: data.data.quotes
        })
      })
    }
  }

  render() {
    const { quotes } = this.state;
    return (
      <>
        <Title>
          <span>Quotas</span>
        </Title>
        <table class="table">
          <thead>
            <th>Monto</th>
            <th>Estado</th>
            <th>Metodo de pago</th>
            <th>Fecha expiracion</th>
          </thead>
          <tbody>
            {
              quotes.map(q => (
                <tr>
                  <td>
                    {`RD${numeral(q.amount).format("$0.00")}`}
                  </td>
                  <td>
                    {q.state}
                  </td>
                  <td>
                    {!!q.payment_method ? q.payment_method : '----'}
                  </td>
                  <td>
                    {new Date(q.expiry_date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
    );
  }
}

export default QuotesList;
