import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import axios from 'axios';
import { ApiServer } from '../../../Defaults';
import Button from '@material-ui/core/Button';
import PCModal from '../../PCModal/PCModal';
import QuotesList from '../../QuotesList/QuotesList';

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
  width: 95%;
  height: auto;
  overflow: auto;
`;

class LoanPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loans: [],
      currentLoan: undefined,
      openQuotesModal: false,
    }
  }

  componentWillMount = () => {
    axios.get(`${ApiServer}/api/v1/loan`).then(data => {

      this.setState({
        loans: data.data.loans,
      });
    });
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

  seeQuotes = (loan) => {
    this.setState({
      openQuotesModal: true,
      currentLoan: loan
    });
  }

  closeQuotesModal = () => {
    this.setState({
      openQuotesModal: false
    });
  }

  render() {
    const { loans, openQuotesModal, currentLoan } = this.state;
    return (
      <PageWrapper>
        <Title>
          <h2>Todos los préstamos</h2>
        </Title>
          <table class="table" style={{ overflowX: 'scroll' }}>
            <thead>
              <tr>
                <th>Total a pagar</th>
                <th>Monto restante</th>
                <th>Estado</th>
                <th>Adeudor</th>
                <th>Monto quota</th>
                <th>Total de cuotas</th>
                <th>Duracion</th>
                <th>Impuestos</th>
                <th>Total de artículos</th>
                <th>Categoria</th>
                <th>Creado por</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                loans.map(loan => (
                  <tr>
                    <td>{loan.appraise * 1.18}</td>
                    <td>{ loan.amount_to_pay < 0 ? 0 : loan.amount_to_pay }</td>
                    <td>{ loan.status }</td>
                    <td>{`${loan.client.first_name} ${loan.client.last_name}`}</td>
                    <td>{`RD${numeral( (loan.appraise * 1.18) / loan.quotes.length).format("$0.00")}`}</td>
                    <td>{`${loan.quotes.length}`}</td>
                    <td>{this.getDuration(loan.duration)}</td>
                    <td>{Number(loan.tax) * 100}%</td>
                    <td>{loan.articles.length}</td>
                    <td>{ loan.category.name }</td>
                    <td>{loan.employee.full_name}</td>
                    <td>
                      <Button type="secondary" variant="outlined" onClick={() => this.seeQuotes(loan)}>Ver quotas</Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        <PCModal
          open={openQuotesModal}
          handleClose={this.closeQuotesModal}
          width="40%"
          height="50%"
          title="Ver quotas"
          description="ver quotas"
        >
          <QuotesList loan={currentLoan} />
        </PCModal>
      </PageWrapper>
    );
  }
}

export default LoanPage;