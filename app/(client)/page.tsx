import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeAppleCarousel from "@/components/HomeAppleCarousel";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";

const Home = async () => {
  return (
    <>
      <HomeBanner />
    <Container className="bg-shop-light-pink">
      <ProductGrid />
      <HomeAppleCarousel />
      <ShopByBrands />
      <LatestBlog />
    </Container>
    </>
  );
};
export default Home;
