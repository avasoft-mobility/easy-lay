interface OverlayDBDataModel {
    shopID: number;
    shopName: string;
    dbFriendlyShopName: string;
    shopWebURL: string;
    shopSovrnWebURL: string;
    initialJSCodeURL: string;
    finalJSCodeURL?: null;
    gridPageCommonURL?: null;
    gridPageButtonCode?: null;
    gridPageJSCodeURL?: null;
    pdpPageCommonURL: string;
    pdpPageButtonCode: string;
    pdpPageJSCodeURL?: string;
    checkoutPageCommonURL: string;
    checkoutPageButtonCode?: string;
    checkoutPageJSCodeURL: string;
    cartPageCommonURL: string;
    cartPageButtonCode: string;
    cartPageJSCodeURL: string;
    paymentCardNumber?: null;
    paymentCardExpiryMonth?: null;
    paymentCardExpiryYear?: null;
    paymentCardCVV?: null;
  }
  export default OverlayDBDataModel;
  