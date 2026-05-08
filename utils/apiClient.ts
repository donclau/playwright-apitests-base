export async function apiRequest({ request, method, url, data }: any) {
  switch (method) {
    case 'POST':
      return request.post(url, { data });
    case 'GET':
      return request.get(url);
    default:
      throw new Error(`Método no soportado: ${method}`);
  }
}