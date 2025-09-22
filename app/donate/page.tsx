"use client";

import type React from "react";

import { useState } from "react";
import {
  ArrowRight,
  Box,
  Droplet,
  Gift,
  Loader2,
  Package,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function DonatePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Donation submitted",
        description:
          "Thank you for your donation to support disaster relief efforts.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-2 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              Donate to Relief Efforts
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Your donations help provide essential supplies and support to
              those affected by disasters
            </p>
          </div>

          {/* Resource Cards */}
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ResourceCard
              icon={
                <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
              }
              title="Food Supplies"
              current={1250}
              target={2000}
              unit="meals"
              color="bg-orange-500"
            />

            <ResourceCard
              icon={<Droplet className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />}
              title="Clean Water"
              current={3500}
              target={5000}
              unit="liters"
              color="bg-blue-500"
            />

            <ResourceCard
              icon={<Box className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />}
              title="Shelter Kits"
              current={85}
              target={200}
              unit="kits"
              color="bg-purple-500"
            />
          </div>

          {/* Donation Forms */}
          <div className="w-full max-w-4xl mx-auto">
            <Tabs defaultValue="money" className="space-y-6">
              <div className="flex justify-center">
                <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/80 backdrop-blur-sm shadow-lg">
                  <TabsTrigger value="money" className="text-sm sm:text-base">
                    Monetary Donation
                  </TabsTrigger>
                  <TabsTrigger
                    value="supplies"
                    className="text-sm sm:text-base"
                  >
                    Supply Donation
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="money">
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <form onSubmit={handleSubmit}>
                    <CardHeader className="text-center pb-4 sm:pb-6">
                      <CardTitle className="text-xl sm:text-2xl">
                        Donate Funds
                      </CardTitle>
                      <CardDescription className="text-sm sm:text-base px-2 sm:px-0">
                        Your financial contribution helps us purchase necessary
                        supplies and provide assistance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                      <div className="space-y-2">
                        <Label className="text-sm sm:text-base">
                          Donation Amount
                        </Label>
                        <RadioGroup
                          defaultValue="50"
                          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4"
                        >
                          {["100", "250", "500", "1000"].map((amount) => (
                            <div key={amount}>
                              <RadioGroupItem
                                value={amount}
                                id={`amount-${amount}`}
                                className="sr-only peer"
                              />
                              <Label
                                htmlFor={`amount-${amount}`}
                                className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-sm sm:text-base"
                              >
                                ₹{amount}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                        <div className="mt-2 sm:mt-4">
                          <Label
                            htmlFor="custom-amount"
                            className="text-sm sm:text-base"
                          >
                            Custom Amount
                          </Label>
                          <div className="relative mt-1">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                              ₹
                            </span>
                            <Input
                              id="custom-amount"
                              type="number"
                              min="1"
                              placeholder="    Enter amount"
                              className="pl-7 h-10 sm:h-12"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm sm:text-base">
                          Allocation (Optional)
                        </Label>
                        <Select>
                          <SelectTrigger className="h-10 sm:h-12">
                            <SelectValue placeholder="Where should your donation go?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">
                              General Relief Fund
                            </SelectItem>
                            <SelectItem value="food">Food Supplies</SelectItem>
                            <SelectItem value="water">Clean Water</SelectItem>
                            <SelectItem value="shelter">Shelter</SelectItem>
                            <SelectItem value="medical">
                              Medical Supplies
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-sm sm:text-base"
                          >
                            Full Name *
                          </Label>
                          <Input id="name" required className="h-10 sm:h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-sm sm:text-base"
                          >
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            className="h-10 sm:h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-sm sm:text-base"
                        >
                          Message (Optional)
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Add a message of support"
                          className="min-h-[80px] sm:min-h-[100px] resize-none"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="px-4 sm:px-6">
                      <Button
                        type="submit"
                        className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Donate Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="supplies">
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <form onSubmit={handleSubmit}>
                    <CardHeader className="text-center pb-4 sm:pb-6">
                      <CardTitle className="text-xl sm:text-2xl">
                        Donate Supplies
                      </CardTitle>
                      <CardDescription className="text-sm sm:text-base px-2 sm:px-0">
                        Donate essential items that are needed for disaster
                        relief efforts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                      <div className="space-y-2">
                        <Label className="text-sm sm:text-base">
                          Supply Type
                        </Label>
                        <Select required>
                          <SelectTrigger className="h-10 sm:h-12">
                            <SelectValue placeholder="Select supply type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="food">
                              Food (Non-perishable)
                            </SelectItem>
                            <SelectItem value="water">Bottled Water</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="blankets">Blankets</SelectItem>
                            <SelectItem value="hygiene">
                              Hygiene Products
                            </SelectItem>
                            <SelectItem value="medical">
                              Medical Supplies
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="quantity"
                          className="text-sm sm:text-base"
                        >
                          Quantity
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            required
                            className="h-10 sm:h-12 flex-1"
                          />
                          <Select defaultValue="units">
                            <SelectTrigger className="w-24 sm:w-32 h-10 sm:h-12">
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="units">Units</SelectItem>
                              <SelectItem value="boxes">Boxes</SelectItem>
                              <SelectItem value="kg">Kilograms</SelectItem>
                              <SelectItem value="liters">Liters</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="description"
                          className="text-sm sm:text-base"
                        >
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Please describe the items you are donating"
                          required
                          className="min-h-[80px] sm:min-h-[100px] resize-none"
                        />
                      </div>

                      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-sm sm:text-base"
                          >
                            Full Name *
                          </Label>
                          <Input id="name" required className="h-10 sm:h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="contact"
                            className="text-sm sm:text-base"
                          >
                            Contact Number *
                          </Label>
                          <Input
                            id="contact"
                            type="tel"
                            required
                            className="h-10 sm:h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="dropoff"
                          className="text-sm sm:text-base"
                        >
                          Drop-off Location
                        </Label>
                        <Select required>
                          <SelectTrigger id="dropoff" className="h-10 sm:h-12">
                            <SelectValue placeholder="Select a drop-off location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="center1">
                              Main Relief Center - 123 Main St
                            </SelectItem>
                            <SelectItem value="center2">
                              Downtown Collection Point - 456 Market St
                            </SelectItem>
                            <SelectItem value="center3">
                              Westside Community Center - 789 West Ave
                            </SelectItem>
                            <SelectItem value="pickup">
                              Request Pickup (Limited Availability)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    <CardFooter className="px-4 sm:px-6">
                      <Button
                        type="submit"
                        className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Submit Donation
                            <Package className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({
  icon,
  title,
  current,
  target,
  unit,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}) {
  const percentage = Math.min(Math.round((current / target) * 100), 100);

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-lg bg-muted">{icon}</div>
          <div className="text-right">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold">
              {current}
            </span>
            <span className="text-sm sm:text-base text-muted-foreground">
              /{target}
            </span>
          </div>
        </div>
        <CardTitle className="mt-2 text-base sm:text-lg">{title}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          {current} out of {target} {unit} collected
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{percentage}%</span>
          </div>
          <Progress value={percentage} className={color} />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full text-xs sm:text-sm">
          <Gift className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Donate {title}
        </Button>
      </CardFooter>
    </Card>
  );
}
