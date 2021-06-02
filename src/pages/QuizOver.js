import React, { Fragment, useEffect, useState } from 'react';


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

    // console.log(props, ref);

    const [asked, setAsked] = useState([])
    // console.log(asked);

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
                                <p className="successMsg">Bravo, vous êtes un expert !</p>
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
                        <button className="btnInfo">Infos</button>
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

        </Fragment>
    );
});

export default React.memo(QuizOver);