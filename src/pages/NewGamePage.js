import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";

import React from "react";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import GameForm from "components/forms/PublishGameForm";
import Header from "../components/headers/light.js";

export default function NewGamePage() {

    return (
        <AnimationRevealPage>
            <Header />
            <GameForm />
            <Footer />
        </AnimationRevealPage>
    );
}
