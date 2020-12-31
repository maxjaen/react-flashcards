import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  update,
  selectFlashcards,
} from './flashcardsSlice';
import styles from './Flashcards.module.css';

export function Flashcards() {

    const flashcards = useSelector(selectFlashcards);
    const dispatch = useDispatch();
    const [flashcardsValue, setFlashcards] = useState({});

    let mockDeck = [
    {
        "key": "Wer bin ich?",
        "value": "Max"
    },
    {
        "key": "Was mache ich hier",
        "value": "Spaß haben"
    }
    ];

    return (
    <div>
        <textarea onChange={e => setFlashcards(JSON.parse(e.target.value))}></textarea>
        <span>{flashcards.length}</span>

        <button
            onClick={() =>  dispatch(update(flashcardsValue))}
        >
            Add Amount
        </button>
    </div>
    );
}