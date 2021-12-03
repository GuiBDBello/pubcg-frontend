import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";

import ReactModalAdapter from "../../helpers/ReactModalAdapter.js";
import ResponsiveGameEmbed from "../../helpers/ResponsiveGameEmbed.js";

import { ReactComponent as PlayIcon } from "feather-icons/dist/icons/play-circle.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/dot-pattern.svg";
import DesignIllustration from "../../images/design-illustration.svg";

import { Container as ContainerBase, ContentWithPaddingXl as ContentBase } from "components/misc/Layouts.js";

const Container = tw(ContainerBase)`bg-primary-900 text-gray-100 -mx-8`;
const ContentWithPaddingXl = tw(
  ContentBase
)`relative z-10 mx-auto px-0 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-24 sm:py-20 flex flex-col max-w-screen-xl`;

const WhiteBackgroundOverlay = tw.div`absolute inset-x-0 bottom-0 h-1/6 lg:h-1/3 bg-white z-0`;

// const Container = tw.div`relative`;
// const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
// const LeftColumn = tw.div`relative lg:w-5/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
// const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col justify-center`;

const Heading = tw.h1`mt-4 font-black text-3xl md:text-5xl leading-snug max-w-3xl`;
const Paragraph = tw.p`my-5 lg:my-8 text-sm lg:text-base font-medium text-gray-600 max-w-lg mx-auto lg:mx-0`;

const Actions = tw.div`flex flex-col items-center sm:flex-row justify-center lg:justify-start mt-8`;
const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;
const WatchVideoButton = styled.button`
  ${tw`mt-4 sm:mt-0 sm:ml-8 flex items-center text-secondary-300 transition duration-300 hocus:text-primary-400 focus:outline-none`}
  .playIcon {
    ${tw`stroke-1 w-12 h-12`}
  }
  .playText {
    ${tw`ml-2 font-medium`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center md:justify-end items-center relative max-w-3xl lg:max-w-none border-2 rounded border-primary-700`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3  -z-10`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none fill-current text-primary-500 opacity-25 absolute w-32 h-32 right-0 bottom-0 transform translate-x-10 translate-y-10 -z-10`}
`;

const StyledModal = styled(ReactModalAdapter)`
  &.mainHeroModal__overlay {
    ${tw`fixed inset-0 z-50`}
  }
  &.mainHeroModal__content {
    ${tw`xl:mx-auto m-4 sm:m-16 max-w-screen-xl absolute inset-0 flex justify-center items-center rounded-lg bg-gray-200 outline-none`}
  }
  .content {
    ${tw`w-full lg:p-16`}
  }
`;
const CloseModalButton = tw.button`absolute top-0 right-0 mt-8 mr-8 hocus:text-primary-500`;

const GameContainer = tw.div`mt-8 flex flex-col items-center lg:justify-between text-gray-900 font-sans`;
const Game = styled.div`
  ${tw`items-center w-full max-w-xl bg-white rounded-lg shadow-sm py-4 px-4 flex flex-col justify-between mt-16 first:mt-0 lg:mt-0 shadow-raised`}
`;

export default ({
  heading = "Game Name",
  description = "Game Description.",
  primaryButtonText = "Apoiar",
  primaryButtonUrl = "#",
  playGameButtonText = "Jogar",
  playGameUrl = `${process.env.REACT_APP_API_ENDPOINT}/games/1`,
  imageSrc = DesignIllustration,
  imageCss = null,
  imageDecoratorBlob = false,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  return (
    <Container>
      <ContentWithPaddingXl>
        <GameContainer>
          <Game>
            <IllustrationContainer>
              <img
                css={imageCss}
                src={imageSrc}
                alt="Hero"
              />
              {imageDecoratorBlob && <DecoratorBlob2 />}
            </IllustrationContainer>

            <Heading>{heading}</Heading>
            <Paragraph>{description}</Paragraph>
            <Actions>
              <PrimaryButton as="a" href={primaryButtonUrl}>{primaryButtonText}</PrimaryButton>
              <WatchVideoButton onClick={toggleModal}>
                <span className="playIconContainer">
                  <PlayIcon className="playIcon" />
                </span>
                <span className="playText">{playGameButtonText}</span>
              </WatchVideoButton>
            </Actions>
          </Game>
        </GameContainer>
      </ContentWithPaddingXl>
      <WhiteBackgroundOverlay />
      <DecoratorBlob1 />
      <StyledModal
        closeTimeoutMS={300}
        className="mainHeroModal"
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={true}
      >
        <CloseModalButton onClick={toggleModal}>
          <CloseIcon tw="w-6 h-6" />
        </CloseModalButton>
        <div className="content">
          <ResponsiveGameEmbed url={playGameUrl} tw="w-full" />
        </div>
      </StyledModal>
    </Container>
  );
};
