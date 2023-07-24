import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CategoryPreviewContainer = styled.div`
  padding: 2rem;
  &:not(:first-child) {
    padding-top: 3rem;
  }
  background-color: #3a3a3a;
`;

export const CategoryPreviewProducts = styled.div`
  display: grid;
  gap: 30px;
  // grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-columns: repeat(4, minmax(200px, 250px));
  justify-content: start;
`;

export const PreviewProductTitleContainer = styled.h2`
  margin: 3rem 0 2rem 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const PreviewProductTitle = styled(Link)`
  text-align: center;
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: 0.2rem;
  background: linear-gradient(
    to bottom,
    rgba(10, 210, 210, 0.8),
    rgb(241, 241, 241, 08)
  );
  background: rgb(241, 241, 241, 08);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0px 4px 2px rgba(10, 210, 210, 0.8));

  &:hover {
    background: rgba(10, 210, 210, 0.8);
    filter: drop-shadow(0px 4px 3px rgba(10, 210, 210, 0.8));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: transform 0.1s ease;
  }

  &:active {
    transform: translateY(4px);
    filter: none;
  }
`;
