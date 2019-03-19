import React from "preact-compat";
import { Link } from "preact-router";

class Pet extends React.Component {
  render() {
    const { name, animal, breed, location, media, id } = this.props;

    let photos = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(ph => ph["@size"] === "pn");
    }

    const hero = photos[0] ? photos[0].value : "http://placecorgi.com/300/300";

    return (
      <Link href={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={hero} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
        </div>
      </Link>
    );
  }
}

export default Pet;
