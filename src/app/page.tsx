'use client';

import { useMemo, useReducer } from 'react';
import MouseShadow from './components/MouseShadow';
import Navbar from './components/Navbar';
import ImageCarousel from './components/ImageCarousel';
import {
  ExpressIcon,
  HardhatIcon,
  GithubIcon,
  LinkedinIcon,
  DocxIcon,
  PdfIcon,
  TypeScriptIcon,
  SolidityIcon,
  PostgreSQLIcon,
  NextjsIcon,
  ReactIcon,
  NuxtjsIcon,
  VuejsIcon,
  TailwindcssIcon,
  DatabaseIcon,
  SmartContractIcon,
  BackendSystemsIcon,
  AwsIcon,
  VercelIcon,
  GraphQLIcon as _GraphQLIcon,
  TanStackIcon,
} from './components/icons';
import pointsAppScreen1 from './assets/points-app-screen-1.png';
import pointsAppScreen2 from './assets/points-app-screen-2.png';
import webWalletScreen1 from './assets/web-wallet-screen-1.png';
import webWalletScreen2 from './assets/web-wallet-screen-2.png';
import webWalletScreen3 from './assets/web-wallet-screen-3.png';
import nodeOperatorDashboardScreen1 from './assets/node-operator-dashboard-screen-1.png';
import nodeOperatorDashboardScreen2 from './assets/node-operator-dashboard-screen-2.png';
import nodeOperatorDashboardScreen3 from './assets/node-operator-dashboard-screen-3.png';
import webMessengerScreen1 from './assets/web-messenger-screen-1.png';
import webMessengerScreen2 from './assets/web-messenger-screen-2.png';
import webMessengerScreen3 from './assets/web-messenger-screen-3.png';
import tokenSaleScreen1 from './assets/token-sale-screen-1.png';
import tokenSaleScreen2 from './assets/token-sale-screen-2.png';
import tokenDashboardScreen1 from './assets/token-dashboard-screen-1.png';
import tokenDashboardScreen2 from './assets/token-dashboard-screen-2.png';
import tokenDashboardScreen3 from './assets/token-dashboard-screen-3.png';
import ngNative1 from './assets/ng-react-native-1.jpg';
import ngNative2 from './assets/ng-react-native-2.jpg';
import ngNative3 from './assets/ng-react-native-3.jpg';
import hamzaWeb1 from './assets/hamza-web3-store-screen-1.png';
import hamzaWeb2 from './assets/hamza-web3-store-screen-2.png';
import hamzaWeb3 from './assets/hamza-web3-store-screen-3.png';
import vendorDashboard1 from './assets/vendor-dashboard-screen-1.png';
import vendorDashboard2 from './assets/vendor-dashboard-screen-2.png';
import vendorDashboard3 from './assets/vendor-dashboard-screen-3.png';
import vendorDashboard4 from './assets/vendor-dashboard-screen-4.png';
import vendorDashboard5 from './assets/vendor-dashboard-screen-5.png';
import sumPlusPlusScreen1 from './assets/sum-plus-screen-1.png';
import sumPlusPlusScreen2 from './assets/sum-plus-screen-2.png';
import sumPlusPlusScreen3 from './assets/sum-plus-screen-3.png';
import sumPlusPlusScreen4 from './assets/sum-plus-screen-4.png';
import sumPlus1 from './assets/sum-plus-1.png';
import sumPlus2 from './assets/sum-plus-2.png';
import sumPlus3 from './assets/sum-plus-3.png';
import sumPlus4 from './assets/sum-plus-4.png';
import sumPlus5 from './assets/sum-plus-5.png';
import sumPlus6 from './assets/sum-plus-6.png';
import sumPlus7 from './assets/sum-plus-7.png';
import sumPlus8 from './assets/sum-plus-8.png';

import { ExternalLink } from 'lucide-react';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { JsIcon } from './components/icons/JsIcon';
import { ContentfulLogo } from './components/icons/ContentfulLogo';

