import HttpClient from "../helpers/httpHelper";
import Config from "../configs/config.json"

const getAllStores = async () => {
  try {
    return HttpClient.Get(Config.ROUTES.GET_ALL_RETAILERS);
  } catch (error) {
    console.log(error.message);
    return null;
  }
}


export { getAllStores };
