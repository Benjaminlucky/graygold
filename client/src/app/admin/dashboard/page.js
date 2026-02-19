"use client";

import { useDashboard } from "./layout";
import OverviewSection from "./components/OverviewSection";
import PropertiesSection from "./components/PropertiesSection";
import {
  InquiriesSection,
  ContactsSection,
  NewsletterSection,
} from "./components/OtherSections";

export default function DashboardPage() {
  const { activeTab } = useDashboard();

  return (
    <>
      {activeTab === "overview" && <OverviewSection />}
      {activeTab === "properties" && <PropertiesSection />}
      {activeTab === "inquiries" && <InquiriesSection />}
      {activeTab === "contacts" && <ContactsSection />}
      {activeTab === "newsletter" && <NewsletterSection />}
    </>
  );
}
