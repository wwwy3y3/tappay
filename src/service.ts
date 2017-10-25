import axios, {AxiosPromise} from "axios";
import {IPayByPrimeParams, IPayByPrimeResponse} from "./pay-by-prime";
import {IPayByTokenParams, IPayByTokenResponse} from "./pay-by-token";
import {resolve} from "url";

// types & interfaces
export type TAPPAY_ENV = "sandbox" | "production";

// constants
const SANDBOX_ENDPOINT = "https://sandbox.tappayapis.com";
const PROD_ENDPOINT = "https://prod.tappayapis.com";

// tappay service
export default class TappayService {
  private apiKey: string;
  private env: TAPPAY_ENV;
  private apiEndpoint: string;

  constructor({apiKey, env}: {apiKey: string, env: TAPPAY_ENV}) {
    this.apiKey = apiKey;
    this.env = env;
    this.apiEndpoint = (env === "sandbox") ? SANDBOX_ENDPOINT : PROD_ENDPOINT;
  }

  /*
    https://docs.tappaysdk.com/tutorial/en/back.html#pay-by-prime-api
  */
  public payByPrime(data: IPayByPrimeParams): Promise<IPayByPrimeResponse> {
    return this.makeApiRequest("/tpc/partner/directpay/pay-by-prime", data)
    .then(response => response.data);
  }

  /*
    https://docs.tappaysdk.com/tutorial/en/back.html#pay-by-card-token-api
  */
  public payByCardToken(data: IPayByTokenParams): Promise<IPayByTokenResponse> {
    return this.makeApiRequest("/tpc/partner/directpay/pay-by-token", data)
    .then(response => response.data);
  }

  private makeApiRequest(url: string, data: any) {
    return axios.post(
      resolve(this.apiEndpoint, url),
      {...data, partnerkey: this.apiKey},
      {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey
      }
    });
  }
}
