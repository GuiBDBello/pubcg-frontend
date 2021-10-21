import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";

import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Hero from "components/hero/TwoColumnWithGame";

import FileUpload from "components/FileUpload.js";

export default function App(props) {

    const [game, setGame] = useState({});

    useEffect(() => {
        let gameId = props.match.params.id;
        console.log('gameId: ' + gameId);

        async function loadGame() {
            let game = await fetch(`http://localhost:8080/games/${gameId}`)
                .then(response => {
                    return response.json();
                }).catch(error => {
                    console.error(error);
                    return {};
                });
            setGame(game);
        }
        loadGame();
    }, []);

    return (
        <AnimationRevealPage>
            <Hero
                heading={game.name}
                description={game.description}
                primaryButtonUrl="#"
                watchVideoYoutubeUrl="https://www.youtube.com/embed/_GuOjXYl5ew"
            // imageSrc=DesignIllustration
            // imageCss=null
            // imageDecoratorBlob = false
            />
            <FileUpload />
            <Footer />
        </AnimationRevealPage>
    );
}
