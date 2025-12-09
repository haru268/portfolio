import { ScrollAnimation } from './ScrollAnimation';

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </ScrollAnimation>
        {children}
      </div>
    </section>
  );
}

