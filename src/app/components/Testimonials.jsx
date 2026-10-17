import { Star } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { TESTIMONIALS } from "@/lib/demo";

const Testimonials = () => {
  return (
    <Section tone='surface' spacing='lg'>
      <div className='text-center max-w-2xl mx-auto mb-16'>
        <Eyebrow>Student Stories</Eyebrow>
        <h2 className='text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1'>
          Honors Scored in Viva Rooms
        </h2>
        <p className='text-body-md text-on-surface-variant mt-3'>
          Hear how our candidates conquered tough external examiners with MediQueue mentors.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {TESTIMONIALS.map((testimonial) => (
          <Card
            key={testimonial.name}
            tone='surface'
            shadow='sm'
            padding='md'
            className='flex flex-col justify-between'
          >
            <div>
              <div className='flex items-center gap-1 text-amber-500 mb-4'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    aria-hidden='true'
                    className='size-[18px]'
                    fill='currentColor'
                  />
                ))}
              </div>
              <p className='text-body-sm text-on-surface leading-relaxed italic mb-6'>
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
            <div className='flex items-center gap-3 pt-4'>
              <Avatar name={testimonial.name} alt='' size='sm' />
              <div>
                <div className='text-headline-sm text-on-surface'>{testimonial.name}</div>
                <div className='text-body-sm text-on-surface-variant'>{testimonial.meta}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Testimonials;
