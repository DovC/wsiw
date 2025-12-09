import { Link } from "wouter";
import { useState, useEffect } from "react";
import { 
  Calendar, Clock, MapPin, ArrowRight, ThumbsUp, ThumbsDown, 
  Wind, Thermometer, AlertCircle, CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GEAR_CLOSET } from "@/lib/data";

// Mock Data for Workouts
const WORKOUTS = [
  {
    id: "w1",
    date: "Today, 2:00 PM",
    location: "Central Park, NY",
    duration: "1h 30m",
    temp: "46°F",
    condition: "Overcast",
    status: "pending_feedback",
    items: [
      GEAR_CLOSET.find(i => i.id === "t1")!,
      GEAR_CLOSET.find(i => i.id === "t2")!,
      GEAR_CLOSET.find(i => i.id === "l1")!,
      GEAR_CLOSET.find(i => i.id === "ha1")!,
    ]
  },
  {
    id: "w2",
    date: "Yesterday, 7:00 AM",
    location: "Brooklyn Bridge Park",
    duration: "45m",
    temp: "42°F",
    condition: "Clear",
    status: "completed",
    feedback: {
      overall: "perfect",
      adjustments: []
    },
    items: [
      GEAR_CLOSET.find(i => i.id === "t1")!,
      GEAR_CLOSET.find(i => i.id === "t4")!,
      GEAR_CLOSET.find(i => i.id === "l1")!,
      GEAR_CLOSET.find(i => i.id === "h2")!,
    ]
  },
  {
    id: "w3",
    date: "Dec 7, 6:30 PM",
    location: "West Side Highway",
    duration: "1h",
    temp: "38°F",
    condition: "Windy",
    status: "completed",
    feedback: {
      overall: "cold",
      adjustments: [
        { itemId: "t2", issue: "too_cold" },
        { itemId: "ha1", issue: "too_cold" }
      ]
    },
    items: [
      GEAR_CLOSET.find(i => i.id === "t1")!,
      GEAR_CLOSET.find(i => i.id === "t2")!,
      GEAR_CLOSET.find(i => i.id === "l2")!,
      GEAR_CLOSET.find(i => i.id === "ha1")!,
    ]
  },
  {
    id: "w4",
    date: "Dec 5, 8:00 AM",
    location: "Central Park, NY",
    duration: "1h 15m",
    temp: "52°F",
    condition: "Rain",
    status: "completed",
    feedback: {
      overall: "hot",
      adjustments: [
        { itemId: "t6", issue: "too_hot" }
      ]
    },
    items: [
      GEAR_CLOSET.find(i => i.id === "t3")!,
      GEAR_CLOSET.find(i => i.id === "t6")!,
      GEAR_CLOSET.find(i => i.id === "l3")!,
    ]
  }
];

export default function MyWorkouts() {
  const [workouts, setWorkouts] = useState<any[]>(WORKOUTS);

  useEffect(() => {
    const saved = localStorage.getItem("savedWorkouts");
    if (saved) {
      const savedWorkouts = JSON.parse(saved);
      // Combine saved workouts with mock data
      // Using a Map to avoid duplicates if IDs conflict (though they shouldn't with timestamp)
      setWorkouts([...savedWorkouts, ...WORKOUTS]);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">My Workouts</h1>
          <p className="text-muted-foreground">Track your history and refine your recommendations.</p>
        </div>
        <Link href="/onboarding">
          <Button className="bg-primary text-white">
            Plan New Workout
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {workouts.map((workout) => (
          <Card key={workout.id} className="overflow-hidden border-none shadow-md bg-white hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
              {/* Left: Meta Data */}
              <div className="bg-secondary/20 p-6 flex flex-col justify-center min-w-[200px] border-r border-border/50">
                <div className="mb-4">
                  <div className="text-lg font-bold text-primary">{workout.date}</div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {workout.location}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-muted-foreground"><Clock className="h-3 w-3 mr-2" /> Duration</span>
                    <span className="font-medium">{workout.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-muted-foreground"><Thermometer className="h-3 w-3 mr-2" /> Temp</span>
                    <span className="font-medium">{workout.temp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-muted-foreground"><Wind className="h-3 w-3 mr-2" /> Condition</span>
                    <span className="font-medium">{workout.condition}</span>
                  </div>
                </div>
              </div>

              {/* Right: Gear & Feedback */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">Gear Summary</h3>
                    {workout.status === "completed" && (
                      <Badge variant={workout.feedback?.overall === "perfect" ? "default" : "outline"} 
                        className={
                          workout.feedback?.overall === "perfect" ? "bg-green-100 text-green-700 hover:bg-green-200 border-transparent" :
                          workout.feedback?.overall === "hot" ? "bg-red-50 text-red-600 border-red-200" :
                          workout.feedback?.overall === "cold" ? "bg-blue-50 text-blue-600 border-blue-200" : ""
                        }
                      >
                        {workout.feedback?.overall === "perfect" ? "Perfect Match" : 
                         workout.feedback?.overall === "hot" ? "Ran Hot" : "Ran Cold"}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {workout.items.map((item: any) => {
                      if (!item) return null;
                      
                      // Check if this item had specific feedback
                      const issue = workout.feedback?.adjustments?.find((a: any) => a.itemId === item.id)?.issue;
                      
                      return (
                        <div key={item.id} className={`
                          text-sm px-3 py-1.5 rounded-full border flex items-center gap-2
                          ${issue === "too_hot" ? "bg-red-50 border-red-200 text-red-700" : 
                            issue === "too_cold" ? "bg-blue-50 border-blue-200 text-blue-700" : 
                            "bg-secondary/30 border-secondary text-foreground"}
                        `}>
                          <span>{item.name}</span>
                          {issue === "too_hot" && <Thermometer className="h-3 w-3" />}
                          {issue === "too_cold" && <Wind className="h-3 w-3" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Area */}
                <div className="pt-4 border-t flex justify-between items-center">
                  {workout.status === "pending_feedback" ? (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center text-amber-600 text-sm font-medium">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Feedback needed
                      </div>
                      <Link href="/feedback">
                        <Button size="sm" className="bg-black text-white hover:bg-black/90">
                          Rate this Outfit
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center text-muted-foreground text-sm w-full">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      Workout logged
                      
                      {workout.feedback?.adjustments && workout.feedback.adjustments.length > 0 && (
                        <span className="ml-auto text-xs italic">
                          Algorithm updated based on your feedback
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
