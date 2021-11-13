import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import logo from "images/logo.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";

import { SectionHeading as HeadingBase } from "components/misc/Headings";
// import { SectionDescription as DescriptionBase } from "components/misc/Typography";

import { useHistory } from "react-router-dom";

import image from "../images/games-02.svg";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

const HeadingError = tw(HeadingBase)`text-center text-primary-900 leading-snug`;
// const Description = tw(DescriptionBase)`mt-4 text-center lg:text-base text-gray-700 max-w-lg mx-auto lg:mx-0`;

export default ({
  logoLinkUrl = "/",
  illustrationImageSrc = image,
  headingText = "Cadastre sua conta",
  submitButtonText = "Cadastrar",
  SubmitButtonIcon = SignUpIcon,
  // tosUrl = "#",
  // privacyPolicyUrl = "#",
  signInUrl = "/login"
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      email: email,
      name: name,
      photo: photo
    }
    await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          setErrorMessage(data.errors[0].message);
        } else {
          history.push("/");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <Form onSubmit={handleSubmit}>
                  <Input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    type="file"
                    placeholder="Foto"
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                  {/* <Input type="password" placeholder="Password" /> */}
                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                  <HeadingError>{errorMessage}</HeadingError>
                  {/* <p tw="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by treact's{" "}
                  <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                </p> */}

                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Já possui uma conta?{" "}
                    <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                      Entrar
                    </a>
                  </p>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
}
