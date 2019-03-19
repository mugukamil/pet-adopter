import React, { Component } from "preact-compat";
import pf from "petfinder-client";
import Pet from "./Pet";
import SearchBox from "./SearchBox";
import { connect } from "react-redux";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends Component {
  state = {
    pets: []
  };
  componentDidMount() {
    this.search();
  }
  search = () => {
    petfinder.pet
      .find({
        output: "full",
        location: this.props.location,
        animal: this.props.animal,
        breed: this.props.breed
      })
      .then(data => {
        let pets;

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({ pets });
      });
  };
  render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => (
          <Pet
            name={pet.name}
            animal={pet.animal}
            breed={pet.breeds.breed}
            key={pet.id}
            media={pet.media}
            location={`${pet.contact.city}, ${pet.contact.state}`}
            id={pet.id}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ location, breed, animal }) => ({
  location,
  breed,
  animal
});

export default connect(mapStateToProps)(Results);
