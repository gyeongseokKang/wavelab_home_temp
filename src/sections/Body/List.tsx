import { useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { CardItem, getCardListDataFromGoogleSheet } from '@/api/getDataFromGoogleSheet';
import { FlexBox } from '@/components/styled';
import useCardType from '@/store/cardType';

const genreList = ['ALL', 'MOVIE', 'OTT', 'MUSIC'];
const yearList = ['ALL', '2020', '2010', '2000', '1990'];

const List = () => {
  const [focusedItemIndex, setFocusedItemIndex] = useState(0);
  const { cardType } = useCardType();

  const listByType = useMemo(() => {
    if (cardType === 'genre') {
      return genreList;
    } else {
      return yearList;
    }
  }, [cardType]);

  const handleItem = (index: number) => {
    setFocusedItemIndex(index);
  };

  useEffect(() => {
    setFocusedItemIndex(0);
  }, [cardType]);

  return (
    <StyledListLayout flexDirection={'column'} gap={'1rem'}>
      <ListHeader
        listByType={listByType}
        focusedItemIndex={focusedItemIndex}
        clickItem={handleItem}
      />
      <ListBody currentFilter={listByType[focusedItemIndex]} />
    </StyledListLayout>
  );
};

export default List;

interface ListHeaderProp {
  focusedItemIndex: number;
  clickItem: (index: number) => void;
  listByType: string[];
}

const ListHeader = ({ listByType, focusedItemIndex, clickItem }: ListHeaderProp) => {
  return (
    <StyledListHeader justifyContent={'center'} gap={'2rem'}>
      {listByType.map((item, index) => {
        return (
          <StyledListHeaderItem
            key={item}
            focuzed={focusedItemIndex === index}
            onClick={() => {
              clickItem(index);
            }}
          >
            {item}
          </StyledListHeaderItem>
        );
      })}
    </StyledListHeader>
  );
};

interface ListBodyrProp {
  currentFilter: string;
}

const ListBody = ({ currentFilter }: ListBodyrProp) => {
  const { cardType } = useCardType();

  console.log(cardType, currentFilter);
  const [cardItemList, setCardItemList] = useState<CardItem[] | undefined>(undefined);
  useEffect(() => {
    const loadOfficeImages = async () => {
      const result = await getCardListDataFromGoogleSheet();
      if (result !== undefined) {
        setCardItemList(result);
      }
    };
    loadOfficeImages();
  }, []);

  const filteredItemList = useMemo(() => {
    if (cardType === 'genre') {
      switch (currentFilter) {
        case 'MOVIE': {
          return cardItemList?.filter((item) => item.genre === 'movie');
        }
        case 'OTT': {
          return cardItemList?.filter((item) => item.genre === 'ott');
        }
        case 'MUSIC': {
          return cardItemList?.filter((item) => item.genre === 'music');
        }
      }
    } else {
      switch (currentFilter) {
        case '1990': {
          return cardItemList?.filter((item) => Math.floor(Number(item.year) / 10) === 199);
        }
        case '2000': {
          return cardItemList?.filter((item) => Math.floor(Number(item.year) / 10) === 200);
        }
        case '2010': {
          return cardItemList?.filter((item) => Math.floor(Number(item.year) / 10) === 201);
        }
        case '2020': {
          return cardItemList?.filter((item) => Math.floor(Number(item.year) / 10) === 202);
        }
      }
    }
    return cardItemList;
  }, [cardType, currentFilter, cardItemList]);

  if (cardItemList === undefined) {
    return <div>loading중</div>;
  }
  return (
    <StyledListBody flexWrap={'wrap'} padding={'1rem'} justifyContent={'center'}>
      {filteredItemList?.map((cardItem) => {
        return <Card key={cardItem.title} cardItem={cardItem} />;
      })}
    </StyledListBody>
  );
};

const StyledListLayout = styled(FlexBox)`
  margin-top: 4rem;
  position: relative;
  background-color: #84879e;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: 100% 90%;
    background-repeat: no-repeat;
    background-image: url(https://picsum.photos/seed/picsum/500/500);
    filter: blur(25px);
  }
`;

const StyledListHeader = styled(FlexBox)`
  padding: 2rem;
  position: relative;
`;

const StyledListBody = styled(FlexBox)`
  position: relative;
`;

const StyledListHeaderItem = styled.button<{ focuzed: boolean }>`
  text-decoration: ${({ focuzed }) => (focuzed ? 'underline 2px' : 'none')};
  font-weight: ${({ focuzed }) => (focuzed ? '700' : 'none')};
`;

const Card = ({ cardItem }: { cardItem: CardItem }) => {
  return (
    <StyleCard key={cardItem.title} style={{ backgroundImage: `url(${cardItem.poster_url})` }}>
      <StyledCardSubTitle>
        {cardItem.genre}•{cardItem.year}
      </StyledCardSubTitle>
      <StyledCardTitle>{cardItem.title}</StyledCardTitle>
    </StyleCard>
  );
};

const StyleCard = styled.div`
  width: max(18vw, 320px);
  height: 392px;
  box-shadow: 1px 0 0 0 #888, 0 1px 0 0 #888, 1px 1px 0 0 #888, 1px 0 0 0 #888 inset,
    0 1px 0 0 #888 inset;
  border-collapse: separate;
  background-size: cover;
  padding: 1.75rem;
  max-width: 320px;
  &:not(:hover) {
    background-image: unset !important;
  }
  transition: all 0.3s;
`;

const StyledCardTitle = styled.div`
  font-size: 20px;
`;

const StyledCardSubTitle = styled.div`
  text-transform: uppercase;
  font-size: 14px;
`;
