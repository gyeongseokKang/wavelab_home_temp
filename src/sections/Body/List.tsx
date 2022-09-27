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
    <StyledListLayout>
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
    return <div></div>;
  }
  return (
    <StyledListBody flexWrap={'wrap'} justifyContent={'flex-start'}>
      {filteredItemList?.map((cardItem) => {
        return <Card key={cardItem.title} cardItem={cardItem} />;
      })}
    </StyledListBody>
  );
};

const StyledListLayout = styled.div`
  margin-top: 4rem;
  position: relative;
  min-height: 100vh;
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
    <StyleCard key={cardItem.title} backgroundUrl={`url(${cardItem.poster_url})`}>
      <StyleCardContent>
        <StyledCardSubTitle>
          {cardItem.genre} • {cardItem.year}
        </StyledCardSubTitle>
        <StyledCardTitle>{cardItem.title}</StyledCardTitle>
      </StyleCardContent>
      <StyleBgCard backgroundUrl={`url(${cardItem.poster_url})`}></StyleBgCard>
    </StyleCard>
  );
};

const StyleCard = styled.div<{ backgroundUrl: string }>`
  position: relative;
  aspect-ratio: 0.74;
  width: 100%;
  box-shadow: 1px 0 0 0 #888, 0 1px 0 0 #888, 1px 1px 0 0 #888, 1px 0 0 0 #888 inset,
    0 1px 0 0 #888 inset;

  max-width: 100vw;

  @media (min-width: 420px) {
    max-width: 50vw;
  }
  @media (min-width: 720px) {
    max-width: 33vw;
  }
  @media (min-width: 1200px) {
    max-width: 25vw;
  }
  @media (min-width: 1600px) {
    max-width: 20vw;
  }
  @media (min-width: 2400px) {
    max-width: 16.66vw;
  }
`;

const StyleBgCard = styled.div<{ backgroundUrl: string }>`
  position: absolute;
  aspect-ratio: 0.74;
  width: 100%;
  opacity: 0;
  background-image: ${({ backgroundUrl }) => backgroundUrl};

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    opacity: 1;
  }
  transition: all 0.3s;
`;

const StyleCardContent = styled.div`
  position: absolute;
  padding: 30px;
`;

const StyledCardTitle = styled.div`
  font-size: 20px;
  color: #494a4e;
  line-height: 1.5;
  padding-top: 5px;
`;

const StyledCardSubTitle = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  color: #494a4e;
`;
