import styled from '@emotion/styled';

import Meta from '@/components/Meta';
import Title from '@/sections/Body/Title';

function Intro() {
  return (
    <PageLayout>
      <Meta title="Intro" />
      <Title />
    </PageLayout>
  );
}

export default Intro;

const PageLayout = styled.div`
  max-width: 1440px;
  margin: auto;
  padding-top: 10rem;
`;
