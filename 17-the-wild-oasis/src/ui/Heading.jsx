import styled, { css } from "styled-components";

// css function give us syntax highlighting
// also it's necessary to write logic inside
// const test = css`
//   text-align: center;
//   ${10 > 5 && "background-color: yellow;"}
// `;

//React component
// since it's a template literal, we can write js code as usual with ${}
// so we can write css in external variable and then put in inside as any other variable in template literal

// We can pass props into styled components and use them using callback function inside a literal
// also we can use special prop as, that defines which component will be rendered (if as='h2', then styled component will be h2 etc)

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

  line-height: 1.4;
`;

export default Heading;
