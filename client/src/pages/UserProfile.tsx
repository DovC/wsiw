import { useState } from "react";
import { useLocation } from "wouter";
import { 
  User, Settings, LogOut, Trash2, AlertTriangle, 
  MapPin, Bell, Shield, CircleUser
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function UserProfile() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  
  const handleResetPrototype = () => {
    // Clear all app-specific keys from localStorage
    localStorage.removeItem("savedWorkouts");
    localStorage.removeItem("savedOutfit");
    localStorage.removeItem("gearCloset");
    
    toast({
      title: "Prototype Reset",
      description: "All local data has been cleared.",
    });

    // Short delay then redirect to home
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <CircleUser className="h-10 w-10" />
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Runner Profile</h1>
          <p className="text-muted-foreground">Manage your preferences and data.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Personal Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default Location</Label>
                <div className="flex items-center gap-2 p-3 border rounded-md bg-secondary/10 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Central Park, NY
                </div>
              </div>
              <div className="space-y-2">
                <Label>Running Level</Label>
                <div className="p-3 border rounded-md bg-secondary/10 text-muted-foreground">
                  Intermediate
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Imperial Units</Label>
                <p className="text-sm text-muted-foreground">Display temperature in °F and speed in mph</p>
              </div>
              <Switch checked={true} disabled />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Notifications</Label>
                <p className="text-sm text-muted-foreground">Get alerts for perfect running conditions</p>
              </div>
              <Switch checked={true} />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>
              Manage your local data for this prototype.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Reset Prototype Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your workout history, custom gear items, and saved preferences from this browser. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetPrototype} className="bg-destructive hover:bg-destructive/90">
                    Yes, Reset Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
