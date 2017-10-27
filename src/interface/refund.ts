export interface IRefundParams {
  /**
   * Authentication key for each individual partner.
   */
  partner_key: string;
  /**
   * Identifier for the transaction being refunded.
   */
  rec_trade_id: string;
  /**
   * Only required for partial refund.
   */
  amount: number;
}

export interface IRefundResponse {
  /**
   * Response code. 0 indicates success.
   */
  status:	number;
  /**
   * Error message.
   */
  msg: string;
  /**
   * Amount being refunded.
   */
  refund_amount: number;
  /**
   * Whether the transaction has been captured or not.
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
}
