"use client";

import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Palette,
  Settings,
  Globe,
  Upload,
  Image as ImageIcon,
  ExternalLink,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { createClient } from "../../../../supabase/client";
import { Database } from "@/types/supabase";

type Website = Database["public"]["Tables"]["websites"]["Row"];

interface WebsiteSettingsProps {
  params: {
    websiteId: string;
  };
}

export default function WebsiteSettings({ params }: WebsiteSettingsProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const [website, setWebsite] = useState<Website | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [websiteName, setWebsiteName] = useState("");
  const [websiteDescription, setWebsiteDescription] = useState("");
  const [websiteDomain, setWebsiteDomain] = useState("");
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [imageUrl, setImageUrl] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const colorOptions = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F59E0B" },
    { name: "Pink", value: "#EC4899" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Rose", value: "#F43F5E" },
  ];

  const templateOptions = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary design with bold typography",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional and elegant layout with serif fonts",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and focused design with lots of white space",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold and artistic layout with unique elements",
    },
    {
      id: "business",
      name: "Business",
      description: "Professional corporate design for businesses",
    },
    {
      id: "portfolio",
      name: "Portfolio",
      description: "Showcase-focused design for creative professionals",
    },
  ];

  useEffect(() => {
    fetchWebsite();
  }, [params.websiteId]);

  const fetchWebsite = async () => {
    try {
      const { data, error } = await supabase
        .from("websites")
        .select("*")
        .eq("id", params.websiteId)
        .single();

      if (error) {
        console.error("Error fetching website:", error);
        router.push("/dashboard");
      } else {
        setWebsite(data);
        setWebsiteName(data.name || "");
        setWebsiteDescription(data.description || "");
        setWebsiteDomain(data.domain || "");
        setSelectedColor(data.primary_color || "#3B82F6");
        setSelectedTemplate(data.template || "modern");
        setImageUrl(data.image_url || "");
        setIsPublished(data.is_published || false);
      }
    } catch (error) {
      console.error("Error fetching website:", error);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For demo purposes, we'll use a placeholder image service
      // In a real app, you'd upload to Supabase Storage or another service
      const imageUrl = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80`;
      setImageUrl(imageUrl);
    }
  };

  const handleSave = async () => {
    if (!website) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("websites")
        .update({
          name: websiteName,
          description: websiteDescription,
          domain: websiteDomain,
          primary_color: selectedColor,
          template: selectedTemplate,
          image_url: imageUrl,
          is_published: isPublished,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.websiteId);

      if (error) {
        console.error("Error saving website:", error);
        alert("Error saving website settings. Please try again.");
      } else {
        alert("Website settings saved successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error saving website:", error);
      alert("Error saving website settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <DashboardNavbar />
        <main className="w-full bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <p className="text-gray-500">Loading website settings...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!website) {
    return null;
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Website Settings</h1>
              <p className="text-gray-600 mt-1">Configure your website</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Eye size={16} />
                Preview
              </Button>
              <Button
                variant={isPublished ? "default" : "outline"}
                onClick={() => setIsPublished(!isPublished)}
                className="flex items-center gap-2"
              >
                <ExternalLink size={16} />
                {isPublished ? "Published" : "Publish"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Upload */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon size={20} />
                  Website Image
                </CardTitle>
                <CardDescription>
                  Upload a preview image for your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative border-2 border-dashed border-gray-300">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Website preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon
                          size={48}
                          className="text-gray-400 mx-auto mb-2"
                        />
                        <p className="text-sm text-gray-500">
                          No image uploaded
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center gap-2"
                >
                  <Upload size={16} />
                  Upload Image
                </Button>
                {imageUrl && (
                  <Button
                    variant="ghost"
                    onClick={() => setImageUrl("")}
                    className="w-full text-red-600 hover:text-red-700"
                  >
                    Remove Image
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Basic Settings */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings size={20} />
                  Basic Settings
                </CardTitle>
                <CardDescription>
                  Configure the basic information for your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="website-name">Website Name</Label>
                  <Input
                    id="website-name"
                    placeholder="Enter your website name"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website-description">Description</Label>
                  <Input
                    id="website-description"
                    placeholder="Brief description of your website"
                    value={websiteDescription}
                    onChange={(e) => setWebsiteDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website-domain">Custom Domain</Label>
                  <Input
                    id="website-domain"
                    placeholder="yourdomain.com"
                    value={websiteDomain}
                    onChange={(e) => setWebsiteDomain(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Optional: Connect your custom domain
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Design Settings */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette size={20} />
                  Design Settings
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Primary Color</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        className={`w-full h-12 rounded-lg border-2 transition-all ${
                          selectedColor === color.value
                            ? "border-gray-800 scale-105"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setSelectedColor(color.value)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Template</Label>
                  <div className="space-y-2">
                    {templateOptions.map((template) => (
                      <div
                        key={template.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedTemplate === template.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-gray-600">
                          {template.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Website ID Display */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Globe size={20} />
                Website Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-blue-700">
                    Website ID
                  </Label>
                  <div className="bg-white p-3 rounded-lg border border-blue-200 mt-1">
                    <code className="text-sm font-mono text-blue-700">
                      {params.websiteId}
                    </code>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-blue-700">
                    Status
                  </Label>
                  <div className="bg-white p-3 rounded-lg border border-blue-200 mt-1">
                    <span
                      className={`text-sm font-medium ${
                        isPublished ? "text-green-700" : "text-orange-700"
                      }`}
                    >
                      {isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="mt-8 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              size="lg"
              className="px-8"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Website Settings"}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
