import { useId } from 'react';
import { ArrowRight } from 'lucide-react';

const WAYS = [
  {
    label: 'MatchBook',
    title: 'Meet the right person.',
    description:
      'Get a personal introduction to someone relevant to your goals — or discover new connections through regular 1:1 networking.',
    linkLabel: 'Explore MatchBook',
    href: 'https://cardbook.biz/matchbook-en',
    image: '/new/matchbook.jpg',
    imageAlt: 'Members meeting one-to-one at a CardBook gathering',
  },
  {
    label: 'CardBook Magazine',
    title: 'Get seen by the right people.',
    description:
      'Share your story, expertise or business with the CardBook community through interviews, articles and social distribution.',
    linkLabel: 'Get Featured',
    href: 'https://magazine.cardbook.biz/',
    image: '/new/magazine.jpg',
    imageAlt: 'A speaker on stage at a CardBook event',
  },
  {
    label: 'Networking Strategy',
    title: 'Turn your network into a strategy.',
    description:
      'A personal session to identify who you need to know, where to find them and how to turn relationships into business opportunities.',
    linkLabel: 'Book a Session',
    href: '#strategy',
    image: '/new/Strategy.jpg',
    imageAlt: 'Founders in conversation during a strategy session',
  },
  {
    label: 'For Business',
    title: 'Turn networking into business growth.',
    description:
      'Corporate networking, business introductions, event sponsorship and tailored networking solutions for companies.',
    linkLabel: 'Explore Business',
    href: '#business',
    image: '/new/Business.jpg',
    imageAlt: 'Business leaders networking in a CardBook room',
  },
];

export default function MoreWaysToConnect() {
  const baseId = useId();

  return (
    <section
      id="more-ways"
      aria-labelledby={`${baseId}-heading`}
      className="mx-auto max-w-7xl px-6 py-24 text-left md:py-32"
    >
      <h2
        id={`${baseId}-heading`}
        className="mb-6 text-6xl font-bold uppercase leading-none tracking-tighter text-white md:mb-8 md:text-8xl lg:text-[7.5rem]"
      >
        More
        <br className="md:hidden" /> Ways To
        <br className="md:hidden" /> Connect
      </h2>

      <p className="mb-16 max-w-3xl text-lg font-normal leading-relaxed text-zinc-400 lg:mb-24 md:text-xl">
        Your networking journey doesn&rsquo;t end at the event. CardBook gives you different ways
        to build relationships, increase your visibility and turn your network into opportunities.
      </p>

      <ul className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {WAYS.map((way) => (
          <li key={way.label}>
            <a
              href={way.href}
              {...(way.href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="group relative flex min-h-[400px] cursor-pointer flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 p-6 transition-colors duration-500 hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light md:p-8 lg:min-h-[480px]"
            >
              <div className="absolute inset-0 overflow-hidden bg-zinc-800">
                <img
                  src={way.image}
                  alt=""
                  aria-hidden="true"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/60 to-transparent"
              />

              <div className="relative z-20 flex flex-col">
                <h3 className="mb-3 text-2xl font-bold uppercase tracking-tight text-white md:text-3xl lg:text-4xl">
                  {way.label}
                </h3>
                <p className="mb-3 font-medium text-accent-light">{way.title}</p>
                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-zinc-300 md:text-base">
                  {way.description}
                </p>
                <span className="inline-flex items-center gap-2 font-semibold text-white transition-colors duration-300 group-hover:text-accent-light">
                  {way.linkLabel}
                  <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
