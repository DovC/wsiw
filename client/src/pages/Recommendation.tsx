import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { 
  Wind, Droplets, Thermometer, Cloud, 
  Shirt, User, Info, ArrowRight, Share2, Plus, X, Check, Save 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { INITIAL_RECOMMENDATION, GEAR_CLOSET, GearItem } from "@/lib/data";

export default function Recommendation() {
  const [_, setLocation] = useLocation();
  const [selectedItems, setSelectedItems] = useState<GearItem[]>([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();
  
  // Initialize with recommendation
  useEffect(() => {
    setSelectedItems(INITIAL_RECOMMENDATION.map(r => ({ ...r, reason: undefined })));
  }, []);

  const weather = {
    temp: 46,
    feelsLike: 39,
    condition: "Overcast",
    wind: 11,
    humidity: 65,
    precip: "10%",
  };

  const handleToggleItem = (item: GearItem) => {
    if (selectedItems.find(i => i.id === item.id)) {
      setSelectedItems(prev => prev.filter(i => i.id !== item.id));
    } else {
      setSelectedItems(prev => [...prev, item]);
    }
  };

  const handleSave = () => {
    // Construct the workout object
    const newWorkout = {
      id: `w-${Date.now()}`,
      date: "Today, 2:00 PM",
      location: "Central Park, NY",
      duration: "1h 30m",
      temp: `${weather.temp}°F`,
      condition: weather.condition,
      status: "pending_feedback",
      items: selectedItems
    };

    // Save to localStorage
    const saved = localStorage.getItem("savedWorkouts");
    const workouts = saved ? JSON.parse(saved) : [];
    localStorage.setItem("savedWorkouts", JSON.stringify([newWorkout, ...workouts]));

    // Show dialog
    setShowSuccessDialog(true);
  };

  const handleLogRun = () => {
    localStorage.setItem("savedOutfit", JSON.stringify(selectedItems));
    setLocation("/feedback");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold font-heading">Great! You're all set!</DialogTitle>
          </DialogHeader>
          <div className="text-muted-foreground my-2 text-lg leading-relaxed">
            Don't forget to enter your feedback post-workout so that you get more personalized recommendations in the future.
          </div>
          <DialogFooter className="sm:justify-center mt-4">
            <Button 
              size="lg"
              className="w-full sm:w-auto min-w-[150px] font-bold" 
              onClick={() => setLocation("/workouts")}
            >
              Got It!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Your Run Forecast</h1>
          <p className="text-muted-foreground">Central Park • Today, 2:00 PM • 1h 30m</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="bg-black text-white hover:bg-black/90" onClick={handleLogRun}>
            Log Workout
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Visual Outfit & Weather */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Weather Summary Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-secondary/50 p-3 rounded-full">
                <Cloud className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold font-heading">{weather.temp}°F</div>
                <div className="text-muted-foreground font-medium">{weather.condition}</div>
              </div>
            </div>
            
            <div className="flex gap-6 text-sm">
              <div className="flex flex-col items-center">
                <span className="text-muted-foreground flex items-center gap-1"><Wind className="h-3 w-3" /> Wind</span>
                <span className="font-bold text-primary">{weather.wind} mph</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-muted-foreground flex items-center gap-1"><Droplets className="h-3 w-3" /> Humidity</span>
                <span className="font-bold text-primary">{weather.humidity}%</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-muted-foreground flex items-center gap-1"><Thermometer className="h-3 w-3" /> Feels Like</span>
                <span className="font-bold text-primary">{weather.feelsLike}°F</span>
              </div>
            </div>
          </div>

          {/* Outfit Visualization */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-xl flex items-center gap-2">
                Recommended Layers
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Based on 15+ weather data points
                  </TooltipContent>
                </Tooltip>
              </h2>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-black text-white hover:bg-black/90 hover:text-white border-black">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add from Gear Closet</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                    {GEAR_CLOSET.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2 p-2 rounded hover:bg-secondary/20">
                        <Checkbox 
                          id={`add-${item.id}`} 
                          checked={!!selectedItems.find(i => i.id === item.id)}
                          onCheckedChange={() => handleToggleItem(item)}
                        />
                        <label
                          htmlFor={`add-${item.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                        >
                          {item.name}
                        </label>
                        <span className="text-xs text-muted-foreground">{item.category}</span>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              <AnimatePresence>
                {INITIAL_RECOMMENDATION.map((rec, idx) => {
                  const isSelected = !!selectedItems.find(i => i.id === rec.id);
                  
                  return (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`group rounded-xl border p-4 hover:shadow-md transition-all flex items-center gap-4 ${isSelected ? 'bg-white border-primary/20' : 'bg-gray-50 opacity-60 border-transparent'}`}
                    >
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={() => handleToggleItem(rec)}
                        className="h-6 w-6"
                      />
                      
                      <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-secondary/50 text-primary">
                        {rec.category === "Torso" ? <Shirt className="h-6 w-6" /> : <User className="h-6 w-6" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">{rec.category} {rec.layerType ? `(${rec.layerType})` : ''}</p>
                            <h3 className="font-bold text-lg text-primary">{rec.name}</h3>
                          </div>
                          <div className="bg-secondary/30 px-2 py-1 rounded text-xs text-muted-foreground">
                            98% Confidence
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                          <Info className="h-3 w-3" />
                          {rec.reason}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Show added items that weren't in initial recommendation */}
                {selectedItems.filter(i => !INITIAL_RECOMMENDATION.find(r => r.id === i.id)).map((item) => (
                   <motion.div
                   key={item.id}
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   exit={{ opacity: 0, height: 0 }}
                   className="group bg-white rounded-xl border border-primary/20 p-4 hover:shadow-md transition-all flex items-center gap-4"
                 >
                   <Checkbox 
                     checked={true}
                     onCheckedChange={() => handleToggleItem(item)}
                     className="h-6 w-6"
                   />
                   
                   <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-accent/10 text-accent">
                     <Plus className="h-6 w-6" />
                   </div>
                   
                   <div className="flex-1">
                     <div>
                       <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">{item.category}</p>
                       <h3 className="font-bold text-lg text-primary">{item.name}</h3>
                     </div>
                   </div>
                 </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Why this outfit? */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
              <h3 className="font-heading font-bold text-lg mb-4">Why this gear?</h3>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Wind className="h-4 w-4 text-accent" />
                      Wind Factor
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    Wind speeds of 11 mph significantly lower skin temperature. A windbreaker shell is essential to trap body heat.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="border-b-0">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Thermometer className="h-4 w-4 text-blue-500" />
                      Temp vs. Effort
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    At 46°F with moderate exertion, you'll generate significant body heat. We recommend lighter layers than you'd wear for walking.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <Button className="w-full bg-accent text-white hover:bg-accent/90 h-14 text-lg font-bold shadow-lg shadow-accent/20" onClick={handleSave}>
              <Save className="h-5 w-5 mr-2" />
              Let's Go!
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
