import styled from '@emotion/styled';

function Footer() {
  return (
    <StyledFooter>
      Copyright © 2022
      <a href="https://www.gaudiolab.com/ko/">Gaudio Lab, Inc.</a>
      All rights reserved.
    </StyledFooter>
  );
}

export default Footer;

const StyledFooter = styled.div`
  margin-top: 2rem;
  background-color: #333333;
  min-height: 150px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    padding-inline: 2rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
