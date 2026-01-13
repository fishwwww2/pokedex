import { useState } from "react";
import styled from "styled-components";

const FlipCardWrapper = styled.div`
  width: 180px;
`;

export const FlipImageContainer = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  perspective: 1000px; /* 3D 깊이감 */
`;

const FlipInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  transform-style: preserve-3d; /* ✅ 3D 유지 */
  transition: transform 0.6s;

  transform: ${({ $flipped }) => ($flipped ? "rotateY(180deg)" : "rotateY(0deg)")};
`;

const Face = styled.div`
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  backface-visibility: hidden; /* ✅ 뒤집힐 때 뒷면 숨김 */
`;

const FrontFace = styled(Face)`
  transform: rotateY(0deg);
`;

const BackFace = styled(Face)`
  transform: rotateY(180deg);
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const FlipButton = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 8px 12px;

  border: none;
  border-radius: 10px;

  background: #111827;
  color: white;
  cursor: pointer;

  transition: transform 0.12s ease, opacity 0.12s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default function FlipCard({ frontSrc, backSrc, alt = "pokemon" }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <FlipCardWrapper>
      <FlipImageContainer>
        <FlipInner $flipped={flipped}>
          <FrontFace>
            <Img src={frontSrc} alt={`${alt}-front`} />
          </FrontFace>
          <BackFace>
            <Img src={backSrc} alt={`${alt}-back`} />
          </BackFace>
        </FlipInner>
      </FlipImageContainer>

      <FlipButton onClick={() => setFlipped((v) => !v)}>
        {flipped ? "앞면 보기" : "뒷면 보기"}
      </FlipButton>
    </FlipCardWrapper>
  );
}
