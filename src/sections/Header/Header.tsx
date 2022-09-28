import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MuiAppBar from '@mui/material/AppBar';
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
    <StyledAppBar color="transparent" elevation={1} position="static">
      <StyledToolbar sx={{ justifyContent: 'space-between' }}>
        <HeaderItem alignItems={'center'} gap={'1rem'}>
          <CardTypeButton
            style={{ fontWeight: cardType === 'genre' ? '600' : '200' }}
            onClick={() => {
              handleTypeClick('genre');
              getDataFromGoogleSheet({ sheetName: 'office' });
            }}
          >
            GENRE
          </CardTypeButton>
          <CardTypeButton
            style={{ fontWeight: cardType === 'years' ? '600' : '200' }}
            onClick={() => {
              handleTypeClick('years');
            }}
          >
            YEARS
          </CardTypeButton>
        </HeaderItem>
        <HeaderItem alignItems={'center'} justifyContent={'center'}>
          <img src="/logo/logo.png" width="250" height="60" alt="wavelab logo" />
        </HeaderItem>
        <HeaderItem alignItems={'center'} justifyContent={'flex-end'} gap={'5px'}>
          <StyledA href="http://wavelab.co.kr/">SERVER</StyledA>
          <ArrowForwardIcon fontSize="small" />
        </HeaderItem>
      </StyledToolbar>
    </StyledAppBar>
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
  background-color: white;
`;

const StyledToolbar = styled(MuiToolbar)`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  min-height: 100px !important;
  @media (max-width: 720px) {
    min-height: 75px !important;
  }
  margin: auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const HeaderItem = styled(FlexBox)`
  width: 33%;
  font-size: 18px;
  @media (max-width: 720px) {
    img {
      min-width: 100px;
      width: 100px;
      height: 24px;
    }
    font-size: 12px;
  }
`;

const StyledA = styled.a`
  text-decoration: none;
  color: black;
  font-weight: 600;
  cursor: pointer;
`;

const CardTypeButton = styled.span`
  cursor: pointer;
  @media (max-width: 720px) {
    /* display: none; */
  }
`;
