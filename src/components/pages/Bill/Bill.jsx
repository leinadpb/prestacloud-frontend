import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import numeral from 'numeral';

const Title = styled.div`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoanDetails = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
  justify-content: flex-start;
`;

const Quotes = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
`;

class Bill extends React.Component {
  constructor(props) {
    super(props);

  }

  getDuration = (months) => {
    if (months === 1) {
      return `${months} mes`;
    } else if (months < 12) {
      return `${months} meses`;
    } else {
      return `${months / 12} años`;
    }
  }

  render() {
    const { loan, quotes } = this.props.location.state;
    console.log(loan, quotes);
    return(
      <Wrapper>
        <Title>
          <h3>Deudor: <span>{ `${loan.client.first_name} ${loan.client.last_name}` }</span></h3>
          <h5>Cedula: <span>{loan.client.goverment_id}</span></h5>
          <h5>Email: <span>{loan.client.email}</span></h5>
          <h5>Telefono: <span>{loan.client.phone}</span></h5>
          <h5>Atendido por: <span>{loan.employee.full_name}</span></h5>
        </Title>
        <hr />
        <LoanDetails>
          <h3>Monto total: <span>{`RD${numeral(loan.amount_to_pay).format("$0.00")}`}</span></h3>
          <h3>Taxes: <span>{`${Number(loan.tax) * 100}%`}</span></h3>
          <h3>Categoria: <span>{loan.category.name}</span></h3>
          <h3>Frecuencia de pago: <span>{loan.frecuency.description}</span></h3>
          <h3>Duración: <span>{ this.getDuration(loan.duration) }</span></h3>
        </LoanDetails>
        <hr />
        <Quotes>
          <table class="table">
            <tr>
              <th>Fecha emitida</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Fecha expiración</th>
            </tr>
            {
              quotes.map(q => (
                <tr>
                  <td style={{ textAlign: 'center' }}>
                    {
                      new Date(q.created_at).toLocaleDateString()
                    }
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {
                      `RD ${numeral(q.amount).format("$0.00")}`
                    }
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {
                      q.state
                    }
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {
                     new Date(q.expiry_date).toLocaleDateString()
                    }
                  </td>
                </tr>
              ))
            }
          </table>
        </Quotes>
      </Wrapper>
    )
  }
}

export default withRouter(Bill);