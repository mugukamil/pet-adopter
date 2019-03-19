import React from "preact-compat";
import { Link } from "preact-router";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import colors from "./colors";

const spin = keyframes`
    from {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(360deg)
    }
`;

const Spyglass = styled("span")`
  display: inline-block;
  animation: 1s ${spin} linear infinite;
`;

const Container = styled("header")`
  background-color: ${colors.dark};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => (
  <Container>
    <NavLink href="/">Adopt Me</NavLink>
    <NavLink href="/search-params">
      <Spyglass aria-label="search" role="img">
        🔍
      </Spyglass>
    </NavLink>
  </Container>
);

export default Navbar;
