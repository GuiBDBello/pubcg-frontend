import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";

import React, { useRef, useState, useEffect } from "react";
import tw from "twin.macro";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import TabGrid from "components/cards/TabCardGrid.js";

export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;

  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;

  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    async function loadGames() {
      let games = await fetch(`http://localhost:8080/games`)
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.error('Failed to fetch games.');
          return [];
        });

      let gamesFormatted = games.map(game => {
        return {
          imageSrc: '',//game.logo.data,
          title: game.name,
          content: game.description,
          price: 'Free',
          rating: '9.5',
          reviews: '1',
          url: `games/${game.id}`
        }
      })
      console.log(gamesFormatted);

      if (gamesFormatted) {
        setTabs({
          Destaques: gamesFormatted,
          "Mais Jogados": [],
          Aleatório: []
        });
      }
    }

    loadGames();
  }, []);

  return (
    <AnimationRevealPage>
      <Hero
        heading={<>Descubra o próximo<br />sucesso da Indústria de<br />Games na <HighlightedText>PubCG</HighlightedText></>}
        primaryButtonText="Confira nossos Games"
        navLinks={[
          {
            textContent: 'Veja nossos Games',
            url: '#'
          },
          {
            textContent: 'Participe de Game Jams',
            url: '#'
          },
          {
            textContent: 'Publique seu Game',
            url: '#'
          }
        ]}
        primaryLink={{
          textContent: 'Login / Sign Up',
          url: '#'
        }}
      />
      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
      <TabGrid
        heading={
          <>
            Confira nossos <HighlightedText>GAMES.</HighlightedText>
          </>
        }
        tabs={tabs}
      />
      <Footer />
    </AnimationRevealPage>
  );
}
