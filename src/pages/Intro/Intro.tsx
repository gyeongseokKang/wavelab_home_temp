import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';

function Intro() {
  const isPortrait = useOrientation();

  return (
    <>
      <Meta title="Intro" />
      <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
        <div>dddd</div>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Intro;
