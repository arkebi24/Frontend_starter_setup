import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateSum } from "@/services/calculate";

export function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    setResult(0);
    const sum = calculateSum(input);
    setResult(sum);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          String Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Enter numbers (comma, newline, or custom delimiter separated)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mb-4"
          rows={5}
        />
        <Button onClick={handleCalculate} className="w-full mb-4">
          Calculate
        </Button>
        {result !== null && (
          <div className="text-center">
            <span className="font-semibold">Result: </span>
            <span className="text-lg">{result}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
