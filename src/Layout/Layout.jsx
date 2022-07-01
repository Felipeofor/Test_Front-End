import React from "react";
import Navbar from '../components/Navbar/Navbar';
import Banner from '../components/Banner/Banner';
import NewsletterPost from '../components/Newsletter/NewsletterPost';
import Products from '../components/Products/Products';
import Footer from '../components/Footer/Footer';

function Layout() {
  return (
    <>
        <Navbar></Navbar>
        <Banner></Banner>
        <Products></Products>
        <NewsletterPost></NewsletterPost>
        <Footer></Footer>
    </>);
}

export default Layout;