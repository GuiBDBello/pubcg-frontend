import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container as ContainerBase, ContentWithPaddingXl as ContentBase } from "components/misc/Layouts.js";

import { ReactComponent as SvgDotPattern } from "../../images/dot-pattern.svg";

const Container = tw(ContainerBase)`bg-primary-900 text-gray-100 -mx-8`;
// const Container = styled.div`
//   ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144
//   bg-primary-900`}
// `;
const ContentWithPaddingXl = tw(
  ContentBase
)`relative z-10 mx-auto px-0 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-24 sm:py-20 flex flex-col max-w-screen-xl`;

// const Container = tw.div`relative`;
// const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const UsersContainer = tw.div`mt-16 flex flex-col items-center lg:justify-between text-gray-900 font-medium`;
const User = styled.div`
  ${tw`w-full max-w-sm bg-white rounded-lg shadow-sm py-10 px-6 sm:px-10 lg:px-6 lg:py-10 xl:p-10 mx-3 flex flex-col justify-between mt-16 first:mt-0 lg:mt-0 shadow-raised`}
`;

const UserFeatures = styled.div`
  .nameAndFeaturedContainer {
    ${tw`flex flex-wrap flex-col sm:flex-row justify-between items-center`}
  }
  .name {
    ${tw`lg:text-lg xl:text-xl font-bold uppercase tracking-wider mr-3`}
  }
  .featuredText {
    ${tw`text-xs font-bold px-3 rounded py-2 uppercase bg-green-300 text-green-900 leading-none mt-4 sm:mt-0 w-full sm:w-auto text-center`}
  }
  .description {
    ${tw`mt-8 font-medium text-gray-700 lg:text-sm xl:text-base`}
  }
`;

const WhiteBackgroundOverlay = tw.div`absolute inset-x-0 bottom-0 h-1/6 lg:h-1/3 bg-white z-0`;

const Image = styled.img(props => [
  props.imageRounded && tw`rounded`,
  props.imageBorder && tw`border`,
  props.imageShadow && tw`shadow`
]);

const DecoratorBlob = styled(SvgDotPattern)(() => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`
]);

export default ({
  imageRounded = true,
  imageBorder = false,
  imageShadow = false,
  imageDecoratorBlob = false,
  decoratorBlobCss = null,
  user = {
    name: "John Doe",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    featured: "Dev & Gamer",
    photo: "https://pubcg-bucket.s3.sa-east-1.amazonaws.com/public/users/0-user.jpg"
  },
}) => {

  return (
    <Container>
      <ContentWithPaddingXl>
        <UsersContainer>
          <User featured={user.featured}>
            <Image src={user.photo} imageBorder={imageBorder} imageShadow={imageShadow} imageRounded={imageRounded} />
            {imageDecoratorBlob && <DecoratorBlob css={decoratorBlobCss} />}
            <UserFeatures>
              <span className="nameAndFeaturedContainer">
                <span className="name">{user.name}</span>
                {user.featured && <span className="featuredText">{user.featured}</span>}
              </span>
              <p className="description">{user.description}</p>
            </UserFeatures>
          </User>
        </UsersContainer>
      </ContentWithPaddingXl>
      <WhiteBackgroundOverlay />
    </Container>
  );
};
