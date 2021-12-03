import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import SimpleTextArea from "../features/SimpleTextArea";

import { Subheading as SubheadingBase } from "components/misc/Headings.js";

import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';

const StyledRate = styled(Rate)`
  &.rc-rate {
    font-size: ${({ size }) => size}px;
  }
`;

const Subheading = tw(SubheadingBase)`text-center md:text-left text-xl`;

const Container = tw.div`relative justify-between max-w-screen-xl mx-auto w-11/12 last:pb-20`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-3/12 flex-shrink-0 h-auto`;
const TextColumn = styled(Column)(props => [
    tw`md:w-9/12 mt-16 md:mt-0`,
    props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-12 md:order-last`
]);

const TestimonialText = tw.div`outline-none`;

const CustomerInfo = tw.div`mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start`;
const CustomerProfilePicture = tw.img`rounded-full w-24 h-24`;
const CustomerTextInfo = tw.div`text-center lg:text-left sm:ml-6 mt-2 sm:mt-0`;
const CustomerName = tw.h5`font-semibold text-lg lg:text-xl xl:text-2xl text-primary-500`;
const CustomerTitle = tw.p`font-medium text-sm text-secondary-100`;

const NoReviewDiv = tw.div`outline-none m-16`;
const NoReviewTitle = tw.h5`font-semibold text-lg lg:text-xl xl:text-2xl text-gray-700`;
// const List = tw.div`flex flex-col-reverse`;

// const Image = styled.div(props => [
//   `background-image: url("${props.imageSrc}");`,
//   tw`rounded bg-contain bg-no-repeat bg-center h-full`,
// ]);
const TextContent = tw.div`lg:pt-8 text-center md:text-left`;

const Form = tw.form`md:mt-10 text-sm`

export default ({
    subheading = "Opiniões da Comunidade",
    formAction = "#",
    formMethod = "get",
    textOnLeft = false,
    gameId = null,
}) => {
    // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function loadReviews() {
            let reviews = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/reviews/game/${gameId}`)
                .then(response => {
                    console.log("reviews response", response);
                    return response.json();
                })
                .catch(error => {
                    console.error(error);
                    // return {};
                });
            console.log("reviews", reviews);
            if (reviews) setReviews(reviews);
        }

        loadReviews();
    }, [gameId]);

    return (
        <Container>
            {subheading && <Subheading>{subheading}</Subheading>}
            <hr />
            {(reviews.length <= 0) ? (
                <NoReviewDiv>
                    <CustomerInfo>
                        <CustomerTextInfo>
                            <NoReviewTitle>Seja o primeiro a publicar uma análise!</NoReviewTitle>
                            {/* <CustomerTitle>Seja o primeiro a publicar uma análise!</CustomerTitle> */}
                        </CustomerTextInfo>
                    </CustomerInfo>
                </NoReviewDiv>
            ) : (
                reviews.map((review, index) => {
                    return <Container key={index}>
                        <TwoColumn>
                            <ImageColumn>
                                <TestimonialText>
                                    <CustomerInfo>
                                        <CustomerProfilePicture src={review.user.photo} alt={review.user.name} />
                                        <CustomerTextInfo>
                                            <CustomerName>{review.user.name}</CustomerName>
                                            <CustomerTitle>{review.user.features}</CustomerTitle>
                                        </CustomerTextInfo>
                                    </CustomerInfo>
                                </TestimonialText>
                            </ImageColumn>
                            <TextColumn textOnLeft={textOnLeft}>
                                <TextContent>
                                    <Form action={formAction} method={formMethod}>
                                        <SimpleTextArea disabled readonly value={review.description} rows={3} />
                                        <StyledRate
                                            size={48}
                                            allowHalf
                                            value={review.score}
                                        />
                                        {/* <CustomerTextInfo>
                                            <CustomerName>{review.score}</CustomerName>
                                        </CustomerTextInfo> */}
                                    </Form>
                                </TextContent>
                            </TextColumn>
                        </TwoColumn>
                    </Container>
                }).reverse()
            )}
        </Container>
    );
};
