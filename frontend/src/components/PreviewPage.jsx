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
        <div className="flex flex-col items-center justify-center h-full space-y-4 bg-gray-100 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800">Calculator</h1>
            <div className="w-full flex justify-center bg-white p-4 rounded-lg shadow-md">
                <Input className="text-2xl text-gray-800" placeholder="0" value={result} />
            </div>
            <div className="flex space-x-4">
                <Button name="1" onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">1</Button>
                <Button name="2" onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">2</Button>
                <Button name="3" onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">3</Button>
                <Button name="+" onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">+</Button>
            </div>
            <div className="flex space-x-4">
                <Button name="4" onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">4</Button>
                <Button name="5" onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">5</Button>
                <Button name="6" onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">6</Button>
                <Button name="-" onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">-</Button>
            </div>
            <div className="flex space-x-4">
                <Button name="7" onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">7</Button>
                <Button name="8" onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">8</Button>
                <Button name="9" onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">9</Button>
                <Button name="*" onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">*</Button>
            </div>
            <div className="flex space-x-4">
                <Button name="0" onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">0</Button>
                <Button name="." onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">.</Button>
                <Button name="/" onClick={handleClick} className="bg-indigo-500 hover:bg-indigo-600 text-white">/</Button>
                <Button onClick={calculate} className="bg-green-500 hover:bg-green-600 text-white">=</Button>
            </div>
            <div className="w-full flex">
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white" onClick={clear}>Clear</Button>
            </div>
        </div>
    )
}

export default Calculator;