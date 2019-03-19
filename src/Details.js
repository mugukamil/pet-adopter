import React from "preact-compat";
import pf from "petfinder-client";
import { route } from "preact-router";
import Carousel from "./Carousel";
import Modal from "./Modal";
import Loadable from "react-loadable";

const LoadableContent = Loadable({
  loader: () => import("./AdoptModalContent"),
  loading() {
    return <h1>Loading</h1>;
  }
});

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component {
  state = {
    loading: false,
    showModal: true
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        const pet = data.petfinder.pet;
        let breed;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }

        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city} ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          loading: false
        });
      })
      .catch(() => route("/"));
  }

  render() {
    const {
      animal,
      name,
      location,
      description,
      media,
      breed,
      loading,
      showModal
    } = this.state;

    if (loading) {
      return <h1>loading...</h1>;
    }

    return (
      <div className="details">
        {media ? <Carousel media={media && media} /> : false}

        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <button onClick={this.toggleModal}>Adopt</button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <LoadableContent toggleModal={this.toggleModal} name={name} />
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
