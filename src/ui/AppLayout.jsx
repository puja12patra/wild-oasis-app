import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  

  //overflow: scroll;
  //overflow: hidden; 

  height: 100vh;
  /* Default: large screens → allow scroll */
  overflow: auto;

  /* Small screens (mobile / minimized) → no scroll */
  @media (max-width: 768px) {
    overflow: hidden;
  }

`;






const Main = styled.main`
  background-color:  var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  //set the main scrollable only , rest of the things don't
  //overflow: scroll;
  
  //overflow-y: auto;   /* ONLY vertical scroll */
  //overflow-x: hidden;

`;

//when we maximize the size of website then it stretches(প্রসারিত) the full width. So we wrap this page inside another Container, So that the page nicely centered
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />


      {/* child component render inside parent component using Outlet */}
      <Main>

        <Container>
          <Outlet />
        </Container>

      </Main>

    </StyledAppLayout>
  );
}

export default AppLayout;