import React, { Fragment } from 'react';

const ProgressBar = ({ idIncrementQuestion, maxQuestions }) => {

    // pour accéder au style width
    const getPercent = (totalQuestions, questionId) => {
        return (100 / totalQuestions) * questionId;
    }

    const actualQuestion = idIncrementQuestion + 1;
    const progressPercent = getPercent(maxQuestions, actualQuestion);
    console.log(progressPercent);

    return (

        <Fragment>
            <div className="percentage">
                <div className="progressPercent">
                    {`Question: ${idIncrementQuestion + 1}/${maxQuestions}`}
                </div>

                <div className="progressPercent">
                    {`Progression: ${progressPercent}%`}
                </div>
            </div>

            <div className="progressBar">
                <div className="progressBarChange" style={{ width: `${progressPercent}%` }}>

                </div>
            </div>
        </Fragment >
    );
};

export default React.memo(ProgressBar);  // vérifier la valeur passer en paramètre et de ne pas recharger les composant inutilement