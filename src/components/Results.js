import { useEffect, useState } from 'react';
import ImageList from './ImageList';
import useDebounce from '../hooks/useDebounce';
import './Results.css';

function Results() {
  const baseUrl = 'https://api.giphy.com/v1/gifs';
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
      const response = await fetch(`${baseUrl}/trending?api_key=${apiKey}`);
      const responseData = await response.json();
      const responseImages = mapResponseToImages(responseData);

      setTrendingImages(responseImages);
    }
  }, [trendingImages]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchImages();
    } else {
      setSearchImages([]);
    }

    async function searchImages() {
      const response = await fetch(`${baseUrl}/search?api_key=${apiKey}&q=${debouncedSearchTerm}`);
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

  function SearchImageResults({ images }) {
    if (debouncedSearchTerm) {
      if (searchImages.length > 0) {
        return <ImageList images={images}></ImageList>;
      } else {
        return <div>No Results Found</div>;
      }
    }

    return null;
  }

  return (
    <div className="results-container">
      <div className="image-search">
        <label>Search: </label>
        <input type="text" value={searchTerm} onChange={searchInputChanged}></input>
      </div>

      <SearchImageResults images={searchImages}></SearchImageResults>

      {searchImages.length === 0 ? <TrendingImages images={trendingImages}></TrendingImages> : null}
    </div>
  );
}

function TrendingImages({ images }) {
  return (
    <div>
      <h1>Trending GIFs</h1>
      <ImageList images={images}></ImageList>
    </div>
  );
}

export default Results;
