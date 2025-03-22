import axios from "axios";

export const httpGETPermissions = () =>  axios.get('/permissions');