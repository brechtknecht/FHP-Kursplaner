import axios from 'axios';

// let api = axios.create({
//     baseURL: `https://www.fh-potsdam.de/course-api/storage/7087`,
//     withCredentials: true,
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   })


export const state = () => {
    // return api.get('/');

    return axios.get('https://www.fh-potsdam.de/course-api/storage/7087').then((req, res)=> {
        return res;
    });
}

export const getters = () => {
    instance: () => {
        return this.state;
    }
}