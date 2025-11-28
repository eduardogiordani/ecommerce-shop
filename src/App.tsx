import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastContainer } from "react-toastify";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/layout/app-sidebar";
import { CatalogLayout } from "./cases/catalog/components/catalog-layout";
import { CartPage } from "./cases/cart/components/cart-page";
import { ProductDetailPage } from './cases/catalog/components/product-detail-page';

function App() {
  return (
    <div className="wrapper">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
              <BrowserRouter>
          <Routes>
            <Route path="/catalog" element={<CatalogLayout />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/" element={<CatalogLayout />} />
          </Routes>
          </BrowserRouter>
        </main>
      </SidebarProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
