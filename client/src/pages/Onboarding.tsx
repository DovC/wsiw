import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Bike, Footprints, MapPin, Clock, ArrowRight, ArrowLeft, Check, Sun, CloudRain } from "lucide-react";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [_, setLocation] = useLocation();

  // Mock Form State
  const [formData, setFormData] = useState({
    activity: "run",
    location: "",
    time: "now",
    sensitivity: 50, // 0 = runs cold, 100 = runs hot
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);
  const submit = () => setLocation("/recommendation");

  const updateData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-xl border-none shadow-2xl bg-white/80 backdrop-blur-md overflow-hidden">
        <div className="bg-primary/5 p-2 h-2">
          <motion.div 
            className="h-full bg-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        
        <CardContent className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: ACTIVITY */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-heading font-bold text-primary">What's the plan?</h2>
                  <p className="text-muted-foreground">Select your activity type to calibrate wind chill and exertion levels.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => updateData("activity", "run")}
                    className={`relative p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                      formData.activity === "run" 
                        ? "border-primary bg-primary/5 ring-1 ring-primary" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className={`p-4 rounded-full ${formData.activity === "run" ? "bg-primary text-white" : "bg-secondary text-primary"}`}>
                        <Footprints className="h-8 w-8" />
                      </div>
                      <span className="font-heading font-bold text-lg">Running</span>
                    </div>
                    {formData.activity === "run" && (
                      <div className="absolute top-4 right-4 text-primary">
                        <Check className="h-5 w-5" />
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => updateData("activity", "cycle")}
                    className={`relative p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                      formData.activity === "cycle" 
                        ? "border-primary bg-primary/5 ring-1 ring-primary" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className={`p-4 rounded-full ${formData.activity === "cycle" ? "bg-primary text-white" : "bg-secondary text-primary"}`}>
                        <Bike className="h-8 w-8" />
                      </div>
                      <span className="font-heading font-bold text-lg">Cycling</span>
                    </div>
                    {formData.activity === "cycle" && (
                      <div className="absolute top-4 right-4 text-primary">
                        <Check className="h-5 w-5" />
                      </div>
                    )}
                  </button>
                </div>

                <Button onClick={nextStep} className="w-full h-12 text-lg group">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}

            {/* STEP 2: CONTEXT */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-heading font-bold text-primary">Where & When?</h2>
                  <p className="text-muted-foreground">We need this to fetch the hyper-local forecast.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="location"
                        placeholder="e.g. Central Park, NY" 
                        className="pl-10 h-12 text-lg"
                        value={formData.location}
                        onChange={(e) => updateData("location", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base">Time</Label>
                    <RadioGroup 
                      defaultValue="now" 
                      value={formData.time}
                      onValueChange={(val) => updateData("time", val)}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="now" id="now" className="peer sr-only" />
                        <Label
                          htmlFor="now"
                          className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-accent/5 hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                        >
                          <Clock className="mb-2 h-6 w-6" />
                          Now
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="morning" id="morning" className="peer sr-only" />
                        <Label
                          htmlFor="morning"
                          className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-accent/5 hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                        >
                          <Sun className="mb-2 h-6 w-6" />
                          Morning
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="evening" id="evening" className="peer sr-only" />
                        <Label
                          htmlFor="evening"
                          className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-accent/5 hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                        >
                          <CloudRain className="mb-2 h-6 w-6" />
                          Evening
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={prevStep} className="h-12 w-12 p-0 shrink-0">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Button onClick={nextStep} className="flex-1 h-12 text-lg group">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: PREFERENCES */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-heading font-bold text-primary">Comfort Profile</h2>
                  <p className="text-muted-foreground">Do you typically run hot or cold compared to others?</p>
                </div>

                <div className="py-8 px-2 space-y-6">
                  <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>I run Cold ❄️</span>
                    <span>Neutral</span>
                    <span>I run Hot 🔥</span>
                  </div>
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    value={[formData.sensitivity]}
                    onValueChange={(val) => updateData("sensitivity", val[0])}
                    className="cursor-pointer"
                  />
                  <p className="text-center text-sm text-primary font-medium bg-primary/5 py-2 rounded-lg">
                    {formData.sensitivity < 40 ? "We'll suggest slightly warmer layers." : 
                     formData.sensitivity > 60 ? "We'll suggest lighter, breathable gear." : 
                     "Standard balanced recommendations."}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={prevStep} className="h-12 w-12 p-0 shrink-0">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Button onClick={submit} className="flex-1 h-12 text-lg shadow-lg shadow-primary/20 bg-accent hover:bg-accent/90 text-white border-none">
                    Generate Outfit
                  </Button>
                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
