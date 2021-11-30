import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;

export default ({
  games = [
    // {
    //   imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
    //   title: "Wyatt Residency",
    //   description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
    //   rating: 5.0,
    // },
  ],
  heading = "Games",
  message = "Você ainda não jogou/publicou nenhum jogo."
}) => {
  function getSlidesToShow(games, max) {
    let slidesToShow = (
      (games.length >= 3) ? 3 : (
        (games.length >= 2) ? 2 : (
          (games.length >= 1) ? 1 : 0
        )
      )
    );
    return slidesToShow > max ? max : slidesToShow;
  }
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);

  const sliderSettings = {
    arrows: false,
    slidesToShow: getSlidesToShow(games, 3),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: getSlidesToShow(games, 3),
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: getSlidesToShow(games, 2),
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: getSlidesToShow(games, 1),
        }
      },
    ]
  };

  return (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>{heading}</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon /></PrevButton>
            <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon /></NextButton>
          </Controls>
        </HeadingWithControl>

        {getSlidesToShow(games, 3) === 0 ? (
          <TextInfo>
            <TitleReviewContainer>
              <Title>{message}</Title>
            </TitleReviewContainer>
          </TextInfo>
        ) : (
          <CardSlider ref={setSliderRef} {...sliderSettings}>
            {games.map((game, index) => (
              <Card key={index}>
                <CardImage imageSrc={game.imageSrc} />
                <TextInfo>
                  <TitleReviewContainer>
                    <Title>{game.title}</Title>
                    <RatingsInfo>
                      <StarIcon />
                      <Rating>{game.rating}</Rating>
                    </RatingsInfo>
                  </TitleReviewContainer>
                  <Description>{game.description}</Description>
                </TextInfo>
                <PrimaryButton>Página do Game</PrimaryButton>
              </Card>
            ))}
          </CardSlider>
        )}
      </Content>
    </Container>
  );
};
