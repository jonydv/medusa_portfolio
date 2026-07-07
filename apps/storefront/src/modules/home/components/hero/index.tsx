import { Github } from "@medusajs/icons";
import { MEDUSA_SOURCE_URL } from "@lib/constants";
import { Button, Heading } from "@modules/common/components/ui";
import { getTranslations } from "next-intl/server";

const Hero = async () => {
  const t = await getTranslations("home.hero");

  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-3xl leading-10 text-ui-fg-base font-normal"
          >
            {t("title")}
          </Heading>
          <Heading
            level="h2"
            className="text-3xl leading-10 text-ui-fg-subtle font-normal"
          >
            {t("subtitle")}
          </Heading>
        </span>
        <a href={MEDUSA_SOURCE_URL} target="_blank" rel="noreferrer">
          <Button variant="primary">
            {t("cta")} <Github />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Hero;
