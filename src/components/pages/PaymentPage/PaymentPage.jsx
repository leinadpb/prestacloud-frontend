import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import axios from 'axios';
import { ApiServer } from '../../../Defaults';
import Button from '@material-ui/core/Button';
import PCModal from '../../PCModal/PCModal';
import PaymentQuoteContent from '../../PaymentQuoteContent/PaymentQuoteContent';
import { Elements } from 'react-stripe-elements';
const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding-left: 16px;
`;

const Title = styled.div`
  margin: 32px;
  & > h2 {

  }
`;

const SectionWrapper = styled.div`
  width: 100%;
  height: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const SectionLabel = styled.div`
  padding: 8px;
  margin-right: 8px;
  & > span {
    font-weight: 600;
    font-size: 1.15rem;
  }
`;

const SectionInput = styled.div`
  padding: 8px;
  margin-left: 8px;
  & > input {
    border: none;
    box-shadow: 0px 0px 8px 2px rgb(0, 0, 0, 0.08);
    font-size: 1.15rem;
    padding: 12px;
  }
  & > select {
    border: none;
    box-shadow: 0px 0px 8px 2px rgb(0, 0, 0, 0.08);
    font-size: 1.15rem;
    padding: 12px;
  }
`;

const LoanInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  background: ${props => props.loan ? '#305261' : 'transparent'};
`;

const LoanInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 116px;
  max-width: 116px;
  overflow: hidden;
`;

const InfoLabel = styled.div`
  & > span {
    font-size: 0.95rem;
    font-weight: 600;
    color: ${props => props.loan ? 'white' : 'black'};
  }
`;

const InfoValue = styled.div`
   & > span {
    font-size: 0.88rem;
    font-weight: 200;
    color: ${props => props.loan ? '#f2f2f2' : 'black'};
  }
`;

