import React from 'react';
import {Elements, CardElement, injectStripe} from 'react-stripe-elements';
import styled from 'styled-components';
import axios from 'axios';
import { ApiServer } from '../../Defaults';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class ClientCard extends React.Component {
  state = {
    clientHasToken: false
  }
  submit = async (e) => {
    const { client } = this.props;
    const full_name = client.first_name + ' ' + client.last_name;
    let {token} = await this.props.stripe.createToken({name: full_name, currency: 'dop'});
    await axios.post(`${ApiServer}/api/v1/client_users/card/create_customer?card_token=${token.id}&goverment_id=${client.goverment_id}`).then(data => {
      this.setState({
        clientHasToken: true
      }, () => {
        this.props.setStripeId(data.data.client.stripe_id)
      })
    })
  }
  render() {
    const { clientHasToken } = this.state;
    return (
      <Wrapper>
        {
          clientHasToken ? (<><span style={{ fontWeight: '600' }}>Listo! </span><br /><span>Ya el cliente tiene la tarjeta asociada, por favor, proceda con el pago.</span></>) : (
            <div>
              <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p>Al parecer este cliente no tiene una tarjeta de pago asociada</p>
                <p>Solicite la siguiente informacion:</p>
              </div>
              <br />
              <div className="checkout">
                <CardElement />
              </div>
              <br />
              <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button class="btn btn-primary" onClick={this.submit}>Asociar tarjeta al cliente</button>
              </div>
            </div>
          )
        }
      </Wrapper>
    );
  }
}

export default injectStripe(ClientCard);