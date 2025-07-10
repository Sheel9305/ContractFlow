import axios from 'axios';

const api_Url = "http://127.0.0.1:5000/api/points";

export const get_points = () => {return axios.get(api_Url)};
export const add_point = (point:any) => {return axios.post(api_Url,point)};
export const update_point = (id:number, point:any) => {return axios.put(`${api_Url}/${id}`,point)};
export const delete_point = (id:number) => {return axios.delete(`${api_Url}/${id}`)};