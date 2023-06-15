import React from "react";
import {Switch, Route } from "react-router-dom"
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home"
import CreateDeck from "../components/CreateDeck";
import Study from "../components/Study";
import AddCard from "../components/AddCard";
import Deck from "../components/Deck";
import EditCard from "../components/EditCard";
import EditDeck from "../components/EditDeck";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch >
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/decks/new">
            <CreateDeck/>
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck/>
          </Route>
          <Route path="/decks/:deckId/study">
            <Study/>
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard/>
          </Route>
          <NotFound />
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
