import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import DefaultUserImageSrc from "./../../images/user-6.jpg";

import SimpleTextArea from "../features/SimpleTextArea";

const Container = tw.div`relative justify-between max-w-screen-xl mx-auto`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto pb-20 md:pb-24 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-3/12 flex-shrink-0 h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-9/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const TestimonialText = tw.div`outline-none`;

const CustomerInfo = tw.div`mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start`;
const CustomerProfilePicture = tw.img`rounded-full w-32 h-32`;
const CustomerTextInfo = tw.div`text-center lg:text-left sm:ml-6 mt-2 sm:mt-0`;
const CustomerName = tw.h5`font-semibold text-xl lg:text-2xl xl:text-3xl text-primary-500`;
const CustomerTitle = tw.p`font-medium text-secondary-100`;

// const Image = styled.div(props => [
//   `background-image: url("${props.imageSrc}");`,
//   tw`rounded bg-contain bg-no-repeat bg-center h-full`,
// ]);
const TextContent = tw.div`lg:pt-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
// const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`md:mt-10 text-sm`
const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-6 max-w-xs float-right`

export default ({
  subheading = "Análises",
  heading = <>Publique seu <span tw="text-primary-500">feedback</span><wbr /> para ajudar os desenvolvedores.</>,
  description = <>Publique seu <span tw="text-primary-500">feedback</span><wbr /> para ajudar os desenvolvedores.</>,
  submitButtonText = "Publicar",
  formAction = "#",
  formMethod = "get",
  textOnLeft = false,
  user = null,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  const defaultUser = {
    imageSrc:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80",
    profileImageSrc: DefaultUserImageSrc,
    quote:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    customerName: "John Doe",
    customerTitle: "Dev & Gamer"
  };

  if (!user) user = defaultUser;

  return (
    <Container>
      <TextContent>
        {subheading && <Subheading>{subheading}</Subheading>}
        <Heading>{heading}</Heading>
        {/* <Description>{description}</Description> */}
      </TextContent>
      <TwoColumn>
        <ImageColumn>
          {/* <Image imageSrc={EmailIllustrationSrc} /> */}
          <TestimonialText>
            <CustomerInfo>
              <CustomerProfilePicture src={user.profileImageSrc} alt={user.customerName} />
              <CustomerTextInfo>
                <CustomerName>{user.customerName}</CustomerName>
                <CustomerTitle>{user.customerTitle}</CustomerTitle>
              </CustomerTextInfo>
            </CustomerInfo>
          </TestimonialText>
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Form action={formAction} method={formMethod}>
              <SimpleTextArea placeholder="Escreva sua análise aqui" />
              <SubmitButton type="submit">{submitButtonText}</SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
