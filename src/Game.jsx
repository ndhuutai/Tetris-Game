import { useEffect, useRef, useState } from 'react';
import { createInitialGameState, tickGame } from './game/engine';
import { createInitialInputState, handleKeyDown, handleKeyUp } from './game/input';
import GameCanvas from './GameCanvas';
import GameHud from './GameHud';

function Game() {
    const [gameState, setGameState] = useState(() => createInitialGameState());
    const [inputState, setInputState] = useState(() => createInitialInputState());

    const gameStateRef = useRef(gameState);
    const inputStateRef = useRef(inputState);

    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);

    useEffect(() => {
        inputStateRef.current = inputState;
    }, [inputState]);

    // Run the falling-piece loop using the current frame rate.
    useEffect(() => {
        // Do not start a timer if the game is stopped.
        if (gameState.isStopped) {
            return;
        }
        // Create one interval using inputState.frameRate.

        // On each interval tick:
        // 1. compute the next game state with tickGame
        // 2. return that next state from a functional setGameState update
        const timerId = setInterval(() => {
            try {
                setGameState(currentGameState => tickGame(currentGameState));
            } catch (error) {
                console.error('[Game] tick loop failed', {
                    error,
                    gameState: gameStateRef.current,
                    inputState: inputStateRef.current,
                });
            }
        }, inputState.frameRate)
        // Clear the interval on cleanup.

        return () => {
            clearInterval(timerId);
        }
    }, [inputState.frameRate, gameState.isStopped]);

    // Register global keyboard listeners once the component is mounted.
    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.repeat && event.key === ' ') {
                return;
            }

            try {
                const {
                    gameState: newGameState,
                    inputState: newInputState,
                    shouldTick,
                } = handleKeyDown(event.key, gameStateRef.current, inputStateRef.current);

                gameStateRef.current = newGameState;
                inputStateRef.current = newInputState;

                setGameState(newGameState);
                setInputState(newInputState);

                if (shouldTick) {
                    const tickedGameState = tickGame(newGameState);
                    gameStateRef.current = tickedGameState;
                    setGameState(tickedGameState);
                }
            } catch (error) {
                console.error('[Game] keydown handler failed', {
                    error,
                    key: event.key,
                    gameState: gameStateRef.current,
                    inputState: inputStateRef.current,
                });
            }
        };

        const onKeyUp = (event) => {
            try {
                const {
                    gameState: newGameState,
                    inputState: newInputState,
                    shouldTick,
                } = handleKeyUp(event.key, gameStateRef.current, inputStateRef.current);

                gameStateRef.current = newGameState;
                inputStateRef.current = newInputState;

                setGameState(newGameState);
                setInputState(newInputState);

                if (shouldTick) {
                    const tickedGameState = tickGame(newGameState);
                    gameStateRef.current = tickedGameState;
                    setGameState(tickedGameState);
                }
            } catch (error) {
                console.error('[Game] keyup handler failed', {
                    error,
                    key: event.key,
                    gameState: gameStateRef.current,
                    inputState: inputStateRef.current,
                });
            }
        };

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, []);

    const handleRestart = () => {
        // Reset both game state and input state back to their initial values.
        const nextGameState = createInitialGameState();
        const nextInputState = createInitialInputState();

        gameStateRef.current = nextGameState;
        inputStateRef.current = nextInputState;
        setGameState(nextGameState);
        setInputState(nextInputState);

    };

    return (
        <section>
            {/* Render score, game-over state, and restart controls. */}
            <GameHud
                score={gameState.score}
                isStopped={gameState.isStopped}
                onRestart={handleRestart}
            />

            {/* Render the canvas view using the current game snapshot. */}
            <GameCanvas gameState={gameState} />
        </section>
    );
}

export default Game;
