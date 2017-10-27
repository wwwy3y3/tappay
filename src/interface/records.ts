export interface ITradeRecord {
  /**
   * Record identifier.
   */
  rec_trade_id: string;
  /**
   * Authorization code from the bank.
   */
  auth_code: string;
  /**
   * Identifier of the merchant involved in this trade.
   */
  merchant_id: string;
  /**
   * Name of the merchant involved in this trade.
   */
  merchant_name: string;
  /**
   * Name of the website / application involved in this trade.
   */
  app_name: string;
  /**
   * Time of the record in milliseconds.
   */
  time: number;
  /**
   * Price of the record.
   * It will change if the transaction was refunded.
   */
  amount: number;
  /**
   * Refunded price of the record.
   */
  refund_amount: number;
  /**
   * Status of the record.
   */
  record_status: number;
  /**
   * A self-defined unique identifier for the bank.
   */
  bank_transaction_id: string;
  /**
   * Time when the transaction payment will be captured.
   */
  cap_millis: number;
  /**
   * Original price of the record.
   */
  original_amount: number;
  /**
   * Time when the bank begins processing the transaction.
   */
  bank_transaction_start_millis: number;
  /**
   * Time when the bank finishes processing the transaction.
   */
  bank_transaction_end_millis: number;
  /**
   * Whether this record is captured or not.
   */
  is_captured: boolean;
  /**
   * Response code from the bank.
   */
  bank_result_code: string;
  /**
   * Error message from the bank.
   */
  bank_result_msg: string;
  /**
   * First six digits of the card and last four digits of the card
   */
  partial_card_number: string;
  /**
   * List of product/service purchased in the transaction.
   */
  details: string;
  /**
   * Information of the owner of the card
   */
  cardholder: {
    phone_number: string;
    name: string;
    email: string;
    zip_code: string;
    address: string;
    national_id: string;
  };
}

export interface IRecordParams {
  /**
   * Number of records on each page, up to 200. default to 50
   */
  records_per_page?: number;
  /**
   * The returned page. default to 0
   */
  page?: number;
  /**
   * Restrictions on the trade records.
   * The following filters are possible:
   * time, amount, cardholder, merchant_id, record_status, rec_trade_id, order_number, bank_transaction_id
   */
  filters?: {
    time?: {
      start_time?: number,
      end_time?: number
    },
    amount?: {
      upper_limit?: number,
      lower_limit?: number
    },
    cardholder?: {
      phone_number?: string,
      name?: string,
      email?: string
    },
    merchant_id?: string[],
    record_status?: number,
    rec_trade_id?: string,
    order_number?: string,
    bank_transaction_id?: string
  };
  /**
   * Criteria for ordering
   */
  order_by?: {
    /**
     * "time" default (Order by time) or "amount"(Order by amount)
     */
    attribute?: "time" | "anount",
    /**
     * default: true
     */
    is_descending?: boolean
  };
}

export interface IRecordResponse {
  /**
   * Response code. 0 indicates success.
   */
  status:	number;
  /**
   * Error message.
   */
  msg: string;
  /**
   * Number of records on each page, up to 200.
   */
  records_per_page: number;
  /**
   * The returned page.
   */
  page: number;
  /**
   * Total number of pages.
   */
  total_page_count: number;
  /**
   * Total number of transactions.
   */
  number_of_transactions: number;
  /**
   * Trade records.
   */
  trade_records: ITradeRecord[];
}
