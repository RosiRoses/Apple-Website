import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";

import * as Sentry from '@sentry/react';
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

const App = () => {
  // return (
  //   <button
  //     onClick={() => {
  //       // Send a log before throwing the error
  //       Sentry.logger.info('User triggered test error', {
  //         action: 'test_error_button_click',
  //       });
  //       // Send a test metric before throwing the error
  //       Sentry.metrics.count('test_counter', 1);
  //       throw new Error('This is your first error!');
  //     }}
  //   >
  //     Break the world
  //   </button>
  // );
  return (
    <main className="bg-black">
      <Navbar/>
      <Hero/>
      <Highlights/>
      <Model />
      <Features/>
      <HowItWorks/>
      <Footer/>

    </main>
  )
}

export default Sentry.withProfiler(App);
