import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ImageDetails.css';

function ImageDetails() {
  const apiKey = '5Muqe6HOngq40S9xI6ZQJ7jDfvZUoS5f';

  const { id } = useParams();
  const [image, setImage] = useState();

  useEffect(() => {
    getImages();

    async function getImages() {
      const response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`);
      const responseData = await response.json();
      const responseImages = mapResponseToImages(responseData.data);

      setImage(responseImages);
    }
  }, []);

  function mapResponseToImages(responseImage) {
    return {
      id: responseImage.id,
      imageUrl: responseImage.images.original.url,
      height: responseImage.images.original.height,
      title: responseImage.title,
      rating: responseImage.rating,
      username: responseImage.username,
    };
  }

  if (image) {
    return (
      <div className="image-details-container">
        <img alt={image.title} style={{ maxHeight: image.height }} src={image.imageUrl}></img>
        <div>
          <div>
            Title: <span>{image.title}</span>
          </div>
          <div>
            User: <span>{image.username}</span>
          </div>
          <div>
            Rating: <span>{image.rating}</span>
          </div>
        </div>
      </div>
    );
  }
  return <span>Loading...</span>;
}

export default ImageDetails;
