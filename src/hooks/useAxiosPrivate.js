import {useEffect} from 'react';
import axiosAuth from '../api/axiosConfig.js';
import useAuth from './useAuth.js';
const useAxiosPrivate = () => {
     const {auth} = useAuth();
     useEffect(() => {
          const base64Encode = btoa(`${auth?.user}:${auth?.password}`);
          const requestIntercept = axiosAuth.interceptors.request.use(config => {
               if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Basic ${base64Encode}`;
               }
               return config;
          },(error) => {
               Promise.reject(error);
          });
          return () => {
               axiosAuth.interceptors.request.eject(requestIntercept);
          };
     },[auth]);
     return axiosAuth;
};
export default useAxiosPrivate;