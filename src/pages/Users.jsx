//Sign Up Form:: Not everyboday create a new account, not sign up for this app,
//Only employees of the Hotel or App should sign up, that is admin of App
//these users can only be created inside the App, NewUsers immediately verified by the existing hotel staff
//Only that staff create new user




import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
