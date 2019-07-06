import React from 'react';
import axios from 'axios';
import { ApiServer } from '../../../Defaults';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PCModal from '../../PCModal/PCModal';
import CreateClient from '../../CreateClient/CreateClient';
import CreateArticle from '../../CreateArticle/CreateArticle';
import withNotifier from '../../../hocs/withNotifier';
import { Routes } from '../../../Constants';
import { withRouter } from 'react-router-dom';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto minmax(60px, 65px);
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding-left: 16px;
`;

const SaveLoanWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.disabled ? '#737373' : '#cc0047'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${props => props.disabled ? '#737373' : '#ff0059'};
  }
  & > span {
    color: ${props => props.disabled ? '#e0e0e0' : 'white'};
    font-size: 2.0rem;
  }
`;

const CancelButton = styled.div`
  position: absolute;
  top: 12px;
  right: 16px;
  width: 54px;
  height: 54px;
  background: transparent;
  & > i {
    font-size: 3rem;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.3s;
  }
  & > i:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled.div`
  width: 32px;
  height: 32px;
  background: transparent;
  & > i {
    font-size: 1.8rem;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s;
  }
  & > i:hover {
    opacity: 0.9;
  }
`;

const PageTitle = styled.div`
  margin-top: 24px;
  
`;

const Sections = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 48px;
`;

const SectionWrapper = styled.div`
  width: 100%;
  height: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const SectionWrapperHorizontal = styled.div`
  width: 100%;
  height: 10vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const UserInfoWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const SectionLabel = styled.div`
  padding: 8px;
  margin-right: 8px;
  & > span {
    font-weight: 600;
    font-size: 1.15rem;
  }
`;

const SectionText = styled.div`
  width: 100%;
  height: auto;
  padding: 24px;
  & > textarea {
    border: none;
    box-shadow: 0px 0px 8px 2px rgb(0, 0, 0, 0.08);
    font-size: 1.15rem;
    padding: 12px;
    width: 100%;
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

const UserInfo = styled.div``;
const UserLabel = styled.div`
  & > span {
    font-weight: 600;
  }
`;
const UserValue = styled.div`
  & > span { 
    font-weight: 400;
  }
`;

const ArticleList = styled.div`
  width: 100%;
  height: 420px;
  overflow-y: auto;
`;

const ArticlesWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
`;

const ArticleInfo = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

