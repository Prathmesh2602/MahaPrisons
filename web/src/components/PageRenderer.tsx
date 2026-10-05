import ContactInfoGrid from '../templates/ContactInfoGrid';
import ContentWithRightSidebar from '../templates/ContentWithRightSidebar';
import ContentWithTabs from '../templates/ContentWithTabs';
import BasicFeatureGrid from '../templates/BasicFeatureGrid';
import CardsAndVerticalTimeline from '../templates/CardsAndVerticalTimeline';
import IconsListWithTimeline from '../templates/IconsListWithTimeline';
import MinimalIconGrid from '../templates/MinimalIconGrid';
import HeroBannerWithArticles from '../templates/HeroBannerWithArticles';
import SideBySideListCards from '../templates/SideBySideListCards';
import HeroBannerWithBadges from '../templates/HeroBannerWithBadges';
import HeroBannerWithMedia from '../templates/HeroBannerWithMedia';
import ContentWithAccordion from '../templates/ContentWithAccordion';
import ThreeColServiceCards from '../templates/ThreeColServiceCards';
import TwoColEventCards from '../templates/TwoColEventCards';
import HeroWithProcessGrid from '../templates/HeroWithProcessGrid';
import HeroWithPricingList from '../templates/HeroWithPricingList';
import HeroWithMenuGrid from '../templates/HeroWithMenuGrid';
import React from 'react';
import { normalizeTemplateData } from '../utils/templateDataNormalizer';
import HeroFeaturesTimelineLayout from '../templates/HeroFeaturesTimelineLayout';
import HeroStatsGrid from '../templates/HeroStatsGrid';
import HeroThreeColGrid from '../templates/HeroThreeColGrid';
import HeroSplitTimeline from '../templates/HeroSplitTimeline';
import HeroFeatureList from '../templates/HeroFeatureList';
import YerawadaOpenJailPage from '../views/PrisonSystem';
import GalleryPage from '../views/Gallery';
import OurProductsPage from '../views/OurProducts';
import NurseryPage from '../views/agriculture/NurseryPage';
import PoultryFarmingPage from '../views/agriculture/PoultryFarmingPage';
import DairyFarmingPage from '../views/agriculture/DairyFarmingPage';
import GoatFarmingPage from '../views/agriculture/GoatFarmingPage';
import MushroomProjectPage from '../views/agriculture/MushroomProjectPage';
import VermicompostProjectPage from '../views/agriculture/VermicompostProjectPage';
import InnovativeActivitiesPage from '../views/agriculture/InnovativeActivitiesPage';

import AdministrationPage from '../views/administrative/AdministrationPage';
import EstablishmentPage from '../views/administrative/EstablishmentPage';
import JudicialPage from '../views/administrative/JudicialPage';
import RationPage from '../views/administrative/RationPage';
import CanteenPage from '../views/administrative/CanteenPage';
import InterviewPage from '../views/administrative/InterviewPage';
import HospitalPage from '../views/administrative/HospitalPage';
import FactoryPage from '../views/administrative/FactoryPage';
import AgricultureDepartmentPage from '../views/administrative/AgricultureDepartmentPage';
import IndustryPage from '../views/administrative/IndustryPage';
import InternalSecurityPage from '../views/administrative/InternalSecurityPage';
import ConstructionPage from '../views/administrative/ConstructionPage';

import SalonPage from '../views/social/SalonPage';
import LaundryPage from '../views/social/LaundryPage';
import ShrinkhalaCanteenPage from '../views/social/ShrinkhalaCanteenPage';
import MangalLawnPage from '../views/social/MangalLawnPage';
import MindaUnitPage from '../views/social/MindaUnitPage';

import PrisonerInterviewPage from '../views/facilities/PrisonerInterviewPage';
import SmartCardPhonePage from '../views/facilities/SmartCardPhonePage';
import CorrespondencePage from '../views/facilities/CorrespondencePage';
import FreeLegalAidPage from '../views/facilities/FreeLegalAidPage';
import DistrictLegalServicesPage from '../views/facilities/DistrictLegalServicesPage';
import FurloughParolePage from '../views/facilities/FurloughParolePage';
import RemissionPage from '../views/facilities/RemissionPage';
import HirkaniRoomPage from '../views/facilities/HirkaniRoomPage';
import GymnasiumPage from '../views/facilities/GymnasiumPage';
import WetCanteenPage from '../views/facilities/WetCanteenPage';
import EducationPage from '../views/facilities/EducationPage';
import LibraryPage from '../views/facilities/LibraryPage';

