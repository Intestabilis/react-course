import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  // we can call hooks only on top-level of the function
  // we should update state ONLY using setter functions
  // my guess it that if we update in manually, React won't rerender the UI and variable will change, but we won't see any changes in UI
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  // object/array for state
  // const [test, setTest] = useState({ name: "Jonas" });

  function handlePrevious() {
    // we should NOt update state based on a current state
    // if (step > 1) setStep(step - 1);
    // Instead use a callback function
    if (step > 1) setStep((curStep) => curStep - 1);
  }

  function handleNext() {
    if (step < 3) {
      // setStep(step + 1);
      // Use callback instead, so that will work properly
      setStep((curStep) => curStep + 1);
      // setStep((curStep) => curStep + 1);
    }
    // DON'T DO THIS
    // if (step < 3) step = step + 1;

    // BAD PRACTICE WITH OBJECTS - won't work in some situations
    // test.name = "Max";
    // Do this
    // setTest({ name: "Max" });
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((isOpen) => !isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
            {/* {test.name} */}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              // a function value, NOT a function call
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
