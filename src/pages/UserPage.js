import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";

import React, { useEffect, useState } from "react";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "../components/headers/light.js";
import GameCards from "../components/cards/GameSlider";
import UserInfo from "../components/user/UserInfo";

export default function UserPage(props) {

    const [user, setUser] = useState({});
    const [userGames, setUserGames] = useState([]);

    useEffect(() => {
        async function loadUser() {
            let userId = props.match.params.id;//localStorage.getItem("userLoggedIn");
            console.log(userId);

            if (!userId || userId <= 0) return {};

            let user = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}`)
                .then((response) => {
                    return response.json();
                })
                .catch((error) => {
                    console.error('Failed to fetch user.', error);
                    return {};
                });

            if (user) setUser(user);
        }
        loadUser();

        async function loadUserGames() {
            let userId = props.match.params.id;
            console.log(userId);

            if (!userId || userId <= 0) return {};

            let games = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/games/user/${userId}`)
                .then((response) => {
                    return response.json();
                })
                .catch((error) => {
                    console.error('Failed to fetch user.', error);
                    return [];
                });

            let mappedGames = games.map((game) => {
                return {
                    "id": game.id,
                    "title": game.name,
                    "description": game.description,
                    "imageSrc": game.logo,
                };
            });

            if (mappedGames) setUserGames(mappedGames);
        }
        loadUserGames();
    }, [props.match.params.id]);

    return (
        <>
            <AnimationRevealPage>
                <Header />
                <UserInfo
                    user={user}
                />
                <GameCards
                    games={userGames}
                    heading="Meus Games"
                    message="Você ainda não publicou nenhum jogo."
                />
                <GameCards
                    heading="Biblioteca"
                    message="Você ainda não jogou nenhum jogo."
                />
                <Footer />
            </AnimationRevealPage>
        </>
    );
}
