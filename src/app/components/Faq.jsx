import { CircleQuestionMark } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { FAQS } from "@/lib/demo";

const Faq = () => {
  return (
    <Section tone='lowest' spacing='lg'>
      <div className='text-center max-w-2xl mx-auto mb-16'>
        <Eyebrow>Need Assistance?</Eyebrow>
        <h2 className='text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1'>
          Frequently Asked Questions
        </h2>
        <p className='text-body-md text-on-surface-variant mt-3'>
          Everything you need to know about booking, rescheduling, and doctor verification on
          MediQueue.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {FAQS.map((faq) => (
          <Card key={faq.question} tone='surface' shadow='sm' padding='md'>
            <h4 className='text-headline-sm text-on-surface mb-2 flex items-center gap-2'>
              <CircleQuestionMark
                aria-hidden='true'
                className='size-5 text-primary shrink-0'
              />
              <span>{faq.question}</span>
            </h4>
            <p className='text-body-sm text-on-surface-variant leading-relaxed'>{faq.answer}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Faq;
