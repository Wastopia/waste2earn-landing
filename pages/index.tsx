
import type { GetStaticPropsResult, NextPage } from 'next'
import Link from 'next/link';
import { NextSeo } from 'next-seo';
// import '../styles/style.css';
import Button from '../components/Buttons/Button';
import PostButton from '../components/Buttons/PostButton';
import Wrapper from '../components/Wrapper';
import {getSortedPostsData, PostData} from "../lib/posts";
import { COPY, IMAGES, SITE_URL } from '../lib/constants';
import {loadActiveProposals, Proposal} from '../lib/snapshot';
// import '../styles/logo.css'

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

const Home: NextPage<BlogProps> = ({ allPostsData, activeProposals }) => {
  const handleLogin = () => {
  const loginUrl = "https://hm7ne-saaaa-aaaao-qezaq-cai.icp0.io/";
  
  window.open(loginUrl, "_blank");
};

const handleLogin2 = () => {
  const loginUrl = "/";
  
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
                        <img src="/assets/icon/snapshot.svg" className="h-6" />
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
                desc={<span className="text-white text-2xl system md:block hidden">&rarr;</span>}
                icon="/assets/icon/snapshot.svg">
                Open/Create Wallet 
              </Button>
            </div>
            <div onClick={handleLogin2}>
              <Button
                secondary
                // className="hover-walk"
                desc={<span className="text-white text-2xl system md:block hidden">&rarr;</span>}
                icon="/assets/icon/wasticon.svg">
                Was2pia CoreGame 
              </Button>
            </div>
            <div className="md:flex md:flex-row md:space-y-0 space-y-2 md:space-x-2 items-stretch text-black">
              <div className="flex-1">
                <Link href="/blog/waste-token">
                  <Button className="align-flex-start" icon={<></>}>
                    Buy $Waste Token 
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="/blog/path-forward-faq">
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
            <a href={`https://waste2earn.xyz`}><p className="text font-normal mr-4 text-blue-600">More &rarr;</p></a>
          </div>
          <div className="space-y-4">
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://waste2earn.gitbook.io/waste2earn-documentation/"
              icon="/assets/icon/w2e.svg"
              desc="1.0">
              Whitepaper
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
              href="https://t.me/Waste2Earn"
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
            <a href={`/blog`}><p className="text font-normal mr-4 text-blue-600">See all &rarr;</p></a>
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
            <a href={`https://waste2earn.gitbook.io/waste2earn-documentation/`}><p className="text font-normal mr-4 text-blue-600">More &rarr;</p></a>
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
                  <img src="./Picture/dct.png" alt="Picture 1" className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-sm font-semibold opacity-0 transition-opacity duration-300 hover:opacity-100">
                    DCT
                  </div>
                </a>
              </div>

              <div className="relative w-36 h-36 overflow-hidden rounded-full shadow-lg shadow-gray-400 transition-transform duration-300 hover:scale-105">
                <a href="/" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <img src="./Picture/rerdao.png" alt="Picture 2" className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-sm font-semibold opacity-0 transition-opacity duration-300 hover:opacity-100">
                    RERDAO
                  </div>
                </a>
              </div>

              <div className="relative w-36 h-36 overflow-hidden rounded-full shadow-lg shadow-gray-400 transition-transform duration-300 hover:scale-105">
                <a href="/" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <img src="./Picture/nftdavao.png" alt="Picture 3" className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-sm font-semibold opacity-0 transition-opacity duration-300 hover:opacity-100">
                    NFTDAVAO
                  </div>
                </a>
              </div>

              <div className="relative w-36 h-36 overflow-hidden rounded-full shadow-lg shadow-gray-400 transition-transform duration-300 hover:scale-105">
                <a href="/" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <img src="./Picture/icp-ph.png" alt="Picture 4" className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-sm font-semibold opacity-0 transition-opacity duration-300 hover:opacity-100">
                    ICP-PH
                  </div>
                </a>
              </div>

              <div className="relative w-36 h-36 overflow-hidden rounded-full shadow-lg shadow-gray-400 transition-transform duration-300 hover:scale-105">
                <a href="/" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <img src="./Picture/core-logo.png" alt="Picture 5" className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-sm font-semibold opacity-0 transition-opacity duration-300 hover:opacity-100">
                    CORE
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

      </Wrapper>
    </>
  )
}


import React, { useState, useEffect } from 'react';
import type { GetStaticPropsResult, NextPage } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
// import '../styles/style.css';
import Button from '../components/Buttons/Button';
import PostButton from '../components/Buttons/PostButton';
import Wrapper from '../components/Wrapper';
import {getSortedPostsData, PostData} from "../lib/posts";
import { COPY, IMAGES, SITE_URL } from '../lib/constants';
import {loadActiveProposals, Proposal} from '../lib/snapshot';

