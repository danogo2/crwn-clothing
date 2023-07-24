import styled from 'styled-components';

export const ItemDetails = styled.div`
  background-color: #efefef;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px;
  margin-right: 20px;
  div {
    margin: 2px 0;
  }
`;

export const CartItemContainer = styled.div`
  display: flex;
  max-width: 250px;
  margin-bottom: 8px;

  img {
    width: 40%;
  }
`;
