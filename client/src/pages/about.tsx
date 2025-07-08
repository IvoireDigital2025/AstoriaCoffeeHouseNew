import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
  const stats = [
    { number: "12", label: "Months Established" },
    { number: "1", label: "Astoria Location" },
    { number: "Growing", label: "Happy Customers" },
  ];

  const brandImage = {
    src: "/attached_assets/IMG_2249_1751953361520.PNG",
    alt: "Coffee Pro brand identity and design elements featuring logo and coffee aesthetic",
  };

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-playfair font-bold text-coffee-dark mb-4">
            About Coffee Pro
          </h1>
          <p className="text-xl text-coffee-medium max-w-3xl mx-auto">
            An oasis of warmth and flavor in the vibrant heart of Astoria Boulevard
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-playfair font-bold text-coffee-dark mb-6">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-coffee-medium">
              <p>
                Coffee Pro was founded from a deep passion for coffee, baking, and cultural connection. Inspired by the journey of the coffee bean - from its origins in fertile lands to its transformation into the perfect roast - and the rich baking traditions of the Middle East, especially Egypt, our brand blends heritage with craft.
              </p>
              <p>
                Our identity draws from the natural beauty of the desert dunes, symbolizing growth, warmth, and timeless rituals of sharing coffee. At Coffee Pro, every cup and every pastry is a reflection of tradition, quality, and hospitality.
              </p>
              <p>
                Born from one founder's dream to bring people together through flavor and experience, Coffee Pro is now a growing brand inviting passionate partners to join the journey.
              </p>
              <p>
                We invite you to become part of the Coffee Pro family - to bring this shared passion to your community and to create a space where people don't just grab coffee, they stay for the story.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-playfair font-bold text-coffee-accent">
                    {stat.number}
                  </div>
                  <div className="text-coffee-medium text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Image */}
          <div className="flex justify-center">
            <img
              src={brandImage.src}
              alt={brandImage.alt}
              className="rounded-xl shadow-lg w-full max-w-xs h-auto object-cover"
            />
          </div>
        </div>

        {/* Meet the Owner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-playfair font-bold text-coffee-dark">
              Meet the Owner
            </h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-playfair font-semibold text-coffee-primary">
                Mohamed
              </h3>
              <p className="text-lg text-coffee-medium leading-relaxed">
                The owner, Mohamed, has a passion for coffee and has combined his travels with his love for Arabic culture in the cafe's design and menu.
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              src="/attached_assets/PHOTO MOHAMED_1751955903969.JPG"
              alt="Mohamed, owner of Coffee Pro, passionate about coffee and Arabic culture"
              className="rounded-xl shadow-lg w-full max-w-sm h-auto object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-coffee-cream rounded-xl p-12 mb-20">
          <h2 className="text-3xl font-playfair font-bold text-coffee-dark text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-none bg-transparent">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-coffee-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-coffee-dark mb-3">
                  Quality Excellence
                </h3>
                <p className="text-coffee-medium">
                  We source premium beans from around the world and craft each cup with traditional Egyptian techniques and modern expertise.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-none bg-transparent">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-coffee-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-coffee-dark mb-3">
                  Community
                </h3>
                <p className="text-coffee-medium">
                  We create a sanctuary in Astoria where locals and visitors can experience authentic Saudi Arabian hospitality.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-none bg-transparent">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-coffee-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-coffee-dark mb-3">
                  Excellence
                </h3>
                <p className="text-coffee-medium">
                  Our passion and unyielding commitment to excellence ensures every cup reflects the finest coffee artistry and craftsmanship.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>


      </div>
    </div>
  );
}
