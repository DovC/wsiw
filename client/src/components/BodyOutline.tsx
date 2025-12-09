import { motion } from "framer-motion";

interface BodyOutlineProps {
  zones: {
    head?: string;
    torso?: string;
    legs?: string;
    feet?: string;
    hands?: string;
  };
}

export default function BodyOutline({ zones }: BodyOutlineProps) {
  const getColor = (rating?: string) => {
    switch (rating) {
      case "hot": return "#ef4444"; // Red-500
      case "perfect": return "#22c55e"; // Green-500
      case "cold": return "#3b82f6"; // Blue-500
      default: return "#ffffff"; // White
    }
  };

  const getFill = (zone?: string) => getColor(zone);

  return (
    <div className="relative w-full h-full flex items-center justify-center py-4">
      <svg
        viewBox="0 0 200 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[400px] w-auto drop-shadow-xl"
      >
        {/* Head */}
        <motion.path
          d="M100 20 C 115 20, 125 35, 125 50 C 125 65, 115 80, 100 80 C 85 80, 75 65, 75 50 C 75 35, 85 20, 100 20 Z"
          fill={getFill(zones.head)}
          stroke="#1e293b"
          strokeWidth="3"
          animate={{ fill: getFill(zones.head) }}
        />
        
        {/* Neck */}
        <path d="M90 80 L90 90 L110 90 L110 80" stroke="#1e293b" strokeWidth="3" fill="white" />

        {/* Torso & Arms */}
        <motion.path
          d="M70 100 
             L50 120 L40 220 L60 230 L70 140 
             L90 230 L110 230 
             L130 140 L140 230 L160 220 L150 120 
             L130 100 Z"
          fill={getFill(zones.torso)}
          stroke="#1e293b"
          strokeWidth="3"
          strokeLinejoin="round"
          animate={{ fill: getFill(zones.torso) }}
        />

        {/* Hands */}
        <motion.circle 
          cx="50" cy="235" r="10" 
          fill={getFill(zones.hands)} 
          stroke="#1e293b" strokeWidth="3" 
          animate={{ fill: getFill(zones.hands) }}
        />
        <motion.circle 
          cx="150" cy="235" r="10" 
          fill={getFill(zones.hands)} 
          stroke="#1e293b" strokeWidth="3" 
          animate={{ fill: getFill(zones.hands) }}
        />


        {/* Legs */}
        <motion.path
          d="M90 230 
             L85 350 L80 420 L95 420 L100 300 
             L105 420 L120 420 L115 350 
             L110 230 Z"
          fill={getFill(zones.legs)}
          stroke="#1e293b"
          strokeWidth="3"
          strokeLinejoin="round"
          animate={{ fill: getFill(zones.legs) }}
        />

        {/* Feet */}
        <motion.path
          d="M80 420 L75 440 L95 440 L95 420 Z"
          fill={getFill(zones.feet)}
          stroke="#1e293b"
          strokeWidth="3"
          animate={{ fill: getFill(zones.feet) }}
        />
        <motion.path
          d="M105 420 L105 440 L125 440 L120 420 Z"
          fill={getFill(zones.feet)}
          stroke="#1e293b"
          strokeWidth="3"
          animate={{ fill: getFill(zones.feet) }}
        />

        {/* Guide Lines */}
        <line x1="125" y1="50" x2="180" y2="50" stroke="#94a3b8" strokeWidth="1" />
        <line x1="130" y1="120" x2="180" y2="120" stroke="#94a3b8" strokeWidth="1" />
        <line x1="150" y1="235" x2="180" y2="235" stroke="#94a3b8" strokeWidth="1" />
        <line x1="115" y1="320" x2="180" y2="320" stroke="#94a3b8" strokeWidth="1" />
        <line x1="120" y1="430" x2="180" y2="430" stroke="#94a3b8" strokeWidth="1" />

      </svg>
    </div>
  );
}
