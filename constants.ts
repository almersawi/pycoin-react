const backendBaseUrlMap: any = {
    'localhost:3000': 'http://localhost:5000',
    'localhost:3001': 'http://localhost:5001',
}


export const BASE_URL = backendBaseUrlMap[window.location.host] ?? 'http://localhost:5000';