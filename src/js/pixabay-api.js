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

 