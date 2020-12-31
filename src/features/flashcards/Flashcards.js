import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  update,
  selectFlashcards,
} from './flashcardsSlice';
import styles from './Flashcards.module.css';
import ReactCardFlip from 'react-card-flip';

export function Flashcards() {

    const flashcards = useSelector(selectFlashcards);
    const dispatch = useDispatch();
    const [flashcardsValue, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState(false);
    const [index, setIndex] = useState(0);       

    return (
        <div>
            <header></header>
            <section className={styles.content}>
                {   flashcards.length === 0
                    ? <div>
                        <textarea className={styles.input} onChange={e => setFlashcards(JSON.parse(e.target.value))}></textarea>
                        <button
                            className={styles.addbtn}
                            onClick={() =>  dispatch(update(flashcardsValue))}
                        >
                            Add Flashcards
                        </button>
                    </div>
                    : <div>
                        <div className={styles.card} onClick={() => setFlipped(!flipped)}>
                            {/* https://www.w3schools.com/howto/howto_css_flip_card.asp */}
                            <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
                                <div>
                                    {flashcards[index].key}
                                </div>
                                <div>
                                    {flashcards[index].value}
                                </div>
                            </ReactCardFlip>
                        </div>
                        <button
                            className={styles.addbtn}
                            onClick={() => {
                                if (index > 0) {
                                    setIndex(index-1);
                                }
                            }}
                            >
                            Previous
                        </button>
                        <button
                            className={styles.addbtn}
                            onClick={() => {
                                if (index < flashcards.length - 1) {
                                    setIndex(index+1);
                                }
                            }}
                            >
                            Next
                        </button>
                        <button
                            className={styles.addbtn}
                            onClick={() => {
                                let temp = flashcards.slice();
                                temp.shift()
                                setFlipped(false);
                                dispatch(update(temp));
                            }}
                            >
                            Delete
                        </button>
                    </div>    
                }
            </section>
            <footer></footer>
        </div>
    );
}