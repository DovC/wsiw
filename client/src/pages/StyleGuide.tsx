import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CloudSun, Wind, Thermometer, ArrowRight, Check } from "lucide-react";

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-background p-8 font-sans text-foreground print:p-0">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 border-b pb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
              <CloudSun className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-heading font-bold tracking-tight">WSIW Design System</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Version 1.0 • Technical Outdoor Aesthetic
          </p>
          <p className="text-sm text-muted-foreground">
            A design language built for clarity, utility, and outdoor resilience. 
            Combines high-contrast data visualization with a clean, slate-based interface.
          </p>
        </div>

        {/* Colors */}
        <section className="space-y-6">
          <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
            <span className="text-accent">01.</span> Color Palette
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-primary shadow-sm"></div>
              <div>
                <p className="font-bold">Primary Slate</p>
                <p className="text-xs text-muted-foreground">hsl(215 25% 27%)</p>
                <p className="text-xs opacity-50">Headings, Main Actions</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-accent shadow-sm"></div>
              <div>
                <p className="font-bold">Signal Orange</p>
                <p className="text-xs text-muted-foreground">hsl(25 95% 53%)</p>
                <p className="text-xs opacity-50">Accents, Highlights</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-secondary shadow-sm border"></div>
              <div>
                <p className="font-bold">Cool Grey</p>
                <p className="text-xs text-muted-foreground">hsl(210 20% 94%)</p>
                <p className="text-xs opacity-50">Backgrounds, UI Elements</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-background shadow-sm border"></div>
              <div>
                <p className="font-bold">Off-White Paper</p>
                <p className="text-xs text-muted-foreground">hsl(210 20% 98%)</p>
                <p className="text-xs opacity-50">Page Background</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
             <div className="space-y-2">
              <div className="h-12 rounded-lg bg-green-100 border border-green-200"></div>
              <div>
                <p className="font-medium text-sm">Success</p>
                <p className="text-xs text-muted-foreground">Green-100</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-red-50 border border-red-200"></div>
              <div>
                <p className="font-medium text-sm">Error / Hot</p>
                <p className="text-xs text-muted-foreground">Red-50</p>
              </div>
            </div>
             <div className="space-y-2">
              <div className="h-12 rounded-lg bg-blue-50 border border-blue-200"></div>
              <div>
                <p className="font-medium text-sm">Info / Cold</p>
                <p className="text-xs text-muted-foreground">Blue-50</p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
            <span className="text-accent">02.</span> Typography
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="border-b pb-2 mb-4">
                <span className="text-sm font-mono text-muted-foreground">Font Family: Heading</span>
                <p className="text-2xl font-heading font-bold">Manrope</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h1 className="text-5xl font-heading font-bold">Display H1</h1>
                  <p className="text-xs text-muted-foreground mt-1">Bold / 48px-60px</p>
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold">Heading H2</h2>
                  <p className="text-xs text-muted-foreground mt-1">Bold / 30px-36px</p>
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold">Heading H3</h3>
                  <p className="text-xs text-muted-foreground mt-1">Bold / 24px</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-b pb-2 mb-4">
                <span className="text-sm font-mono text-muted-foreground">Font Family: Body</span>
                <p className="text-2xl font-sans">Inter</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-lg leading-relaxed">
                    Lead Paragraph. The quick brown fox jumps over the lazy dog. Used for introductions and high-level summaries.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Regular / 18px</p>
                </div>
                <div>
                  <p className="leading-relaxed text-muted-foreground">
                    Body text. Our algorithm analyzes over 15 distinct weather variables to ensure you're never underdressed or overdressed. This is the standard size for most reading content.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Regular / 16px</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Label / Caption
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Medium / 14px / Tracking Wide</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
            <span className="text-accent">03.</span> UI Components
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Primary interactions and calls to action</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <Button size="lg">Primary Large</Button>
                  <Button>Primary Default</Button>
                  <Button size="sm">Small</Button>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="outline">Secondary Outline</Button>
                  <Button variant="secondary">Secondary Fill</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                   <Button className="bg-black text-white hover:bg-black/90">
                    High Contrast
                    <ArrowRight className="ml-2 h-4 w-4" />
                   </Button>
                </div>
              </CardContent>
            </Card>

            {/* Inputs & Forms */}
            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
                <CardDescription>Data entry and control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Input Field</Label>
                  <Input placeholder="Standard input..." />
                </div>
                
                <div className="space-y-4">
                  <Label>Slider Control</Label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Toggle Switch</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" checked />
                    <Label htmlFor="terms">Checkbox</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cards & Content */}
            <Card>
              <CardHeader>
                <CardTitle>Cards & Containers</CardTitle>
                <CardDescription>Standard content grouping</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <Wind className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Content Card</h4>
                    <p className="text-sm text-muted-foreground">Standard styling for lists and items.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges & Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status & Feedback</CardTitle>
                <CardDescription>Visual indicators for system status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>Default Badge</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                   <span className="text-xs font-bold text-accent uppercase tracking-wider border border-accent/20 bg-accent/5 px-2 py-1 rounded">
                     Technical Label
                   </span>
                   <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                     Highlight Pill
                   </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <div className="text-center pt-12 pb-8 text-sm text-muted-foreground print:hidden">
          <p>To save as PDF: Press Cmd/Ctrl + P and select "Save as PDF"</p>
        </div>
      </div>
    </div>
  );
}