type Project = {
  name: string;
  repo?: string;
  url?: string;
  images: StaticImageData[];
};

const projects: Project[] = [
  {
    name: 'web3 ecommerse store',
    repo: 'https://github.com/Burtonium/token-dashboard',
    url: 'https://staging.vip.realworldgaming.io',
    images: [
      hamzaWeb1,
      hamzaWeb2,
      hamzaWeb3,
      vendorDashboard1,
      vendorDashboard2,
      vendorDashboard3,
      vendorDashboard4,
      vendorDashboard5,
    ],
  },
  {
    name: 'food tracking & fasting app',
    repo: 'https://github.com/Burtonium/token-sale-portal',
    images: [sumPlus1, sumPlus3, sumPlus4, sumPlus5, sumPlus6, sumPlus7, sumPlus8],
    url: 'https://sale.getrealtoken.io/',
  },
  {
    name: 'physiotherapist cms app',
    url: 'https://quest.talisman.xyz/',
    images: [ngNative1, ngNative2, ngNative3],
  },
  // {
  //   name: 'web wallets',
  //   repo: 'https://github.com/xxfoundation/wallet.xx.network',
  //   url: 'https://wallet.xx.network/',
  //   images: [webWalletScreen1, webWalletScreen2, webWalletScreen3],
  // },
  // {
  //   name: 'web messengers',
  //   repo: 'https://github.com/xxfoundation/haven',
  //   url: 'https://haven.xx.network/',
  //   images: [webMessengerScreen1, webMessengerScreen2, webMessengerScreen3],
  // },
  // {
  //   name: 'node operator dashboards',
  //   repo: 'https://github.com/Burtonium/node-operator-dashboard',
  //   url: 'https://dashboard.xx.network/',
  //   images: [
  //     nodeOperatorDashboardScreen1,
  //     nodeOperatorDashboardScreen2,
  //     nodeOperatorDashboardScreen3,
  //   ],
  // },
] as const;

const _projectNames = projects.map(project => project.name);
const projectImages = projects.flatMap(project =>
  project.images.map(img => [project.name, img.src] as const)
);

const allImages = projectImages.map(([, img]) => img);

type Action =
  | { type: 'nextProject' }
  | { type: 'previousProject' }
  | { type: 'nextImage' }
  | { type: 'previousImage' }
  | { type: 'setSelectedImageIndex'; index: number };

interface State {
  selectedImageIndex: number;
}

const initialState: State = {
  selectedImageIndex: 0,
};

function portfolioReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'nextProject': {
      for (let i = state.selectedImageIndex; i < projectImages.length; i++) {
        if (projectImages[i][0] !== projectImages[state.selectedImageIndex][0]) {
          return {
            ...state,
            selectedImageIndex: i,
          };
        }
      }

      return {
        ...state,
      };
    }
    case 'previousProject': {
      for (let i = state.selectedImageIndex - 1; i >= 0; i--) {
        if (projectImages[i][0] !== projectImages[state.selectedImageIndex][0]) {
          return {
            ...state,
            selectedImageIndex: i,
          };
        }
      }
      return {
        ...state,
      };
    }
    case 'nextImage': {
      const nextIndex =
        state.selectedImageIndex + 1 < projectImages.length ? state.selectedImageIndex + 1 : 0;

      return {
        ...state,
        selectedImageIndex: nextIndex,
      };
    }
    case 'previousImage': {
      const previousIndex =
        state.selectedImageIndex - 1 >= 0 ? state.selectedImageIndex - 1 : projectImages.length - 1;

      return {
        ...state,
        selectedImageIndex: previousIndex,
      };
    }
    case 'setSelectedImageIndex': {
      return {
        ...state,
        selectedImageIndex: action.index,
      };
    }
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);
  const selectedProject = useMemo(
    () => projects.find(project => project.name === projectImages[state.selectedImageIndex][0]),
    [state.selectedImageIndex]
  );

  return (
    <main className="snap-container">
      <Navbar />
      <MouseShadow />
      <section
        id="introduction"
        className="main-section relative z-10 flex flex-col items-center justify-center px-4 pt-24 pb-16 md:px-8 md:pt-28 md:pb-20 lg:px-12 lg:pt-32 lg:pb-24"
        aria-label="Hero section with personal introduction"
      >
        <div className="flex w-full items-center justify-center">
          <div className="absolute top-0 z-10 h-full w-full backdrop-brightness-50" />
          <div className="relative z-10 h-full w-full p-5 md:p-12 lg:p-32">
            <div className="container mx-auto max-w-6xl space-y-5">
              <h1 className="text-4xl leading-none md:text-5xl xl:text-6xl">Jonathan Bajada</h1>
              <div>
                <h2 className="text-primary-400 mb-8 text-4xl leading-none md:text-5xl xl:text-6xl">
                  Full Stack Developer | Security-Focused
                </h2>
                <p className="font-title text-lg leading-6 md:text-xl lg:text-2xl">
                  with 4+ years of development experience
                </p>
              </div>
              <ol className="mt-5 space-y-2 lg:flex lg:space-y-0 lg:space-x-5 lg:text-lg">
                <li>
                  <a
                    rel="noopener"
                    className="hover:text-primary-400 flex cursor-pointer items-center space-x-1"
                    href="https://github.com/JonathanBajada"
                  >
                    <GithubIcon />
                    <span>Github</span>
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener"
                    className="hover:text-primary-400 flex cursor-pointer items-center space-x-1"
                    href="https://www.linkedin.com/in/jbajada/"
                  >
                    <LinkedinIcon />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li className="flex items-center space-x-1">
                  <form method="get" action="Resume.docx">
                    <button
                      className="hover:text-primary-400 flex cursor-pointer items-center space-x-1"
                      type="submit"
                    >
                      <DocxIcon />
                      <span>Docx Resume</span>
                    </button>
                  </form>
                </li>
                <li className="flex items-center space-x-1">
                  <form method="get" action="Resume.pdf">
                    <button
                      className="hover:text-primary-400 group flex cursor-pointer items-center space-x-1"
                      type="submit"
                    >
                      <PdfIcon />
                      <span>PDF Resume</span>
                    </button>
                  </form>
                </li>
              </ol>
              <div>
                <h4 className="text-primary-400 mb-2 max-w-[12rem] text-lg font-medium md:text-xl lg:max-w-none lg:text-2xl">
                  Technologies
                </h4>
                <ol className="flex max-w-4xl flex-wrap items-center gap-3">
                  <li className="flex items-center space-x-1">
                    <ReactIcon />
                    <span>React</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <ReactIcon />
                    <span>React Native</span>
                  </li>
                  <li>
                    <a rel="noopener" href="https://www.postgresql.org/">
                      <PostgreSQLIcon />
                    </a>
                    <span>Postgresql</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <NextjsIcon />
                    <span>Nextjs</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <TypeScriptIcon />
                    <span>Typescript</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <TailwindcssIcon />
                  </li>
                  <li className="flex items-center space-x-1">
                    <TanStackIcon />
                    <span>TanStack</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <SolidityIcon />
                    <span>Solidity</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <span>Node.js</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="skills"
        className="main-section flex flex-col items-center justify-center space-y-10 px-4 py-16 text-center md:px-8 md:py-20 lg:px-12 lg:py-24"
      >
        <div className="flex flex-col gap-1 md:gap-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl">I craft scalable</h2>
          <h2 className="text-primary-400 text-5xl md:text-6xl lg:text-7xl">software</h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl">from the ground up</h2>
        </div>
        <p className="text-base md:text-lg lg:text-xl">
          Meaning I can provide value at <strong>every level</strong> of developing robust and
          efficient applications for your business.
        </p>
        <ol className="grid max-w-6xl grid-cols-1 gap-5 py-5 text-left lg:grid-cols-2">
          <li className="frosted-glass-dark flex items-center space-x-4 rounded-xl p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg">
              <DatabaseIcon />
            </div>
            <p>Database architecture and implementation.</p>
          </li>
          {/* <li className="frosted-glass-dark flex items-center space-x-4 rounded-xl p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg">
              <SmartContractIcon />
            </div>
            <p>Smart Contract auditing, development and deployment.</p>
          </li> */}
          <li className="frosted-glass-dark flex items-center space-x-4 rounded-xl p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg">
              <BackendSystemsIcon />
            </div>
            <p>Developing backend services or designing intuitive RESTful APIs.</p>
          </li>
          <li className="frosted-glass-dark flex items-center space-x-4 rounded-xl p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg">
              <ReactIcon className="h-12 w-12" />
            </div>
            <p>Building beautiful, responsive, and performant frontends.</p>
          </li>
          <li className="frosted-glass-dark flex items-center space-x-4 rounded-xl p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg">
              <svg
                className="h-12 w-12 fill-[#9c97b4]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
            </div>
            <p>Implementing security best practices and secure coding standards.</p>
          </li>
        </ol>
      </section>
      <section
        className="main-section flex flex-col items-center justify-center py-16"
        id="projects"
      >
        <h2 className="mb-12 px-3 text-center text-3xl md:text-4xl lg:text-5xl">
          I&apos;ve made&nbsp;
          <span className="text-primary-400">{selectedProject?.name}</span>
        </h2>
        <div className="relative">
          <ImageCarousel
            images={allImages}
            selectedIndex={state.selectedImageIndex}
            onIndexChange={index => {
              dispatch({ type: 'setSelectedImageIndex', index });
            }}
            className="w-full max-w-5xl [&_img]:mx-auto [&_img]:max-h-[75vh] [&_img]:w-auto [&_img]:object-contain"
          />
          <div className="absolute right-6 bottom-12 flex gap-2">
            {selectedProject?.repo && (
              <a
                href={selectedProject.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-black/60 p-2 text-white transition-colors hover:bg-black/90"
                title="View on GitHub"
              >
                <GithubIcon className="text-primary-400 h-10 w-10 drop-shadow-lg lg:h-12 lg:w-12" />
              </a>
            )}
            {selectedProject?.url && (
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-black/60 p-2 text-white transition-colors hover:bg-black/90"
                title="Visit website"
              >
                <ExternalLink className="text-primary-400 h-10 w-10 drop-shadow-lg lg:h-12 lg:w-12" />
              </a>
            )}
          </div>
        </div>
        <p className="text-primary-400/75 mt-5 max-w-xl text-center text-sm">
          **Some of these project urls are <strong>not production deployments</strong> and may be
          moved, be partially broken, or completely down. Please notify me if you find any issues.**
        </p>
      </section>
      <section
        id="experience"
        className="main-section px-4 py-16 text-center text-white md:px-8 md:py-20 lg:px-12 lg:py-24"
        aria-label="Work experience section"
      >
        <h2 className="mb-12 text-3xl md:text-4xl lg:text-5xl">Recent Work Experience</h2>
        <div className="m-auto grid max-w-6xl gap-10 text-left lg:grid-cols-2 [&>*:nth-child(odd):last-child]:lg:col-span-2 [&>*:nth-child(odd):last-child]:lg:max-w-2xl [&>*:nth-child(odd):last-child]:lg:justify-self-center">
          <div className="frosted-glass-dark space-y-4 p-5">
            <div>
              <h3 className="mb-2 text-2xl leading-tight md:text-3xl lg:text-4xl">
                Full Stack Web3 Developer
              </h3>
              <p>
                <span className="font-bold text-white">Loadpipe · Remote</span>&nbsp;
                <span className="mb-4 text-gray-300">[April 2024 – Dec 2025]</span>
              </p>
            </div>

            <div>
              <h4 className="mb-0 text-lg md:text-xl">Tech utilized:</h4>
              <ol className="mt-0 flex flex-wrap">
                <li className="m-2 flex items-center gap-x-1">
                  <Image
                    className="inline"
                    width={22}
                    height={22}
                    src="https://cdn-icons-png.flaticon.com/512/919/919832.png"
                    alt="TypeScript logo"
                    unoptimized
                  />
                  <span>Typescript</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <NextjsIcon />
                  <span>Nextjs</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <a href="https://www.postgresql.org/">
                    <Image
                      className="inline"
                      width={22}
                      height={22}
                      src="https://www.postgresql.org/media/img/about/press/elephant.png"
                      alt="PostgreSQL logo"
                      unoptimized
                    />
                  </a>
                  <span>Postgresql</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <TailwindcssIcon />
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <AwsIcon />
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <span>MedusaJS</span>
                </li>
              </ol>
            </div>
            <div>
              <h4 className="text-2xl">Key Achievements</h4>
              <ol className="list-disc pt-2 pl-5">
                <li>
                  Led development and maintenance of a multi‑vendor e‑commerce marketplace on the
                  open‑source MedusaJS platform, leveraging Type‑ Script, Node.js, Zustand, TanStack
                  Query, Chakra UI, and Tailwind CSS.
                </li>
                <li>
                  Built and optimized critical pages including Home, Store, and Checkout,
                  implementing features like dynamic product sliders, category filters,
                  mobile‑friendly modals, and address forms using Chakra UI and custom
                  Tailwind‑styled components.
                </li>
                <li>
                  Integrated TanStack Query to reduce redundant API requests by approximately 30%
                  through centralized caching and server‑state management across key application
                  flows.
                </li>
                <li>
                  Upgraded RainbowKit and Wagmi libraries to v2, refactored authentication flows to
                  latest Web3 standards, expanded wallet connections, and conducted end‑to‑end
                  testing across desktop and mobile devices using the Sepolia Testnet.
                </li>
                <li>
                  Designed and implemented backend data models and service layers using Node.js and
                  PostgreSQL, enabling scalable data handling and order management while integrating
                  seamlessly with frontend components.
                </li>
                <li>
                  Built and optimized the Admin Dashboard using ShadCN, including detailed Order
                  Details and Order Information pages for operational work‑ flows.
                </li>
                <li>
                  Wrote and maintained end‑to‑end tests using Cypress, validating core user flows
                  like checkout, wallet authentication, and responsive layout behavior.
                </li>
                <li>
                  Worked within an Agile Scrum framework, contributing to daily stand‑ups, sprint
                  planning, and code reviews, and partnering closely with the UX/UI team to
                  translate designs into production‑ready features.
                </li>
              </ol>
            </div>
          </div>
          <div className="frosted-glass-dark space-y-4 p-5">
            <div>
              <h3 className="mb-2 text-2xl leading-tight md:text-3xl lg:text-4xl">
                Full Stack Developer
              </h3>
              <p>
                <span className="font-bold text-white">Apexacore · Full-time</span>&nbsp;
                <span className="mb-4 text-gray-300">[Sep 2020 - May 2021]</span>
              </p>
            </div>

            <div>
              <h4 className="mb-0 text-lg md:text-xl">Tech utilized:</h4>
              <ol className="mt-0 flex flex-wrap">
                <li className="m-2 flex items-center space-x-1">
                  <ReactIcon />
                  <span>React</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <ReactIcon />
                  <span>React Native</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <span>SQLite</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <span>Node.js</span>
                </li>
                <li className="m-2 flex items-center gap-x-1">
                  <Image
                    className="inline"
                    width={22}
                    height={22}
                    src="https://cdn-icons-png.flaticon.com/512/919/919832.png"
                    alt="TypeScript logo"
                    unoptimized
                  />
                  <span>TypeScript</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <TailwindcssIcon />
                </li>
              </ol>
            </div>
            <div>
              <h4 className="mb-0 text-lg md:text-xl">Responsibilities</h4>
              <ol className="list-disc pt-2 pl-5">
                <li>
                  Led the end-to-end development of the NeuroGym FIT app, a client management tool
                  for physiotherapists. Architected the solution in React Native (TypeScript) with
                  SQLite, translating UI/UX designs into a performant mobile application that
                  streamlined practitioner workflows.
                </li>
                <li>
                  Owned the front-end architecture, translating AdobeXD designs into reusable React
                  Native components and implementing a custom SVG-based navigation system.
                </li>
                <li>
                  Engineered core application features including a secure authentication flow,
                  dynamic data charts for treatment plans, and an interactive calendar for
                  scheduling.
                </li>
                <li>
                  Built advanced data tools, developing a feature to query the SQLite database and
                  export client reports to Excel, enhancing data portability.
                </li>
                <li>
                  Designed intuitive user interfaces with a searchable client list, medical
                  glossary, and a faceted filter (accordion) for exercise libraries.
                </li>
                <li>
                  Enhanced user experience by incorporating smooth animations for transitions and
                  feedback, elevating overall app polish.
                </li>
                <li>
                  Implemented global state management with MobX (stores, actions, computed values),
                  improving UI consistency across complex user flows and reducing prop drilling.
                </li>
              </ol>
            </div>
          </div>
          <div className="frosted-glass-dark space-y-4 p-5">
            <div>
              <h3 className="mb-1 text-2xl leading-tight md:text-3xl lg:text-4xl">
                Web Development & Marketing Operations
              </h3>
              <p>
                <span className="font-bold text-white">eBay · Full-time</span>
                &nbsp;
                <span className="mb-4 text-gray-300">[Aug 2021 - Aug 2022]</span>
              </p>
            </div>
            <div>
              <h4 className="mb-0 text-lg md:text-xl">Tech utilized:</h4>
              <ol className="mt-0 flex flex-wrap">
                <li className="m-2 flex items-center space-x-1">
                  <JsIcon />
                  <span>Javascript</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <a href="https://www.postgresql.org/">
                    <Image
                      className="inline"
                      width={22}
                      height={22}
                      src="https://www.postgresql.org/media/img/about/press/elephant.png"
                      alt="PostgreSQL logo"
                      unoptimized
                    />
                  </a>
                  <span>SQL</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <span>HTML</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <span>CSS</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <ReactIcon />
                  <span>React</span>
                </li>
              </ol>
            </div>
            <div>
              <h4 className="text-2xl">Responsibilities</h4>
              <ol className="list-disc pt-2 pl-5">
                <li>
                  Directed end-to-end onsite marketing operations for key eBay verticals (Motors,
                  Refurbished, Home & Retail Moments), overseeing campaign strategy, trafficking,
                  data analysis, audience segmentation, and cross-channel email support.
                </li>
                <li>
                  Conducted weekly CTR performance analysis for campaigns and creatives, delivering
                  data-driven insights and recommendations to optimize engagement.
                </li>
                <li>
                  Developed dynamic, responsive email templates using HTML, CSS, and JavaScript that
                  drove engagement across marketing campaigns.
                </li>
                <li>
                  Built targeted customer segments with SQL to increase campaign precision and
                  conversion rates.
                </li>
                <li>
                  Led end-to-end QA testing for all email and onsite ad creatives, ensuring 100%
                  functionality and brand compliance.
                </li>
                <li>
                  Redesigned and deployed high-visibility landing page ads on eBay.com, optimizing
                  layouts for improved CTR.
                </li>
                <li>
                  Orchestrated the scheduling and deployment of multi-channel marketing campaigns
                  across key eBay verticals.
                </li>
                <li>
                  Collaborated with the US Marketing Ops team to streamline workflows and enhance
                  existing marketing technologies.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
