import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Smile, Frown, Meh, Save, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import BodyOutline from "@/components/BodyOutline";
import { GearItem, GEAR_CLOSET } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);
  const [wornItems, setWornItems] = useState<GearItem[]>([]);
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  // Load saved outfit
  useEffect(() => {
    const saved = localStorage.getItem("savedOutfit");
    if (saved) {
      setWornItems(JSON.parse(saved));
    }
  }, []);

  const handleRemoveItem = (id: string) => {
    setWornItems(prev => prev.filter(i => i.id !== id));
  };

  const handleAddItem = (item: GearItem) => {
    if (!wornItems.find(i => i.id === item.id)) {
      setWornItems(prev => [...prev, item]);
    }
  };

  const handleRate = (zone: string, value: string) => {
    setFeedback(prev => ({ ...prev, [zone]: value }));
  };

  // Group items by category for display
  const groupedItems = {
    Head: wornItems.filter(i => i.category === "Head"),
    Torso: wornItems.filter(i => i.category === "Torso"),
    Legs: wornItems.filter(i => i.category === "Legs"),
    Feet: wornItems.filter(i => i.category === "Feet"),
    Hands: wornItems.filter(i => i.category === "Hands"),
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-100 p-6 rounded-full text-green-600 mb-6"
        >
          <Check className="h-12 w-12" />
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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Log Workout</h1>
          <p className="text-muted-foreground">Adjust what you actually wore and rate your comfort.</p>
        </div>
        <Button size="lg" onClick={() => setSubmitted(true)} disabled={Object.keys(feedback).length < 4}>
          Submit Log
        </Button>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* LEFT PANEL: What did you wear? */}
        <div className="lg:col-span-4 space-y-8">
          <h2 className="text-xl font-heading font-bold text-muted-foreground">What did you wear?</h2>
          
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([category, items]) => (
              items.length > 0 && (
                <div key={category} className="space-y-3">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider pl-2 border-l-2 border-accent">{category}</h3>
                  <div className="space-y-2">
                    {items.map(item => (
                      <div key={item.id} className="group flex items-center justify-between p-3 bg-white rounded-lg border hover:border-primary/50 transition-colors">
                        <span className="font-medium text-primary">{item.name}</span>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full h-12 border-dashed">
                <Plus className="mr-2 h-4 w-4" />
                Add Clothing
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add from Gear Closet</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                {GEAR_CLOSET.map((item) => {
                  const isSelected = !!wornItems.find(i => i.id === item.id);
                  return (
                    <div key={item.id} className="flex items-center space-x-2 p-2 rounded hover:bg-secondary/20">
                      <Checkbox 
                        id={`add-${item.id}`} 
                        checked={isSelected}
                        onCheckedChange={(checked) => {
                          if (checked) handleAddItem(item);
                          else handleRemoveItem(item.id);
                        }}
                      />
                      <label
                        htmlFor={`add-${item.id}`}
                        className="text-sm font-medium leading-none flex-1 cursor-pointer"
                      >
                        {item.name}
                      </label>
                      <span className="text-xs text-muted-foreground">{item.category}</span>
                    </div>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* CENTER/RIGHT PANEL: Body Map & Feedback */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-8 shadow-sm border">
           <h2 className="text-xl font-heading font-bold text-muted-foreground mb-8 text-center">How was it?</h2>
           
           <div className="flex flex-col md:flex-row items-center justify-center gap-12">
             
             {/* Body Map Visualization */}
             <div className="w-full max-w-[300px] h-[450px]">
               <BodyOutline zones={{
                 head: feedback["Head"],
                 torso: feedback["Torso"],
                 legs: feedback["Legs"],
                 feet: feedback["Feet"],
                 hands: feedback["Hands"],
               }} />
             </div>

             {/* Rating Controls aligned to zones roughly */}
             <div className="flex flex-col gap-10 w-full max-w-xs">
               {[
                 { id: "Head", label: "Head / Neck" },
                 { id: "Torso", label: "Torso / Arms" },
                 { id: "Hands", label: "Hands" },
                 { id: "Legs", label: "Legs" },
                 { id: "Feet", label: "Feet" }
               ].map((zone) => (
                 <div key={zone.id} className="flex items-center justify-between bg-secondary/20 p-2 rounded-xl">
                   <span className="text-sm font-bold w-24 pl-2">{zone.label}</span>
                   <div className="flex gap-2">
                     {[
                       { val: "cold", icon: <Frown className="h-5 w-5 text-blue-500" /> },
                       { val: "perfect", icon: <Smile className="h-5 w-5 text-green-500" /> },
                       { val: "hot", icon: <Meh className="h-5 w-5 text-red-500" /> }
                     ].map((opt) => (
                       <button
                         key={opt.val}
                         onClick={() => handleRate(zone.id, opt.val)}
                         className={cn(
                           "p-2 rounded-lg transition-all",
                           feedback[zone.id] === opt.val
                             ? "bg-white shadow-sm scale-110"
                             : "hover:bg-white/50 opacity-50 hover:opacity-100"
                         )}
                       >
                         {opt.icon}
                       </button>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
