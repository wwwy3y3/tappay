# Tappay ![npm version](https://img.shields.io/npm/v/tappay.svg?style=flat)

[![Greenkeeper badge](https://badges.greenkeeper.io/Canner/tappay.svg)](https://greenkeeper.io/)
Nodejs sdk for Tappay backend API
https://docs.tappaysdk.com/tutorial/zh/back.html#overview 

## Installation
requires node v6 or higher
```
npm install tappay
yarn install tappay
```

## Usage
### import
``` js
// typescript
import {Service as TappayService} from "tappay";
// or node (> v6)
const {Service: TappayService} = require("tappay");
```

### payByPrime
``` js
const service = new TappayService({apiKey: API_KEY, env: "sandbox"});
service.payByPrime({
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
});
```

### payByCardToken
``` js
const service = new TappayService({apiKey: API_KEY, env: "sandbox"});
service.payByCardToken({
  card_key: cardSecrets.cardKey,
  card_token: cardSecrets.cardToken,
  merchant_id: MERCHANT_ID,
  details: "TapPay Test",
  order_number: "test-order",
  currency: "TWD",
  amount: 100
});
```

### findRecords
``` js
const service = new TappayService({apiKey: API_KEY, env: "sandbox"});
service.findRecords({
  filters: {
    rec_trade_id: tradeRecordId
  }
})
.then(response => {
  // records are in response.trade_records
});
```

### refund
``` js
const service = new TappayService({apiKey: API_KEY, env: "sandbox"});
service.refund({
  rec_trade_id: tradeRecordId
});
```

## Testing
testing require your own partnerKey and merchantID
```
TAPPAY_API_KEY="partner_blablabla" TAPPAY_MERCHANT_ID="your_marchant_id" npm run test
```
