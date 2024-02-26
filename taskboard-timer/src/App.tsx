import { useState } from "react";
import "./App.css";
import { Command } from "@tauri-apps/api/shell";

function App() {
    const [count, setCount] = useState(10);

    const incrementCount = async () => {
        try {
            const command = Command.sidecar("bin/api/rand_gen", [
                count.toString(),
            ]);
            const output = await command.execute();
            const data = JSON.parse(output.stdout);
            setCount(data.count);
        } catch (error) {
            console.error("Error incrementing count:", error);
        }
    };

    return (
        <div className="container">
            <h1>Increase the Count!</h1>
            <button onClick={incrementCount}>Increase!</button>
            <p>Count: {count}</p>
        </div>
    );
}

export default App;
