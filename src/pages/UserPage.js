import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";

import React from "react";
import tw from "twin.macro";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "../components/headers/light.js";
import Cards from "../components/cards/ThreeColSlider";
import Pricing from "../components/pricing/ThreePlansWithHalfPrimaryBackground";
import Testimonials from "../components/testimonials/ThreeColumnWithProfileImage.js";

const Container = tw.div`relative`;

export default function UserPage() {

    return (
        <>
            <AnimationRevealPage>
                <Header />
                <Container>
                    <Pricing />
                    <Testimonials />
                    <Cards />
                    <Footer />
                </Container>
            </AnimationRevealPage>
        </>
    );
}
