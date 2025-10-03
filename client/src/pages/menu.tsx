import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Leaf, UtensilsCrossed, Snowflake, Sandwich, GlassWater, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { updateMetaDescription, updatePageTitle, seoData } from "@/utils/seo";
import type { MenuItem } from "@shared/schema";


// Hot Drinks Menu Images
import hotDrinksImg1 from "@assets/IMG_4338_1751830973848.jpg";
import hotDrinksImg2 from "@assets/IMG_4339_1751830973848.jpg";
import hotDrinksImg3 from "@assets/IMG_4340_1751830973848.jpg";
import hotDrinksImg4 from "@assets/IMG_4341_1751830973848.jpg";

// Cold Drinks Menu Images
import coldDrinksImg1 from "@assets/IMG_4342_1751831168012.jpg";
import coldDrinksImg2 from "@assets/IMG_4343_1751831168013.jpg";
import coldDrinksImg3 from "@assets/IMG_4344_1751831168013.jpg";

// Pastry Menu Images
import pastryImg1 from "@assets/IMG_4345_1751831882198.jpg";
import pastryImg2 from "@assets/IMG_4346_1751831882199.jpg";
import pastryImg3 from "@assets/IMG_4348_1751831882199.jpg";
import pastryImg4 from "@assets/IMG_4349_1751831882199.jpg";

// Sandwich Menu Images
import sandwichImg1 from "@assets/IMG_4350_1751831944576.jpg";

// Juice Menu Images
import juiceImg1 from "@assets/IMG_4351_1751831967750.jpg";
import juiceImg2 from "@assets/IMG_4352_1751831967751.jpg";

// Pro Special Menu Images
const proSpecialImg1 = "/attached_assets/IMG_4511 2_1759514766431.JPG";
const proSpecialImg2 = "/attached_assets/IMG_4694 2_1759514766432.JPG";
const proSpecialImg3 = "/attached_assets/IMG_4745 (1) 2_1759514766433.JPG";
const proSpecialImg4 = "/attached_assets/IMG_5871_1759514766433.JPEG";
const proSpecialImg5 = "/attached_assets/IMG_5886_1759514766433.JPEG";
const proSpecialImg6 = "/attached_assets/IMG_5965_1759514766433.JPEG";
const proSpecialImg7 = "/attached_assets/IMG_5903_1759514766434.JPEG";

