import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";

import React from "react";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "../components/headers/light.js";

export default function GameJamPage() {

    return (
        <>
            <AnimationRevealPage>
                <Header />
                <Footer />
            </AnimationRevealPage>
        </>
    );
}
