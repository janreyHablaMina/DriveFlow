import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SearchFilter from '@/components/SearchFilter';
import CategoryBrowser from '@/components/CategoryBrowser';
import Grid from '@/components/Grid';
import Telemetry from '@/components/Telemetry';
import BankFinancing from '@/components/BankFinancing';
import TradeInValuation from '@/components/TradeInValuation';
import NewArrivals from '@/components/NewArrivals';
import Showcase from '@/components/Showcase';
import Creed from '@/components/Creed';
import FinancingProcess from '@/components/FinancingProcess';
import Promotions from '@/components/Promotions';
import Story from '@/components/Story';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Location from '@/components/Location';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <CategoryBrowser />
      <SearchFilter />
      <Grid />
      <Telemetry />
      <BankFinancing />
      <TradeInValuation />
      <NewArrivals />
      <Showcase />
      <Creed />
      <FinancingProcess />
      <Promotions />
      <Story />
      <Testimonials />
      <FAQ />
      <Location />
      <Footer />
    </>
  );
}
