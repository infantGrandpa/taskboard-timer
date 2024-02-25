import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    const incrementCount = async () => {
        try {
            const response = await invoke("increment_count", {
                currentCount: count,
            });
            const data = JSON.parse(response as string);
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
