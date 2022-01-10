/* eslint-disable no-console */
import React, { ChangeEvent, FC, FormEvent } from 'react';
import {
  Container,
  Stack,
  Typography,
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import JSFileType from '../../models/stores/JSFileType';
import InsertStoreModel from '../../models/stores/InsertStoreModel';
import FetchConfigModel from '../../models/stores/FetchConfigModel';
import OverlayDBDataModel from '../../models/stores/OverlayDBDataModel';
import './InsertPage.scss';

const InsertPage: FC = () => {
  const IsImageUploadSucess = false;
  let storelogo: File | null = null;
  let pdpPageJSFile: File | null = null;
  let cartPageJSFile: File | null = null;
  let checkoutPageJSFile: File | null = null;
  let initialJSFile: File | null = null;
  let InsertStoreData: InsertStoreModel;
  let FetchConfigurationData: FetchConfigModel;
  let OverlayConfigurationData: OverlayDBDataModel;
  let JSFileName: string;
  let RecievedShopID: number;

  const [categorySelected, setcategorySelected] = React.useState<string[]>([]);

  const JSFileHandle = (e: ChangeEvent<HTMLInputElement>, fileType: JSFileType): void => {
    switch (fileType) {
      case JSFileType.PdpFile:
        pdpPageJSFile = (e.target as HTMLInputElement).files?.item(0) as File;
        break;
      case JSFileType.CartFile:
        cartPageJSFile = (e.target as HTMLInputElement).files?.item(0) as File;
        break;
      case JSFileType.CheckoutFile:
        checkoutPageJSFile = (e.target as HTMLInputElement).files?.item(0) as File;
        break;
      case JSFileType.InitialJSFile:
        initialJSFile = (e.target as HTMLInputElement).files?.item(0) as File;
        break;
      default:
        break;
    }
  };

  const handleStoreLogo = (event: ChangeEvent<HTMLInputElement>): void => {
    storelogo = (event.target as HTMLInputElement).files?.item(0) as File;
  };

  const postOverlayConfigData = (ConfigBody: OverlayDBDataModel): void => {
    console.log(ConfigBody);

    // Make an Api call in StoreService to update the OverlayConfig Data in DB
  };

  const PopulateOverlayConfigData = (
    form: EventTarget & InsertFormElement,
    Shopid: number,
  ): void => {
    try {
      // Initial, PDP, Cart and Checkout JS Code URL to be appended
      JSFileName = form.elements.ShopName.value;
      const specialChars = '!@#$^&%*()+=-[]/{}|:<>?,.';

      for (let i = 0; i < specialChars.length; i++) {
        JSFileName = JSFileName.replace(new RegExp(`\\${specialChars[i]}`, 'gi'), '');
      }

      JSFileName = JSFileName.replaceAll(' ', '');
      // PDP JS Code URL
      const appendPdpJSUrl = `/${JSFileName}/PDPPageJSContent.js`;

      // Cart JS Code URL
      const appendCartJSUrl = `/${JSFileName}/CartPageJSContent.js`;

      // Checkout JS Code URL
      const appendCheckoutJSUrl = `/${JSFileName}/CheckoutPageJSContent.js`;

      // Initial JS Code URL
      const appendInitialJSUrl = `/${JSFileName}/InitialJSContent.js`;

      OverlayConfigurationData = {
        shopID: Shopid,
        shopName: form.elements.ShopName.value,
        dbFriendlyShopName: form.elements.DBFriendlyName.value,
        shopWebURL: form.elements.WebUrl.value,
        shopSovrnWebURL: form.elements.SovernUrl.value,
        finalJSCodeURL: null,
        initialJSCodeURL: appendInitialJSUrl,
        pdpPageCommonURL: form.elements.pdpcommonurl.value,
        pdpPageButtonCode: form.elements.pdpbuttoncode.value,
        pdpPageJSCodeURL: appendPdpJSUrl,
        cartPageCommonURL: form.elements.cartcommonurl.value,
        cartPageButtonCode: form.elements.cartbuttoncode.value,
        cartPageJSCodeURL: appendCartJSUrl,
        checkoutPageCommonURL: form.elements.checkoutcommonurl.value,
        checkoutPageButtonCode: form.elements.checkoutbuttoncode.value,
        checkoutPageJSCodeURL: appendCheckoutJSUrl,
        gridPageCommonURL: null,
        gridPageButtonCode: null,
        gridPageJSCodeURL: null,
        paymentCardNumber: null,
        paymentCardExpiryMonth: null,
        paymentCardExpiryYear: null,
        paymentCardCVV: null,
      };

      postOverlayConfigData(OverlayConfigurationData);
    } catch (error) {
      console.log(error);
    }
  };

  const PopulateInsertStoreVariable = (form: EventTarget & InsertFormElement): void => {
    try {
      const ImageURL: string = form.elements.image_file.value.substring(
        form.elements.image_file.value.lastIndexOf('\\') + 1,
      );
      const appendedImageURL = `/images/${ImageURL}`;
      InsertStoreData = {
        shopName: form.elements.ShopName.value,
        dbFriendlyShopName: form.elements.DBFriendlyName.value,
        shopDBA: form.elements.ShopDBA.value,
        shopLocationGUID: form.elements.Loc_guid.value,
        shopWebURL: form.elements.WebUrl.value,
        shopSovrnWebURL: form.elements.SovernUrl.value,
        merchantID: form.elements.Merchantid.value,
        shopLogoURL: appendedImageURL,
        isDelete: false,
        isNew: false,
        isPopular: false,
        isShoppable: true,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const OnlineBulkInsert = (StoreData: InsertStoreModel): void => {
    console.log(StoreData);

    // Call the postOnlineBulkInsert in StoreService to make the API Call
  };

  const fetchOverlayConfig = (form: EventTarget & InsertFormElement): void => {
    FetchConfigurationData = {
      ShopID: -1,
      ShopName: form.elements.ShopName.value,
      DBFriendlyShopName: form.elements.DBFriendlyName.value,
    };
    console.log(FetchConfigurationData);

    // Assign the fetched ShopID to the RecievedShopID
    RecievedShopID = 90;
  };

  const UploadJSFiles = (): void => {
    // Make Api call in Store service to upload all the JS file
    // with
  };

  const Categorynames = [
    'Fashion',
    'Electronics',
    'Music Instruments & Gear',
    'Furniture',
    'Mattresses',
    'Appliances',
    'Auto',
    'Fitness',
    'Outdoor & Tools',
  ];

  const handleCategoryChange = (event: SelectChangeEvent<typeof categorySelected>): void => {
    const {
      target: { value },
    } = event;
    setcategorySelected(
      // On autofill we get a stringified value.
      String(value).split(','),
    );
  };

  const UploadStoreLogo = (form: EventTarget & InsertFormElement): void => {
    if (form.elements.image_file.value === null || form.elements.image_file.value === '') {
      // Show Error Message on ShopLogo Upload Field
      // Set  setshopLogoImageFile to null
    }
    const formData = new FormData();
    // const imageFile : string = form.elements.image_file.innerText;
    formData.append('RetailerLogo', storelogo as Blob);
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(form.elements.image_file.value)) {
      // Show error Message that the uploaded file is not of correct filr type
    }
    // API call is originated for StoreLogo Upload
    // InsertStoreLogo(formData);

    if (!IsImageUploadSucess) {
      // Error while making Image upload API
    }
  };

  const CategoryAssociation = (form: EventTarget & InsertFormElement): void => {
    // Using for loop add each category
    const selectedvalue = form.elements.Category.value.split(',');
    console.log(selectedvalue);
  };

  interface FormElements extends HTMLFormControlsCollection {
    image_file: HTMLInputElement;
    ShopName: HTMLInputElement;
    DBFriendlyName: HTMLInputElement;
    ShopDBA: HTMLInputElement;
    Loc_guid: HTMLInputElement;
    WebUrl: HTMLInputElement;
    SovernUrl: HTMLInputElement;
    Merchantid: HTMLInputElement;
    pdpcommonurl: HTMLInputElement;
    pdpbuttoncode: HTMLInputElement;
    cartcommonurl: HTMLInputElement;
    cartbuttoncode: HTMLInputElement;
    checkoutcommonurl: HTMLInputElement;
    checkoutbuttoncode: HTMLInputElement;
    Category: HTMLSelectElement;
  }
  interface InsertFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  const insertStoreButtonClicked = (event: FormEvent<InsertFormElement>): void => {
    try {
      event.preventDefault();
      const form = event.currentTarget;

      UploadStoreLogo(form);

      // Append uploaded imagelogo value to shopLogoURL of InsertStoreModel

      PopulateInsertStoreVariable(form);

      // API Call from Store Service to InsertANewStore
      OnlineBulkInsert(InsertStoreData);

      // Call a fetch API to get the Shop ID of the inserted store
      fetchOverlayConfig(form);

      // Make an post API on StoreService to post the OverlayConfigData of an Retailer
      PopulateOverlayConfigData(form, RecievedShopID);

      // Upload JS File
      UploadJSFiles();

      // Find the number of category selected to associate with the retailer
      CategoryAssociation(form);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container id="InsertPage">
      <Stack spacing={2}>
        <Typography variant="h4" marginBottom={3} component="h3" align="center">
          Add New Store
        </Typography>
        <form onSubmit={insertStoreButtonClicked}>
          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="image_file">Upload Retailer Logo</label>
            </Grid>

            <Grid item sm={6}>
              <TextField
                id="image_file"
                type="file"
                name="image_file"
                value={storelogo}
                required
                onChange={handleStoreLogo}
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="ShopName">Shop Name</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="ShopName"
                type="text"
                name="ShopName"
                placeholder="Please Enter Shop Name"
                color="secondary"
                required
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="DBFriendlyName">DB Friendly Name</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="DBFriendlyName"
                type="text"
                name="DBFriendlyName"
                placeholder="Please Enter the DBFriendlyName"
                color="secondary"
                required
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="ShopDBA">Shop DBA</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="ShopDBA"
                type="text"
                name="ShopDBA"
                placeholder="Please Enter the ShopDBA"
                color="secondary"
                required
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="Loc_guid">Location Guid</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="Loc_guid"
                type="text"
                name="Loc_guid"
                color="secondary"
                placeholder="Please Enter the Location Guid"
                required
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="WebUrl">Retailers Web URL</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="WebUrl"
                type="text"
                name="WebUrl"
                color="secondary"
                placeholder="Please Enter the WebURL"
                required
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="SovernUrl">Retailers Sovern URL</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="SovernUrl"
                type="text"
                name="SovernUrl"
                color="secondary"
                placeholder="Please Enter the Sovern URL"
                required
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="Merchantid">Retailers Merchant Guid</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="Merchantid"
                type="text"
                name="Merchantid"
                color="secondary"
                placeholder="Please Enter the Merchant Guid"
                required
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="pdpcommonurl">PDP Page CommonURL</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="pdpcommonurl"
                type="text"
                name="pdpcommonurl"
                color="secondary"
                placeholder="Please Enter the PDP Common URL"
                required
                size="small"
              />
            </Grid>

            <Grid item sm={6} container justifyContent="flex-end" alignItems="center">
              <label htmlFor="pdpbuttoncode">PDP Page ButtonCode</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="pdpbuttoncode"
                type="text"
                name="pdpbuttoncode"
                color="secondary"
                placeholder="Please Enter the PDP ButtonCode"
                required
                multiline
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="cartcommonurl">Cart Page CommonURL</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="cartcommonurl"
                type="text"
                name="cartcommonurl"
                color="secondary"
                placeholder="Please Enter the Cart Common UrL"
                required
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="cartbuttoncode">Cart Page ButtonCode</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="cartbuttoncode"
                type="text"
                name="cartbuttoncode"
                color="secondary"
                placeholder="Please Enter the Cart ButtonCode"
                required
                multiline
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="checkoutcommonurl">Checkout Page CommonURL</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="checkoutcommonurl"
                type="text"
                name="checkoutcommonurl"
                color="secondary"
                placeholder="Please Enter the Checkout CommonURL"
                required
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="checkoutbuttoncode">Checkout Page ButtonCode</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="checkoutbuttoncode"
                type="text"
                name="checkoutbuttoncode"
                color="secondary"
                placeholder="Please Enter the Checkout ButtonCode"
                multiline
                required
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="PdpFile">Upload PDPpage JS File</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="PdpFile"
                type="file"
                name="PdpFile"
                value={pdpPageJSFile}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  JSFileHandle(e, JSFileType.PdpFile)
                }
                required
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="cartFile">Upload Cartpage JS File</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="cartFile"
                type="file"
                name="cartFile"
                value={cartPageJSFile}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  JSFileHandle(e, JSFileType.CartFile)
                }
                required
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="checkoutFile">Upload Checkoutpage JS File</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="checkoutFile"
                type="file"
                value={checkoutPageJSFile}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  JSFileHandle(e, JSFileType.CheckoutFile)
                }
                name="checkoutFile"
                required
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="initialFile">Upload Initial JS File</label>
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="initialFile"
                type="file"
                name="initialFile"
                value={initialJSFile}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  JSFileHandle(e, JSFileType.InitialJSFile)
                }
                required
                size="small"
              />
            </Grid>

            <Grid container justifyContent="flex-end" alignItems="center" item sm={6}>
              <label htmlFor="Category">Upload Initial JS File</label>
            </Grid>
            <Grid item sm={6}>
              <Select
                id="Category"
                name="Category"
                multiple
                value={categorySelected}
                onChange={handleCategoryChange}
              >
                {Categorynames.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item container alignContent="center" justifyContent="center" sm={12}>
              <Button type="submit" id="InsertStoreButton" variant="contained" value="Insert Store">
                Insert Store
              </Button>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Container>
  );
};

export default InsertPage;
