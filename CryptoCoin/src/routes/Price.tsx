import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid: repeat(4, 1fr) / repeat(2, 1fr);
  grid-gap: 10px;
  width: 100%;
`;

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  height: 80px;
  span:first-child {
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  span:last-child {
    font-size: 20px;
    font-weight: 600;
  }
`;

interface IHistorical {
  quotes: {
    USD: {
      ath_date: number;
      ath_price: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical>(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <Container>
          <Overview>
            <span>
              Best Price at
              {data?.quotes.USD.ath_date?.toString().split("T")[0]}
            </span>
            <span>$ {data?.quotes.USD.ath_price.toFixed(3)}</span>
          </Overview>
          <Overview>
            <span>Compared to 1 Hours...</span>
            <span>{data?.quotes.USD.percent_change_1h} %</span>
          </Overview>
          <Overview>
            <span>Compared to 6 Hours...</span>
            <span>{data?.quotes.USD.percent_change_6h} %</span>
          </Overview>
          <Overview>
            <span>Compared to 12 Hours...</span>
            <span>{data?.quotes.USD.percent_change_12h} %</span>
          </Overview>
          <Overview>
            <span>Compared to 24 Hours...</span>
            <span>{data?.quotes.USD.percent_change_24h} %</span>
          </Overview>
          <Overview>
            <span>Compared to 7 Days...</span>
            <span>{data?.quotes.USD.percent_change_7d} %</span>
          </Overview>
          <Overview>
            <span>Compared to 30 Days...</span>
            <span>{data?.quotes.USD.percent_change_30d} %</span>
          </Overview>
          <Overview>
            <span>Compared to 1 years...</span>
            <span>{data?.quotes.USD.percent_change_1y} %</span>
          </Overview>
        </Container>
      )}
    </div>
  );
}

export default Price;
