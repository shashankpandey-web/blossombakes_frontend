import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../component/layout/MainLayout";
import ShoppingCartProvider from "../pages/shoppingCart/shoppingCartProvider";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "../component/PrivateRoute";
import { ScrollTop } from "../component";
import PageLoader from "../component/PageLoader/PageLoader";

// Static imports for critical above-the-fold components
import CancellationReturnRefundPolicy from "../pages/CancellationReturnRefundPolicy/CancellationReturnRefundPolicy";
import ShippingPolicy from "../pages/ShippingPolicy/ShippingPolicy";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

// Optimized lazy loading with prefetch hints
const Home = lazy(() =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "home" */
    "../pages/index"
  ).then((module) => ({ default: module.Home }))
);

const Products = lazy(() =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "products" */
    "../pages/index"
  ).then((module) => ({ default: module.Products }))
);

// Group related components into chunks
const productRoutes = {
  ProductDetail: lazy(() =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "product-views" */
      "../pages/index"
    ).then((module) => ({ default: module.ProductDetail }))
  ),
  WishList: lazy(() =>
    import(
      /* webpackChunkName: "product-views" */
      "../pages/index"
    ).then((module) => ({ default: module.WishList }))
  ),
  ShoppingCart: lazy(() =>
    import(
      /* webpackChunkName: "product-views" */
      "../pages/index"
    ).then((module) => ({ default: module.ShoppingCart }))
  ),
};

const accountRoutes = {
  Account: lazy(() =>
    import(
      /* webpackChunkName: "account-views" */
      "../pages/index"
    ).then((module) => ({ default: module.Account }))
  ),
  OrderHistory: lazy(() =>
    import(
      /* webpackChunkName: "account-views" */
      "../pages/index"
    ).then((module) => ({ default: module.OrderHistory }))
  ),
  OrderDetails: lazy(() =>
    import(
      /* webpackChunkName: "account-views" */
      "../pages/index"
    ).then((module) => ({ default: module.OrderDetails }))
  ),
  Review: lazy(() =>
    import(
      /* webpackChunkName: "account-views" */
      "../pages/index"
    ).then((module) => ({ default: module.Review }))
  ),
  OrderSuccess: lazy(() =>
    import(
      /* webpackChunkName: "account-views" */
      "../pages/index"
    ).then((module) => ({ default: module.OrderSuccess }))
  ),
};

const contentRoutes = {
  Blogs: lazy(() =>
    import(
      /* webpackChunkName: "content-views" */
      "../pages/index"
    ).then((module) => ({ default: module.Blogs }))
  ),
  BlogsDetails: lazy(() =>
    import(
      /* webpackChunkName: "content-views" */
      "../pages/index"
    ).then((module) => ({ default: module.BlogsDetails }))
  ),
  About: lazy(() =>
    import(
      /* webpackChunkName: "content-views" */
      "../pages/index"
    ).then((module) => ({ default: module.About }))
  ),
  ContactUs: lazy(() =>
    import(
      /* webpackChunkName: "content-views" */
      "../pages/index"
    ).then((module) => ({ default: module.ContactUs }))
  ),
};

const legalRoutes = {
  TermCondition: lazy(() =>
    import(
      /* webpackChunkName: "legal-views" */
      "../pages/index"
    ).then((module) => ({ default: module.TermCondition }))
  ),
  TermOfUse: lazy(() =>
    import(
      /* webpackChunkName: "legal-views" */
      "../pages/index"
    ).then((module) => ({ default: module.TermOfUse }))
  ),
  Disclaimer: lazy(() =>
    import(
      /* webpackChunkName: "legal-views" */
      "../pages/index"
    ).then((module) => ({ default: module.Disclaimer }))
  ),
  PrivacyPolicy: lazy(() =>
    import(
      /* webpackChunkName: "legal-views" */
      "../pages/index"
    ).then((module) => ({ default: module.PrivacyPolicy }))
  ),
  Faqs: lazy(() =>
    import(
      /* webpackChunkName: "legal-views" */
      "../pages/index"
    ).then((module) => ({ default: module.Faqs }))
  ),
};

const ProfileLayout = lazy(() =>
  import(
    /* webpackChunkName: "profile-layout" */
    "./../component/layout/ProfileLayout"
  )
);

const LoadingFallback = () => <PageLoader />;

const RoutesMain = () => {
  // Prefetch critical routes after initial render
  useEffect(() => {
    const prefetchRoutes = async () => {
      // Prefetch likely next routes
      await import("../pages/index");
      await import("./../component/layout/ProfileLayout");
    };
    prefetchRoutes();
  }, []);

  return (
    <Router>
      <ScrollTop />
      <Toaster reverseOrder={true} />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />

            {/* Product Routes */}
            <Route path="/products" element={<Products />} />
            <Route path="/category/:slug" element={<Products />} />
            <Route
              path="/productdetail/:slug"
              element={<productRoutes.ProductDetail />}
            />
            <Route path="/wishlist" element={<productRoutes.WishList />} />

            <Route
              path="/shoppingcart"
              element={
                <ShoppingCartProvider>
                  <productRoutes.ShoppingCart />
                </ShoppingCartProvider>
              }
            />

            {/* Account Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfileLayout />}>
                <Route path="account" element={<accountRoutes.Account />} />
                <Route
                  path="order-history"
                  element={<accountRoutes.OrderHistory />}
                />
                <Route
                  path="orderdetail/:id"
                  element={<accountRoutes.OrderDetails />}
                />
                <Route
                  path="review/:order_product_id"
                  element={<accountRoutes.Review />}
                />
              </Route>
              <Route
                path="order-success/:id"
                element={<accountRoutes.OrderSuccess />}
              />
            </Route>

            {/* Content Routes */}
            <Route path="/blogs" element={<contentRoutes.Blogs />} />
            <Route
              path="/blog/:slug"
              element={<contentRoutes.BlogsDetails />}
            />
            <Route path="/about" element={<contentRoutes.About />} />
            <Route path="/contactus" element={<contentRoutes.ContactUs />} />

            {/* Legal Routes */}
            <Route
              path="/term-condition"
              element={<legalRoutes.TermCondition />}
            />
            <Route path="/terms-of-use" element={<legalRoutes.TermOfUse />} />
            <Route path="/disclaimer" element={<legalRoutes.Disclaimer />} />
            <Route
              path="/cancellation-return-refund-policy"
              element={<CancellationReturnRefundPolicy />}
            />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route
              path="/privacy-policy"
              element={<legalRoutes.PrivacyPolicy />}
            />
            <Route path="/faqs" element={<legalRoutes.Faqs />} />
            <Route path="/*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RoutesMain;
