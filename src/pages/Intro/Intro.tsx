import styled from '@emotion/styled';

import Meta from '@/components/Meta';
import List from '@/sections/Body/List';
import Title from '@/sections/Body/Title';

function Intro() {
  return (
    <>
      <Meta title="Intro" />
      <PageLayout>
        <Title />
      </PageLayout>
      <List />
    </>
  );
}

export default Intro;

const PageLayout = styled.div`
  max-width: 1440px;
  margin: auto;
  padding-top: 10rem;
`;
