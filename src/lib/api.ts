import axios from 'axios';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImNsZXJrSWQiOiJ1c2VyXzMxWmM5aHMwekVBVEZCWmRTTjIxZ0I1eWdPUCIsImVtYWlsIjoibm9ydGhmb3gyMDE5QGdtYWlsLmNvbSIsInN1YiI6MSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc3NDc4ODUxMSwiZXhwIjoxODA2MzI0NTExfQ.fg8vC2RWHxqpyS0AJZMRff1hBHsb8n_QeHATIygE8KU";

export const api = axios.create({
  baseURL: 'https://bookmybeats.nfgprojects.in/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const eventsApi = {
  getEvents: () =>
    api.get('/events').then(res => res.data),
};

export const authApi = {
  getProfile: () =>
    api.get('/auth/profile').then(res => res.data),
};