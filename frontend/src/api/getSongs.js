const API = 'http://localhost:3000/api'

export const getSongs = () =>  fetch(`${API}/songs`)