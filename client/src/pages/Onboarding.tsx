import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bike, Footprints, MapPin, Clock, ArrowRight, ArrowLeft, Check, Sun, CloudRain, Calendar as CalendarIcon, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [_, setLocation] = useLocation();

  // Mock Form State
  const [formData, setFormData] = useState({
    activity: "run",
    location: "",
    date: new Date(),
    time: "now",
    duration: "1-2 hours",
    workoutType: "easy",
    sensitivity: 50, // 0 = runs cold, 100 = runs hot
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);
  const submit = () => setLocation("/recommendation");

  const updateData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-4 px-4">
      <Card className="w-full max-w-xl border-none shadow-2xl bg-white/80 backdrop-blur-md overflow-hidden">
        <div className="bg-primary/5 p-2 h-2">
          <motion.div 
            className="h-full bg-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        
        <CardContent className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: ACTIVITY */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl font-heading font-bold text-primary">What's the plan?</h2>
                  <p className="text-sm text-muted-foreground">Select your activity type to calibrate wind chill and exertion levels.</p>
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
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl font-heading font-bold text-primary">Where & When?</h2>
                  <p className="text-sm text-muted-foreground">We need this to hyper-personalize your recommendations.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="location" className="text-sm">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="location"
                        placeholder="e.g. Central Park, NY" 
                        className="pl-9 h-9 text-sm"
                        value={formData.location}
                        onChange={(e) => updateData("location", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-9 pl-3 text-left font-normal text-sm",
                              !formData.date && "text-muted-foreground"
                            )}
                          >
                            {formData.date ? (
                              format(formData.date, "MMM d")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.date}
                            onSelect={(date) => date && updateData("date", date)}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                              date > addDays(new Date(), 14)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm">Workout Type</Label>
                      <Select 
                        value={formData.workoutType} 
                        onValueChange={(val) => updateData("workoutType", val)}
                      >
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy Run</SelectItem>
                          <SelectItem value="workout">Workout</SelectItem>
                          <SelectItem value="race" disabled className="flex items-center justify-between w-full opacity-50 cursor-not-allowed">
                            <span>Race</span>
                            <Lock className="h-3 w-3 ml-2" />
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Time Slider */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">Time</Label>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {formData.time === "now" ? "Now" : 
                         formData.time === "12pm-4pm" ? "12-4pm" :
                         formData.time === "4pm-8pm" ? "4-8pm" :
                         "> 8pm"}
                      </span>
                    </div>
                    
                    <div className="pt-1">
                      <Slider
                        defaultValue={[0]}
                        max={3}
                        step={1}
                        value={[
                          formData.time === "now" ? 0 : 
                          formData.time === "12pm-4pm" ? 1 :
                          formData.time === "4pm-8pm" ? 2 : 3
                        ]}
                        onValueChange={(val) => {
                          const v = val[0];
                          if (v === 0) updateData("time", "now");
                          else if (v === 1) updateData("time", "12pm-4pm");
                          else if (v === 2) updateData("time", "4pm-8pm");
                          else if (v === 3) updateData("time", "after_8pm");
                        }}
                        className="cursor-pointer"
                      />
                      <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-medium px-1">
                        <span>Now</span>
                        <span>12-4pm</span>
                        <span>4-8pm</span>
                        <span>&gt; 8pm</span>
                      </div>
                    </div>
                  </div>

                  {/* Duration Slider */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">Duration</Label>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {formData.duration}
                      </span>
                    </div>
                    
                    <div className="pt-1">
                      <Slider
                        defaultValue={[1]}
                        max={3}
                        step={1}
                        value={[
                          formData.duration === "< 1 hour" ? 0 : 
                          formData.duration === "1-2 hours" ? 1 :
                          formData.duration === "2-4 hours" ? 2 : 3
                        ]}
                        onValueChange={(val) => {
                          const v = val[0];
                          if (v === 0) updateData("duration", "< 1 hour");
                          else if (v === 1) updateData("duration", "1-2 hours");
                          else if (v === 2) updateData("duration", "2-4 hours");
                          else if (v === 3) updateData("duration", "> 4 hours");
                        }}
                        className="cursor-pointer"
                      />
                      <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-medium px-1">
                        <span>&lt; 1h</span>
                        <span>1-2h</span>
                        <span>2-4h</span>
                        <span>&gt; 4h</span>
                      </div>
                    </div>
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
