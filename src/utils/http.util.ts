import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import snackContent from '@/components/SnackContent';
import { RootState, store } from '@/store';
import { enqueueSnackbar } from '@/store/notification/notification.slice';
import { logout } from '@/store/session/session.slice';
import { Error } from '@/types/error.type';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
      responseType?: AxiosRequestConfig['responseType'];
    },
    unknown,
    unknown,
    Record<string, unknown>,
    { headers: AxiosResponse['headers'] }
  > =>
  async ({ url, method = 'GET', data, params, headers, responseType }) => {
    try {
      const { token } = (store.getState() as RootState).session;

      if (token) {
        headers = {
          ...headers,
          Authorization: `Bearer ${token}`,
        };
      }

      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        responseType,
      });

      return { data: result.data, meta: { headers: result.headers } };
    } catch (axiosError) {
      const error = axiosError as AxiosError<Error>;

      if (error.response) {
        if (error.response.status === 401) {
          store.dispatch(logout());

          store.dispatch(
            enqueueSnackbar({
              options: {
                content: snackContent({
                  severity: 'error',
                  title: `Acesso não autorizado.`,
                  content: 'Por favor, verifique se o seu usuário e senha estão corretos',
                }),
                variant: 'error',
              },
            }),
          );
        } else {
          store.dispatch(
            enqueueSnackbar({
              options: {
                content: snackContent({
                  severity: 'error',
                  title: `(${error.response.status}) Não foi possível completar a operação.`,
                  content: JSON.stringify(error.response.data),
                }),
                variant: 'error',
              },
            }),
          );
        }
      } else {
        store.dispatch(
          enqueueSnackbar({
            options: {
              content: snackContent({
                severity: 'error',
                title: `(500) Ocorreu um erro interno.`,
                content: 'Por favor, tente novamente mais tarde',
              }),
              variant: 'error',
            },
          }),
        );
      }

      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };

export default axiosBaseQuery;