class AddLoan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      client: undefined,
      openCreateClientModal: false,
      articles: [],
      openCreateArticleModal: false,
      observations: '',
      loan_category_id: -1,
      payment_frecuency_id: -1,
      loan_duration: -1,
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.id]: value
    })
  }

  searchClient = (e) => {
    const id = e.target.value;
    if (e.key === 'Enter') {
      axios.get(`${ApiServer}/api/v1/client/search`, {
        params: {
          goverment_id: id
        }
      }).then(data => {
        if (!data.data.client) {
          this.shouldCreateNewClient(id);
        } else {
          this.setState({
            client: data.data.client
          })
        }
        
      })
    }
  }

  shouldCreateNewClient = (goverment_id) => {
    this.setState({
      openCreateClientModal: true,
      toCreateId: goverment_id
    })
  }

  addNewArticle = () => {
    this.setState({
      openCreateArticleModal: true,
    })
  }

  closeClientModal = () => {
    this.setState((prevState) => ({
      openCreateClientModal: !prevState.openCreateClientModal
    }))
  }

  closeArticleModal = () => {
    this.setState((prevState) => ({
      openCreateArticleModal: !prevState.openCreateArticleModal
    }))
  }

  setClient = (client) => {
    this.setState({
      client,
      openCreateClientModal: false
    });
  }

  appendArticle = (article) => {
    this.setState({
      articles: [...this.state.articles, article],
    }, () => {
      this.closeArticleModal();
    })
  }

  removeArticle = (articleIndex) => {

    this.setState({
      articles: this.state.articles.filter(x => x !== this.state.articles[articleIndex]),
    }, () => {
     
    })
  }

  saveLoan = (isDisabled) => {
    if (!isDisabled) {
      const { observations, client, loan_category_id, payment_frecuency_id, articles, loan_duration } = this.state;
      const dto = {
        loan: {
          observations: observations,
          category_id: loan_category_id,
          client_id: client.id,
          loan_payment_frecuency_id: payment_frecuency_id,
          loan_duration: loan_duration
        },
        articles: articles.map(a => ({
          name: a.name, 
          description: a.description, 
          real_price: a.real_price,
          agreement_price: a.agreement_price,
          article_type_id: a.article_type_id}))
      }
      
      axios.post(`${ApiServer}/api/v1/loan`, dto).then(data => {
     
        this.props.notify({
          title: 'Test notification',
          message: 'Yei!! it works perfectly.'
        });
        this.cleanForm();
        this.props.history.push({
          pathname: Routes.billPage,
          search: '',
          state: { loan: data.data.loan, quotes: data.data.quotes }
        });
      });
 
    }
  }

  cleanForm = () => {
    this.setState({
      client: undefined,
      openCreateClientModal: false,
      articles: [],
      openCreateArticleModal: false,
      observations: '',
      loan_category_id: -1,
      payment_frecuency_id: -1,
      loan_duration: -1,
    });
  }

  render() {
    const { client, toCreateId, articles, observations, loan_category_id, payment_frecuency_id, loan_duration } = this.state;

    let saveDisabled = true;
    if (articles.length > 0 && !!client && !!observations && loan_category_id !== -1 && payment_frecuency_id !== -1 && loan_duration !== -1) {
      saveDisabled = false;
    }

    return (
      <PageWrapper>
        <Wrapper>
          <CancelButton onClick={this.cleanForm}>
            <i class="fas fa-times"></i>
          </CancelButton>
          <PageTitle>
            <h2>Abrir nuevo préstamo</h2>
          </PageTitle>
          <Sections>
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
                  <ArticlesWrapper>
                    <ArticleInfo>
                      <UserLabel>
                        <span>Primer nombre</span>
                      </UserLabel>
                      <UserValue>
                        <span>{ client.first_name }</span>
                      </UserValue>
                    </ArticleInfo>
                    <ArticleInfo>
                      <UserLabel>
                        <span>Primer apellido</span>
                      </UserLabel>
                      <UserValue>
                        <span>{ client.last_name }</span>
                      </UserValue>
                    </ArticleInfo>
                    <ArticleInfo>
                      <UserLabel>
                        <span>Cedula</span>
                      </UserLabel>
                      <UserValue>
                        <span>{ client.goverment_id }</span>
                      </UserValue>
                    </ArticleInfo>
                    <ArticleInfo>
                      <UserLabel>
                        <span>Telefono</span>
                      </UserLabel>
                      <UserValue>
                        <span>{ client.phone }</span>
                      </UserValue>
                    </ArticleInfo>
                    <ArticleInfo>
                      <UserLabel>
                        <span>Correo electrónico</span>
                      </UserLabel>
                      <UserValue>
                        <span>{ client.email }</span>
                      </UserValue>
                    </ArticleInfo>
                  </ArticlesWrapper>
                ) 
              }
            </SectionWrapper>
            <SectionWrapper>
              <Section>
                <SectionLabel>
                  <span style={{ marginRight: '16px' }}>Artículos </span>
                  <Button variant="outlined" color="primary" onClick={this.addNewArticle}>
                    Agregar
                  </Button>
                </SectionLabel>
              </Section>
              {
                !articles.length === 0 ? null : (
                  <ArticleList>
                    {
                      articles.map( (article, idx) => (
                        <ArticlesWrapper key={idx}>
                          <ArticleInfo>
                            <UserLabel>
                              <span>Nombre</span>
                            </UserLabel>
                            <UserValue>
                              <span>{ article.name }</span>
                            </UserValue>
                          </ArticleInfo>
                          <ArticleInfo>
                            <UserLabel>
                              <span>Descripcion</span>
                            </UserLabel>
                            <UserValue>
                              <span>{ article.description }</span>
                            </UserValue>
                          </ArticleInfo>
                          <ArticleInfo>
                            <UserLabel>
                              <span>Precio real</span>
                            </UserLabel>
                            <UserValue>
                              <span>{ article.real_price }</span>
                            </UserValue>
                          </ArticleInfo>
                          <ArticleInfo>
                            <UserLabel>
                              <span>Precio acordado</span>
                            </UserLabel>
                            <UserValue>
                              <span>{ article.agreement_price }</span>
                            </UserValue>
                          </ArticleInfo>
                          <ArticleInfo>
                            <UserLabel>
                              <span>Tipo</span>
                            </UserLabel>
                            <UserValue>
                              <span>{ article.article_type_id }</span>
                            </UserValue>
                          </ArticleInfo>
                          <ArticleInfo>
                            <DeleteButton onClick={() => this.removeArticle(idx)}>
                              <i class="fas fa-times"></i>
                            </DeleteButton>
                          </ArticleInfo>
                        </ArticlesWrapper>
                      ))
                    }
                  </ArticleList>
                ) 
              }
            </SectionWrapper>
            <SectionWrapperHorizontal>
              <Section style={{ marginBottom: '16px' }}>
                <SectionLabel>
                  <span>Categoria:</span>
                </SectionLabel>
                <SectionInput>
                  <select id="loan_category_id" placeholder="Categoría de préstamo" onChange={this.handleChange}>
                    <option value="-1" selected>Select...</option>
                    <option value="1">Personal</option>
                    <option value="2">Estudio</option>
                    <option value="3">Hipotecario</option>
                  </select>
                </SectionInput>
              </Section>
              <Section>
               <SectionLabel>
                  <span>Frecuencia de pago:</span>
                </SectionLabel>
                <SectionInput>
                  <select id="payment_frecuency_id" placeholder="Frecuencia de pago" onChange={this.handleChange}>
                    <option value="-1" selected>Select...</option>
                    <option value="1">Mensual</option>
                    <option value="2">Trimestral</option>
                    <option value="3">Anual</option>
                  </select>
                </SectionInput>
              </Section>
              <Section>
               <SectionLabel>
                  <span>Duración:</span>
                </SectionLabel>
                <SectionInput>
                  <select id="loan_duration" placeholder="Duración" onChange={this.handleChange}>
                    <option value="-1" selected>Select...</option>
                    <option value="1">1 mes</option>
                    <option value="3">3 meses</option>
                    <option value="6">6 meses</option>
                    <option value="12">1 año</option>
                    <option value="24">2 años</option>
                    <option value="60">5 años</option>
                    <option value="120">10 años</option>
                  </select>
                </SectionInput>
              </Section>
            </SectionWrapperHorizontal>
            <SectionWrapper>
              <Section>
               <SectionLabel>
                  <span>Observaciones:</span>
                </SectionLabel>
                <SectionText>
                  <textarea id="observations" value={observations} onChange={this.handleChange} type="text" placeholder="Observaciones..." rows="3"></textarea>
                </SectionText>
              </Section>
            </SectionWrapper>
          </Sections>
        </Wrapper>
        <PCModal
          width="50%"
          height="50%"
          title="Crear nuevo cliente"
          description="Create cliente"
          open={this.state.openCreateClientModal}
          handleClose={this.closeClientModal}
        >
          <CreateClient setClient={this.setClient} handleClose={this.closeClientModal} goverment_id={toCreateId} />
        </PCModal>
        <PCModal
          width="50%"
          height="50%"
          title="Crear nuevo articulo"
          description="Create article"
          open={this.state.openCreateArticleModal}
          handleClose={this.closeArticleModal}
        >
          <CreateArticle appendArticle={this.appendArticle} handleClose={this.closeArticleModal} />
        </PCModal>
        <SaveLoanWrapper disabled={saveDisabled} onClick={() => this.saveLoan(saveDisabled)}>
          <span>Abrir préstamo</span>
        </SaveLoanWrapper>
      </PageWrapper>
    );
  }
}

export default withNotifier(withRouter(AddLoan));