import axios from 'axios';

const GOOGLE_SHEET_BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';
const GOOGLE_API_KEY = 'AIzaSyAzJwkLrZIm8zvZLLfVvR5fzL6BCEa8VG0';
const GOOGLE_SHEET_ID = '1DpYeLF3HGseqv3gw3tZ_2PpfMwm3x4Q_YVZ9qDJF2y0';

interface GetDataFromGoogleSheetParam {
  sheetName: 'list' | 'office';
}

export const getDataFromGoogleSheet = async ({ sheetName }: GetDataFromGoogleSheetParam) => {
  const response = await axios.get(
    `${GOOGLE_SHEET_BASE_URL}/${GOOGLE_SHEET_ID}/values/${sheetName}?key=${GOOGLE_API_KEY}`,
  );

  if (response.status !== 200) {
    return {
      columnName: 'fail',
      imageList: [],
    };
  }

  const [columnName, ...imageList] = response.data.values.map((item: any) => item[0]);

  return {
    columnName: columnName,
    imageList: imageList,
  };
};

export interface CardItem {
  title: string;
  genre: 'movie' | 'ott' | 'music';
  year: string;
  poster_url: string;
}

export const getCardListDataFromGoogleSheet = async (): Promise<CardItem[] | undefined> => {
  const result: CardItem[] = [];
  const response = await axios.get(
    `${GOOGLE_SHEET_BASE_URL}/${GOOGLE_SHEET_ID}/values/list?key=${GOOGLE_API_KEY}`,
  );

  if (response.status !== 200) {
    return undefined;
  }

  response.data.values.forEach((columnList: any, index: number) => {
    if (index !== 0) {
      const poster_url =
        columnList[3] !== '' ? convertGoogleDriveUrlToDirectImageUrl(columnList[3]) : columnList[4];
      const item = {
        title: columnList[0],
        genre: columnList[1],
        year: columnList[2],
        poster_url: poster_url,
      };
      result.push(item);
    }
  });

  return result;
};

const convertGoogleDriveUrlToDirectImageUrl = (googleDriveUrl: string) => {
  /**
   * googleDriveUrl
   * ex) https://drive.google.com/file/d/18ULySpWe-MtsdSshtPwswpENuGG_EDTF/view?usp=sharing
   * imageId = 18ULySpWe-MtsdSshtPwswpENuGG_EDTF
   */
  const imageId = googleDriveUrl.replace('https://drive.google.com/file/d/', '').split('/')[0];
  return `https://drive.google.com/uc?export=download&id=${imageId}`;
};
