import axios, {AxiosPromise} from "axios";
import {resolve} from "url";
import {IPayByPrimeParams, IPayByPrimeResponse} from "./interface/pay-by-prime";
import {IPayByTokenParams, IPayByTokenResponse} from "./interface/pay-by-token";
import {IRefundParams, IRefundResponse} from "./interface/refund";

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

  /**
   * payByPrime
   * https://docs.tappaysdk.com/tutorial/en/back.html#pay-by-prime-api
   * @param data IPayByPrimeParams
   */
  public payByPrime(data: IPayByPrimeParams): Promise<IPayByPrimeResponse> {
    return this.makeApiRequest("/tpc/payment/pay-by-prime", data)
    .then(response => response.data);
  }

  /**
   * payByCardToken
   * https://docs.tappaysdk.com/tutorial/en/back.html#pay-by-card-token-api
   * @param data IPayByTokenParams
   */
  public payByCardToken(data: IPayByTokenParams): Promise<IPayByTokenResponse> {
    return this.makeApiRequest("/tpc/payment/pay-by-token", data)
    .then(response => response.data);
  }

  /**
   * refund
   * @param data IRefundParams
   */
  public refund(data: IRefundParams): Promise<IRefundResponse> {
    return this.makeApiRequest("/tpc/transaction/refund", data)
    .then(response => response.data);
  }

  private makeApiRequest(url: string, data: any) {
    return axios.post(
      resolve(this.apiEndpoint, url),
      {...data, partner_key: this.apiKey},
      {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey
      }
    });
  }
}
