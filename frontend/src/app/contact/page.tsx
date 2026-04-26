"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, simulate successful submission
    // In a real application, this would call the backend API
    console.log("Contact form submitted:", formData);
    console.log("Email would be sent to: mahamazam18@gmail.com");
    
    setSubmitStatus("success");
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      content: "mahamazam18@gmail.com",
      link: "mailto:mahamazam18@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      content: "+92 325 8180484",
      link: "tel:+923258180484",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Hours",
      content: "Mon-Sat: 6AM-8PM | Sun: 7AM-6PM",
      link: null,
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background elements - matching homepage */}
      <div className="absolute inset-0 opacity-10">
        <div className="bg-orb w-[600px] h-[600px] bg-amber-500 top-[-200px] left-[-200px]" />
        <div className="bg-orb w-[400px] h-[400px] bg-orange-600 bottom-[-100px] right-[-100px]" />
        <div className="bg-orb w-[300px] h-[300px] bg-yellow-500 top-[30%] right-[20%]" style={{ opacity: 0.06 }} />
      </div>

      {/* Grid overlay - matching homepage */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(251,146,60,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(251,146,60,0.8) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="shimmer-text text-3d">Contact Us</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our baked goods, custom orders, or delivery in Lahore, Pakistan? We&apos;re here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-white">Get in Touch</CardTitle>
                <CardDescription className="text-muted-foreground">
                  We&apos;d love to hear from you in Lahore, Pakistan. Reach out through any of these channels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-amber-900/20 to-orange-900/10">
                      <div className="text-amber-400">{info.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-amber-400 transition-colors"
                          target={info.link.startsWith("http") ? "_blank" : undefined}
                          rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>


          </div>

          {/* Contact Form */}
          <div>
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-white">Send a Message</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you within 24 hours from our Lahore bakery.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="bg-white/5 border-white/10 focus:border-amber-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="bg-white/5 border-white/10 focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                      className="bg-white/5 border-white/10 focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your inquiry..."
                      rows={6}
                      required
                      className="bg-white/5 border-white/10 focus:border-amber-400 resize-none"
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-green-900/20 border border-green-700/30">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <p className="text-green-400 text-sm">
                        Message submitted successfully! We&apos;ll get back to you soon.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-900/20 border border-red-700/30">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <p className="text-red-400 text-sm">
                        Something went wrong. Please try again or contact us directly.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="glow-btn w-full py-6 text-lg font-bold flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-900 border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our{" "}
                    <a href="#" className="text-amber-400 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>


          </div>
        </div>
      </div>
    </div>
  );
}