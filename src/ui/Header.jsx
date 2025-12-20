import styled from "styled-components";
//import Logout from "../features/authentication/Logout";

import HeaderManu from "./HeaderManu";

import UserAvatar from "../features/authentication/UserAvatar";


const StyledHeader = styled.header`
  background-color:  var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.3rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header()
{
   return (
    <StyledHeader>
    <UserAvatar />
      <HeaderManu/>
    </StyledHeader>
  );
}
export default Header;

/* 
function Header() {
  return (
    <StyledHeader>
      <Logout />
    </StyledHeader>
  );
}

export default Header; */

