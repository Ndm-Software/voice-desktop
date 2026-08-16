import axios from 'axios'

/** Backend bağlanınca kullanılacak axios istemcisi — henüz hiçbir
 *  yerden çağrılmıyor, sayfalar mock veri kullanıyor. */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json'
  }
})
