import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

export default function Test() {
  // const [count, setCount] = useState(0);
  // return (
  //   <div>
  //     <h1>Slow counter?!?</h1>
  //     <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
  //     <SlowComponent />
  //   </div>
  // );

  // SlowComponent passed as a children prop and technically not a child component of Test, so SlowComponent was created before and passed in as a prop. So SlowComponent doesn't
  // affected by state update in Counter and doesn't re-render. Passing component as a defined prop would work exactly the same

  // That's the reason why ContextProvider doesn't rerender everything, since it has other components as a children prop
  return (
    <div>
      <Counter>
        <SlowComponent></SlowComponent>
      </Counter>
    </div>
  );
}
