import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Levels from "../components/Levels";
import ProgressBar from "../components/ProgressBar";
import { QuizMarvel } from "../components/QuizMarvel";
import QuizOver from "./QuizOver";
import { FaChevronCircleRight } from "react-icons/fa";

// config alert toastify
toast.configure();

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      levelNames: ["debutant", "confirme", "expert"],
      quizLevel: 0,
      maxQuestions: 10,
      storedQuestion: [],
      question: null,
      options: [],
      idIncrementQuestion: 0,
      btnDisabled: true,
      userAnswer: null,
      score: 0,
      showWelcomeMsg: false,
      quizEnd: false,
    };

    this.state = this.initialState;
    this.storedDataRef = React.createRef();
  }

  loadQuestions = (level) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level];
    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz;

      const newArray = fetchedArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );

      // pour mettre à jour un state dans un component class
      this.setState({
        storedQuestion: newArray,
      });
    } else {
      console.log("Pas assez de question !!");
    }
  };

  // méthode de cycle de vie
  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.storedQuestion !== prevState.storedQuestion &&
      this.state.storedQuestion.length
    ) {
      this.setState({
        question:
          this.state.storedQuestion[this.state.idIncrementQuestion].question,
        options:
          this.state.storedQuestion[this.state.idIncrementQuestion].options,
      });
    }

    if (
      this.state.idIncrementQuestion !== prevState.idIncrementQuestion &&
      this.state.storedQuestion.length
    ) {
      this.setState({
        question:
          this.state.storedQuestion[this.state.idIncrementQuestion].question,
        options:
          this.state.storedQuestion[this.state.idIncrementQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showWelcomeMsg(this.props.userData.pseudo);
    }

    // vérification et mise à jour du score
    if (this.state.quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercentage(
        this.state.maxQuestions,
        this.state.score
      );
      this.gameEnd(gradePercent);
    }
  }

  showWelcomeMsg = (pseudo) => {
    if (this.state.showWelcomeMsg === false) {
      this.setState({
        showWelcomeMsg: true,
      });

      toast(`Welcome ${pseudo} et bonne chance! 😁`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }
  };

  submitAnswer = (selectedAnswer) => {
    // console.log(selectedAnswer);
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };

  nextQuestion = () => {
    if (this.state.idIncrementQuestion === this.state.maxQuestions - 1) {
      // this.gameEnd();
      this.setState({
        quizEnd: true,
      });
      // console.log("Game Over");
    } else {
      this.setState((prevState) => ({
        idIncrementQuestion: prevState.idIncrementQuestion + 1,
      }));
    }

    // +1 dans le score
    const goodAnswer =
      this.storedDataRef.current[this.state.idIncrementQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));

      toast.success("Bravo +1", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Raté 0", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  gameEnd = (gradePercent) => {
    if (gradePercent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: gradePercent,
        // quizEnd: true
      });
    } else {
      this.setState({
        percent: gradePercent,
        // quizEnd: true
      });
    }
  };

  loadLevelQuestion = (param) => {
    this.setState({ ...this.initialState, quizLevel: param });

    this.loadQuestions(this.state.levelNames[param]);
  };

  render() {
    // const { pseudo } = this.props.userData;
    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p
          key={index}
          className={`answerOptions ${
            this.state.userAnswer === option ? "selected" : null
          }`}
          onClick={() => this.submitAnswer(option)}
        >
          <FaChevronCircleRight /> {option}
        </p>
      );
    });

    return this.state.quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={this.state.levelNames}
        quizLevel={this.state.quizLevel}
        maxQuestions={this.state.maxQuestions}
        score={this.state.score}
        percent={this.state.percent}
        loadLevelQuestion={this.loadLevelQuestion}
      />
    ) : (
      <Fragment>
        {/* <h2> Pseudo: {pseudo} </h2> */}
        <Levels
          levelNames={this.state.levelNames}
          quizLevel={this.state.quizLevel}
        />

        <ProgressBar
          idIncrementQuestion={this.state.idIncrementQuestion}
          maxQuestions={this.state.maxQuestions}
        />

        <h2> {this.state.question} </h2>

        {displayOptions}

        <button
          onClick={this.nextQuestion}
          disabled={this.state.btnDisabled}
          className="btnSubmit"
        >
          {this.state.idIncrementQuestion < this.state.maxQuestions - 1
            ? "Suivant"
            : "Terminer"}
        </button>
      </Fragment>
    );
  }
}

export default Quiz;
