import { useEffect, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog/Dialog';

import styled from '@emotion/styled';
// import required modules
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ThumbsMethods } from 'swiper/types';

import { getDataFromGoogleSheet } from '@/api/getDataFromGoogleSheet';
import { FlexBox } from '@/components/styled';

const Title = () => {
  const [open, setOpen] = useState(false);

  const openNewOfficeDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledTitleLayout flexDirection={'column'} gap={'25px'}>
      <FlexBox flexDirection={'column'}>
        <StyledTitle>Wavelab audio post production</StyledTitle>
        <StyledTitle>Sample text Title Swear Display Light_42/60pt</StyledTitle>
      </FlexBox>
      <FlexBox flexDirection={'column'}>
        <StyledSubTitle>
          Type Something Type Something Type Something Type Something Type Something <br></br>
          Wavelab audio post production
          <StyledOpenDialogButton onClick={openNewOfficeDialog}>New Window</StyledOpenDialogButton>
          Type SomeThing
        </StyledSubTitle>
      </FlexBox>

      <StyledDialog onClose={handleClose} open={open}>
        <OfficeSlider />
      </StyledDialog>
    </StyledTitleLayout>
  );
};

export default Title;

const OfficeSlider = () => {
  const [imageList, setImageList] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    const loadOfficeImages = async () => {
      const result = await getDataFromGoogleSheet({ sheetName: 'office' });
      const imageList = [result.imageList[0], ...result.imageList];
      setImageList(imageList);
    };
    loadOfficeImages();
  }, []);

  if (imageList === undefined) {
    return <CircularProgress sx={{ padding: '1rem', color: 'black' }} />;
  }
  return <SwiperLayout imageList={imageList} />;
};

const SwiperLayout = ({ imageList }: { imageList: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | ThumbsMethods['swiper']>();
  console.log(thumbsSwiper);
  return (
    <>
      <StyledSwiper
        loop={true}
        slidesPerView={1}
        pagination={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Thumbs, Pagination, FreeMode]}
      >
        {imageList?.map((image, index) => {
          return (
            <StyledSwiperSlide key={`${image}_${index}`}>
              <img src={image} />
              <div>
                {index === 0 ? (
                  <StyledCenterText>타이틀</StyledCenterText>
                ) : (
                  <StyledCornerText>dddddd</StyledCornerText>
                )}
              </div>
            </StyledSwiperSlide>
          );
        })}
      </StyledSwiper>
      <StyledSwiper
        onSwiper={setThumbsSwiper}
        onInit={(swiper) => {
          setThumbsSwiper(swiper);
        }}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Thumbs, FreeMode, Navigation]}
      >
        {imageList?.map((image) => {
          return (
            <StyledSwiperSlide key={`${image}_thumbs`}>
              <img src={image} />
            </StyledSwiperSlide>
          );
        })}
      </StyledSwiper>
    </>
  );
};

const StyledTitleLayout = styled(FlexBox)`
  padding-inline: 5vw;
`;

const StyledTitle = styled.span`
  font-size: 42px;
  font-family: swear-display;
  font-weight: 300;
  letter-spacing: -1.5px;
  line-height: 1;
`;

const StyledSubTitle = styled.span`
  font-size: 18px;
  line-height: 1.67;
  color: #313131;
`;

const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.7);
  }
  .MuiPaper-root {
    background-color: transparent;
    background-image: unset;
    max-width: unset;
    box-shadow: none;
  }
`;

const StyledOpenDialogButton = styled.span`
  cursor: url(https://picsum.photos/seed/picsum/50/50), pointer;
  padding-bottom: 1px;
  margin-inline: 5px;
  border-bottom: 2px solid #fc8422;
  &:hover {
    border-bottom-width: 3px;
  }
`;

const StyledSwiper = styled(Swiper)`
  background-color: transparent;
  .swiper-wrapper {
    width: min(50vw, 800px);
  }
  .swiper-pagination-bullet {
    background: white;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background: #0a84ff;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  background-color: #313131;
  position: relative;
  img {
    cursor: pointer;
    background-position: center;
    background-size: cover;
    display: block;
    width: min(50vw, 800px);
    aspect-ratio: 4/3;
  }
`;

const StyledCenterText = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  left: 50%;
  width: 100%;
  color: red;
`;

const StyledCornerText = styled.div`
  position: absolute;
  top: 5%;
  left: 85%;
  width: 100%;
  color: blue;
`;
