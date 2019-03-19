import React from "preact-compat";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  static getDerivedStateFromProps({ media }) {
    let photos = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }

  handleIndexClick = event =>
    this.setState({
      active: +event.target.dataset.index
    });

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active].value} alt="Primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, i) => (
            /* eslint-disable-next-line */
            <img
              key={photo.value}
              data-index={i}
              src={photo.value}
              alt="animal thumb"
              className={i === active ? "active" : ""}
              onClick={this.handleIndexClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
