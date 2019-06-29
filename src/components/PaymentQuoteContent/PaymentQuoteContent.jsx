import React from 'react';
import axios from 'axios';
import { ApiServer } from '../../Defaults';
import { CircularProgress } from '@material-ui/core';
import ClientCard from '../ClientCard/ClientCard';
import Cards from 'react-credit-cards';

class PaymentQuoteContent extends React.Component {
  state = {
    total_to_pay: 0,
    type: 'cash',
    userHasCard: false,
    amount_to_return: 0,
    isPayed: false,
    isLoading: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  makePayment = () => {
    const { type, total_to_pay } = this.state;
    const { quote, goverment_id } = this.props;
    this.setState({
      isLoading: true,
    }, () => {
      axios.post(`${ApiServer}/api/v1/payment/quote?type=${type}&quote_id=${quote.id}&amount=${total_to_pay}&goverment_id=${goverment_id}`).then(data => {
        console.log(data);
        this.setState({
          amount_to_return: data.data.amount_to_return,
          isPayed: true,
          isLoading: false
        });
        this.props.changeQuote(data.data.quote);
      })
    })
   
  }

  render() {
    const { quote, client } = this.props;
    const { total_to_pay, type, userHasCard, amount_to_return, isPayed, isLoading } = this.state;

    let canPay = false;
    if (total_to_pay > 0 && type === 'cash') canPay = true;
    if (type === 'card' && !!client.cards) canPay = true;

    const clientCard = !!client.cards ? client.cards[0] : undefined;

    console.log('Quote:', quote);
    return(
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
       <div style={{ padding: '16px' }}>
        <h3>Pagar Cuota</h3>
       </div>
       <br /><br />
       <div style={{ width: '100%', padding: '16px', minHeight: '42px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <span style={{ fontSize: '2.0rem', fontWeight: '600' }}>RD$ {quote.amount}</span>
       </div>
       <div style={{ width: '100%', padding: '16px', minHeight: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
         Metodo de pago
       </div>
       <div style={{ width: '50%', padding: '16px', minHeight: '34px', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
         <select id="type" value={type} onChange={this.handleChange} class="form-control">
           <option value="cash">Efectivo</option>
           <option value="card">Tarjeta</option>
         </select>
       </div>
       <br />
       <br />
       {
         (type === "cash") ? (
          <div style={{ display: 'flex', width: '70%', padding: '16px', minHeight: '48px', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ margin: '12px', width: '100%', padding: '12px' }}>
              Monto a pagar
            </div>
            <div style={{ display: 'flex', width: '100%', padding: '16px', minHeight: '48px', justifyContent: 'center', alignItems: 'center' }}>
              <input id="total_to_pay" class="form-control" onChange={this.handleChange} type="number" value={total_to_pay} placeholder="Total a pagar" />
            </div>
          </div>) : (
            <div style={{ width: '100%', margin: '16px' }}>
              {
                (!!client.stripe_id && !!client.cards) ? (
                  <>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '12px' }}>
                      <div>
                        <Cards
                          number={`XXXXXXXXXXXX${clientCard.last4}`}
                          name={clientCard.name}
                          expiry={`${clientCard.exp_month} / ${clientCard.exp_year.toString().slice(-3)}`}
                          cvc={'456'}
                          focused={true}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <ClientCard client={this.props.client} setStripeId={this.props.setStripeId} />
                )
              }
            </div>
          )
       }
       <br />
       {
         !isPayed ? isLoading ? <CircularProgress /> : (<button type="submit" class="btn btn-primary btn-lg" disabled={!canPay} onClick={this.makePayment}>Pagar</button>) : (
           <div style={{ margin: '12px', display: 'flex', flexDirection: 'column', width: '60%' }}>
             <span style={{ fontSize: '1.14rem', fontWeight: '600' }}>Pago satisfactorio!</span>
             <b>Devuelta: </b> { `RD$ ${amount_to_return}` }
             <br />
             <button class="btn btn-secondary btn-lg" onClick={this.props.handleClose}>Cerrar</button>
          </div>
         )
       }
      </div>
    );
  }
}

export default PaymentQuoteContent;