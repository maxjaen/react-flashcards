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

    const insertDeck = () =>  {
        dispatch(update(flashcardsValue));
    }; 
    const nextCard = () => {
        if (index < flashcards.length - 1) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    }
    const previousCard = () => {
        if (index > 0) {
            setIndex(index - 1);
        } else {
            setIndex(flashcards.length - 1);
        }
    }
    const removeCard = () => {
        let temp = flashcards.slice();
        delete temp[index];
        temp = temp.filter(e => e !== undefined);

         if (index > 0) {
            setIndex(index - 1);
        }
        dispatch(update(temp));
    };

    return (
        <div>
            <header>
                {/* Maybe needed later */}
            </header>
            <section className={styles.content}>
                {
                flashcards.length === 0
                ?
                <div>
                    <section className={styles.insertSection}>
                        <textarea
                            className={styles.insertArea}
                            onChange={
                                e => setFlashcards(JSON.parse(e.target.value))
                            }>    
                        </textarea>
                        <button className={styles.insertButton} onClick={insertDeck}>
                            Add Flashcards
                        </button>
                    </section>
                </div>
                :
                <div>
                    <section className={styles.cardSection}>
                        <div className={styles.flipCard}>
                        <div className={styles.flipCardInner}>
                            <div className={styles.flipCardFront}>
                                {flashcards[index].key}
                            </div>
                            <div className={styles.flipCardBack}>
                                {flashcards[index].value}
                            </div>
                        </div>
                    </div>
                    </section>
                    <section className={styles.textSection}>
                        <span>{index + 1}/{flashcards.length}</span>
                    </section>
                    <section className={styles.buttonSection}>
                        <button className={styles.previousButton} onClick={previousCard}>
                            Previous
                        </button>
                        <button className={styles.nextButton} onClick={nextCard}>
                            Next
                        </button>
                        <button className={styles.removeButton} onClick={removeCard}>
                            Delete
                        </button>
                    </section>
                </div>    
                }
            </section>
            <footer>
                {/* Maybe needed later */}
            </footer>
        </div>
    );
}