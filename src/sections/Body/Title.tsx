import { useEffect, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog/Dialog';

import styled from '@emotion/styled';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

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
    <StyledTitleLayout flexDirection={'column'} gap={'1rem'}>
      <StyledTitle>Wavelab audio post production</StyledTitle>
      <StyledTitle>Sample text Title Swear Display Light_42/60pt</StyledTitle>
      <StyledSubTitle>
        Type Something Type Something Type Something Type Something Type Something <br></br>Wavelab
        audio post production
        <StyledOpenDialogButton onClick={openNewOfficeDialog}>New Window</StyledOpenDialogButton>
        Type SomeThing
      </StyledSubTitle>

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
      setImageList(result.imageList);
    };
    loadOfficeImages();
  }, []);

  if (imageList === undefined) {
    return <CircularProgress sx={{ padding: '1rem', color: 'black' }} />;
  }
  return (
    <StyledSwiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      coverflowEffect={{
        rotate: 45,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
    >
      {imageList?.map((image) => {
        return (
          <StyledSwiperSlide key={image}>
            <img src={image} />
          </StyledSwiperSlide>
        );
      })}
    </StyledSwiper>
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
  line-height: 0.9;
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
  cursor: pointer;
  margin-inline: 5px;
  border-bottom: 2px solid #fc8422;
  &:hover {
    border-bottom-width: 3px;
  }
`;

const StyledSwiper = styled(Swiper)`
  background-color: transparent;
  .swiper-wrapper {
    width: min(80vw, 1600px);
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
  img {
    cursor: pointer;
    background-position: center;
    background-size: cover;
    display: block;
    width: min(80vw, 1600px);
    aspect-ratio: 4/3;
  }
  .swiper-slide-active {
    /* transition: ; */
    /* background-color: #313131; */
  }
`;
