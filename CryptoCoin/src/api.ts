const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((response) => response.json());
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((response) => response.json());
}

export function fetchCoinHistory(coinId: string) {
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((response) => response.json());
}
