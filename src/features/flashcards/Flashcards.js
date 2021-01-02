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
    const [showFront, setShowFront] = useState(true);      

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
    const moveCard = (arr, i, steps) => {
        const insertAndShift = (array, from, to) => {
            let temp = array.slice();
            temp.splice(to, 0, temp.splice(from, 1)[0]);
            
            dispatch(update(temp));
        }

        if (i + steps > arr.length - 1) {
            let newIndex = i + steps - arr.length;
            insertAndShift(arr, i, newIndex);
        } else {
            insertAndShift(arr, i, i + steps);
        }
    };
    const toggleSideSwitch = () => {
            setShowFront(!showFront);
    };

    // key press events
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        switch (evt.key) {
            case "ArrowLeft":
                previousCard();
                break;
            case "ArrowRight":
                nextCard();
                break;
            case "Backspace":
                removeCard();
                break;
            case "a":
                // good button
                moveCard(flashcards, index, 5);
                break;
            case "s":
                // middle button
                moveCard(flashcards, index, 3);
                break;
            case "d":
                // bad button
                moveCard(flashcards, index, 1);
                break;
            case " ":
                toggleSideSwitch();
                break;
            default:
                break;
        }
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
                    <h1>ADD NEW DECK</h1>
                    <section className={styles.insertSection}>
                        <textarea
                            className={styles.insertArea}
                            onChange={
                                input => setFlashcards(JSON.parse(input.target.value))
                            }>    
                        </textarea>
                        <button className={styles.insertButton} onClick={insertDeck}>
                            Add Flashcards
                        </button>
                    </section>
                </div>
                :
                <div>
                    <h1>LEARN HARD. PLAY HARD.</h1>
                    <section className={styles.cardSection}>
                        <div className={styles.flipCard}>
                        <div className={styles.flipCardInner} style={{ transform: !showFront ? `rotateY(180deg)`: null }}>
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
                    <section className={styles.ratingSection}>
                        <button className={styles.goodButton} onClick={() => {
                            moveCard(flashcards, index, 5);
                        }}>
                            Good
                        </button>
                        <button className={styles.middleButton} onClick={() => {
                            moveCard(flashcards, index, 3);
                        }}>
                            Middle
                        </button>
                        <button className={styles.badButton} onClick={() => {
                            moveCard(flashcards, index, 1);
                        }}>
                            Bad
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