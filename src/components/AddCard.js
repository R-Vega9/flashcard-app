import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom"
import { createCard, readDeck } from "../utils/api/index";
import FormComponent from "./FormComponent";

function AddCard() {
    const {deckId} = useParams();
    const history = useHistory();
    const initialState = {front:"", back: ""}

    const [newCard, setNewCard] = useState(initialState);
    const [deck, setDeck] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        
        async function loadData() {
          try {
            const response = await readDeck(deckId, abortController.signal);
            setDeck(response);
          } catch (error) {
            console.error("Something went wrong", error);
          }
        }
        
        loadData();
        
        return () => {
          abortController.abort();
        };
      }, []);

    function handleChange({target}){
        setNewCard({...newCard, [target.name]:target.value})
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response =  await createCard(deckId, {...newCard}, abortController.signal);
        history.go(0);
        setNewCard(initialState);
        return response; 
    }

    async function doneHandler(){
        history.push(`/decks/${deckId}`)
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to ="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to ={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">
                    Add Card
                </li>
            </ol>
            <FormComponent 
                front= {newCard.front}
                back={newCard.back}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleCancel={doneHandler}
            />
        </div>
    )
}
export default AddCard;