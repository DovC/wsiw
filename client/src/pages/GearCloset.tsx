import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Reorder, AnimatePresence, motion } from "framer-motion";
import { 
  Plus, Search, GripVertical, Trash2, Edit2, 
  Shirt, User, Footprints, Hand, CircleUser, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { GEAR_CLOSET, GearItem } from "@/lib/data";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const CATEGORIES = ["Head", "Torso", "Legs", "Feet", "Hands"] as const;
const SPORTS = ["Run", "Cycle"] as const;

// Helper to get icon for category
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Head": return <CircleUser className="h-5 w-5" />;
    case "Torso": return <Shirt className="h-5 w-5" />;
    case "Legs": return <User className="h-5 w-5" />;
    case "Feet": return <Footprints className="h-5 w-5" />;
    case "Hands": return <Hand className="h-5 w-5" />;
    default: return <Shirt className="h-5 w-5" />;
  }
};

export default function GearCloset() {
  const { toast } = useToast();
  // Group items by category for the taxonomy view
  const [items, setItems] = useState<GearItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GearItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<GearItem>>({
    name: "",
    category: "Torso",
    brand: "",
    color: "",
    warmthRating: 5,
    sports: ["Run"]
  });

  useEffect(() => {
    // Load from local storage or default
    const saved = localStorage.getItem("gearCloset");
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(GEAR_CLOSET);
    }
  }, []);

  // Save to local storage whenever items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("gearCloset", JSON.stringify(items));
    }
  }, [items]);

  const handleOpenDialog = (item?: GearItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        category: "Torso",
        brand: "",
        color: "",
        warmthRating: 5,
        sports: ["Run"]
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveItem = () => {
    if (!formData.name || !formData.category) return;

    if (editingItem) {
      // Edit existing
      setItems(prev => prev.map(i => i.id === editingItem.id ? { ...i, ...formData } as GearItem : i));
      toast({ title: "Item Updated", description: `${formData.name} has been updated.` });
    } else {
      // Create new
      const newItem: GearItem = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData as any
      };
      setItems(prev => [...prev, newItem]);
      toast({ title: "Item Added", description: `${newItem.name} added to your closet.` });
    }
    setIsDialogOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    toast({ title: "Item Deleted", description: "Item removed from your closet." });
  };

  // Drag and drop reordering within categories
  // We need a separate list for each category to allow reordering within it
  // When reorder happens, we update the main items list
  const handleReorder = (category: string, newOrder: GearItem[]) => {
    // We need to merge the new order for this category with the items from other categories
    const otherItems = items.filter(i => i.category !== category);
    setItems([...otherItems, ...newOrder]);
  };

  const filteredItems = items.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent hover:text-primary">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-heading font-bold text-primary">Gear Closet</h1>
            <p className="text-muted-foreground">Manage your inventory for personalized recommendations.</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="bg-primary text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Gear
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search your gear..." 
            className="pl-10 h-12 text-lg bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories / Taxonomy */}
        <div className="space-y-8">
          {CATEGORIES.map(category => {
            const categoryItems = filteredItems.filter(i => i.category === category);
            if (categoryItems.length === 0 && searchQuery) return null;

            return (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-2 border-b pb-2">
                  <div className="bg-secondary/50 p-2 rounded-lg text-primary">
                    {getCategoryIcon(category)}
                  </div>
                  <h2 className="text-xl font-heading font-bold">{category}</h2>
                  <span className="text-sm text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                    {categoryItems.length}
                  </span>
                </div>

                <Reorder.Group 
                  axis="y" 
                  values={categoryItems} 
                  onReorder={(newOrder) => handleReorder(category, newOrder)}
                  className="grid gap-3"
                >
                  <AnimatePresence mode='popLayout'>
                    {categoryItems.map((item) => (
                      <Reorder.Item 
                        key={item.id} 
                        value={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-xl border p-4 shadow-sm flex items-center gap-4 group cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="h-5 w-5 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
                        
                        <div className="flex-1 grid md:grid-cols-4 gap-4 items-center">
                          <div className="md:col-span-2">
                            <h3 className="font-bold text-primary">{item.name}</h3>
                            <div className="flex gap-2 items-center mt-1">
                              {item.layerType && (
                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                  {item.layerType} Layer
                                </span>
                              )}
                              <div className="flex gap-1">
                                {item.sports?.map(sport => (
                                  <span key={sport} className="text-[10px] px-1.5 py-0.5 bg-accent/10 text-accent rounded-sm font-medium">
                                    {sport}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            {item.brand && <span className="block">{item.brand}</span>}
                            {item.color && <span className="block text-xs opacity-70">{item.color}</span>}
                          </div>

                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(item)}>
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteItem(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Reorder.Item>
                    ))}
                  </AnimatePresence>
                  {categoryItems.length === 0 && !searchQuery && (
                    <div className="text-center py-8 border-2 border-dashed rounded-xl text-muted-foreground bg-secondary/10">
                      No items in this category yet.
                    </div>
                  )}
                </Reorder.Group>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Gear" : "Add New Gear"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Thermal Running Tights"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(val: any) => setFormData({...formData, category: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Select 
                  value={formData.brand} 
                  onValueChange={(val) => setFormData({...formData, brand: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nike">Nike</SelectItem>
                    <SelectItem value="Adidas">Adidas</SelectItem>
                    <SelectItem value="Under Armour">Under Armour</SelectItem>
                    <SelectItem value="Patagonia">Patagonia</SelectItem>
                    <SelectItem value="North Face">North Face</SelectItem>
                    <SelectItem value="Arc'teryx">Arc'teryx</SelectItem>
                    <SelectItem value="Lululemon">Lululemon</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sports</Label>
              <ToggleGroup 
                type="multiple" 
                variant="outline"
                value={formData.sports || []}
                onValueChange={(val) => setFormData({...formData, sports: val as any[]})}
                className="justify-start"
              >
                {SPORTS.map(sport => (
                  <ToggleGroupItem key={sport} value={sport} aria-label={sport}>
                    {sport}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input 
                id="color" 
                value={formData.color} 
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                placeholder="e.g. Black"
              />
            </div>

            {formData.category === "Torso" && (
              <div className="space-y-2">
                <Label htmlFor="layer">Layer Type</Label>
                <Select 
                  value={formData.layerType} 
                  onValueChange={(val: any) => setFormData({...formData, layerType: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select layer type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Base">Base Layer</SelectItem>
                    <SelectItem value="Mid">Mid Layer</SelectItem>
                    <SelectItem value="Outer">Outer Shell</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveItem}>Save Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
