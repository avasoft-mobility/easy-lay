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
}

export default StoreService;
