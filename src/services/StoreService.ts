import HttpClient from '../helpers/http/HttpHelper';
import OnlineRetailer from '../models/stores/OnlineRetailer';
import Config from '../configs/config.json';
import HttpResult from '../helpers/http/HttpResult';
import HttpStatus from '../models/utils/HttpResult';

class StoreService {
  static getAllStores = async (): Promise<HttpResult<OnlineRetailer[]>> => {
    try {
      const httpClient = await HttpClient.Create<OnlineRetailer[], null>();
      const response = await httpClient.get(Config.ROUTES.GET_ALL_RETAILERS);
      return response;
    } catch (error) {
      return {
        data: null,
        status: HttpStatus.Failed,
        message: (error as Error).message,
      };
    }
  };

  static postRetailerLogo = async (ShopLogo : FormData): Promise<HttpResult<boolean>> => {
    try{
      const httpClient = await HttpClient.Create<boolean, FormData>();
      const response = await httpClient.post((String(Config.ROUTES.POST_RETAILER_LOGO)), ShopLogo);
      if(response.status === HttpStatus.Success) {
        return {
          data: true,
          status:HttpStatus.Success,
          message: "Store Logo Image added sucessfully"
        };
      }

      return {
        data: null,
        status: HttpStatus.Failed,
        message: "Filed to add the store logo"
      };
    } catch(error){
      return {
        data: null,
        status: HttpStatus.Failed,
        message: (error as Error).message,
      };
    }
  }

}

export default StoreService;
