import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';

import styled from '@emotion/styled';

import { getDataFromGoogleSheet } from '@/api/getDataFromGoogleSheet';
import { FlexBox } from '@/components/styled';
import useCardType from '@/store/cardType';

function Header() {
  const { cardType, setCardType } = useCardType();

  const handleTypeClick = (type: 'genre' | 'years') => {
    setCardType(type);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar color="transparent" elevation={1} position="static">
        <StyledToolbar sx={{ justifyContent: 'space-between' }}>
          <HeaderItem alignItems={'center'} gap={'2rem'}>
            <CardTypeButton
              style={{ fontWeight: cardType === 'genre' ? '700' : '300' }}
              onClick={() => {
                handleTypeClick('genre');
                getDataFromGoogleSheet({ sheetName: 'office' });
              }}
            >
              GENRE
            </CardTypeButton>
            <CardTypeButton
              style={{ fontWeight: cardType === 'years' ? '700' : '300' }}
              onClick={() => {
                handleTypeClick('years');
              }}
            >
              YEARS
            </CardTypeButton>
          </HeaderItem>
          <HeaderItem alignItems={'center'}>
            <img src="/logo/logo.png" width="200" height="50" alt="wavelab logo" />
          </HeaderItem>
          <HeaderItem alignItems={'center'} justifyContent={'flex-end'}>
            <StyledA href="http://wavelab.co.kr/">Login</StyledA>
          </HeaderItem>
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
  width: 100vw;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
`;

const HeaderItem = styled(FlexBox)`
  min-width: 10rem;
`;

const StyledA = styled.a`
  text-decoration: none;
  color: black;
  font-size: 1.25rem;
`;

const CardTypeButton = styled.span`
  cursor: pointer;
`;
