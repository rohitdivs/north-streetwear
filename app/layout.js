import './globals.css';
import { ShopProvider } from '../context/ShopContext';
import CartDrawer from '../components/modals/CartDrawer';
import WishlistDrawer from '../components/modals/WishlistDrawer';
import OrderTrackingModal from '../components/modals/OrderTrackingModal';
import QuickViewModal from '../components/modals/QuickViewModal';
import SearchModal from '../components/modals/SearchModal';
import FitRecommenderModal from '../components/modals/FitRecommenderModal';
import SizeGuideModal from '../components/modals/SizeGuideModal';
import AuthModal from '../components/modals/AuthModal';
import ToastContainer from '../components/modals/ToastContainer';
import MobileBottomDock from '../components/layout/MobileBottomDock';
import Preloader from '../components/layout/Preloader';
import NotificationDrawer from '../components/modals/NotificationDrawer';
import LaunchCalendarModal from '../components/modals/LaunchCalendarModal';
import DropNotificationPopup from '../components/modals/DropNotificationPopup';
import DefectiveReportModal from '../components/modals/DefectiveReportModal';

export const metadata = {
  title: 'NORTH — Premium Heavyweight Streetwear (240+ GSM Drops)',
  description: 'Official store for NORTH streetwear. Engineered 240 GSM oversized tees, boxy hoodies, tactical cargos, and custom street combos.',
  keywords: 'streetwear india, 240 gsm t-shirts, oversized boxy tees, tactical cargo joggers, north streetwear'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body>
        <Preloader />
        <ShopProvider>
          {children}
          <CartDrawer />
          <WishlistDrawer />
          <OrderTrackingModal />
          <QuickViewModal />
          <SearchModal />
          <FitRecommenderModal />
          <SizeGuideModal />
          <AuthModal />
          <MobileBottomDock />
          <NotificationDrawer />
          <LaunchCalendarModal />
          <DropNotificationPopup />
          <DefectiveReportModal />
          <ToastContainer />
        </ShopProvider>
      </body>
    </html>
  );
}
