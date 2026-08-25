import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './hooks/useAccessibility';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import YerawadaOpenJailPage from './pages/PrisonSystem';
import GalleryPage from './pages/GalleryPage';
import OurProductsPage from './pages/OurProductsPage';
import NurseryPage from './pages/agriculture/NurseryPage';
import PoultryFarmingPage from './pages/agriculture/PoultryFarmingPage';
import DairyFarmingPage from './pages/agriculture/DairyFarmingPage';
import GoatFarmingPage from './pages/agriculture/GoatFarmingPage';
import MushroomProjectPage from './pages/agriculture/MushroomProjectPage';
import VermicompostProjectPage from './pages/agriculture/VermicompostProjectPage';
import InnovativeActivitiesPage from './pages/agriculture/InnovativeActivitiesPage';

import AdministrationPage from './pages/administrative/AdministrationPage';
import EstablishmentPage from './pages/administrative/EstablishmentPage';
import JudicialPage from './pages/administrative/JudicialPage';
import RationPage from './pages/administrative/RationPage';
import CanteenPage from './pages/administrative/CanteenPage';
import InterviewPage from './pages/administrative/InterviewPage';
import HospitalPage from './pages/administrative/HospitalPage';
import FactoryPage from './pages/administrative/FactoryPage';
import AgricultureDepartmentPage from './pages/administrative/AgricultureDepartmentPage';
import IndustryPage from './pages/administrative/IndustryPage';
import InternalSecurityPage from './pages/administrative/InternalSecurityPage';
import ConstructionPage from './pages/administrative/ConstructionPage';

import SalonPage from './pages/social/SalonPage';
import LaundryPage from './pages/social/LaundryPage';
import ShrinkhalaCanteenPage from './pages/social/ShrinkhalaCanteenPage';
import MangalLawnPage from './pages/social/MangalLawnPage';
import MindaUnitPage from './pages/social/MindaUnitPage';

import PrisonerInterviewPage from './pages/facilities/PrisonerInterviewPage';
import SmartCardPhonePage from './pages/facilities/SmartCardPhonePage';
import CorrespondencePage from './pages/facilities/CorrespondencePage';
import FreeLegalAidPage from './pages/facilities/FreeLegalAidPage';
import DistrictLegalServicesPage from './pages/facilities/DistrictLegalServicesPage';
import FurloughParolePage from './pages/facilities/FurloughParolePage';
import RemissionPage from './pages/facilities/RemissionPage';
import HirkaniRoomPage from './pages/facilities/HirkaniRoomPage';
import GymnasiumPage from './pages/facilities/GymnasiumPage';
import WetCanteenPage from './pages/facilities/WetCanteenPage';
import EducationPage from './pages/facilities/EducationPage';
import LibraryPage from './pages/facilities/LibraryPage';


function App() {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="yerawada-open-jail" element={<YerawadaOpenJailPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="our-products" element={<OurProductsPage />} />
            <Route path="agriculture/nursery" element={<NurseryPage />} />
            <Route path="agriculture/poultry-farming" element={<PoultryFarmingPage />} />
            <Route path="agriculture/dairy-farming" element={<DairyFarmingPage />} />
            <Route path="agriculture/goat-farming" element={<GoatFarmingPage />} />
            <Route path="agriculture/mushroom-project" element={<MushroomProjectPage />} />
            <Route path="agriculture/vermicompost-project" element={<VermicompostProjectPage />} />
            <Route path="agriculture/innovative-activities" element={<InnovativeActivitiesPage />} />
            
            <Route path="administrative/administration" element={<AdministrationPage />} />
            <Route path="administrative/establishment" element={<EstablishmentPage />} />
            <Route path="administrative/judicial" element={<JudicialPage />} />
            <Route path="administrative/ration" element={<RationPage />} />
            <Route path="administrative/canteen" element={<CanteenPage />} />
            <Route path="administrative/interview" element={<InterviewPage />} />
            <Route path="administrative/hospital" element={<HospitalPage />} />
            <Route path="administrative/factory" element={<FactoryPage />} />
            <Route path="administrative/agriculture" element={<AgricultureDepartmentPage />} />
            <Route path="administrative/industry" element={<IndustryPage />} />
            <Route path="administrative/internal-security" element={<InternalSecurityPage />} />
            <Route path="administrative/construction" element={<ConstructionPage />} />
            
            <Route path="social/salon" element={<SalonPage />} />
            <Route path="social/laundry" element={<LaundryPage />} />
            <Route path="social/shrinkhala-canteen" element={<ShrinkhalaCanteenPage />} />
            <Route path="social/mangal-lawn" element={<MangalLawnPage />} />
            <Route path="social/minda-unit" element={<MindaUnitPage />} />

            <Route path="facilities/prisoner-interview" element={<PrisonerInterviewPage />} />
            <Route path="facilities/smart-card-phone" element={<SmartCardPhonePage />} />
            <Route path="facilities/correspondence" element={<CorrespondencePage />} />
            <Route path="facilities/free-legal-aid" element={<FreeLegalAidPage />} />
            <Route path="facilities/district-legal-services" element={<DistrictLegalServicesPage />} />
            <Route path="facilities/furlough-parole" element={<FurloughParolePage />} />
            <Route path="facilities/remission" element={<RemissionPage />} />
            <Route path="facilities/hirkani-room" element={<HirkaniRoomPage />} />
            <Route path="facilities/gymnasium" element={<GymnasiumPage />} />
            <Route path="facilities/wet-canteen" element={<WetCanteenPage />} />
            <Route path="facilities/education" element={<EducationPage />} />
            <Route path="facilities/library" element={<LibraryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  );
}

export default App;
