import axios from 'axios';
export async function fetchImages(searchDescription, page, limit) {

    const response = await axios.get('https://pixabay.com/api/', {
    
      params: {
      key: '44364811-49b1c0cdbd7356dfdac934983',
      q: searchDescription,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: limit,
      },
    });
    return response.data;
};