import AwarenessProgramsPage from '../views/cultural/AwarenessProgramsPage';
import DeAddictionPage from '../views/cultural/DeAddictionPage';
import VocationalTrainingPage from '../views/cultural/VocationalTrainingPage';
import YogaMeditationPage from '../views/cultural/YogaMeditationPage';
import PranicHealingPage from '../views/cultural/PranicHealingPage';
import KirtanBhajanPage from '../views/cultural/KirtanBhajanPage';
import NotableInitiativesPage from '../views/notable-work/NotableInitiativesPage';
import ImportantProjectsPage from '../views/notable-work/ImportantProjectsPage';
import AwardsHonorsPage from '../views/notable-work/AwardsHonorsPage';
import BestPracticesPage from '../views/notable-work/BestPracticesPage';
import SuccessStoriesPage from '../views/notable-work/SuccessStoriesPage';
import EducationalVisitsPage from '../views/tours-visits/EducationalVisitsPage';
import InstitutionalVisitsPage from '../views/tours-visits/InstitutionalVisitsPage';
import OfficialToursPage from '../views/tours-visits/OfficialToursPage';
import DignitaryVisitsPage from '../views/tours-visits/DignitaryVisitsPage';
import InspectionToursPage from '../views/tours-visits/InspectionToursPage';
import DepartmentalVisitsPage from '../views/tours-visits/DepartmentalVisitsPage';
import ContactPage from '../views/contact/ContactPage';
import HomePage from '../views/HomePage';
import { BlankPageFallback } from './BlankPageFallback';

