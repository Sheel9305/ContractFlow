import axios from 'axios';

const api_URL= 'http://127.0.0.1:5000/api/contracts';

export const get_contracts= () => {return axios.get(api_URL)};
export const create_contracts= (contract:any) => {return axios.post(api_URL,contract)};
export const update_contracts= (id:number,contract:any) => {return axios.put(`${api_URL}/${id}`, contract)};
export const delete_contracts= (id:number) => {return axios.delete(`${api_URL}/${id}`)};
