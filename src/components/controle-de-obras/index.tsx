import React, { useState, useEffect } from "react";
import { getFile } from "../../services/cloudStorage";
import HomeScreen from "./screen";
import { News } from "../../types";
import { GetStaticProps } from "next";
import {
  getExpenseTotalizer,
  getGraphRevenueExpense,
  getPublicPolicies,
  getRevenueTotalizer,
} from "../../calls";
import { revalidate } from "../../config";
import moment from "moment";

function Home({
  amountExpense,
  amountExpenseProvided,
  percentageExpenseReached,
  chart,
  publicPolicies,
  amountRevenue,
  amountRevenueProvided,
  percentageRevenueReached,
  date,
}: any) {
  const [news, setNews] = useState<Array<News>>([]);
  const [expenseLoanding, setExpenseLoading] = useState(true);
  const [revenueLoading, setRevenueLoading] = useState(true);
  const [publicPoliciesLoading, setPublicPoliciesLoanding] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);

  const getNews = async () => {
    const response = await getFile("noticias.json");
    if (response.error) {
      return;
    }
    setNews(response.data);
  };

  // useEffect(() => {
  //   getNews();
  // }, []);

  const handler = {
    news,
    expenseAmount: amountExpense,
    expensePercentageReached: percentageExpenseReached,
    expenseProvided: amountExpenseProvided,
    revenueAmount: amountRevenue,
    revenuePercentageReached: percentageRevenueReached,
    revenueProvided: amountRevenueProvided,
    expenseLoanding,
    revenueLoading,
    publicPolicies,
    graphConfig: chart,
    publicPoliciesLoading,
    chartLoading,
    date,
  };
  return <HomeScreen handler={handler} />;
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const chart = await getGraphRevenueExpense();

  const { amountExpense, amountExpenseProvided, percentageExpenseReached } =
    await getExpenseTotalizer();

  const { publicPolicies } = await getPublicPolicies();

  const { amountRevenue, amountRevenueProvided, percentageRevenueReached } =
    await getRevenueTotalizer();

  return {
    props: {
      amountExpense: amountExpense || 0,
      amountExpenseProvided: amountExpenseProvided || 0,
      percentageExpenseReached: percentageExpenseReached || 0,
      chart: chart || { datasets: [], labels: [''] },
      publicPolicies: publicPolicies || [],
      amountRevenue: amountRevenue || 0,
      amountRevenueProvided: amountRevenueProvided || 0,
      percentageRevenueReached: percentageRevenueReached || 0,
      date: moment().format("DD/MM/YYYY hh:mm:ss"),
    },
    revalidate,
  };
};