interface PageRendererProps {
  slug: string;
  layoutType?: string;
  pageData?: any;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ slug, layoutType, pageData }) => {
  const templateLayouts = ['HeroFeaturesTimelineLayout', 'HeroStatsGrid', 'HeroThreeColGrid', 'HeroSplitTimeline', 'HeroFeatureList', 'ContactInfoGrid', 'ContentWithRightSidebar', 'ContentWithTabs', 'BasicFeatureGrid', 'CardsAndVerticalTimeline', 'IconsListWithTimeline', 'MinimalIconGrid', 'HeroBannerWithArticles', 'SideBySideListCards', 'HeroBannerWithBadges', 'HeroBannerWithMedia', 'ContentWithAccordion', 'ThreeColServiceCards', 'TwoColEventCards', 'HeroWithProcessGrid', 'HeroWithPricingList', 'HeroWithMenuGrid', 'GalleryLayout', 'ProductsLayout', 'ContactUsLayout'];
  if (layoutType && templateLayouts.includes(layoutType)) {
    const rawData = pageData?.contentBlocks?.find((b: any) => b.blockType === 'page_template_data')?.content;
    const templateData = normalizeTemplateData(rawData, layoutType);
    
    if (layoutType === 'HeroFeaturesTimelineLayout') {
      return <HeroFeaturesTimelineLayout dataId={slug} data={templateData} />;
    } else if (layoutType === 'HeroStatsGrid') {
      return <HeroStatsGrid dataId={slug} data={templateData} />;
    } else if (layoutType === 'HeroThreeColGrid') {
      return <HeroThreeColGrid dataId={slug} data={templateData} />;
    } else if (layoutType === 'HeroSplitTimeline') {
      return <HeroSplitTimeline dataId={slug} data={templateData} />;
    } else if (layoutType === 'HeroFeatureList') {
      return <HeroFeatureList dataId={slug} data={templateData} />;
    } else if (layoutType === 'ContactInfoGrid') {
      return <ContactInfoGrid dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'ContentWithRightSidebar') {
      return <ContentWithRightSidebar dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'ContentWithTabs') {
      return <ContentWithTabs dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'BasicFeatureGrid') {
      return <BasicFeatureGrid dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'CardsAndVerticalTimeline') {
      return <CardsAndVerticalTimeline dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'IconsListWithTimeline') {
      return <IconsListWithTimeline dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'MinimalIconGrid') {
      return <MinimalIconGrid dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'HeroBannerWithArticles') {
      return <HeroBannerWithArticles dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'SideBySideListCards') {
      return <SideBySideListCards dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'HeroBannerWithBadges') {
      return <HeroBannerWithBadges dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'HeroBannerWithMedia') {
      return <HeroBannerWithMedia dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'ContentWithAccordion') {
      return <ContentWithAccordion dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'ThreeColServiceCards') {
      return <ThreeColServiceCards dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'TwoColEventCards') {
      return <TwoColEventCards dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'HeroWithProcessGrid') {
      return <HeroWithProcessGrid dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'HeroWithPricingList') {
      return <HeroWithPricingList dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'HeroWithMenuGrid') {
      return <HeroWithMenuGrid dataId={slug.split('/').pop()} data={templateData} />;
    } else if (layoutType === 'GalleryLayout') {
      return <GalleryPage data={templateData} />;
    } else if (layoutType === 'ProductsLayout') {
      return <OurProductsPage data={templateData} />;
    } else if (layoutType === 'ContactUsLayout') {
      return <ContactPage data={templateData} />;
    }
  }

  // Treat root or empty slug as HomePage
  if (!slug || slug === '/' || slug === 'home') {
    return <HomePage pageData={pageData} />;
  }

  switch (slug) {
    case 'yerawada-open-jail':
      return <YerawadaOpenJailPage pageData={pageData} />;
    case 'agriculture/nursery':
      return <NurseryPage />;
    case 'agriculture/poultry-farming':
      return <PoultryFarmingPage />;
    case 'agriculture/dairy-farming':
      return <DairyFarmingPage />;
    case 'agriculture/goat-farming':
      return <GoatFarmingPage />;
    case 'agriculture/mushroom-project':
      return <MushroomProjectPage />;
    case 'agriculture/vermicompost-project':
      return <VermicompostProjectPage />;
    case 'agriculture/innovative-activities':
      return <InnovativeActivitiesPage />;
    case 'administrative/administration':
      return <AdministrationPage />;
    case 'administrative/establishment':
      return <EstablishmentPage />;
    case 'administrative/judicial':
      return <JudicialPage />;
    case 'administrative/ration':
      return <RationPage />;
    case 'administrative/canteen':
      return <CanteenPage />;
    case 'administrative/interview':
      return <InterviewPage />;
    case 'administrative/hospital':
      return <HospitalPage />;
    case 'administrative/factory':
      return <FactoryPage />;
    case 'administrative/agriculture':
      return <AgricultureDepartmentPage />;
    case 'administrative/industry':
      return <IndustryPage />;
    case 'administrative/internal-security':
      return <InternalSecurityPage />;
    case 'administrative/construction':
      return <ConstructionPage />;
    case 'social/salon':
      return <SalonPage />;
    case 'social/laundry':
      return <LaundryPage />;
    case 'social/shrinkhala-canteen':
      return <ShrinkhalaCanteenPage />;
    case 'social/mangal-lawn':
      return <MangalLawnPage />;
    case 'social/minda-unit':
      return <MindaUnitPage />;
    case 'facilities/prisoner-interview':
      return <PrisonerInterviewPage />;
    case 'facilities/smart-card-phone':
      return <SmartCardPhonePage />;
    case 'facilities/correspondence':
      return <CorrespondencePage />;
    case 'facilities/free-legal-aid':
      return <FreeLegalAidPage />;
    case 'facilities/district-legal-services':
      return <DistrictLegalServicesPage />;
    case 'facilities/furlough-parole':
      return <FurloughParolePage />;
    case 'facilities/remission':
      return <RemissionPage />;
    case 'facilities/hirkani-room':
      return <HirkaniRoomPage />;
    case 'facilities/gymnasium':
      return <GymnasiumPage />;
    case 'facilities/wet-canteen':
      return <WetCanteenPage />;
    case 'facilities/education':
      return <EducationPage />;
    case 'facilities/library':
      return <LibraryPage />;
    case 'cultural/awareness-programs':
      return <AwarenessProgramsPage />;
    case 'cultural/de-addiction':
      return <DeAddictionPage />;
    case 'cultural/vocational-training':
      return <VocationalTrainingPage />;
    case 'cultural/yoga-meditation':
      return <YogaMeditationPage />;
    case 'cultural/pranic-healing':
      return <PranicHealingPage />;
    case 'cultural/kirtan-bhajan':
      return <KirtanBhajanPage />;
    case 'notable-work/initiatives':
      return <NotableInitiativesPage />;
    case 'notable-work/important-projects':
      return <ImportantProjectsPage />;
    case 'notable-work/awards-honors':
      return <AwardsHonorsPage />;
    case 'notable-work/best-practices':
      return <BestPracticesPage />;
    case 'notable-work/success-stories':
      return <SuccessStoriesPage />;
    case 'tours-visits/educational-visits':
      return <EducationalVisitsPage />;
    case 'tours-visits/institutional-visits':
      return <InstitutionalVisitsPage />;
    case 'tours-visits/official-tours':
      return <OfficialToursPage />;
    case 'tours-visits/dignitary-visits':
      return <DignitaryVisitsPage />;
    case 'tours-visits/inspection-tours':
      return <InspectionToursPage />;
    case 'tours-visits/departmental-visits':
      return <DepartmentalVisitsPage />;
    case 'contact':
      const contactData = pageData?.contentBlocks?.find((b: any) => b.blockType === 'page_template_data')?.content;
      return <ContactPage data={normalizeTemplateData(contactData, 'ContactUsLayout')} />;
    default:
      return <BlankPageFallback path={slug} />;
  }
};
