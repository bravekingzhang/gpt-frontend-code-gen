import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Calculator = () => {
    const [result, setResult] = React.useState("");

    const handleClick = (e) => {
        setResult(result.concat(e.target.name));
    }

    const clear = () => {
        setResult("");
    }

    const calculate = () => {
        try {
            setResult(eval(result).toString());
        } catch(err) {
            setResult("Error")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
            <h1 className="text-3xl font-bold">Calculator</h1>
            <div className="flex space-x-4">
                <Input placeholder="0" value={result} />
            </div>
            <div className="flex space-x-4">
                <Button name="1" onClick={handleClick}>1</Button>
                <Button name="2" onClick={handleClick}>2</Button>
                <Button name="3" onClick={handleClick}>3</Button>
                <Button name="+" onClick={handleClick}>+</Button>
            </div>
            <div className="flex space-x-4">
                <Button name="4" onClick={handleClick}>4</Button>
                <Button name="5" onClick={handleClick}>5</Button>
                <Button name="6" onClick={handleClick}>6</Button>
                <Button name="-" onClick={handleClick}>-</Button>
            </div>
            <div className="flex space-x-4">
                <Button name="7" onClick={handleClick}>7</Button>
                <Button name="8" onClick={handleClick}>8</Button>
                <Button name="9" onClick={handleClick}>9</Button>
                <Button name="*" onClick={handleClick}>*</Button>
            </div>
            <div className="flex space-x-4">
                <Button name="0" onClick={handleClick}>0</Button>
                <Button name="." onClick={handleClick}>.</Button>
                <Button name="/" onClick={handleClick}>/</Button>
                <Button onClick={calculate}>=</Button>
            </div>
            <div className="flex space-x-4">
                <Button onClick={clear}>Clear</Button>
            </div>
        </div>
    )
}

export default Calculator;