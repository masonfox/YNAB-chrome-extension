import * as ynab from "ynab";

const token = process.env.VUE_APP_YNAB_TOKEN;

const api = new ynab.API(token);

export default api;
