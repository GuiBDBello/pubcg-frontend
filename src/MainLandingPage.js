import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";

import React, { useState, useEffect } from "react";
import tw from "twin.macro";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Faq from "components/faqs/SingleCol";
import Features from "components/features/TwoColWithSteps";
import Footer from "components/footers/MiniCenteredFooter.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import TabGrid from "components/cards/TabCardGrid.js";

import Feature1Image from "./images/dev-02.svg";
import Feature2Image from "./images/games-05.svg";

export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;

  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;

  const [tabs, setTabs] = useState({
    Destaques: [],
    "Mais Jogados": [],
    Aleatório: []
  });

  useEffect(() => {
    async function loadGames() {
      let games = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/games`)
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.error('Failed to fetch games.', error);
          return [];
        });

      let gamesFormatted = games.map(game => {
        console.log('game', game);
        return {
          imageSrc: game.logo,
          title: game.name,
          content: game.description,
          price: 'Free',
          rating: '9.5',
          reviews: '1',
          url: `games/${game.id}`
        }
      })
      // console.log(gamesFormatted);

      if (gamesFormatted) {
        setTabs({
          Destaques: gamesFormatted.slice(0, 8),
          // "Mais Jogados": [],
          Novos: gamesFormatted
            .slice()
            .reverse()
            .slice(0, 8),
          Aleatório: gamesFormatted
            .slice()
            .sort(() => Math.random() - 0.5)
            .slice(0, 8)
        });
      }
    }

    loadGames();
  }, []);

  return (
    <AnimationRevealPage disabled={false}>
      <Hero
        heading={<>Descubra o próximo<br />sucesso da Indústria de<br />Games na <HighlightedText>PubCG</HighlightedText></>}
        primaryButtonText="Confira nossos Games"
        navLinks={[
          {
            textContent: 'Games',
            url: '/games'
          },
          {
            textContent: 'Game Jams',
            url: '/gameJams'
          },
          {
            textContent: 'Publicar Game',
            url: '/newGame'
          }
        ]}
        primaryLink={{
          textContent: 'Cadastrar-se',
          url: '/signUp'
        }}
      />

      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
      <TabGrid
        heading={
          <>
            Confira nossos <HighlightedText>GAMES</HighlightedText>
          </>
        }
        tabs={tabs}
        cardButtonTextContent={"Página do Game"}
      />

      <Features
        subheading="Desenvolvedores de Games"
        heading={
          <>
            Feito para <span tw="text-primary-500">Desenvolvedores</span>
          </>
        }
        imageSrc={Feature1Image}
        imageRounded={true}
        imageBorder={false}
        imageShadow={false}
        imageDecoratorBlob={false}
        textOnLeft={true}
        steps={[
          {
            heading: "Cadastre-se",
            description: "Crie sua conta cadastrando seu e-mail e senha."
          },
          {
            heading: "Publique",
            description: "Disponibilize um protótipo, versão beta ou vertical slice de seu jogo."
          },
          {
            heading: "Ganhe",
            description: "Receba feedbacks dos Gamers da plataforma para analisar e melhorar seus jogos."
          }
        ]}
        decoratorBlobCss={null}
      />
      <Features
        subheading="Gamers"
        heading={
          <>
            E também para <span tw="text-primary-500">Gamers</span>
          </>
        }
        imageSrc={Feature2Image}
        imageRounded={true}
        imageBorder={false}
        imageShadow={false}
        imageDecoratorBlob={false}
        textOnLeft={false}
        steps={[
          {
            heading: "Cadastre-se",
            description: "Crie sua conta cadastrando seu e-mail e senha."
          },
          {
            heading: "Jogue",
            description: "Jogue diretamente na plataforma!"
          },
          {
            heading: "Ganhe",
            description: "Receba pontos de experiência para seu perfil e moedas para resgatar recompensas."
          }
        ]}
        decoratorBlobCss={null}
      />

      <Faq
        subheading="FAQs"
        heading="Dúvidas?"
        description="Temos as respostas!"
        faqs={[
          {
            question: "Qual o custo para jogar ou publicar Games?",
            answer:
              "A plataforma é de uso totalmente gratuito."
          },
          {
            question: "O que recebo em troca por publicar meus Games?",
            answer:
              "Para auxiliar os desenvolvedores, estimulamos que os Gamers realizem doações para que os Desenvolvedores tenham fundos suficientes para finalizar o desenvolvimento dos Games publicados."
          },
          {
            question: "O que recebo em troca por jogar e publicar feedbacks?",
            answer:
              "Pontos de experiência para seu perfil e moedas da plataforma."
          },
          {
            question: "Que recompensas eu posso resgatar com as moedas recebidos ao jogar?",
            answer:
              "Imagens de perfil customizadas, medalhas para exibir em seu perfil, etc."
          }
        ]}
      />
      <Footer />
    </AnimationRevealPage>
  );
}
