import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateSum } from "@/services/calculate";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    try {
      const sum = calculateSum(input);
      setResult(sum);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setResult(null);
    }
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
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
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
