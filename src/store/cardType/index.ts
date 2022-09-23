import { atom, useRecoilState } from 'recoil';

const cardTypeState = atom<'genre' | 'years'>({
  key: 'card-type-state',
  default: 'genre',
});

function useCardType() {
  const [cardType, setCardType] = useRecoilState(cardTypeState);

  return { cardType, setCardType };
}

export default useCardType;
