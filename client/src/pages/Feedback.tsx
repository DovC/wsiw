import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ThumbsUp, ThumbsDown, Smile, Frown, Meh } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const zones = ["Head & Hands", "Torso", "Legs", "Feet"];
  const options = [
    { value: "cold", label: "Too Cold", icon: <Frown className="h-5 w-5" /> },
    { value: "perfect", label: "Perfect", icon: <Smile className="h-5 w-5" /> },
    { value: "hot", label: "Too Hot", icon: <Meh className="h-5 w-5" /> }, // Meh face for hot/sweaty
  ];

  const handleRate = (zone: string, value: string) => {
    setFeedback(prev => ({ ...prev, [zone]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-100 p-6 rounded-full text-green-600 mb-6"
        >
          <ThumbsUp className="h-12 w-12" />
        </motion.div>
        <h2 className="text-3xl font-heading font-bold mb-4">Feedback Saved!</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Thanks for helping us get smarter. Your next recommendation will be even more accurate.
        </p>
        <Link href="/">
          <Button size="lg">Back Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-heading font-bold mb-2">How was the run?</h1>
        <p className="text-muted-foreground">Rate your comfort to tune your algorithm.</p>
      </div>

      <div className="space-y-6">
        {zones.map((zone, idx) => (
          <motion.div
            key={zone}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="bg-secondary/30 py-4 px-6 border-b border-border/50">
                <CardTitle className="text-base font-bold">{zone}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleRate(zone, opt.value)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:bg-secondary/50",
                        feedback[zone] === opt.value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-transparent bg-secondary/20 text-muted-foreground"
                      )}
                    >
                      {opt.icon}
                      <span className="text-xs font-bold">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <div className="pt-8">
          <Button 
            className="w-full h-14 text-lg" 
            size="lg"
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(feedback).length < zones.length}
          >
            Submit Feedback
            <Check className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
