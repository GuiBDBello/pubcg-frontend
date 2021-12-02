import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";

import React, { useEffect, useState } from "react";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import GameInfo from "components/hero/GameInfo";
import GameMedia from "components/testimonials/GameMedia";
import ReviewForm from "components/forms/ReviewGameForm";

import ReviewList from "components/testimonials/ReviewList";

import Header from "../components/headers/light.js";

export default function GamePage(props) {

    const [game, setGame] = useState({});
    const [medias, setMedias] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        let gameId = props.match.params.id;

        async function loadGame() {
            let game = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/games/${gameId}`)
                .then(response => {
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
                    return response.json();
                })
                .catch(error => {
                    console.error(error);
                    // return {};
                });
            setMedias(medias);
        }
        loadMedias();

        async function loadUser() {
            let userId = localStorage.getItem("userLoggedIn");

            if (userId) {
                let user = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}`)
                    .then(response => {
                        return response.json();
                    })
                    .catch(error => {
                        console.error(error);
                        // return {};
                    });
                setUser(user);
            }
        }
        loadUser();
    }, [props.match.params.id]);

    return (
        <AnimationRevealPage>
            <Header />
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
            <ReviewForm
                user={user}
                gameId={game.id}
            />
            <ReviewList gameId={game.id} />
            <Footer />
        </AnimationRevealPage>
    );
}
