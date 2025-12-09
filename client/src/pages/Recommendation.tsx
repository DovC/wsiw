import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Wind, Droplets, Thermometer, Cloud, 
  Shirt, User, Info, ArrowRight, Share2 
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

export default function Recommendation() {
  const weather = {
    temp: 8,
    feelsLike: 4,
    condition: "Overcast",
    wind: 18,
    humidity: 65,
    precip: "10%",
  };

  const outfit = [
    {
      zone: "Torso (Base)",
      item: "Merino Wool Long Sleeve",
      reason: "Moisture wicking, thermoregulation",
      icon: <Shirt className="h-6 w-6" />,
      color: "bg-stone-200"
    },
    {
      zone: "Torso (Outer)",
      item: "Lightweight Windbreaker",
      reason: "Wind gusts > 15km/h",
      icon: <Wind className="h-6 w-6" />,
      color: "bg-orange-100 text-orange-600"
    },
    {
      zone: "Legs",
      item: "Thermal Tights",
      reason: "Feels like 4°C",
      icon: <User className="h-6 w-6" />,
      color: "bg-slate-200"
    },
    {
      zone: "Accessories",
      item: "Light Gloves",
      reason: "Extremity protection recommended",
      icon: <User className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-600"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Your Run Forecast</h1>
          <p className="text-muted-foreground">Central Park • Today, 2:00 PM</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Link href="/feedback">
            <Button size="sm" className="bg-primary text-white">
              Log Run
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
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
                <div className="text-3xl font-bold font-heading">{weather.temp}°C</div>
                <div className="text-muted-foreground font-medium">{weather.condition}</div>
              </div>
            </div>
            
            <div className="flex gap-6 text-sm">
              <div className="flex flex-col items-center">
                <span className="text-muted-foreground flex items-center gap-1"><Wind className="h-3 w-3" /> Wind</span>
                <span className="font-bold text-primary">{weather.wind} km/h</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-muted-foreground flex items-center gap-1"><Droplets className="h-3 w-3" /> Humidity</span>
                <span className="font-bold text-primary">{weather.humidity}%</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-muted-foreground flex items-center gap-1"><Thermometer className="h-3 w-3" /> Feels Like</span>
                <span className="font-bold text-primary">{weather.feelsLike}°C</span>
              </div>
            </div>
          </div>

          {/* Outfit Visualization */}
          <div className="space-y-4">
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

            <div className="grid gap-4">
              {outfit.map((layer, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white rounded-xl border p-4 hover:shadow-md transition-all flex items-center gap-4"
                >
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${layer.color}`}>
                    {layer.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">{layer.zone}</p>
                        <h3 className="font-bold text-lg text-primary">{layer.item}</h3>
                      </div>
                      <div className="bg-secondary/30 px-2 py-1 rounded text-xs text-muted-foreground">
                        98% Confidence
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      {layer.reason}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Why this outfit? */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50 sticky top-24">
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
                  Wind speeds of 18km/h significantly lower skin temperature. A windbreaker shell is essential to trap body heat.
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
                  At 8°C with moderate exertion, you'll generate significant body heat. We recommend lighter layers than you'd wear for walking.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-6 pt-6 border-t border-dashed border-border">
              <p className="text-xs text-muted-foreground text-center mb-4">
                Not what you have in your closet?
              </p>
              <Button variant="outline" className="w-full">
                See Alternatives
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
