import AsyncStorage from "@react-native-async-storage/async-storage";

const axios = require("axios").default;

export const Login = async (userPass: string, userResult: Function) => {
  const value = await AsyncStorage.getItem("ServerConfig");

  axios({
    method: "post",
    url: `http://${value}:3200/api/user/login`,
    data: {
      pass: userPass,
    },
  })
    .then(function (response: object) {
      // handle success
      userResult(response.data);
    })
    .catch(function (error: any) {
      // handle error
      userResult(error);
    })
    .then(function () {
      // always executed
    });
};

export const GetTables = async (user: string, tableResult: Function) => {
  const value = await AsyncStorage.getItem("ServerConfig");

  axios({
    method: "post",
    url: `http://${value}:3200/api/user/get-tables`,
    data: {
      user: user,
    },
  })
    .then(function (response: object) {
      // handle success
      tableResult(response.data);
    })
    .catch(function (error: any) {
      // handle error
      tableResult(error);
    })
    .then(function () {
      // always executed
    });
};

export const GetCategories = async (
  branch: string,
  categoriesResult: Function
) => {
  const value = await AsyncStorage.getItem("ServerConfig");

  axios({
    method: "post",
    url: `http://${value}:3200/api/user/get-categories`,
    data: {
      branch: branch,
    },
  })
    .then(function (response: object) {
      // handle success
      categoriesResult(response.data);
    })
    .catch(function (error: any) {
      // handle error
      categoriesResult(error);
    })
    .then(function () {
      // always executed
    });
};

export const GetProductsByCategories = async (
  category: string,
  categoriesResult: Function
) => {
  const value = await AsyncStorage.getItem("ServerConfig");

  axios({
    method: "post",
    url: `http://${value}:3200/api/user/get-products-by-category`,
    data: {
      category: category,
    },
  })
    .then(function (response: object) {
      // handle success
      categoriesResult(response.data);
    })
    .catch(function (error: any) {
      // handle error
      categoriesResult(error);
    })
    .then(function () {
      // always executed
    });
};

export const SaveTable = async (
  user: string,
  table: string,
  total: number,
  cart: [],
  savedTableResult: Function
) => {
  const value = await AsyncStorage.getItem("ServerConfig");

  axios({
    method: "post",
    url: `http://${value}:3200/api/user/save-table`,
    data: {
      user: user,
      table: table,
      total: total,
      cart: cart,
    },
  })
    .then(function (response: object) {
      // handle success
      savedTableResult(response.data);
    })
    .catch(function (error: any) {
      // handle error
      savedTableResult(error);
    })
    .then(function () {
      // always executed
    });
};

export const SaveEditedTable = async (
  table: string,
  cart: [],
  total: number,
  rePrint: [],
  tableKey: string,
  savedTableResult: Function
) => {
  const value = await AsyncStorage.getItem("ServerConfig");

  axios({
    method: "post",
    url: `http://${value}:3200/api/user/save-edit-table`,
    data: {
      table: table,
      cart: cart,
      total: total,
      rePrint: rePrint,
      tableKey: tableKey,
    },
  })
    .then(function (response: object) {
      // handle success
      savedTableResult(response.data);
    })
    .catch(function (error: any) {
      // handle error
      savedTableResult(error);
    })
    .then(function () {
      // always executed
    });
};

export const GetSideProducts = async (
  productId: string,
  savedTableResult: Function
) => {
  const value = await AsyncStorage.getItem("ServerConfig");

  axios({
    method: "post",
    url: `http://${value}:3200/api/user/get-side-products`,
    data: {
      productId: productId,
    },
  })
    .then(function (response: object) {
      // handle success
      savedTableResult(response.data);
    })
    .catch(function (error: any) {
      // handle error
      savedTableResult(error);
    })
    .then(function () {
      // always executed
    });
};

export const SendOderToKitchen = async (
  user: Object,
  table: Object,
  TableResult: Function
) => {
  const value = await AsyncStorage.getItem("ServerConfig");

  axios({
    method: "post",
    url: `http://${value}:3200/api/user/oder-to-kitchen`,
    data: {
      user: user,
      table: table,
    },
  })
    .then(function (response: object) {
      // handle success
      TableResult(response.data);
    })
    .catch(function (error: any) {
      // handle error
      TableResult(error);
    })
    .then(function () {
      // always executed
    });
};

export const getExtraMessages = async (TableResult: Function) => {
  const value = await AsyncStorage.getItem("ServerConfig");

  axios({
    method: "post",
    url: `http://${value}:3200/api/user/getExtra-messages`,
  })
    .then(function (response: object) {
      // handle success
      TableResult(response.data);
    })
    .catch(function (error: any) {
      // handle error
      TableResult(error);
    })
    .then(function () {
      // always executed
    });
};

export const getAllProduct = async (TableResult: Function) => {
  const value = await AsyncStorage.getItem("ServerConfig");

  axios({
    method: "post",
    url: `http://${value}:3200/api/user/getAllProduct`,
  })
    .then(function (response: object) {
      // handle success
      TableResult(response.data);
    })
    .catch(function (error: any) {
      // handle error
      TableResult(error);
    })
    .then(function () {
      // always executed
    });
};
