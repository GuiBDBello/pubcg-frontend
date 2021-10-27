import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg"

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-700 text-gray-100 rounded-lg relative`}
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
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`

export default () => {

  const [name, setName] = useState("Sample Game");
  const [description, setDescription] = useState("Lorem Ipsum");
  const logo = useRef(null);
  const media = useRef(null);
  const file = useRef(null);

  let history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("logo", logo.current.files[0]);
    data.append("media", media.current.files[0]);
    data.append("file", file.current.files[0]);

    console.log('logo', logo.current.files);
    console.log('media', media.current.files);
    console.log('file', file.current.files);

    await fetch(`${process.env.REACT_APP_API_ENDPOINT}/games`, {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      body: data
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401) {
        alert("Oops!");
        return response.json();
        // error
      }
    }).then(game => {
      // history.push(`/games/${game.id}`);
      console.log(game);
      history.push(`/games/${game.id}`);
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
                    <Label htmlFor="name-input">Logo</Label>
                    <Input
                      id="logo-input"
                      type="file"
                      name="logo"
                      placeholder="Logo de seu Game."
                      ref={logo}
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="name-input">Mídia</Label>
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
                <Label htmlFor="name-input">Arquivo .zip do Game</Label>
                <Input
                  id="file-input"
                  type="file"
                  name="file"
                  placeholder="Suba o arquivo compactado de seu Game."
                  ref={file}
                />
              </InputContainer>

              <SubmitButton type="submit" value="Submit">
                Enviar
              </SubmitButton>
            </form>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
    </Container>
  );
};
