import { useState } from 'react';

import Dialog from '@mui/material/Dialog/Dialog';

import styled from '@emotion/styled';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

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
        Type Something Type Something Type Something Type Something Type Something
      </StyledSubTitle>
      <StyledSubTitle>
        Wavelab audio post production
        <StyledOpenDialogButton onClick={openNewOfficeDialog}> New Window </StyledOpenDialogButton>
        Type SomeThing
      </StyledSubTitle>
      <StyledDialog onClose={handleClose} open={open}>
        <>
          <StyledSwiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            //   className="mySwiper"
          >
            <StyledSwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
            </StyledSwiperSlide>
            <StyledSwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
            </StyledSwiperSlide>
            <StyledSwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
            </StyledSwiperSlide>
            <StyledSwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
            </StyledSwiperSlide>
            <StyledSwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
            </StyledSwiperSlide>
            <StyledSwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
            </StyledSwiperSlide>
            <StyledSwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
            </StyledSwiperSlide>
            <StyledSwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
            </StyledSwiperSlide>
            <StyledSwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
            </StyledSwiperSlide>
          </StyledSwiper>
        </>
      </StyledDialog>
    </StyledTitleLayout>
  );
};

export default Title;

const StyledTitleLayout = styled(FlexBox)`
  padding-inline: 5vw;
`;

const StyledTitle = styled.span`
  font-size: 2.5rem;
  font-family: swear-display;
  font-weight: 300;
`;

const StyledSubTitle = styled.span`
  font-size: 1.25rem;
`;

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    max-width: unset;
    box-shadow: none;
  }
`;

const StyledOpenDialogButton = styled.span`
  cursor: pointer;
  text-decoration: underline solid #fc8422 2px;
  &:hover {
    text-decoration: underline solid #fc8422 3px;
  }
  transition: all 0.2s;
`;

const StyledSwiper = styled(Swiper)`
  background-color: gray;
  .swiper-wrapper {
    width: 1050px;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  img {
    background-position: center;
    background-size: cover;
    display: block;
    width: 350px;
  }
`;
