import { getSettingsData, getLandingData } from "@/lib/api";
import DocumentPage from "@/components/DocumentPage";
import { Suspense } from "react";

export default async function Page() {
  const settings = await getSettingsData();
  const landingData = await getLandingData();
  const footerData = landingData.footer;
  const logoData = footerData.settings.logo;
  const heroData = landingData.homePage.banner;

  return (
    <Suspense fallback={<div className="container-default py-16" />}>
      <DocumentPage
        title="Privacy Policy"
        content={settings.privacyPolicy}
        logoData={logoData}
        footerData={footerData}
        heroData={heroData}
      />
    </Suspense>
  );
}
