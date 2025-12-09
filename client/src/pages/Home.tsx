import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CloudRain, Sun, Wind, Thermometer, User } from "lucide-react";
import heroBg from "@assets/generated_images/subtle_topographic_map_pattern_with_technical_grid_lines.png";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0" />
        
        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 border border-accent/20">
                <Sun className="h-3.5 w-3.5" />
                <span>New: Hyper-local weather data</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-primary leading-[1.1] mb-6">
                Run Smarter. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                  Dress Better.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Stop guessing. Get precision outfit recommendations based on real-time weather and your personal comfort profile.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/onboarding">
                  <Button size="lg" className="h-14 px-8 text-lg font-semibold shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                    Get Recommendation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-background/50 backdrop-blur-sm">
                    View Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Abstract Visualization Side */}
          <div className="hidden lg:block relative h-[600px] w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute inset-0 bg-secondary/30 rounded-3xl border border-white/40 backdrop-blur-sm overflow-hidden p-8 shadow-2xl"
            >
              {/* Mock UI Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-2xl shadow-xl p-6 border border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-heading font-bold text-lg">Morning Run</h3>
                    <p className="text-sm text-muted-foreground">Central Park, NY</p>
                  </div>
                  <div className="bg-primary/5 p-2 rounded-full">
                    <CloudRain className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center border shadow-sm">
                      <Wind className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Windbreaker</p>
                      <p className="text-xs text-muted-foreground">Gusts up to 18km/h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center border shadow-sm">
                      <Thermometer className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Long Sleeve Base</p>
                      <p className="text-xs text-muted-foreground">Feels like 4°C</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t text-center">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">98% Match Score</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">Engineered for Comfort</h2>
            <p className="text-muted-foreground">
              Our algorithm analyzes over 15 distinct weather variables to ensure you're never underdressed or overdressed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wind className="h-8 w-8 text-primary" />,
                title: "Wind chill aware",
                desc: "We account for wind gusts and direction, recommending shells exactly when you need them."
              },
              {
                icon: <Thermometer className="h-8 w-8 text-primary" />,
                title: "RealFeel Calibration",
                desc: "Temperature is just a number. We calculate humidity and dew point for true comfort."
              },
              {
                icon: <User className="h-8 w-8 text-primary" />,
                title: "Personalized Learning",
                desc: "Rate your runs. The algorithm learns if you run hot or cold and adjusts accordingly."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-secondary/20 hover:bg-secondary/40 transition-colors">
                <div className="mb-6 bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
