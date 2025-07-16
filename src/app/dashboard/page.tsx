"use client";

import DashboardNavbar from "@/components/dashboard-navbar";
import { InfoIcon, Plus, Globe, Settings, Trash2 } from "lucide-react";
import { createClient } from "../../../supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Database } from "@/types/supabase";

type Website = Database["public"]["Tables"]["websites"]["Row"];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/sign-in");
      } else {
        setUser(user);
        await fetchWebsites(user.id);
      }
    };
    getUser();
  }, []);

  const fetchWebsites = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("websites")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching websites:", error);
      } else {
        setWebsites(data || []);
      }
    } catch (error) {
      console.error("Error fetching websites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWebsite = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("websites")
        .insert({
          user_id: user.id,
          name: "New Website",
          description: "A new AI-powered website",
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating website:", error);
        alert("Error creating website. Please try again.");
      } else {
        router.push(`/website/${data.id}`);
      }
    } catch (error) {
      console.error("Error creating website:", error);
      alert("Error creating website. Please try again.");
    }
  };

  const handleDeleteWebsite = async (websiteId: string) => {
    if (!confirm("Are you sure you want to delete this website?")) return;

    try {
      const { error } = await supabase
        .from("websites")
        .delete()
        .eq("id", websiteId);

      if (error) {
        console.error("Error deleting website:", error);
        alert("Error deleting website. Please try again.");
      } else {
        setWebsites(websites.filter((w) => w.id !== websiteId));
      }
    } catch (error) {
      console.error("Error deleting website:", error);
      alert("Error deleting website. Please try again.");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>Create and manage your AI-powered websites</span>
            </div>
          </header>

          {/* Websites Section */}
          <section className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
                Your Websites ({websites.length})
              </h2>
              <Button
                onClick={handleCreateWebsite}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Create Website
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading websites...</p>
              </div>
            ) : websites.length === 0 ? (
              <Card className="border-dashed border-2 border-gray-300 bg-white">
                <CardHeader className="text-center py-12">
                  <CardTitle className="text-gray-600">
                    No websites yet
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    Get started by creating your first AI-powered website
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center pb-12">
                  <Button
                    onClick={handleCreateWebsite}
                    size="lg"
                    className="flex items-center gap-2 mx-auto"
                  >
                    <Plus size={20} />
                    Create Your First Website
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {websites.map((website) => (
                  <Card
                    key={website.id}
                    className="bg-white hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                        {website.image_url ? (
                          <Image
                            src={website.image_url}
                            alt={website.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                            <Globe size={48} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-lg">{website.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {website.description || "No description"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                            style={{
                              backgroundColor:
                                website.primary_color || "#3B82F6",
                            }}
                          />
                          <span className="text-xs text-gray-500 capitalize">
                            {website.template || "modern"}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              router.push(`/website/${website.id}`)
                            }
                          >
                            <Settings size={14} className="mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteWebsite(website.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-gray-500">
                        Created{" "}
                        {new Date(website.created_at).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
