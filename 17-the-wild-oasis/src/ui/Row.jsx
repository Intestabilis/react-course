import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

// not styled component feature, we can set default props on any React component like this too
// (make sense with styled component since we can't define default values of props like for usual js functions parameters)
Row.defaultProps = {
  type: "vertical",
};

export default Row;
