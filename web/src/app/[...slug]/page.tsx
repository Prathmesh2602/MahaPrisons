import React from 'react';
import YerawadaOpenJailPage from '../../pages/PrisonSystem';
import GalleryPage from '../../pages/Gallery';
import OurProductsPage from '../../pages/OurProducts';
import NurseryPage from '../../pages/agriculture/NurseryPage';
import PoultryFarmingPage from '../../pages/agriculture/PoultryFarmingPage';
import DairyFarmingPage from '../../pages/agriculture/DairyFarmingPage';
import GoatFarmingPage from '../../pages/agriculture/GoatFarmingPage';
import MushroomProjectPage from '../../pages/agriculture/MushroomProjectPage';
import VermicompostProjectPage from '../../pages/agriculture/VermicompostProjectPage';
import InnovativeActivitiesPage from '../../pages/agriculture/InnovativeActivitiesPage';

import AdministrationPage from '../../pages/administrative/AdministrationPage';
import EstablishmentPage from '../../pages/administrative/EstablishmentPage';
import JudicialPage from '../../pages/administrative/JudicialPage';
import RationPage from '../../pages/administrative/RationPage';
import CanteenPage from '../../pages/administrative/CanteenPage';
import InterviewPage from '../../pages/administrative/InterviewPage';
import HospitalPage from '../../pages/administrative/HospitalPage';
import FactoryPage from '../../pages/administrative/FactoryPage';
import AgricultureDepartmentPage from '../../pages/administrative/AgricultureDepartmentPage';
import IndustryPage from '../../pages/administrative/IndustryPage';
import InternalSecurityPage from '../../pages/administrative/InternalSecurityPage';
import ConstructionPage from '../../pages/administrative/ConstructionPage';

import SalonPage from '../../pages/social/SalonPage';
import LaundryPage from '../../pages/social/LaundryPage';
import ShrinkhalaCanteenPage from '../../pages/social/ShrinkhalaCanteenPage';
import MangalLawnPage from '../../pages/social/MangalLawnPage';
import MindaUnitPage from '../../pages/social/MindaUnitPage';

import PrisonerInterviewPage from '../../pages/facilities/PrisonerInterviewPage';
import SmartCardPhonePage from '../../pages/facilities/SmartCardPhonePage';
import CorrespondencePage from '../../pages/facilities/CorrespondencePage';
import FreeLegalAidPage from '../../pages/facilities/FreeLegalAidPage';
import DistrictLegalServicesPage from '../../pages/facilities/DistrictLegalServicesPage';
import FurloughParolePage from '../../pages/facilities/FurloughParolePage';
import RemissionPage from '../../pages/facilities/RemissionPage';
import HirkaniRoomPage from '../../pages/facilities/HirkaniRoomPage';
import GymnasiumPage from '../../pages/facilities/GymnasiumPage';
import WetCanteenPage from '../../pages/facilities/WetCanteenPage';
import EducationPage from '../../pages/facilities/EducationPage';
import LibraryPage from '../../pages/facilities/LibraryPage';

import AwarenessProgramsPage from '../../pages/cultural/AwarenessProgramsPage';
import DeAddictionPage from '../../pages/cultural/DeAddictionPage';
import VocationalTrainingPage from '../../pages/cultural/VocationalTrainingPage';
import YogaMeditationPage from '../../pages/cultural/YogaMeditationPage';
import PranicHealingPage from '../../pages/cultural/PranicHealingPage';
import KirtanBhajanPage from '../../pages/cultural/KirtanBhajanPage';
import NotableInitiativesPage from '../../pages/notable-work/NotableInitiativesPage';
import ImportantProjectsPage from '../../pages/notable-work/ImportantProjectsPage';
import AwardsHonorsPage from '../../pages/notable-work/AwardsHonorsPage';
import BestPracticesPage from '../../pages/notable-work/BestPracticesPage';
import SuccessStoriesPage from '../../pages/notable-work/SuccessStoriesPage';
import EducationalVisitsPage from '../../pages/tours-visits/EducationalVisitsPage';
import InstitutionalVisitsPage from '../../pages/tours-visits/InstitutionalVisitsPage';
import OfficialToursPage from '../../pages/tours-visits/OfficialToursPage';
import DignitaryVisitsPage from '../../pages/tours-visits/DignitaryVisitsPage';
import InspectionToursPage from '../../pages/tours-visits/InspectionToursPage';
import DepartmentalVisitsPage from '../../pages/tours-visits/DepartmentalVisitsPage';
import ContactPage from '../../pages/contact';

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = await params;
  const path = slug.join('/');

  switch (path) {
    case 'yerawada-open-jail':
      return <YerawadaOpenJailPage />;
    case 'gallery':
      return <GalleryPage />;
    case 'our-products':
      return <OurProductsPage />;
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
      return <ContactPage />;
    default:
      return <div>Page Not Found</div>;
  }
}
