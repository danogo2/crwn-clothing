import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavigationContainer = styled.nav`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  padding: 20px 40px 0;
`;

export const LogoContainer = styled(NavLink)`
  height: 100%;
  width: 70px;
  display: flex;
  align-items: center;
`;

export const NavLinksContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLinkStyled = styled(NavLink)`
  padding: 10px 15px;
  cursor: pointer;
`;
