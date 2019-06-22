import React, { Component } from "react";
import CustomCard from "../../card/CustomCard";
import styled from "styled-components";
import ActivePie from "../../charts/active-pie/ActivePie";
import ComposedBar from "../../charts/compose-bar/ComposedBar";
import Paper from "@material-ui/core/Paper";
import numeral from "numeral";
import axios from "axios";
import { ApiServer } from "../../../Defaults";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;

const ChartWrapper = styled.div`
  margin-top: 54px;
  padding: 12px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ChartTitle = styled.div`
  margin: 8px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: darkgray;
  font-weight: 600;
`;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsData: {
        income: 0,
        articles: 0,
        loans: 0,
        clients: 0,
      },
      days_ago_for_chart: 14 // Includes 0, so its really 15
    };
  }

  componentDidMount = () => {

    const { days_ago_for_chart } = this.state;
    axios.get(`${ApiServer}/api/v1/dashboard?days=${days_ago_for_chart}`).then(data => {
      let response = data.data;
      if (!!response) {
        let cardsData = {
          income: Number(response.income),
          articles: Number(response.total_articles),
          loans: Number(response.total_loans),
          clients: Number(response.total_clients)
        };

        let chart_data = response.day_data_list.map(item => {
          return {
            name: item.label,
            income: Number(item.total_income)
          };
        });

        this.setState({
          cardsData: cardsData,
          chartData: chart_data
        });
      }
    });

  };

  handleClick = () => {
    alert("click handled");
  };

  render() {
    const {
      pieChartData,
      cardsData,
      chartData,
      days_ago_for_chart
    } = this.state;
    return (
      <Wrapper>
        <CardsWrapper
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <CustomCard
            title="Ingresos estimados"
            labelButton="View details"
            content={`RD${numeral(cardsData.income).format("$0.00")}`}

          />
          <CustomCard
            title="Total articulos"
            labelButton="View details"
            content={Number(cardsData.articles)}
   
          />
          <CustomCard
            title="Total prestamos"
            labelButton="View details"
            content={Number(cardsData.loans)}
            
          />
          <CustomCard
            title="Total clientes"
            labelButton="View details"
            content={`${Number(cardsData.clients)}`}
          />
        </CardsWrapper>
        <ChartWrapper>
          <Paper style={{ margin: "5px", width: "60%" }}>
            <ChartTitle> Last {days_ago_for_chart + 1} days</ChartTitle>
            <ComposedBar data={chartData} />
          </Paper>
        </ChartWrapper>
      </Wrapper>
    );
  }
}

export default Dashboard;
