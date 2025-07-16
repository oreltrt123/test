import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  Palette,
  Wand2,
  Rocket,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* Features Section - AI Capabilities */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Powerful AI Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your ideas into stunning websites with our cutting-edge
              AI technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Before/After Examples */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Before & After
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-lg p-6 mb-4 h-32 flex items-center justify-center">
                      <div className="text-gray-400">
                        <Palette className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Hand Sketch</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Rough wireframe</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 mb-4 h-32 flex items-center justify-center">
                      <div className="text-white">
                        <Rocket className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">Live Website</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Production ready</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Capabilities List */}
            <div className="space-y-6">
              {[
                {
                  icon: <Wand2 className="w-6 h-6" />,
                  title: "AI-Powered Design",
                  description:
                    "Convert sketches and wireframes into pixel-perfect designs automatically",
                },
                {
                  icon: <Palette className="w-6 h-6" />,
                  title: "Smart Color Schemes",
                  description:
                    "AI suggests beautiful color palettes that match your brand and industry",
                },
                {
                  icon: <Rocket className="w-6 h-6" />,
                  title: "Instant Deployment",
                  description:
                    "Go from concept to live website in minutes, not weeks",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-blue-600 mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to create your dream website
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Design",
                description:
                  "Upload your sketches, wireframes, or describe your vision. Our AI understands your creative intent.",
                icon: <Palette className="w-12 h-12" />,
              },
              {
                step: "02",
                title: "AI Processing",
                description:
                  "Our advanced AI analyzes your input and generates multiple design variations tailored to your needs.",
                icon: <Wand2 className="w-12 h-12" />,
              },
              {
                step: "03",
                title: "Website Generation",
                description:
                  "Choose your favorite design and watch as we generate a fully functional, responsive website instantly.",
                icon: <Rocket className="w-12 h-12" />,
              },
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gray-200 transform -translate-y-1/2 z-0" />
                )}
                <div className="relative z-10 bg-white">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                    <div className="text-blue-600">{step.icon}</div>
                  </div>
                  <div className="text-sm font-bold text-blue-600 mb-2">
                    STEP {step.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 max-w-sm mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what amazing websites our users have built with Zerlo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Startup Founder",
                website: "TechFlow Solutions",
                quote:
                  "Zerlo transformed my rough sketches into a professional website in under an hour. The AI understood exactly what I wanted!",
                rating: 5,
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
              },
              {
                name: "Marcus Rodriguez",
                role: "Creative Director",
                website: "Design Studio Pro",
                quote:
                  "The AI's design suggestions were spot-on. It felt like having a senior designer on my team, available 24/7.",
                rating: 5,
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
              },
              {
                name: "Emily Watson",
                role: "Small Business Owner",
                website: "Local Bakery Co",
                quote:
                  "I had zero coding experience, but Zerlo made it possible for me to create a beautiful website for my bakery.",
                rating: 5,
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                      {testimonial.website}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Start Building Your Dream Website
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of creators who've already transformed their ideas
            into stunning websites with Zerlo's AI
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="/sign-up"
              className="inline-flex items-center px-8 py-4 text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
            >
              Start Building Free
              <ArrowUpRight className="ml-2 w-5 h-5" />
            </a>
            <div className="text-sm opacity-75">
              ✨ Free trial • No credit card required
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Websites Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5 min</div>
              <div className="text-blue-100">Average Build Time</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
