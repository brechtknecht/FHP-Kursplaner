import axios from 'axios';

let api = axios.create({
    baseURL: `https://www.fh-potsdam.de/course-api/storage/`,
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })


export const state = () => {
    return api.get('/');
}

export const getters = () => {
    instance: () => {
        return this.state;
    }
}