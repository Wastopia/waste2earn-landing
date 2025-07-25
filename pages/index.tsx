import type { NextPage } from 'next'
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Button from '../components/Buttons/Button';
import PostButton from '../components/Buttons/PostButton';
import Wrapper from '../components/Wrapper';
import {getSortedPostsData, PostData} from "../lib/posts";
import { COPY, IMAGES, SITE_URL } from '../lib/constants';
import {loadActiveProposals, Proposal} from '../lib/snapshot';
import NFTDavaoIcon from '../public/assets/icon/nftdavao.png';
import DCTIcon from '../public/assets/icon/dct.png';
import RerdaoIcon from '../public/assets/icon/rerdao.png';
import ICPPHIcon from '../public/assets/icon/icp-ph.png';
import CoreIcon from '../public/assets/icon/core-logo.png';
import ChatWidget from '../components/ChatWidget';

type BlogProps = {
  allPostsData: PostData[];
  activeProposals?: { proposals: Proposal[] } | null;
}

export async function getStaticProps() : Promise<any> { 
  const allPostsData = getSortedPostsData(3)
  const activeProposals = await loadActiveProposals();
  return {
    props: {
      allPostsData,
      activeProposals: activeProposals || null
    },
    revalidate: 60
  }
}

// Metadata
const TITLE = `Waste2Earn | ${COPY.BASIC_TAGLINE}`;
const DESC  = COPY.BASIC_DESCRIPTION;

