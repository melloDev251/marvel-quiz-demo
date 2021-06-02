import React, { useEffect, useState } from 'react';
import Stepper from 'react-stepper-horizontal';

const Levels = ({ levelNames, quizLevel }) => {

    const [levels, setLevels] = useState([]);

    useEffect(() => {

        const quizSteps = levelNames.map(level => ({ title: level.toUpperCase() }));
        setLevels(quizSteps)

    }, [levelNames]);

    return (
        <div className="levelsContainer" style={{ background: 'transparent' }}>

            <Stepper
                steps={levels}
                circleTop={0}
                activeTitleColor={'#d31017'}
                activeColor={'#d31017'}
                completeColor={'#363636'}
                barStyle={"solid"}
                size={45}
                circleFontSize={20}
                defaultBarColor={'#E0E0E0'}
                completeBarColor={'#363636'}
                activeStep={quizLevel} />

        </div>
    );
};

export default React.memo(Levels);