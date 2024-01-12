import axios from 'axios';
import { IP_ADDRESS} from '@env';

const URL=`http://${IP_ADDRESS}:5000/logements/`
const URL_init=`http://${IP_ADDRESS}:5000/logements/initialize`
const URL_reservations = `http://${IP_ADDRESS}:5000/reservations/`;

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


export const fetchReservations = (): Promise<any> => {
  return axios
    .get(URL_reservations)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
};

export const fetchReservation = (id: string): Promise<any> => {
  return axios
    .get(`${URL_reservations}${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
};

export const createReservation = (reservationData: any): Promise<any> => {
  return axios
    .post(URL_reservations, reservationData)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
};

export const updateReservation = (id: string, reservationData: any): Promise<any> => {
  return axios
    .put(`${URL_reservations}${id}`, reservationData)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
};

export const deleteReservation = (id: string): Promise<any> => {
  return axios
    .delete(`${URL_reservations}${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
};


export const fetchLogmentById=(id:String):Promise<any>=>{
  return axios.get(`${URL}${id}`).then(response=>{
    return response.data;
  }).catch(error => {
    console.error(error);
  });
}
