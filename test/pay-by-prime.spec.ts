import TappayService from "../src";
import * as chai from "chai";

const expect = chai.expect;

// get sandbox credentials from env
if (!process.env.TAPPAY_API_KEY || !process.env.TAPPAY_MERCHANT_ID) {
  throw new Error("require both TAPPAY_API_KEY & TAPPAY_MERCHANT_ID");
}

const API_KEY = process.env.TAPPAY_API_KEY;
const MERCHANT_ID = process.env.TAPPAY_MERCHANT_ID;
const TEST_PRIME = "test_3a2fb2b7e892b914a03c95dd4dd5dc7970c908df67a49527c0a648b2bc9";

describe("payByPrime", () => {
  const service = new TappayService({apiKey: API_KEY, env: "sandbox"});
  it("should successfully pay by prime", () => {
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
      remember: false
    })
    .then(response => {
      expect(response.status).to.equal(0);
    });
  });
});
