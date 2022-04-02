import NewUserForm from "../components/NewUserForm";
import { useHistory } from "react-router-dom";
import auth from "../authentication/AuthenticationService";

export default function NewUser() {
  const history = useHistory();

  const addNewUserHandler = (signupData) => {
    console.log(signupData);
    console.log([].concat(signupData.role));

    auth
      .signup(
        signupData.username,
        signupData.active,
        signupData.email,
        signupData.password,
        signupData.activationDate,
        [].concat(signupData.role)
      )
      .then((response) => {
        console.log(response);
      })
      .then(() => {
        history.push("/users");
        window.location.reload();
      });
  };

  return <NewUserForm onNewUserSubmit={addNewUserHandler} />;
}
