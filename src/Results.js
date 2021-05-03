import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDebounce from './hooks/useDebounce';
import './Results.css';

function Results() {
  const apiKey = '5Muqe6HOngq40S9xI6ZQJ7jDfvZUoS5f';
  const [searchImages, setSearchImages] = useState([]);
  const [trendingImages, setTrendingImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (trendingImages.length === 0) {
      getImages();
    }

    async function getImages() {
      const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`);
      const responseData = await response.json();
      const responseImages = mapResponseToImages(responseData);

      setTrendingImages(responseImages);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchImages();
    } else {
      setSearchImages([]);
    }

    async function searchImages() {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${debouncedSearchTerm}`
      );
      const responseData = await response.json();
      const responseImages = mapResponseToImages(responseData);

      setSearchImages(responseImages);
    }
  }, [debouncedSearchTerm]);

  function mapResponseToImages(responseData) {
    return responseData.data.map((image) => ({
      id: image.id,
      imageUrl: image.images.fixed_height.url,
      height: image.images.fixed_height.height,
      title: image.title,
    }));
  }

  function searchInputChanged(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <div className="image-search">
        <input type="text" value={searchTerm} onChange={searchInputChanged}></input>
      </div>

      <div className="image-container">
        {(searchImages.length > 0 ? searchImages : trendingImages).map((image) => {
          return (
            <Link key={image.id} to={`/image/${image.id}`}>
              <img alt={image.title} style={{ maxHeight: image.height }} src={image.imageUrl}></img>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Results;
