import React, { Fragment, useEffect, useState } from 'react';
import { GiTrophyCup } from 'react-icons/gi'
import Modal from '../components/Modal';
import axios from 'axios';


const QuizOver = React.forwardRef((props, ref) => {

    // concept du destructuring
    const {
        levelNames,
        quizLevel,
        maxQuestions,
        score,
        percent,
        loadLevelQuestion
    } = props;

    const API_MARVEL = process.env.REACT_APP_MARVEL_API_KEY;
    console.log(API_MARVEL);

    const hash = '9092f81cef7ae9942b916c13c4d6b2ef';


    const [openModal, setOpenModal] = useState(false);

    const [asked, setAsked] = useState([]);
    // console.log(asked);

    const showModal = (id) => {
        setOpenModal(true);

        axios
            .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_MARVEL}&hash=${hash}`)
            .then((response) => {
                console.log(response);
            })
            .catch(() => {

            })
    }

    const hideModal = () => {
        setOpenModal(false);
    }

    useEffect(() => {
        setAsked(ref.current)
    }, [ref])

    const averageGrade = maxQuestions / 2;

    // le quiz redemarrera au niveau 0(debutant) à partir de 10seconde
    if (score < averageGrade) {
        setTimeout(() => {
            loadLevelQuestion(quizLevel)
        }, 10000);
    }

    const decision = score >= averageGrade ? (
        <Fragment>
            <div className="stepsBtnContainer">
                {
                    quizLevel < levelNames.length ? (
                        <Fragment>
                            <p className="successMsg">Bravo, passez au niveau suivant !</p>
                            <button
                                onClick={() => loadLevelQuestion(quizLevel)}
                                className="btnResult success">
                                Niveau Suivant
                            </button>
                        </Fragment>
                    )
                        :
                        (
                            <Fragment>
                                <p className="successMsg"> <GiTrophyCup size='50px' /> Bravo, vous êtes un expert !</p>
                                <button
                                    onClick={() => loadLevelQuestion(0)}
                                    className="btnResult gameOver">
                                    Accueil
                                </button>
                            </Fragment>

                        )
                }
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussite: {percent}% </div>
                <div className="progressPercent">Note: {score}/{maxQuestions}</div>
            </div >
        </Fragment>

    )
        :
        (
            <Fragment>
                <div className="stepsBtnContainer">
                    <p className="failureMsg">Vous avez échoué !</p>
                    <button
                        onClick={() => loadLevelQuestion(quizLevel)}
                        className="btnResult gameOver">
                        Redémarrer le niveau
                    </button>
                </div >
                <div className="percentage">
                    <div className="progressPercent">Réussite: {percent}% </div>
                    <div className="progressPercent">Note: {score}/{maxQuestions}</div>
                </div >
            </Fragment>
        )

    const questionAnswer = score >= averageGrade ? (
        asked.map((item) => {
            return (
                <tr key={item.id}>
                    <td> {item.question} </td>
                    <td> {item.answer} </td>
                    <td>
                        <button
                            onClick={() => showModal(item.heroId)}
                            className="btnInfo">
                            Infos
                        </button>
                    </td>
                </tr>
            )
        })

    )
        :
        (
            <tr>
                <td colSpan="3">
                    <div className="loader"></div>
                    <p style={{ textAlign: 'center', color: 'red' }}>Rien à afficher. T'es vraiment null connard !</p>
                </td>
            </tr>

        )



    return (
        <Fragment>

            {decision}

            <br />
            <hr />
            <p>Les réponses aux questions posées :</p>

            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr key="">
                            <th>Questions</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>

            <Modal showModal={openModal} hideModal={hideModal}>

            </Modal>

        </Fragment>
    );
});

export default React.memo(QuizOver);