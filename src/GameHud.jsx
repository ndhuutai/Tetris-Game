function GameHud({ score, isStopped, onRestart }) {
    return (
        <header className="game-hud">
            <div className="game-copy">
                <p className="eyebrow">React Rewrite</p>
                <h1>Tetris</h1>
                <p className="status">
                    {isStopped ? 'Game over. Start a new run.' : 'Use arrows to move and rotate. Press space to hard drop.'}
                </p>
            </div>

            <div className="game-meta">
                <div className="score-card">
                    <span className="score-label">Score</span>
                    <strong className="score-value">{score}</strong>
                </div>

                <button className="restart-button" type="button" onClick={onRestart}>
                    Restart
                </button>
            </div>
        </header>
    );
}

export default GameHud;
