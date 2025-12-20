//We’re using Supabase Auth 👉 Supabase already uses JWT internally, you just don’t touch it.




//AppLayout is main Router So When we sign up Or Login the App, It should be the ProtectedRoute which tells only the use who are Login or Autenticated they only able to access App.---> So change made in App.jsx
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
height: 100vh;
background-color: var()(--color-grey-50);
display: flex;
align-items: center;
justify-content: center;

`;


function ProtectedRoute({ children }) {

  const navigate = useNavigate();

  //1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();



  //2.If there is no Autenticated user, then redirect to Login Page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login")

  }, [isAuthenticated, isLoading, navigate]
  );


  //3.While Loading, showing Spinner
  if (isLoading) return <FullPage><Spinner /></FullPage>

  
  //4.If there is user, then render the App
  if(isAuthenticated) return children;

}

export default ProtectedRoute;