import React, { FC, useEffect } from 'react';
import HttpResult from '../../helpers/http/HttpResult';
import OnlineRetailer from '../../models/stores/OnlineRetailer';
import HttpStatus from '../../models/utils/HttpResult';
import StoreService from '../../services/StoreService';
import './HomePage.scss';

const HomePage: FC = () => {
  useEffect(() => {
    StoreService.getAllStores()
      .then((response: HttpResult<OnlineRetailer[]>) => {
        if (response.status === HttpStatus.Success) {
          // access the data through `response.data`
        }
      })
      .catch((error) => {
        // Used console log for demonstration purpose. Do not use console.log when you're
        // developing the app.
        // eslint-disable-next-line no-console
        console.log((error as Error).message);
      });
  });

  return (
    <div id="HomePage">
      <h1>Application is under development, please come back later!</h1>
    </div>
  );
};

export default HomePage;
