import styled, { css } from 'styled-components';

export const NavBar = styled.nav`
  background: lightblue;
  height: 3.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    text-decoration: none;
    padding: 1em;
    transition: background 0.3s 0s ease-in-out;
    &:hover {
      background: lightskyblue;
    }
  }
  a.active {
    background: #62c0fa;
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

export const Input = styled.input`
  padding: 1em;
  margin: 1em 0;
  width: 18em;
  border-radius: 0.375em;
  ${(props) =>
    props.submit &&
    css`
      cursor: pointer;
      background: lightskyblue;
      color: blue;
      transition: background 0.3s 0s ease-in-out;
      :hover {
        background: #62c0fa;
      }
    `}
`;

export const Textarea = styled.textarea`
  padding: 1em;
  margin: 1em 0;
  width: 18em;
  border-radius: 0.375em;
  height: 10em;
`;

export const Card = styled.div`
  padding: 1.5em 1em 1em;
  background: #fafafa;
  box-shadow: 0px 2px 5px lightblue;
  transition: height 0.3s ease-in;
  @media (min-width: 1375px) {
    width: 29%;
    margin: 1%;
  }
`;

export const Image = styled.img`
  max-width: 100%;
`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 0.75em 1.5em;
  margin: 0 0.5em;
  border-radius: 0.375em;
  border-width: 0;
  cursor: pointer;
  transition: background 0.3s 0s ease-in-out;
  ${(props) =>
    props.red &&
    css`
      background: red;
      color: white;
      :hover {
        background: #e50000;
      }
    `}
  ${(props) =>
    props.green &&
    css`
      background: #34df34;
      color: blue;
      :hover {
        background: #21d521;
      }
    `}
    ${(props) =>
    props.grey &&
    css`
      background: #e2e2e2;
      :hover {
        background: #d8d8d8;
      }
    `}
`;

export const Errors = styled.div`
  min-height: 1.25em;
  content: '.';
  color: red;
`
