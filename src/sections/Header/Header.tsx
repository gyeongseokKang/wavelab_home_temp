import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';

import styled from '@emotion/styled';

import { FlexBox } from '@/components/styled';

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar color="transparent" elevation={1} position="static">
        <StyledToolbar sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ alignItems: 'center' }}>
            <img src="/logo/logo.png" width="200" height="50" alt="testA" />
          </FlexBox>
          <StyledA href="http://wavelab.co.kr/">Login</StyledA>
        </StyledToolbar>
      </StyledAppBar>
    </Box>
  );
}

export default Header;

const StyledAppBar = styled(MuiAppBar)`
  position: sticky;
  top: 0px;
  z-index: 100;
  display: flex;
  margin: auto;
  justify-content: center;
  box-shadow: none;
`;

const StyledToolbar = styled(MuiToolbar)`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin: auto;
  width: 80vw;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
`;

const StyledA = styled.a`
  text-decoration: none;
  color: black;
  font-size: 1.25rem;
`;
