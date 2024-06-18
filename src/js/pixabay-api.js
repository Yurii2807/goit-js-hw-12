export const fetchImages = requestInput => {
    return fetch(
      `https://pixabay.com/api/?key=44364811-49b1c0cdbd7356dfdac934983&q=${encodeURIComponent(
      requestInput
      )}&image_type=photo&orientation=horizontal&safesearch=true`)
      .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
      });
  };

  const API_KEY = '44364811-49b1c0cdbd7356dfdac934983';
  const BASE_URL = 'https://pixabay.com/api/';
  let query = '';
  let page = 1;
  const per_page = 15;
  
  async function fetchImages(query, page) {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        params: {
          key: API_KEY,
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: page,
          per_page: per_page
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }
  