// import '../styles/logo.css'

import supabase from '../supabase/supabase';
import supabaseSession from '../supabase/supabaseSession';
//latest sign up

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

const Home: NextPage<BlogProps> = ({ allPostsData, activeProposals }) => {
  const handleLogin = () => {
  const loginUrl = "https://hm7ne-saaaa-aaaao-qezaq-cai.icp0.io/";
  
  window.open(loginUrl, "_blank");
};

const [showSignUp, setShowSignUp] = useState(false)
const show = () => setShowSignUp(true)
const hide = () => setShowSignUp(false)

const [formData, setFormData] = useState({ email: '', password: '', confirmpassword: '' })
const [errors, setErrors] = useState({ email: '', password: '', confirmpassword: '', signupForm: '' })

const [isSignupFormDefault, setIsSignupFormDefault] = useState(false)
const [signupFormError, setSignupFormError] = useState(false)
const [signupSuccess, setSignupSuccess] = useState(false)
const [isSigningUp, setIsSigningUp] = useState(false)
const [isGoogleSigningUp, setIsGoogleSigningUp] = useState(false)

const validateEmail = (email: string): string => {
  if (!email.trim()) return ''

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
      return 'Invalid Email! Please enter a valid email address.'
  }
  return ''
}

const validatePassword = (password: string): string => {

  if (!password.trim()) return ''

  if (/\s/.test(password)) {
      return 'Password should not contain spaces.'
  } else if (password.length < 6) {
      return 'Weak Password. Please enter at least 6 characters.'
  }
  return ''

}

const validateConfirmPassword = (password: string, confirmpassword: string): string => {

  if (!confirmpassword.trim()) return ''

  if (password !== confirmpassword) {
      return 'Your passwords didn’t match, please try again!'
  }
  return ''

}

const handleSignupInputChange = (field: string, value: string) => {

  setIsSignupFormDefault(true)

  setFormData((prev) => ({ ...prev, [field]: value }))

  if (field === 'email') {
    setErrors((prev) => ({
        ...prev,
        email: validateEmail(value,)
      }))
  } else if (field === 'password') {
      setErrors((prev) => ({
      ...prev,
      password : validatePassword(value),
      confirmpassword: validateConfirmPassword(value, formData.confirmpassword)
    }))
  } else if (field === 'confirmpassword') {
      setErrors((prev) => ({
      ...prev,
      confirmpassword: validateConfirmPassword(formData.password, value)
    }))
  }

}

useEffect(() => {

  if (!isSignupFormDefault || signupSuccess) 
  return

  const isSignupFormEmpty =
      !(formData.email?.trim()) ||
      !(formData.password?.trim()) ||
      !(formData.confirmpassword?.trim())

  const hasSignupErrors =
      errors.email ||
      errors.password ||
      errors.confirmpassword

  const signupFormError = isSignupFormEmpty
      ? 'There are empty fields, please adjust them properly.'
      : hasSignupErrors
      ? 'There are incorrect fields, please adjust them properly.'
      : ''

  setErrors((prev) => ({
      ...prev, signupForm: signupFormError
  }))

}, [formData, isSignupFormDefault, signupSuccess])

