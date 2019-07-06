import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import numeral from 'numeral';
import ReactToPrint from 'react-to-print';

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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
`;

const Quotes = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  max-height: 30%;
  overflow: scroll;
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

    return(
      <div style={{ width: '80%' }} ref={el => (this.componentRef = el)}>
        <Wrapper>
          <Title>
            <h5>Deudor: <span>{ `${loan.client.first_name} ${loan.client.last_name}` }</span></h5>
            <h6>Cedula: <span>{loan.client.goverment_id}</span></h6>
            <h6>Email: <span>{loan.client.email}</span></h6>
            <h6>Telefono: <span>{loan.client.phone}</span></h6>
            <h6>Atendido por: <span>{loan.employee.full_name}</span></h6>
          </Title>
          <hr />
          <LoanDetails>
            <h6>Monto total: <span>{`RD${numeral(loan.amount_to_pay).format("$0.00")}`}</span></h6>
            <h6>Taxes: <span>{`${Number(loan.tax) * 100}%`}</span></h6>
            <h6>Categoria: <span>{loan.category.name}</span></h6>
            <h6>Frecuencia de pago: <span>{loan.frecuency.description}</span></h6>
            <h6>Duración: <span>{ this.getDuration(loan.duration) }</span></h6>
          </LoanDetails>
          <hr />
          <Quotes>
            <table class="table hover" style={{ width: '100%' }}>
              <thead class="thead-dark">
                <tr>
                  <th style={{ textAlign: 'center' }}>Fecha emitida</th>
                  <th style={{ textAlign: 'center' }}>Monto</th>
                  <th style={{ textAlign: 'center' }}>Estado</th>
                  <th style={{ textAlign: 'center' }}>Fecha expiración</th>
                </tr>
              </thead>
              <tbody>
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
              </tbody>
            </table>
          </Quotes>
          <div style={{ position: 'absolute', bottom: '80px', right: '40px' }}>
            <ReactToPrint
              trigger={() => <button class="btn btn-primary btn-lg">Imprimir</button>}
              content={() => this.componentRef}
            />
          </div>
        </Wrapper>
      </div>
    )
  }
}

export default withRouter(Bill);