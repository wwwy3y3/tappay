import {Service as TappayService} from "../src";
import * as chai from "chai";

const expect = chai.expect;

// get sandbox credentials from env
if (!process.env.TAPPAY_API_KEY || !process.env.TAPPAY_MERCHANT_ID) {
  throw new Error("require both TAPPAY_API_KEY & TAPPAY_MERCHANT_ID");
}

const API_KEY = process.env.TAPPAY_API_KEY;
const MERCHANT_ID = process.env.TAPPAY_MERCHANT_ID;
const TEST_PRIME = "test_3a2fb2b7e892b914a03c95dd4dd5dc7970c908df67a49527c0a648b2bc9";

describe("api", () => {
  let tradeRecordId: string;
  const cardSecrets: {cardKey?: string, cardToken?: string} = {};
  const service = new TappayService({apiKey: API_KEY, env: "sandbox"});

  it("should payByPrime", () => {
    return service.payByPrime({
      prime: TEST_PRIME,
      merchant_id: MERCHANT_ID,
      amount: 1,
      currency: "TWD",
      details: "An apple and a pen.",
      cardholder: {
          phone_number: "+886923456789",
          name: "王小明",
          email: "LittleMing@Wang.com",
          zip_code: "100",
          address: "台北市天龍區芝麻街1號1樓",
          national_id: "A123456789"
      },
      remember: true
    })
    .then(response => {
      expect(response.status).to.equal(0);
      cardSecrets.cardKey = response.card_secret.card_key;
      cardSecrets.cardToken = response.card_secret.card_token;
    });
  });

  it("should payByCardToken", () => {
    return service.payByCardToken({
      card_key: cardSecrets.cardKey,
      card_token: cardSecrets.cardToken,
      merchant_id: MERCHANT_ID,
      details: "TapPay Test",
      order_number: "test-order",
      currency: "TWD",
      amount: 100
    })
    .then(response => {
      expect(response.status).to.equal(0);
      expect(response.order_number).to.equal("test-order");
      tradeRecordId = response.rec_trade_id;
    });
  });

  it("should all findRecords", () => {
    return service.findRecords()
    .then(response => {
      expect(response.status).to.equal(2);
      expect(response.trade_records).to.have.lengthOf.at.least(2);
    });
  });

  it("should findRecords with rec_trade_id", () => {
    return service.findRecords({
      filters: {
        rec_trade_id: tradeRecordId
      }
    })
    .then(response => {
      expect(response.status).to.equal(2);
      expect(response.trade_records).to.have.lengthOf(1);
      expect(response.trade_records[0]).to.include({
        rec_trade_id: tradeRecordId
      });
    });
  });

  it("should refund full amount", () => {
    return service.refund({
      rec_trade_id: tradeRecordId
    })
    .then(response => {
      expect(response.status).to.equal(0);
      expect(response.refund_amount).to.equal(100);
    });
  });
});
