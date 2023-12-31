import styled from 'styled-components';

export const Footer = styled.div`
  color: #fafafa;
  position: absolute;
  width: 100%;
  bottom: 0;
  // height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  padding: 8px;
  background-image: linear-gradient(
    to right,
    rgba(128, 130, 130, 0.8),
    rgba(94, 99, 99, 0.8)
  );
  background-image: linear-gradient(
    to right,
    rgba(10, 210, 210, 0.8),
    rgba(94, 99, 99, 0.8)
  );
  background-image: linear-gradient(
    to right,
    rgba(230, 230, 230, 0.8),
    rgba(94, 99, 99, 0.8)
  );
  .name {
    width: 85%;
  }
  .price {
    width: 15%;
    text-align: right;
  }
`;

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
  // box-shadow: 0 0 0.2rem 0.2rem rgba(30, 30, 30, 0.8);
  // box-shadow: 0 0.2rem rgba(230, 230, 230, 0.8);
  // box-shadow: 0 0 0.2rem 0.2rem rgba(10, 210, 210, 0.8);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 245px;
    display: none;
  }
  &:hover {
    img {
      opacity: 0.8;
    }
    button {
      opacity: 0.85;
      display: flex;
    }
  }
`;