const Home: NextPage<BlogProps> = ({ allPostsData, activeProposals }: BlogProps) => {
  const handleLogin = () => {
    const loginUrl = "https://hm7ne-saaaa-aaaao-qezaq-cai.icp0.io/";
  
    window.open(loginUrl, "_blank");
  };

  const handleLogin2 = () => {
    const loginUrl = "https://www.youtube.com/watch?v=BJc-28lUgXU";
  
    window.open(loginUrl, "_blank");
  };

  return (
    <>
      <NextSeo
        title={TITLE}
        description={DESC}
        openGraph={{
          url: `${SITE_URL}`,
          title: TITLE,
          description: DESC,
          type: "article",
          images: [
            {
              url: IMAGES.META_SPRING,
              width: 1200,
              height: 628,
              type: 'image/jpeg',
            }
          ],
          site_name: 'Waste2Earn',
        }}
        twitter={{
          handle: '@waste2earn',
          cardType: 'summary_large_image',
          site: '@waste2earn'
        }}
      />
      <Wrapper variant="farm">
        {/**
          * Section: Introduction
          */}
        <div className="space-y-6">
          {activeProposals && activeProposals.proposals.length > 0 ? (
            <div className="pb-6">
              <div className="space-y-1 pb-1 border-b-2 border-blue-100">
                {activeProposals.proposals.map((proposal) => (
                  (proposal.end < new Date().getTime()) && (
                    <div key={proposal.id}>
                      <a href={`https://waste2earn.xyz/governance/${proposal.id}`} target="_blank" rel="noreferrer" className="flex flex-row items-center px-2 py-4 space-x-4">
                        <Image src="/assets/icon/snapshot.svg" alt="Snapshot icon" width={24} height={24} className="h-6" />
                        <span className="flex-1">
                          <span className="font-bold">{proposal.title}</span> is live for voting
                        </span>
                        <span className="justify-self-end">&rarr;</span>
                      </a>
                    </div>
                  )
                ))}
              </div>
            </div>
          ) : null}
          <h1 className="md:text-5xl text-3xl md:leading-[3.5rem] md:text-center">
          Waste Revalued
          </h1>
          <div className="space-y-2">
            <div onClick={handleLogin}>
              <Button
                primary
                desc={<span className="text-white text-2xl system">&rarr;</span>}
                icon="/assets/icon/snapshot.svg">
                Launch App
              </Button>
            </div>
            <div onClick={handleLogin2}>
              <Button
                secondary
                // className="hover-walk"
                desc={<span className="text-white text-2xl system md:block hidden">&rarr;</span>}
                icon="/assets/icon/wasticon.svg">
                Play 
              </Button>
            </div>
            <div className="md:flex md:flex-row md:space-y-0 space-y-2 md:space-x-2 items-stretch text-black">
              <div className="flex-1">
                <Link href="/blog/waste-token" passHref>
                  <Button className="align-flex-start" icon={<></>}>
                    Buy $Waste Token 
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="/blog/path-forward-faq" passHref>
                  <Button className="h-full flex items-center">
                    FAQ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/**
          * Section: Learn
          */}
        <div className="space-y-4 text-black">
          <div className="flex justify-between items-center text-white">
            <h2 className="text-3xl font-normal">Learn</h2>
            <a href={`https://waste2earn.xyz`}><p className="text font-normal mr-4 text-gray-200">More &rarr;</p></a>
          </div>
          <div className="space-y-4">
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://take-a-quiz-nine.vercel.app/"
              icon="/assets/icon/w2e.svg"
              desc="Earn $Waste soon">
              Take a Quiz
            </Button>
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://waste2earn.gitbook.io/waste2earn-documentation/"
              icon="/assets/icon/gitbook.png"
              desc="Learn about Waste2Earn">
              {`Docs`}
            </Button>
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://discord.gg/W7bFg6J98q"
              icon="/assets/icon/discord.png"
              desc="Join the community">
              Discord
            </Button>
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://t.me/Waste2Earn"
              icon="/assets/icon/telegram.png"
              desc="Join the community">
              Telegram
            </Button>
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://x.com/waste2earn"
              icon="/assets/icon/X-logo.png"
              desc="Join the community">
              Twitter
            </Button>
            {/* <iframe width="100%" height="315" src="https://www.youtube.com/embed/D0zQSNMXbiM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
          </div>
        </div>
        {/**
          * Section: Blog
          */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-normal">Blog</h2>
            <a href={`/blog`}><p className="text font-normal mr-4 text-gray-200">See all &rarr;</p></a>
          </div>
          <div className="flex flex-col space-y-4">
            {allPostsData.map(({ id, date, title, subtitle, image }) => (
              <PostButton
                key={id}
                href={`/blog/${id}`}
                title={title}
                subtitle={subtitle}
                date={date}
                image={image}
              />
            ))}
          </div>
        </div>
        {/**
          * Section: Links
          */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-normal">Links</h2>
            <a href={`https://waste2earn.gitbook.io/waste2earn-documentation/`}><p className="text font-normal mr-4 text-gray-200">More &rarr;</p></a>
          </div>
          <div className="space-y-4">
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://snapshot.org/#/waste2earn.eth"
              icon="/assets/icon/snapshot.svg"
              desc="Vote on governance proposals">
              Reverion
            </Button>
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Wastopia"
              icon="/assets/icon/github.png"
              desc="View the open source contracts">
              GitHub
            </Button>
          </div>
        </div>
        {/**
          * Section: Subscribee
          */}
        <div className="space-y-4">
          <h2 className="text-3xl mb-6 font-normal">Subscribe</h2>
          <p>{`Subscribe to Waste2Earn and we'll send major Waste2Earn updates straight to your inbox.`}</p>
          <iframe src="https://waste2earn.substack.com/embed" width="100%" frameBorder="0" scrolling="no"></iframe>
        </div>
        
        {/* Partners */}
        <div className="space-y-4 p-4 rounded-lg">
          <h2 className="text-3xl font-normal text-start">Partners</h2>
          <div className="flex justify-center mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-[100px] gap-y-8 justify-center">
              {/* First 5 Images */}
              <div className="relative w-36 h-36 overflow-hidden rounded-full shadow-lg shadow-gray-400 transition-transform duration-300 hover:scale-105">
                <a href="https://v3.tailwindcss.com/docs/text-color" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <Image src={DCTIcon} alt="Picture 1" className="object-cover" width={144} height={144} />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-sm font-semibold opacity-0 transition-opacity duration-300 hover:opacity-100">
                    DCT
                  </div>
                </a>
              </div>

              <div className="relative w-36 h-36 overflow-hidden rounded-full shadow-lg shadow-gray-400 transition-transform duration-300 hover:scale-105">
                <a href="/" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <Image src={RerdaoIcon} alt="Picture 2" className="object-cover" width={144} height={144}/>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-sm font-semibold opacity-0 transition-opacity duration-300 hover:opacity-100">
                    RERDAO
                  </div>
                </a>
              </div>

              <div className="relative w-36 h-36 overflow-hidden rounded-full shadow-lg shadow-gray-400 transition-transform duration-300 hover:scale-105">
                <a href="/" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <Image src={NFTDavaoIcon} alt="Picture 3" className="object-cover" width={144} height={144} />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-sm font-semibold opacity-0 transition-opacity duration-300 hover:opacity-100">
                    NFTDAVAO
                  </div>
                </a>
              </div>

              <div className="relative w-36 h-36 overflow-hidden rounded-full shadow-lg shadow-gray-400 transition-transform duration-300 hover:scale-105">
                <a href="/" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <Image src={ICPPHIcon} alt="Picture 4" className="object-cover" width={144} height={144}/>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-sm font-semibold opacity-0 transition-opacity duration-300 hover:opacity-100">
                    ICP-PH
                  </div>
                </a>
              </div>

              <div className="relative w-36 h-36 overflow-hidden rounded-full shadow-lg shadow-gray-400 transition-transform duration-300 hover:scale-105">
                <a href="/" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <Image src={CoreIcon} alt="Picture 5" className="object-cover" width={144} height={144}/>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-sm font-semibold opacity-0 transition-opacity duration-300 hover:opacity-100">
                    CORE
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <ChatWidget />
      </Wrapper>
    </>
  )
}

export default Home