import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg"

import ReactLoading from "react-loading";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto pb-10 lg:pb-12`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-gradient-to-br from-primary-900 to-primary-400 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`disabled:bg-gray-500 disabled:hover:bg-gray-500 w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`

export default () => {

  const [name, setName] = useState("Sample Game");
  const [description, setDescription] = useState("Lorem Ipsum");
  const [developerId, setDeveloperId] = useState(null);
  const logo = useRef(null);
  const file = useRef(null);
  const media = useRef(null);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  let history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setButtonDisabled(true);
    let devId = localStorage.getItem("userLoggedIn");
    setDeveloperId(devId);
    console.log("devId", devId, developerId);

    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("logo", logo.current.files[0]);
    data.append("file", file.current.files[0]);
    let mediaFiles = media.current.files;
    for (let i = 0; i < mediaFiles.length; i++) {
      data.append("media", mediaFiles[i]);
    }
    data.append("developerId", devId);

    // Display the key/value pairs
    for (let pair of data.entries()) {
      console.log("FormData", pair[0] + ', ' + pair[1]);
    }

    Promise.all([
      // First insert the game
      await fetch(`${process.env.REACT_APP_API_ENDPOINT}/games`, {
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body: data
      }).then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          alert("Oops!", response.json());
          return response.json();
          // error
        }
      }).then(game => {
        console.log("game", game);
        history.push(`/games/${game.id}`);
      }).catch(error => {
        console.error(error);
      }),
    ]).then(values => {
      console.log("values", values);
      // history.push(`/games/${game.id}`);
    });
  }

  return (
    <Container>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Publicar Game</h2>
            <form
              onSubmit={handleSubmit}
            >
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input">Título</Label>
                    <Input
                      id="name-input"
                      type="text"
                      name="name"
                      placeholder="Nome do Game"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="name-input">Descrição</Label>
                    <TextArea
                      id="description-input"
                      name="description"
                      placeholder="Detalhes sobre seu Game."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </InputContainer>
                </Column>
                <Column>
                  <InputContainer tw="flex-1">
                    <Label htmlFor="name-input">Logo (.jpg, .png)</Label>
                    <Input
                      id="logo-input"
                      type="file"
                      name="logo"
                      placeholder="Logo de seu Game."
                      ref={logo}
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="name-input">Mídia (.jpg, .png)</Label>
                    <Input
                      id="media-input"
                      type="file"
                      name="media"
                      placeholder="Imagens de seu Game."
                      ref={media}
                      multiple
                    />
                  </InputContainer>
                </Column>
              </TwoColumn>
              <InputContainer tw="flex-1">
                <Label htmlFor="name-input">Arquivo compactado com o Game (.zip)</Label>
                <Input
                  id="file-input"
                  type="file"
                  name="file"
                  placeholder="Suba o arquivo compactado de seu Game."
                  ref={file}
                />
              </InputContainer>

              <TwoColumn>
                <Column>
                  <SubmitButton disabled={isButtonDisabled} type="submit" value="Submit">
                    Enviar
                  </SubmitButton>
                </Column>
                <Column>
                  {isButtonDisabled ? (
                    <>
                      <Content>O envio pode levar alguns minutos. Seu navegador redirecionará você à página do jogo ao finalizar.</Content>
                      <ReactLoading type={"spinningBubbles"} coolr={"#abcdef"} height={"20%"} width={"100%"}></ReactLoading>
                    </>
                  ) : (
                    <></>
                  )}
                </Column>
              </TwoColumn>
            </form>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
    </Container>
  );
};
