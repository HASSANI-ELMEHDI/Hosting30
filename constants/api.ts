import axios from 'axios';
import { IP_ADDRESS} from '@env';

const URL=`http://${IP_ADDRESS}:5000/logements/`
const URL_init=`http://${IP_ADDRESS}:5000/logements/initialize`

console.log(URL)
export const fetchData = () => {
  return axios.get(URL)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
};


export const initData = () => {
  return axios.post(URL_init)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
};


