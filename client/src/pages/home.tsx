import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Bot, Star, ArrowRight, MapPin } from "lucide-react";
import { Link } from "wouter";
import NewsletterSignup from "@/components/newsletter-signup";
import { updateMetaDescription, updatePageTitle, seoData } from "@/utils/seo";
import { addLocalBusinessStructuredData, updatePageKeywords, localKeywords } from "@/utils/localSEO";
import arabicCoffeeImage from "@assets/arabiccoffee_1024x1024@2x_1749454274939.webp";
import heritageImage from "@assets/ChatGPT Image Jul 6, 2025, 04_37_42 PM_1751838026092.png";
import dubaiDessertImage from "@assets/Dubai-Pistachio-Cheese-Bomb-11 (1)_1749666253720.jpg";
import coffeeBeansImage from "@assets/ChatGPT Image Jul 6, 2025, 05_10_05 PM_1751839908170.png";
import communityImage from "@assets/IMG_4357_1751842608848.jpg";



export default function Home() {
  useEffect(() => {
    updatePageTitle(seoData.home.title);
    updateMetaDescription(seoData.home.description);
    addLocalBusinessStructuredData();
    updatePageKeywords(localKeywords);
  }, []);

  const handleScrollToMenu = () => {
    // Since this is a single-page approach, we'll navigate to menu page
    window.location.href = "/menu";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/attached_assets/IMG_2512_1751862851891.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          {/* Logo and Welcome Section */}
          <div className="mb-8">
            {/* Mobile Layout - Stacked */}
            <div className="flex flex-col items-center justify-center gap-4 sm:hidden">
              <img 
                src="/attached_assets/01_1749671523922.webp"
                alt="Coffee Pro - Coffee & Bakery Logo"
                className="h-16 w-auto hero-image"
                loading="eager"
                width="64"
                height="64"
              />
              <h1 className="text-xl font-playfair font-bold leading-tight">
                Welcome to
              </h1>
            </div>
            
            {/* Desktop Layout - Side by Side */}
            <div className="hidden sm:flex items-center justify-center gap-8 md:gap-12">
              <h1 className="text-2xl md:text-4xl font-playfair font-bold leading-tight">
                Welcome to
              </h1>
              <img 
                src="/attached_assets/01_1749671523922.webp"
                alt="Coffee Pro - Coffee & Bakery Logo"
                className="h-20 md:h-24 w-auto hero-image"
                loading="eager"
                width="96"
                height="96"
              />
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <p className="text-lg sm:text-xl md:text-2xl mb-4 text-gray-200 leading-relaxed px-2">
              Astoria NYC's most authentic Egyptian coffee shop. Premium specialty coffee, fresh pastries, and traditional treats on Astoria Boulevard, Queens.
            </p>
            <div className="flex items-center justify-center text-base sm:text-lg text-gray-300 px-2 mb-6">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              <span className="text-center">23-33 Astoria Blvd, Astoria, NY 11102</span>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
            <Link href="/menu" className="w-full sm:w-auto">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-coffee-secondary text-white hover:bg-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold"
              >
                <Coffee className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                View Our Menu
              </Button>
            </Link>
            <Link href="/loyalty" className="w-full sm:w-auto">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-coffee-secondary text-white hover:bg-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold"
              >
                <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Join Loyalty Program
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage Showcase Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-coffee-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-coffee-dark mb-4 sm:mb-6 leading-tight">
                Authentic Coffee Heritage
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-coffee-medium mb-4 sm:mb-6 leading-relaxed">
                Experience the rich traditions of Egyptian coffee culture, 
                brought to life in the heart of New York City. Every cup tells a story of 
                authentic brewing techniques and warm hospitality. Complement your coffee 
                with authentic Middle Eastern treats including Dubai chocolate, Kunafa, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/menu" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-coffee-secondary hover:bg-blue-600 text-white px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold touch-target">
                    Explore Our Heritage Menu
                  </Button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-coffee-secondary text-coffee-secondary hover:bg-coffee-secondary hover:text-white px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold touch-target">
                    Learn Our Story
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-full max-w-md aspect-square overflow-hidden rounded-lg shadow-xl">
                <img 
                  src={heritageImage} 
                  alt="Elegant golden coffee cup with luxurious design showcasing Coffee Pro's premium coffee heritage"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-lg pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* New Drinks Spotlight Section */}
      <section className="py-12 sm:py-14 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-playfair font-bold text-coffee-dark mb-4">
              New Signature Drinks
            </h2>
            <p className="text-base sm:text-xl text-coffee-medium max-w-3xl mx-auto">
              Discover our latest creations - innovative drinks that blend traditional coffee craftsmanship with exciting new flavors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Fall Special */}
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  src="/attached_assets/RenderedImage_1759513807145.JPEG"
                  alt="Fall Special - featuring Pumpkin Spice Latte, Earl Grey Hot Chocolate, and Coca Latte"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">NEW</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-playfair font-bold text-coffee-dark mb-3">
                  Fall Special
                </h3>
                <p className="text-coffee-medium mb-4">
                  Pumpkin Spice Latte, Earl Grey Hot Chocolate, Coca Latte
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-medium">Seasonal Drinks</span>
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
              </CardContent>
            </Card>

            {/* Sachertorte */}
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="relative bg-gray-100">
                <img 
                  src="/attached_assets/IMG_4511 2_1759515845932.jpg"
                  alt="Sachertorte - rich chocolate cake with whipped cream"
                  className="w-full h-80 object-contain"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">NEW</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-playfair font-bold text-coffee-dark mb-3">
                  Sachertorte
                </h3>
                <p className="text-coffee-medium mb-4">
                  A rich, decadent chocolate cake with a smooth chocolate glaze, served with fresh whipped cream
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary font-medium">Signature Dessert</span>
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-xl text-coffee-dark font-semibold">
              Visit Coffee Pro to Try These New Drinks
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-playfair font-bold text-coffee-dark mb-4">
              Heritage Meets Innovation
            </h2>
            <p className="text-base sm:text-xl text-coffee-medium max-w-3xl mx-auto">
              Bringing authentic Egyptian coffee traditions to New York City - where traditional hospitality meets modern excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-amber-800 to-orange-600 relative overflow-hidden">
                <img 
                  src={coffeeBeansImage} 
                  alt="Premium coffee beans blend - Colombian, Ethiopian, and Italian"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Coffee className="text-white w-8 h-8" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-playfair font-semibold text-coffee-dark mb-3">
                  Egyptian Coffee Heritage
                </h3>
                <p className="text-coffee-medium">
                  A masterful blend of Colombian, Ethiopian, and Italian beans, crafted with traditional Egyptian techniques and authentic Middle Eastern heritage, bringing the finest coffee culture from Egypt to NYC.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-coffee-primary to-coffee-dark relative">
                <img 
                  src={dubaiDessertImage}
                  alt="Dubai Pistachio Cheese Bomb - signature dessert at Coffee Pro"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                <div className="absolute bottom-4 left-4">
                  <Bot className="text-white w-8 h-8" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-playfair font-semibold text-coffee-dark mb-3">
                  Gourmet Snacks & Treats
                </h3>
                <p className="text-coffee-medium">
                  Indulge in our curated selection of premium Middle Eastern treats including Dubai chocolate, kunafa delights, pistachio specialties, and artisan muffins crafted fresh daily.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-coffee-accent to-yellow-500 relative">
                <img 
                  src={communityImage}
                  alt="Customers with Arabic name cards at Coffee Pro community corner"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                <div className="absolute bottom-4 left-4">
                  <Star className="text-white w-8 h-8" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-playfair font-semibold text-coffee-dark mb-3">
                  Community Connection
                </h3>
                <p className="text-coffee-medium">
                  Bringing people together through exceptional coffee experiences, creating lasting friendships and memorable moments in our welcoming space.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-12 sm:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-coffee-dark mb-4">
              Why Coffee Pro is Astoria's Favorite Coffee Shop
            </h2>
            <p className="text-xl text-coffee-medium">
              Discover authentic Egyptian coffee culture, premium specialty drinks, and freshly baked pastries at Queens' most charming local coffee shop
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src="/attached_assets/2024-12-14_1751843932493.webp" 
                alt="Coffee Pro interior with warm lighting and comfortable seating"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg">Welcoming Atmosphere</h3>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600" 
                alt="Perfect latte art created by Coffee Pro baristas"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg">Artisan Craftsmanship</h3>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src="/attached_assets/unnamed (4)_1751844297728.webp" 
                alt="Authentic Egyptian pastries with pistachio and chocolate at Coffee Pro"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg">Authentic Pastries</h3>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src="/attached_assets/unnamed (1)_1751844049412.webp" 
                alt="Coffee Pro storefront with outdoor seating in Astoria"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg">Community Hub</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-coffee-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-playfair font-bold mb-6">
            Discover Coffee Pro
          </h2>
          <p className="text-xl mb-8 text-coffee-cream">
            Explore our menu and visit our Coffee Pro location in Astoria Boulevard, Long Island City
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact#contact-top">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-coffee-secondary text-coffee-secondary hover:bg-coffee-secondary hover:text-white px-8 py-4 text-lg font-semibold"
              >
                Find Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/menu#menu-top">
              <Button 
                size="lg"
                className="bg-coffee-secondary text-white hover:bg-blue-600 px-8 py-4 text-lg font-semibold"
              >
                View Menu
                <Coffee className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>



      {/* Newsletter Signup Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-coffee-primary/5 to-amber-100/30">
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}
