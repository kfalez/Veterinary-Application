import NewAnimalForm from "../components/NewAnimalForm";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../constants.js";
import axios from "axios";
import authToken from "../authentication/DataService";

export default function AnimalForm() {
  const history = useHistory();

  const addNewAnimalHandler = (animalData) => {
    console.log(animalData);
    axios.post(`${SERVER_URL}animals`, 
      {species: animalData.species,
      weight: animalData.weight,
      tattooNum: animalData.tattoo,
      breed: animalData.breed,
      sex: animalData.sex,
      animalName: animalData.animalName}, 
      {headers: authToken()}
    ).then((response) => {
      console.log(response);
    })
    .then(() => {
      history.push("/welcome");
      window.location.reload();
    });
  };
  return (
    <div>
      <NewAnimalForm onNewAnimalSubmit = {addNewAnimalHandler}/>
    </div>
  );
}
