import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/layout/app-sidebar";
import { CatalogLayout } from "@/cases/catalog/components/catalog-layout";
import { ProductDetailPage } from "@/cases/catalog/components/product-detail-page";
import { CartPage } from "@/cases/cart/components/cart-page";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <Routes>
              <Route path="/" element={<CatalogLayout />} />
              <Route path="/catalog" element={<CatalogLayout />} />
              <Route path="/catalog/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
        </SidebarProvider>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
