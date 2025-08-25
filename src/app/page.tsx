"use client";
import ContentTextbox from '@/components/textbox/ContentTextbox';
import ImageAccordion from '@/components/accordions/ImageAccordion';
import SimpleStepsBento from '@/components/bento/SimpleStepsBento';
import GalleryBento from '@/components/bento/galleryBento/GalleryBento';
import StandardTextbox from '@/components/textbox/StandardTextbox';

export default function Home() {
  return (
    <>
      <section id="hero" className="bg-[#E3F2FF] py-20">
        <ContentTextbox
          title={<h1 className="text-4xl font-bold text-[#0A6D9E]">Ride the Waves with Coastal Break!</h1>}
          description={<p className="text-lg text-[#12323D]">Join us for unforgettable surfing lessons and rentals!</p>}
          className="max-w-4xl mx-auto"
        />
        <ImageAccordion
          items={[{ title: 'Our Surf Lessons', content: 'Expert instructors at stunning beaches.' }]}
          imageSrc="/images/forest.jpg"
          imageAlt="Enjoying surfing lessons at the beach"
          className="mt-10"
        />
      </section>
      <section id="about" className="bg-soft-sea-foam py-20">
        <SimpleStepsBento
          items={[
            { title: 'Our Passion', description: 'Expert surfers guiding you every step of the way.' },
            { title: 'Community Focus', description: 'Inclusive and welcoming for everyone.' },
            { title: 'Adventurous Spirit', description: 'Embrace the thrill of surfing.' },
          ]}
          className="max-w-4xl mx-auto"
        />
      </section>
      <section id="offerings" className="bg-white py-20">
        <StandardTextbox
          title={<h2 className="text-3xl font-semibold text-[#0A6D9E]">Our Surf Services</h2>}
          description={<p className="text-md text-[#12323D]">Explore our various offerings.</p>}
          className="max-w-4xl mx-auto"
        />
      </section>
      <section id="rentals" className="bg-gradient-to-b from-[#FFFFFF] to-[#F7FBFF] py-20">
        <ContentTextbox
          title={<h2 className="text-3xl font-semibold text-[#0A6D9E]">Rentals</h2>}
          description={<p className="text-md text-[#12323D]">Check our inventory for the best rental options.</p>}
          className="max-w-4xl mx-auto"
        />
      </section>
      <section id="testimonials" className="bg-soft-noise py-20">
        <StandardTextbox
          title={<h2 className="text-3xl font-semibold text-[#0A6D9E]">What Our Customers Say</h2>}
          description={<p className="text-md text-[#12323D]">&quot;Amazing experience!&quot; - Alex</p>}
          className="max-w-4xl mx-auto"
        />
      </section>
      <section id="gallery" className="bg-white py-20">
        <GalleryBento
          items={[
            { title: 'Surfing Action Shot', image: '/images/placeholder1.avif' },
            { title: 'Sunny Day at the Beach', image: '/images/placeholder2.avif' },
            { title: 'Group Surf Lessons', image: '/images/placeholder3.avif' },
            { title: 'Surf Rentals Setup', image: '/images/placeholder4.avif' },
          ]}
          className="max-w-4xl mx-auto"
        />
      </section>
      <section id="contact" className="bg-[#F2F7FF] py-20">
        <StandardTextbox
          title={<h2 className="text-3xl font-semibold text-[#0A6D9E]">Contact Us</h2>}
          description={<p className="text-md text-[#12323D]">Get in touch for more details.</p>}
          className="max-w-4xl mx-auto"
        />
      </section>
    </>
  );
}