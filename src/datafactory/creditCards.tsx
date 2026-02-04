import { CreditCard } from "../types/creditCard";

export class CreditCards {
  async createCreditCard(): Promise<CreditCard> {
    const creditCards = [
      {
        type: "Visa",
        number: "4242424242424242",
        expDate: "12/27",
        securityCode: "350",
        postalCode: "12345",
      },
      {
        type: "MC",
        number: "5555555555554444",
        expDate: "04/29",
        securityCode: "428",
        postalCode: "12345",
      },
      {
        type: "MC prepaid",
        number: "5105105105105100",
        expDate: "10/27",
        securityCode: "648",
        postalCode: "12345",
      },
      {
        type: "AMEX",
        number: "378282246310005",
        expDate: "11/26",
        securityCode: "9382",
        postalCode: "12345",
      },
      {
        type: "Discover",
        number: "6011111111111117",
        expDate: "03/31",
        securityCode: "747",
        postalCode: "12345",
      },
      {
        type: "Visa debit",
        number: "4000056655665556",
        expDate: "06/26",
        securityCode: "787",
        postalCode: "12345",
      },
    ];

    const randomIndex = Math.floor(Math.random() * creditCards.length);
    return creditCards[randomIndex];
  }

  async getSpecificInvalidCard(
    errorType: "declined" | "insufficient_funds" | "lost" | "stolen" | "expired" | "incorrect_cvc" | "processing_error"
  ): Promise<CreditCard> {
    const invalidCardMap = {
      declined: {
        type: "Card declined",
        number: "4000000000000002",
        expDate: "12/27",
        securityCode: "350",
        postalCode: "12345",
      },
      insufficient_funds: {
        type: "Insufficient funds",
        number: "4000000000009995",
        expDate: "04/29",
        securityCode: "428",
        postalCode: "12345",
      },
      lost: {
        type: "Lost card",
        number: "4000000000009987",
        expDate: "10/27",
        securityCode: "648",
        postalCode: "12345",
      },
      stolen: {
        type: "Stolen card",
        number: "4000000000009979",
        expDate: "11/26",
        securityCode: "382",
        postalCode: "12345",
      },
      expired: {
        type: "Expired card",
        number: "4000000000000069",
        expDate: "03/31",
        securityCode: "747",
        postalCode: "12345",
      },
      incorrect_cvc: {
        type: "Incorrect CVC",
        number: "4000000000000127",
        expDate: "06/26",
        securityCode: "787",
        postalCode: "12345",
      },
      processing_error: {
        type: "Processing error",
        number: "4000000000000119",
        expDate: "08/28",
        securityCode: "123",
        postalCode: "12345",
      },
    };

    return invalidCardMap[errorType];
  }
}
