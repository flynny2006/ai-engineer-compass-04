
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText = "Get Started",
  buttonVariant = "default",
  popular = false,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "secondary";
  popular?: boolean;
}) => (
  <Card className={`flex flex-col ${popular ? "border-primary shadow-lg" : ""}`}>
    {popular && (
      <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
        Most Popular
      </div>
    )}
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
      <div className="mt-4 flex items-baseline">
        <span className="text-3xl font-bold tracking-tight">{price}</span>
        <span className="ml-1 text-sm font-medium text-muted-foreground">lifetime</span>
      </div>
      <CardDescription className="mt-2">{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button className="w-full" variant={buttonVariant as any}>
        {buttonText}
      </Button>
    </CardFooter>
  </Card>
);

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Simple, transparent pricing</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Choose the plan that works best for you and your team
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <PricingCard
            title="Free"
            price="$0"
            description="Perfect for hobbyists and personal projects"
            features={[
              "25 Daily Credits",
              "Private Projects",
              "Access Code"
            ]}
            buttonText="Start for Free"
            buttonVariant="outline"
          />

          {/* Pro Plan */}
          <PricingCard
            title="Pro"
            price="$5"
            description="Great for individuals and small teams"
            features={[
              "800 Monthly Credits",
              "50 Bonus Credits",
              "Publish Projects",
              "Access Code",
              "Earlier Access to new Features"
            ]}
            buttonText="Upgrade to Pro"
            popular={true}
          />

          {/* Teams Plan */}
          <PricingCard
            title="Teams"
            price="$10"
            description="Perfect for organizations and larger teams"
            features={[
              "2700 Monthly Credits",
              "200 Bonus Credits",
              "Publish Projects",
              "Access Code", 
              "Earlier Access to new Features",
              "Allow multiple Projects"
            ]}
            buttonText="Upgrade to Teams"
            buttonVariant="secondary"
          />
        </div>

        <div className="mt-16 text-center">
          <Button variant="ghost" onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
