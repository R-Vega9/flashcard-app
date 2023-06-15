import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom"
import { createCard, readDeck } from "../utils/api/index";

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

    async function submitHandler(event) {
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
            <form onSubmit={submitHandler}>
                <h2>{deck.name}: Add Card</h2>
                <div className="form-group">
                    <label>Front</label>
                    <textarea 
                        id="front"
                        name="front"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        placeholder="Front side of card"
                        value={newCard.front}
                    />
                </div>
                <div className="form-group">
                    <label>Back</label>
                    <textarea 
                        id="back"
                        name="back"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        placeholder="Back side of card"
                        value={newCard.back} 
                    
                    />
                </div>
                <button className="btn btn-secondary mx-1" onClick={()=> doneHandler()}>Done</button>
                <button className="btn btn-primary mx-1" type="submit">Save</button>
            </form>
        </div>
    )
}
export default AddCard;