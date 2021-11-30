import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";

import React, { useEffect, useState } from "react";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import GameInfo from "components/hero/GameInfo";
import GameMedia from "components/testimonials/GameMedia";
import ReviewForm from "components/forms/ReviewGameForm";

export default function GamePage(props) {

    const [game, setGame] = useState({});
    const [medias, setMedias] = useState([]);

    useEffect(() => {
        let gameId = props.match.params.id;
        console.log('gameId: ' + gameId);

        async function loadGame() {
            let game = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/games/${gameId}`)
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .catch(error => {
                    console.error(error);
                    // return {};
                });
            setGame(game);
        }
        loadGame();

        async function loadMedias() {
            let medias = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/medias/game/${gameId}`)
                .then(response => {
                    console.log('medias response', response);
                    return response.json();
                })
                .catch(error => {
                    console.error(error);
                    // return {};
                });
                console.log('medias', medias);
            setMedias(medias);
        }
        loadMedias();
    }, [props.match.params.id]);

    return (
        <AnimationRevealPage>
            <GameInfo
                heading={game.name}
                description={game.description}
                primaryButtonUrl="#"
                imageSrc={game.logo}
                playGameUrl={game.file}
            // imageCss=null
            // imageDecoratorBlob = false
            />
            <GameMedia
                medias={medias}
            />
            <ReviewForm />
            <Footer />
        </AnimationRevealPage>
    );
}
