import React, { useState, useRef, useEffect } from "react";

export default function Automata() {
  const canvasRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [activeStates, setActiveStates] = useState(["q0"]);

  const states = {
    q0: { x: 30, y: 250, label: "q0" },
    q1: { x: 150, y: 150, label: "q1" },
    q2: { x: 150, y: 250, label: "q2" },
    q3: { x: 150, y: 350, label: "q3" },
    q4: { x: 300, y: 250, label: "q4" },
    q5: { x: 430, y: 250, label: "q5" },
    q6: { x: 560, y: 250, label: "q6" },
    q7: { x: 690, y: 250, label: "q7" },
    q8: { x: 820, y: 250, label: "q8" },
    q9: { x: 960, y: 250, label: "q9" },
    q10: { x: 1100, y: 250, label: "q10" },
    q11: { x: 1250, y: 250, label: "q11" },
    q12: { x: 490, y: 420, label: "q12" },
    q13: { x: 630, y: 420, label: "q13" },
    q14: { x: 770, y: 420, label: "q14" },
  };

  const transitions = [
    { from: "q0", to: "q1", label: "p", info: "p" },
    { from: "q0", to: "q2", label: "q", info: "q" },
    { from: "q0", to: "q3", label: "r", info: "r" },
    {
      from: "q1",
      to: "q4",
      label: "[h-z]",
      info: [
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "w",
        "x",
        "y",
        "z",
      ],
    },
    {
      from: "q2",
      to: "q4",
      label: "[a-z]",
      info: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "w",
        "x",
        "y",
        "z",
      ],
    },
    {
      from: "q3",
      to: "q4",
      label: "[a-p]",
      info: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
      ],
    },
    { from: "q4", to: "q5", label: "-", info: "-" },
    { from: "q5", to: "q6", label: "0", info: "0" },
    { from: "q6", to: "q7", label: "0", info: "0" },
    { from: "q7", to: "q8", label: "0", info: "0" },
    {
      from: "q8",
      to: "q9",
      label: "1-9",
      info: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
    { from: "q9", to: "q10", label: "-", info: "-" },
    {
      from: "q10",
      to: "q11",
      label: "a-z",
      info: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "w",
        "x",
        "y",
        "z",
      ],
    },
    {
      from: "q5",
      to: "q12",
      label: "1-9",
      info: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
    {
      from: "q6",
      to: "q13",
      label: "1-9",
      info: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
    {
      from: "q7",
      to: "q14",
      label: "1-9",
      info: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
    {
      from: "q12",
      to: "q13",
      label: "0-9",
      info: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
    {
      from: "q13",
      to: "q14",
      label: "0-9",
      info: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
    {
      from: "q14",
      to: "q9",
      label: "0-9",
      info: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const state of Object.values(states)) {
      const isActive = activeStates.includes(state.label);
      drawState(ctx, state.x, state.y, state.label, isActive);
    }

    for (const transition of transitions) {
      const fromState = states[transition.from];
      const toState = states[transition.to];
      drawTransition(
        ctx,
        fromState.x,
        fromState.y,
        toState.x,
        toState.y,
        transition.label
      );
    }
  }, [activeStates]);

  useEffect(() => {
    validarInput(inputValue); // Llama a validarInput cuando cambia el inputValue
  }, [inputValue]);

  function drawState(context, x, y, label, isActive) {
    context.beginPath();
    context.arc(x, y, 30, 0, 2 * Math.PI);
    context.fillStyle = isActive ? "green" : "white"; // Cambia el color a verde si isActive es verdadero
    context.fill();
    context.strokeStyle = "black";
    context.stroke();

    context.font = "bold 18px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(label, x, y + 10);
  }

  function drawTransition(context, fromX, fromY, toX, toY, label) {
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();

    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;

    context.font = "20px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(label, midX, midY);
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setValidationMessage("");
  };

  const validarInput = (value) => {
    let allInputsValid = true;
    let currentState = "q0"; // Estado inicial

    for (let i = 0; i < value.length; i++) {
      const currentCharacter = value[i];
      let transition = null;

      if (currentCharacter === "-") {
        // Manejar caso especial para "-"
        transition = transitions.find(
          (t) => t.from === currentState && t.label === "-"
        );
      } else {
        // Verificar si el carácter está en el rango adecuado
        transition = transitions.find(
          (t) =>
            t.from === currentState &&
            (Array.isArray(t.info)
              ? t.info.includes(currentCharacter)
              : t.label === currentCharacter)
        );
      }

      console.log(`Current State: ${currentState}`);
      console.log(`Input Character: ${currentCharacter}`);

      if (transition) {
        console.log(`Transition: ${transition.from} -> ${transition.to}`);
        currentState = transition.to;
        setActiveStates((prevStates) => [...prevStates, currentState]);
      } else {
        console.log(`No Transition Found`);
        allInputsValid = false;
        break;
      }
    }

    console.log(`All Inputs Valid: ${allInputsValid}`);
    setIsValid(allInputsValid);
  };
  const handleClear = () => {
    setInputValue(""); // Reiniciar el valor del input
    setValidationMessage(""); // Reiniciar el mensaje de validación
    setIsValid(false); // Establecer el estado de validez en falso
    setActiveStates(["q0"]); // Reiniciar los estados activos
  };

  return (
    <div className="text-center relative mt-10">
      <canvas
        ref={canvasRef}
        width={1300}
        height={450}
        className="mx-auto"
      ></canvas>
      <div>
        <label className="text-xl block my-5">Introduce tu cadena:</label>
        <div className="flex items-center justify-center my-5">
          <input
            type="text"
            size={10}
            placeholder="ph-9999-z"
            value={inputValue}
            onChange={handleInputChange}
            maxLength={9}
            className="mx-8 p-2 border border-gray-300 rounded-md text-center"
          />
          <button
            onClick={handleClear}
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Limpiar Todo
          </button>
        </div>
      </div>
    </div>
  );
}
