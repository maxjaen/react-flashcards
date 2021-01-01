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
            <header></header>
            <section className={styles.content}>
                {
                flashcards.length === 0
                ?
                <section>
                    <section className={styles.insertionsection}>
                        <textarea className={styles.input} onChange={e => setFlashcards(JSON.parse(e.target.value))}></textarea>
                        <button className={styles.insertbtn} onClick={insertDeck}>
                            Add Flashcards
                        </button>
                    </section>
                </section>
                :
                <section>
                    <section className={styles.cardsection}>
                        <div className={styles.flipcard}>
                        <div className={styles.flipcardinner}>
                            <div className={styles.flipcardfront}>
                                {flashcards[index].key}
                            </div>
                            <div className={styles.flipcardback}>
                                {flashcards[index].value}
                            </div>
                        </div>
                    </div>
                    </section>
                    <section className={styles.textsection}>
                        <span>{index + 1}/{flashcards.length}</span>
                    </section>
                    <section className={styles.buttonsection}>
                        <button className={styles.previousbtn} onClick={previousCard}>
                            Previous
                        </button>
                        <button className={styles.nextbtn} onClick={nextCard}>
                            Next
                        </button>
                        <button className={styles.removebtn} onClick={removeCard}>
                            Delete
                        </button>
                    </section>
                </section>    
                }
            </section>
            <footer></footer>
        </div>
    );
}