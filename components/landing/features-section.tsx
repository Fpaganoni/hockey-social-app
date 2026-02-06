"use client";

import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  TrendingUp,
  MessageCircle,
  Globe,
  Trophy,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export function FeaturesSection() {
  const t = useTranslations("landing.features");

  const features = [
    {
      icon: Users,
      key: "connect",
      color: "text-primary",
    },
    {
      icon: Briefcase,
      key: "opportunities",
      color: "text-accent",
    },
    {
      icon: TrendingUp,
      key: "journey",
      color: "text-primary",
    },
    {
      icon: MessageCircle,
      key: "messaging",
      color: "text-accent",
    },
    {
      icon: Globe,
      key: "network",
      color: "text-primary",
    },
    {
      icon: Trophy,
      key: "achievements",
      color: "text-accent",
    },
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-3000 cursor-pointer border-2 hover:border-primary/40 bg-surface-elevated">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon size={24} className={feature.color} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {t(`items.${feature.key}.title`)}
                    </h3>
                    <p className="text-foreground-muted">
                      {t(`items.${feature.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
