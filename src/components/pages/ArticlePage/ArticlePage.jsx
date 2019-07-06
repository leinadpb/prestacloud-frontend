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

const FilterPanel = styled.div`
  width: 100%;
  height: 60px;
`;
const FilterOption = styled.div`
  width: 200px;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      articlesCopy: [],
      articleState: 1
    }
  }

  componentWillMount = () => {
    axios.get(`${ApiServer}/api/v1/article/all`).then(data => {

      this.setState({
        articles: data.data.articles.filter(x => x.state.id == 1),
        articlesCopy: data.data.articles,
      });
    });
  }

  openSellDialog = (art) => {

  }

  filterArticles = (e) => {
    this.setState({
      articleState: e.target.value,
      articles: this.state.articlesCopy.filter(x => x.state.id == e.target.value),
    })
  }

  render() {
    const { articles, articleState } = this.state;
    return (
      <PageWrapper>
        <Title>
          <h2>Todos los artículos</h2>
        </Title>
        <FilterPanel>
          <FilterOption>
            <span style={{ marginRight: '4px' }}><b>Estado: </b></span>
            <select class="form-control" id="articleState" value={articleState} onChange={(e) => this.filterArticles(e)}>
              <option value="1">Nuevo</option>
              <option value="2">En uso</option>
              <option value="3">Devuelto</option>
              <option value="4">En posesión</option>
            </select>
          </FilterOption>
        </FilterPanel>
        <div style={{ width: '100%', overflowX: 'scroll', maxHeight: '400px' }}>
        <table class="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Precio real</th>
                <th>Precio acordado</th>
                <th>Estado</th>
                <th>Tipo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                articles.map(art => (
                  <tr key={art.id}>
                    <td>{ art.name }</td>
                    <td>{ art.description }</td>
                    <td>{`RD${numeral(art.real_price).format("$0.00")}`}</td>
                    <td>{`RD${numeral(art.agreement_price).format("$0.00")}`}</td>
                    <td>{art.state.name}</td>
                    <td>{art.category_type.description}</td>
                    <td>
                      { art.state.id == 4 ? <Button variant="outlined" onClick={() => this.openSellDialog(art)}>Vender</Button> : null} 
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </PageWrapper>
    );
  }
}

export default ArticlePage;