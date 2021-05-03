import { Link } from 'react-router-dom';
import './ImageList.css';

function ImageList({ images }) {
  return (
    <div className="image-container">
      {images.map((image) => {
        return (
          <Link key={image.id} to={`/image/${image.id}`}>
            <img alt={image.title} style={{ maxHeight: image.height }} src={image.imageUrl}></img>
          </Link>
        );
      })}
    </div>
  );
}

export default ImageList;