const proSpecialNames = [
  "Sachertorte",
  "Avocado Toast",
  "Smoked Salmon",
  "Dubai Chocolate Espresso",
  "Salted Caramel Espresso",
  "Earl Grey Hot Chocolate",
  "Salty Grey Tea"
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>("pastry");
  const { toast } = useToast();

  useEffect(() => {
    updatePageTitle(seoData.menu.title);
    updateMetaDescription(seoData.menu.description);
  }, []);

  const { data: menuItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu", activeCategory],
    queryFn: async () => {
      const response = await fetch(`/api/menu?category=${activeCategory}`);
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
      return response.json();
    },
  });

  const categories = [
    { id: "pastry", label: "Pastries", icon: UtensilsCrossed },
    { id: "sandwich", label: "Sandwiches", icon: Sandwich },
    { id: "coffee", label: "Hot Drinks", icon: Coffee },
    { id: "cold", label: "Cold Drinks", icon: Snowflake },
    { id: "juice", label: "Juices", icon: GlassWater },
    { id: "pro-special", label: "Pro Special", icon: Star },
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-stone-900 relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 opacity-30"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Futuristic Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20" id="menu-top">
          <div className="relative">
            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight px-2">
              Coffee Pro Menu - Astoria's Best Coffee & Pastries
            </h1>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-primary rounded-full"></div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-secondary rounded-full"></div>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-stone-100 mb-6 sm:mb-8 font-light tracking-wide text-center px-4 leading-relaxed">
            Authentic Egyptian Coffee, Specialty Drinks, Fresh Pastries & Traditional Middle Eastern Treats in Queens NY
          </p>
          

        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center mb-16 gap-3 sm:gap-4 px-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant={isActive ? "default" : "outline"}
                className={`group relative overflow-hidden px-4 sm:px-6 md:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base md:text-lg rounded-full transition-all duration-300 transform hover:scale-105 min-h-[48px] ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-2xl border-2 border-primary/80"
                    : "bg-secondary/50 text-white border-2 border-secondary/50 hover:bg-primary hover:text-primary-foreground hover:border-primary/80"
                }`}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3" />
                <span className="whitespace-nowrap">{category.label}</span>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                )}
              </Button>
            );
          })}
        </div>

        {/* Menu Description */}
        <div className="text-center mb-12">
          <p className="text-lg text-stone-200/80 max-w-3xl mx-auto leading-relaxed">
            Here are some of the delicious {
              activeCategory === "pastry" ? "pastries" : 
              activeCategory === "sandwich" ? "sandwiches" :
              activeCategory === "coffee" ? "hot drinks" : 
              activeCategory === "cold" ? "cold drinks" :
              "juices"
            } our shop offers. 
            Not all items are listed - visit us to discover our full selection of authentic Middle Eastern treats!
          </p>
        </div>

        {/* Hot Drinks Menu Images */}
        {activeCategory === "coffee" && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-playfair font-bold text-white mb-4">
                Our Hot Drinks Menu
              </h3>
              <p className="text-stone-200/80 max-w-2xl mx-auto">
                Discover our authentic Egyptian coffee heritage and specialty hot beverages
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4">
              {[hotDrinksImg1, hotDrinksImg2, hotDrinksImg3, hotDrinksImg4].map((img, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl bg-amber-900/20 backdrop-blur-sm border border-amber-700/30 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/30">
                  <img 
                    src={img} 
                    alt={`Hot Drinks Menu ${index + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cold Drinks Menu Images */}
        {activeCategory === "cold" && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-playfair font-bold text-white mb-4">
                Our Cold Drinks Menu
              </h3>
              <p className="text-stone-200/80 max-w-2xl mx-auto">
                Refreshing iced beverages and specialty cold drinks crafted with care
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[coldDrinksImg1, coldDrinksImg2, coldDrinksImg3].map((img, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl bg-blue-900/20 backdrop-blur-sm border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/30">
                  <img 
                    src={img} 
                    alt={`Cold Drinks Menu ${index + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pastry Menu Images */}
        {activeCategory === "pastry" && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-playfair font-bold text-white mb-4">
                Our Pastry Menu
              </h3>
              <p className="text-stone-200/80 max-w-2xl mx-auto">
                Authentic Middle Eastern pastries and European-inspired treats crafted daily
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[pastryImg1, pastryImg2, pastryImg3, pastryImg4].map((img, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl bg-amber-900/20 backdrop-blur-sm border border-amber-700/30 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/30">
                  <img 
                    src={img} 
                    alt={`Pastry Menu ${index + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sandwich Menu Images */}
        {activeCategory === "sandwich" && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-playfair font-bold text-white mb-4">
                Our Sandwich Menu
              </h3>
              <p className="text-stone-200/80 max-w-2xl mx-auto">
                Fresh, hearty sandwiches made with premium ingredients and artisanal bread
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="group relative overflow-hidden rounded-2xl bg-green-900/20 backdrop-blur-sm border border-green-700/30 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/30 max-w-2xl">
                <img 
                  src={sandwichImg1} 
                  alt="Sandwich Menu"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        )}

        {/* Juice Menu Images */}
        {activeCategory === "juice" && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-playfair font-bold text-white mb-4">
                Our Juice Menu
              </h3>
              <p className="text-stone-200/80 max-w-2xl mx-auto">
                Fresh, natural juices and refreshing beverages made with premium fruits
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[juiceImg1, juiceImg2].map((img, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl bg-cyan-900/20 backdrop-blur-sm border border-cyan-700/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/30">
                  <img 
                    src={img} 
                    alt={`Juice Menu ${index + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pro Special Menu */}
        {activeCategory === "pro-special" && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-playfair font-bold text-white mb-4">
                Pro Special Menu
              </h3>
              <p className="text-stone-200/80 max-w-2xl mx-auto">
                Our signature creations and exclusive specialty items
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[proSpecialImg1, proSpecialImg2, proSpecialImg3, proSpecialImg4, proSpecialImg5, proSpecialImg6, proSpecialImg7].map((img, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl bg-purple-900/20 backdrop-blur-sm border border-purple-700/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/30">
                  <img 
                    src={img} 
                    alt={proSpecialNames[index]}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white text-lg font-bold">{proSpecialNames[index]}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden bg-amber-900/50 border border-amber-700/30">
                <Skeleton className="w-full h-48 bg-amber-800" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2 bg-amber-700" />
                  <Skeleton className="h-4 w-1/4 mb-4 bg-amber-700" />
                  <Skeleton className="h-4 w-full mb-2 bg-amber-700" />
                  <Skeleton className="h-4 w-3/4 mb-4 bg-amber-700" />
                  <Skeleton className="h-10 w-full bg-amber-700" />
                </CardContent>
              </Card>
            ))
          ) : (
            menuItems?.map((item) => {
              return (
                <Card key={item.id} className="group bg-amber-900/70 backdrop-blur-sm border-2 border-amber-700/30 overflow-hidden hover:border-amber-600/50 hover:shadow-2xl hover:shadow-amber-600/20 transition-all duration-500 transform hover:scale-105 h-full flex flex-col">
                  {item.image && (
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {item.available && (
                        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-3 py-1 rounded-full shadow-lg">
                          Available
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent group-hover:from-slate-900/40 transition-all duration-500"></div>
                    </div>
                  )}
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors duration-300 leading-tight">
                        {item.name}
                      </h3>
                      {!item.image && item.available && (
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-3 py-1 rounded-full shadow-lg">
                          Available
                        </Badge>
                      )}
                    </div>
                    <p className="text-stone-200 text-sm leading-snug line-clamp-3 flex-1">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>




      </div>
    </div>
  );
}