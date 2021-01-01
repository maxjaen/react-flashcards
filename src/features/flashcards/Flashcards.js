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
    const [flashcardsValue, setFlashcards] = useState([]);
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
                        <div className={styles.card}>
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