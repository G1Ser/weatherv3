import ky from 'ky';

export const http = ky.create({
  prefix: '/',
  timeout: 10_000,
  retry: 0,
});