class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: undefined,
      openPaymentModal: false,
    }
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
  searchClient = (e) => {
    const id = e.target.value;
    if (e.key === 'Enter') {
      axios.get(`${ApiServer}/api/v1/client/loans`, {
        params: {
          goverment_id: id
        }
      }).then(data => {
        const result = data.data;
        console.log(result.client);
        if (!result.client) {
          // this.shouldCreateNewClient(id);
        } else {
          this.setState({
            client: result.client
          }, () => {
            this.getCards(result.client);
          })
        }
        
      })
    }
  }

  getCards = (client) => {
    if (!!client.stripe_id) {
      axios.get(`${ApiServer}/api/v1/client_users/card/cards?goverment_id=${client.goverment_id}`).then(data => {
        const result = data.data.cards;
        this.setState({
          client: {
            ...client,
            cards: result
          }
        })
      })
    }
  }

  payQuote = (quote) => {
    console.log(quote);
    this.setState({
      quote: quote
    }, () => {
      this.setState({
        openPaymentModal: true
      })
    });
  }

  closePaymentModal = () => {
    this.setState({
      openPaymentModal: false
    });
  }

  changeQuote = (quote) => {
    console.log('Retrieve: ', quote);
    
    let client = {...this.state.client};
    console.log('loans: ', client.loans);
    client.loans.forEach(loan => {
      loan.quotes.forEach((_quote, index) => {
        if (_quote.id === quote.id) {
          console.log('Found a match!!', _quote);
          _quote.amount = quote.amount;
          _quote.state = quote.state;
          _quote.payment_method = quote.payment_method;
        }
      })
    });
    this.setState({
      client
    });
  }

  setStripeId = (stripe_id) => {
    this.setState({
      client: {
        ...this.state.client,
        stripe_id: stripe_id
      }
    }, () => {
      this.getCards(this.state.client);
    })
  }

  render() {
    const { client, openPaymentModal, quote } = this.state;
    return (
      <PageWrapper>
        <Title>
          <h2>Efectuar pago</h2>
        </Title>
        <SectionWrapper>
          <Section>
            <SectionLabel>
              <span>Cliente</span>
            </SectionLabel>
            <SectionInput>
              <input type="number" placeholder="Cedula..." onKeyDown={this.searchClient} />
            </SectionInput>
          </Section>
          {
            !client ? null : (
              <>
                <table class="table">
                  <tr>
                    <th>Nombre</th>
                    <th>Cedula</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                  </tr>
                  <tr>
                    <td>
                      { `${client.first_name} ${client.last_name}` }
                    </td>
                    <td>
                      { client.goverment_id }
                    </td>
                    <td>
                      { client.email }
                    </td>
                    <td>
                      { client.phone }
                    </td>
                  </tr>
                </table>
                <br />
                <div>
                  <h4>Prestamos Abiertos</h4>
                </div>
                <br />
                <br />
                {
                  client.loans.map(loan => (
                    <>
                      <LoanInfoWrapper loan>
                        <LoanInfo>
                          <InfoLabel loan>
                            <span>Monto a pagar</span>
                          </InfoLabel>
                          <InfoValue loan>
                            <span>{ loan.amount_to_pay }</span>
                          </InfoValue>
                        </LoanInfo>
                        <LoanInfo>
                          <InfoLabel loan>
                            <span>Total cuotas</span>
                          </InfoLabel>
                          <InfoValue loan>
                            <span>{`${loan.quotes.length} quotas`}</span>
                          </InfoValue>
                        </LoanInfo>
                        <LoanInfo>
                          <InfoLabel loan>
                            <span>Duracion</span>
                          </InfoLabel>
                          <InfoValue loan>
                            <span>{this.getDuration(loan.duration)}</span>
                          </InfoValue>
                        </LoanInfo>
                        <LoanInfo>
                          <InfoLabel loan>
                            <span>Impuesto</span>
                          </InfoLabel>
                          <InfoValue loan>
                            <span>{Number(loan.tax) * 100}%</span>
                          </InfoValue>
                        </LoanInfo>
                        <LoanInfo>
                          <InfoLabel loan>
                            <span>Total articulos</span>
                          </InfoLabel>
                          <InfoValue loan>
                            <span>{loan.articles.length}</span>
                          </InfoValue>
                        </LoanInfo>
                        <LoanInfo>
                          <InfoLabel loan>
                            <span>Categoria</span>
                          </InfoLabel>
                          <InfoValue loan>
                            <span>{ loan.category.name }</span>
                          </InfoValue>
                        </LoanInfo>
                        <LoanInfo>
                          <InfoLabel loan>
                            <span>Creado por</span>
                          </InfoLabel>
                          <InfoValue loan>
                            <span>{loan.employee.full_name}</span>
                          </InfoValue>
                        </LoanInfo>
                      </LoanInfoWrapper>
                      <br />
                      <br />
                      <div style={{ width: '80%' }}>
                        <h4> Cuotas </h4>
                        {
                          loan.quotes.map(quote => (
                            <>
                              <LoanInfoWrapper>
                                <LoanInfo>
                                  <InfoLabel>
                                    <span>Monto</span>
                                  </InfoLabel>
                                  <InfoValue>
                                    <span>{ quote.amount }</span>
                                  </InfoValue>
                                </LoanInfo>
                                <LoanInfo>
                                  <InfoLabel>
                                   <span>Estado</span>
                                  </InfoLabel>
                                  <InfoValue>
                                    <span>{ quote.state }</span>
                                  </InfoValue>
                                </LoanInfo>
                                <LoanInfo>
                                  <InfoLabel>
                                    <span>Metodo de pago</span>
                                  </InfoLabel>
                                  <InfoValue>
                                    <span>{ !!quote.payment_method ? quote.payment_method : '---' }</span>
                                  </InfoValue>
                                </LoanInfo>
                                <LoanInfo>
                                  <InfoLabel>
                                    {
                                      quote.state === "complete" ? <span>Pagada en</span> : <span>Expira en</span>
                                    }
                                  </InfoLabel>
                                  <InfoValue>
                                    {
                                      quote.state === "complete" ? <span>{ new Date(quote.created_at).toLocaleDateString() }</span> : <span>{ new Date(quote.expiry_date).toLocaleDateString() }</span>
                                    }
                                  </InfoValue>
                                </LoanInfo>
                                <LoanInfo>
                                  <InfoLabel>
                                    
                                  </InfoLabel>
                                  <InfoValue>
                                    {
                                      quote.state === "complete" ? <span style={{ fontWeight: '600' }}>PAGADA</span> : <Button type="secondary" variant="outlined" onClick={() => this.payQuote(quote)}>Pagar</Button>
                                    }
                                  </InfoValue>
                                </LoanInfo>
                              </LoanInfoWrapper>
                            </>
                          ))
                        }
                      </div>
                      <br />
                      <br />
                    </>
                  ))
                }
              </>
            ) 
          }
        </SectionWrapper>
        <PCModal
          open={openPaymentModal}
          handleClose={this.closePaymentModal}
          width="40%"
          height="85%"
          title="Pagar cuotas"
          description="Pagar cuota"
        >
          <Elements>
            <PaymentQuoteContent setStripeId={this.setStripeId} client={client} quote={quote} goverment_id={ !!client ? client.goverment_id : ''} handleClose={this.closePaymentModal} changeQuote={this.changeQuote} />
          </Elements>
        </PCModal>
      </PageWrapper>
    );
  }
}

export default PaymentPage;