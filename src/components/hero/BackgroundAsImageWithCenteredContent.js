import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";

import backgroundImage from "../../images/background-02.jpg";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;

const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
  background-image: url(${backgroundImage});
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-75`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const Heading = styled.h1`
  ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;

export default (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState("0");
  const [userName, setUserName] = useState("");

  let history = useHistory();

  useEffect(() => {
    let userId = localStorage.getItem("userLoggedIn");
    if (userId) setUserLoggedIn(userId);

    async function getUserEmail() {
      await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${userLoggedIn}`)
        .then(response => response.json())
        .then(data => {
          if (data.name) {
            setUserName(data.name);
          }
        })
        .catch(error => {
          localStorage.setItem("userLoggedIn", 0);
          // console.log(error);
        });
    }

    if (userLoggedIn !== "0") {
      getUserEmail();
    }
  }, [userLoggedIn]);

  function handleLogout() {
    localStorage.setItem("userLoggedIn", 0);
    setUserLoggedIn(0);
    history.push("/");
  }

  const navLinks = [
    <NavLinks key={1}>
      {props.navLinks.map((navLink, index) => {
        return (
          <NavLink key={index} href={navLink.url}>
            {navLink.textContent}
          </NavLink>
        );
      })}
    </NavLinks>,
    <NavLinks key={2}>
      {(userLoggedIn !== "0") ?
        <>
          <NavLink href={`/users/${userLoggedIn}`} tw="lg:ml-12!">
            Olá, {userName}
          </NavLink>
          <PrimaryLink onClick={handleLogout}>
            Sair
          </PrimaryLink>
        </>
        :
        <>
          <NavLink href="/login" tw="lg:ml-12!">
            Entrar
          </NavLink>
          <PrimaryLink href={props.primaryLink.url}>
            {props.primaryLink.textContent}
          </PrimaryLink>
        </>
      }
    </NavLinks>
  ];

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} />
        <Content>
          <Heading>
            {props.heading}
          </Heading>
          <PrimaryAction>{props.primaryButtonText}</PrimaryAction>
        </Content>
      </HeroContainer>
    </Container>
  );
};
