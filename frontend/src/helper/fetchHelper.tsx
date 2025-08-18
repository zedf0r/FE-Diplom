type TypeFetchOptions = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: object;
};

export const fetchHelper = ({ method, url, body }: TypeFetchOptions) => {
  const basicURL = "https://students.netoservices.ru/fe-diplom";

  const options: RequestInit = {
    method: method,
    ...(body && { body: JSON.stringify(body) }),
  };

  return fetch(basicURL + url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      if (response.status === 204) {
        return null;
      }

      return response.json();
    })
    .catch((error) => {
      console.log(`Ошибка от сервера: ${error}`);
      throw new Error(`Ошибка от сервера: ${error}`);
    });
};
