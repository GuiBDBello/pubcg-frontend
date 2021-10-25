import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";

import React, { useEffect, useState } from "react";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Hero from "components/hero/TwoColumnWithGame";

export default function App(props) {

    const [game, setGame] = useState({});

    useEffect(() => {
        let gameId = props.match.params.id;
        console.log('gameId: ' + gameId);

        async function loadGame() {
            let game = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/games/${gameId}`)
                .then(response => response.json())
                .catch(error => {
                    console.error(error);
                    // return {};
                });
            setGame(game);
        }
        loadGame();
    }, [props.match.params.id]);

    return (
        <AnimationRevealPage>
            <Hero
                heading={game.name}
                description={game.description}
                primaryButtonUrl="#"
                imageSrc={game.logo}
                playGameUrl={game.file}
                // imageCss=null
                // imageDecoratorBlob = false
            />
            <Footer />
        </AnimationRevealPage>
    );
}
