import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const partners = [
  { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
  { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
  { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  { name: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
  { name: "Dropbox", logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg" },
];

export const LogoMarquee = () => {
  const [duplicatedPartners] = useState([...partners, ...partners, ...partners]);

  return (
    <section className="py-20 bg-secondary/40">
      <div className="container mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xl md:text-2xl font-serif text-foreground"
        >
          More than 100+ companies trust us worldwide
        </motion.h2>
      </div>

      <div className="marquee-container">
        <div className="marquee-content">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center h-14 w-36 opacity-40 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