const handleGoogleSignUp = async () => {
  setIsGoogleSigningUp(true)

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}`,
      },
    })

    if (error) {
      setErrors((prev) => ({
        ...prev,
        signupForm: "An unexpected error occurred. Please try again later.",
      }))
      setIsGoogleSigningUp(false)
      return
    }

    if (data?.url) {

      window.location.href = data.url
      
    } else {
      setErrors((prev) => ({
        ...prev,
        signupForm: "Failed to initiate Google Sign-Up. Please try again.",
      }));
      setIsGoogleSigningUp(false)
    }

  } catch (error) {
    setErrors((prev) => ({
      ...prev,
      signupForm: "An unexpected error occurred. Please try again later.",
    }))
    setIsGoogleSigningUp(false)
  }
}

const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

  e.preventDefault()

  const isSignupFormEmpty =
      !(formData.email?.trim()) ||
      !(formData.password?.trim()) ||
      !(formData.confirmpassword?.trim())

  const hasSignupErrors =
      errors.email ||
      errors.password ||
      errors.confirmpassword

  const signupFormError = isSignupFormEmpty
      ? 'There are empty fields, please adjust them properly.'
      : hasSignupErrors
      ? 'There are incorrect fields, please adjust them properly.'
      : ''

  setErrors((prev) => ({ ...prev, signupForm: signupFormError }))
      if (signupFormError) {
      setSignupSuccess(false)
      return
  }

  if (!signupFormError) {

      setIsSigningUp(true)

      try {

        const { data: existingEmail, error: emailError } = await supabase
            .from('users')
            .select('email')
            .eq('email', formData.email)
  
        if (existingEmail && existingEmail.length > 0) {
            setErrors((prev) => ({
              ...prev,
              signupForm: "Email is unavailable. Please choose another one.",
            }))
            setIsSigningUp(false)
            return
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password
      })

      if (authError) {
        setErrors((prev) => ({
            ...prev,
            signupForm:  'An unexpected error has occurred. Please try again later.'
        }))
      }
      
      if (authData) {

        setSignupSuccess("Your information has been created successfully.")

        setIsSignupFormDefault(false)
        setIsSigningUp(false)

        setFormData({
          email: '',
          password: '',
          confirmpassword: ''
        })
        
      }
        
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        signupForm: "An unexpected error occurred. Please try again later.",
      }))
      setIsSigningUp(false)
    }
  
  }

}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: showSignUp ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)",
  zIndex: 500,
  opacity: showSignUp ? 1 : 0,
  pointerEvents: showSignUp ? "auto" : "none",
  backdropFilter: showSignUp ? "blur(5px)" : "blur(0)",
  overflow: showSignUp ? "clip" : "auto",
  transition: "all 0.3s ease"
};

const signupForm: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 600,
  opacity: showSignUp ? 1 : 0,
  visibility: showSignUp ? "visible" : "hidden",
  pointerEvents: showSignUp ? "auto" : "none",
  transition: "all 0.3s ease"
};

const handleLogin2 = () => {
  const loginUrl = "/";
  
  window.open(loginUrl, "_blank");
};

  const {
    loading,
    user,
    userDetails
  } = supabaseSession()


  if (loading) {
    return (
      <div><Wrapper variant="farm"><div className="flex items-center text-3xl justify-center transition-all duration-300 ease-in-out">Loading</div></Wrapper></div>
  )
  }

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
      {!user && !userDetails ? (
        <>
        <div className="space-y-6">
          {activeProposals && activeProposals.proposals.length > 0 ? (
            <div className="pb-6">
              <div className="space-y-1 pb-1 border-b-2 border-blue-100">
                {activeProposals.proposals.map((proposal) => (
                  (proposal.end < new Date().getTime()) && (
                    <div key={proposal.id}>
                      <a href={`https://waste2earn.xyz/governance/${proposal.id}`} target="_blank" rel="noreferrer" className="flex flex-row items-center px-2 py-4 space-x-4">
                        <img src="/assets/icon/snapshot.svg" className="h-6" />
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

        <div style={overlayStyle}></div>

        <div style={signupForm}>

          <div className="flex items-center justify-center min-h-screen transition-all duration-300 ease-in-out">

            <form className="relative w-[320px] md:w-[420px] bg-[#dbd9d9] p-6 rounded-lg shadow-md"  onSubmit={handleSignupSubmit} noValidate>

              <div className="absolute flex items-center justify-center bg-[#e85151] top-3 right-3 text-white-500 rounded-lg shadow-md hover:bg-[#bf3737] text-4xl font-light cursor-pointer w-8 h-8 transition-all duration-300 ease-in-out" onClick={hide}>&times;</div>
              <h2 className="text-3xl mb-4 text-zinc-600 text-center">Sign Up on Waste2Earn</h2>

              {errors.email && (<span><p className="text-red-700">{errors.email}</p></span>)}
              <input type="email" name="email" 
              value={formData.email ?? ''} onChange={(e) => handleSignupInputChange('email', e.target.value)} placeholder="Email" className="w-full font-extralight text-neutral-600 text-lg p-2 mb-4 border rounded" />

              <div>
              {errors.password && (<span><p className="text-red-700">{errors.password}</p></span>)}
              <input id="hs-toggle-password" type="password" name="password" 
              value={formData.password ?? ''} onChange={(e) => handleSignupInputChange('password', e.target.value)} placeholder="Password" className="w-full font-extralight text-neutral-600 text-lg p-2 mb-4 border rounded" />
              </div>

              {errors.confirmpassword && (<span><p className="text-red-700">{errors.confirmpassword}</p></span>)}

              <input type="password" name="confirmpassword" 
              value={formData.confirmpassword ?? ''} onChange={(e) => handleSignupInputChange('confirmpassword', e.target.value)} placeholder="Confirm Password" className="w-full font-extralight text-neutral-600 text-lg p-2 mb-4 border rounded" />

              <div onClick={handleGoogleSignUp} className="w-full h=[40px] flex items-center justify-center bg-[#04588f] mb-4 text-white text-1xl p-2 rounded cursor-pointer hover:bg-[#003354] transition-all duration-300 ease-in-out">
                  <img className="absolute w-6 h-6 left-10" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                  <span> {isGoogleSigningUp ? ('Authenticating') : ('Sign Up with Google')}</span>
              </div>

              {signupSuccess && (<span><p className="text-blue-700">{signupSuccess}</p></span>)}
              {errors.signupForm && (<span><p className="text-red-700">{errors.signupForm}</p></span>)}
              <button type="submit" className="w-full bg-[#067ac7] mb-4 text-white text-2xl p-2 rounded hover:bg-[#015891] transition-all duration-300 ease-in-out">{isSigningUp ? ('Signing Up') : ('Sign Up')}</button>
            
            </form>

          </div>

        </div>

          <h1 className="md:text-5xl text-3xl md:leading-[3.5rem] md:text-center">
          Waste Revalued
          </h1>
          <div className="space-y-2">
            <div onClick={handleLogin}>
              <Button
                primary
                desc={<span className="text-white text-2xl system md:block hidden">&rarr;</span>}
                icon="/assets/icon/snapshot.svg">
                Open/Create Wallet 
              </Button>
            </div>
            <div onClick={handleLogin2}>
              <Button
                secondary
                // className="hover-walk"
                desc={<span className="text-white text-2xl system md:block hidden">&rarr;</span>}
                icon="/assets/icon/wasticon.svg">
                Was2pia CoreGame 
              </Button>
            </div>
            <div onClick={show}>
              <Button
                tertiary
                // className="hover-walk"
                desc={<span className="text-white text-2xl system md:block hidden">&rarr;</span>}
                icon="/assets/icon/create.png">
                Sign Up
              </Button>
            </div>
            <div className="md:flex md:flex-row md:space-y-0 space-y-2 md:space-x-2 items-stretch text-black">
              <div className="flex-1">
                <Link href="/blog/waste-token">
                  <Button className="align-flex-start" icon={<></>}>
                    Buy $Waste Token 
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="/blog/path-forward-faq">
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
            <a href={`https://waste2earn.xyz`}><p className="text font-normal mr-4 text-blue-600">More &rarr;</p></a>
          </div>
          <div className="space-y-4">
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://waste2earn.gitbook.io/waste2earn-documentation/"
              icon="/assets/icon/w2e.svg"
              desc="1.0">
              Whitepaper
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
              href="https://t.me/Waste2Earn"
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
            <a href={`/blog`}><p className="text font-normal mr-4 text-blue-600">See all &rarr;</p></a>
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
            <a href={`https://waste2earn.gitbook.io/waste2earn-documentation/`}><p className="text font-normal mr-4 text-blue-600">More &rarr;</p></a>
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
        <div className="space-y-4 p-[16px] rounded-lg">
            <h2 className="text-3xl font-normal text-start">Partners</h2>
            <div className="flex justify-center mt-[50px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                <div className="w-[150px] h-[150px] overflow-hidden rounded-[100px] shadow-lg shadow-gray-200 flex justify-center items-center">
                  <a href="https://v3.tailwindcss.com/docs/text-color" target="_blank" rel="Logo numeber 1">
                    <img src="./Picture/Pict1.jpg" alt="Picture 1" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"/>
                  </a>
                </div>
                <div className="w-[150px] h-[150px] overflow-hidden rounded-[100px] shadow-lg shadow-gray-200 flex justify-center items-center">
                  <a href="/" target="_blank" rel="Logo number 2">
                    <img src="./Picture/Pict2.jpg" alt="Picture 2" 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"/>
                  </a>
                </div>
                <div className="w-[150px] h-[150px] overflow-hidden rounded-[100px] shadow-lg shadow-gray-200 flex justify-center items-center">
                  <a href="/" target="_blank" rel="Logo number 3">
                    <img src="./Picture/Pict3.jpg" alt="Picture 3" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"/>
                  </a>
                </div>
                <div className="w-[150px] h-[150px] overflow-hidden rounded-[100px] shadow-lg shadow-gray-200 flex justify-center items-center">
                  <a href="/" target="_blank" rel="Logo number 4">
                    <img src="./Picture/Pict4.jpg" alt="Picture 4" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        {/*latest commit*/}

        </>
	):(
		<>
      <div className="flex font-normal text-2xl bg- shadow-md rounded px-8 pt-6 mb-8"><span>Welcome, {userDetails?.email?.split('@')[0]}<br/></span>
      <span>{userDetails?.firstname || 'No Firstname'}<br/></span>
      <span>{userDetails?.lastname || 'No Lastname'}<br/></span>
      <span>{userDetails?.role || 'No Role'}<br/></span>
      <span>{new Date(userDetails?.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
      </div>
    </>
	)} 

      </Wrapper>
    </>
  )
}

export default Home