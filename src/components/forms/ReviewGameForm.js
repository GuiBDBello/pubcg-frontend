import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

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

const TextContent = tw.div`lg:pt-8 text-center md:text-left`;

const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;

const Form = tw.form`md:mt-10 text-sm`
const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-6 max-w-xs float-right`

export default ({
  heading = <>Publique sua <span tw="text-primary-500">análise</span><wbr /> para ajudar os desenvolvedores.</>,
  submitButtonText = "Publicar",
  formAction = "#",
  formMethod = "get",
  textOnLeft = false,
  user = null,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  const [isButtonDisabled, setButtonDisabled] = useState(false);

  return (
    <Container>
      <TextContent>
        <Heading>{heading}</Heading>
      </TextContent>
      {user === null ? (
        <TwoColumn>
          <CustomerTextInfo>
            <br />
            <CustomerTitle>Faça <span tw="text-primary-500"><a href="/login">login</a></span> para publicar uma análise.</CustomerTitle>
          </CustomerTextInfo>
        </TwoColumn>
      ) : (
        <TwoColumn>
          <>
            <ImageColumn>
              <TestimonialText>
                <CustomerInfo>
                  <CustomerProfilePicture src={user.photo} alt={user.name} />
                  <CustomerTextInfo>
                    <CustomerName>{user.name}</CustomerName>
                    <CustomerTitle>{user.features}</CustomerTitle>
                  </CustomerTextInfo>
                </CustomerInfo>
              </TestimonialText>
            </ImageColumn>
            <TextColumn textOnLeft={textOnLeft}>
              <TextContent>
                <Form action={formAction} method={formMethod}>
                  <SimpleTextArea placeholder="Escreva sua análise aqui" />
                  <SubmitButton disabled={isButtonDisabled} type="submit">{submitButtonText}</SubmitButton>
                </Form>
              </TextContent>
            </TextColumn>
          </>
        </TwoColumn>
      )}
    </Container>
  );
};
