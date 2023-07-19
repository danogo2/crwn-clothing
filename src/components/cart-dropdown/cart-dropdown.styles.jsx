import styled from 'styled-components';

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from '../button/button.styles';

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  box-shadow: 0 0 0.2rem 0.2rem rgba(30, 30, 30, 0.8);
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  /* every BaseButton, GoogleSignInButton and InvertedButton nested inside CartDropdownContainer gets this styles */
  ${BaseButton}, ${GoogleSignInButton}, ${InvertedButton} {
    margin-top: auto;
    width: 100%;
  }
  // If I want to nest style of EmptyMessage here, EmptyMessage Component has to come before CartDropdownContainer
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  margin-bottom: 8px;
`;
