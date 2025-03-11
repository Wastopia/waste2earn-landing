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
import supabase from '../supabase/supabase';
import supabaseSession from '../supabase/supabaseSession';

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

const [showEdit, setShowEdit] = useState(false)
const showEditForm = () => setShowEdit(true)
const hideEditForm = () => setShowEdit(false)

const [showSignOut, setShowSignOut] = useState(false)
const toggleSignOutForm = () => setShowSignOut(prev => !prev)


const [showSignOutForm, setShowSignOutForm] = useState(false)
const showsignOutForm = () => setShowSignOutForm(true)
const hidesignOutForm = () => setShowSignOutForm(false)

const [formData, setFormData] = useState({ email: '', password: '', confirmpassword: '' })
const [errors, setErrors] = useState({ email: '', password: '', confirmpassword: '', signupForm: '' })

const [isSignupFormDefault, setIsSignupFormDefault] = useState(false)
const [signupFormError, setSignupFormError] = useState(false)
const [signupSuccess, setSignupSuccess] = useState(false)
const [isSigningUp, setIsSigningUp] = useState(false)
const [isGoogleSigningUp, setIsGoogleSigningUp] = useState(false)
const [isSigningOut, setIsSigningOut] = useState(false)

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

const handleSignOut = async () => {

  setIsSigningOut(true)

  try {
      
      await supabase.auth.signOut()
          
      sessionStorage.clear()
      localStorage.clear()
          
      window.location.reload()

  } catch (error) {
      console.error(error)
  } finally {
      setTimeout(() => 
          setIsSigningOut(false), 1000
      )    
  }

}

//latest signout push

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

const overlay2Style: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  marginTop: 0,
  background: showEdit ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)",
  zIndex: 500,
  opacity: showEdit ? 1 : 0,
  pointerEvents: showEdit ? "auto" : "none",
  backdropFilter: showEdit ? "blur(5px)" : "blur(0)",
  overflow: showEdit ? "clip" : "auto",
  transition: "all 0.3s ease"
};

const editForm: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 600,
  marginTop: 0,
  opacity: showEdit ? 1 : 0,
  visibility: showEdit ? "visible" : "hidden",
  pointerEvents: showEdit ? "auto" : "none",
  transition: "all 0.3s ease"
};

const settings: React.CSSProperties = {
  position: "fixed",
  top: 30,
  left: 30,
  width: 100,
  height: 100,
  zIndex: 200,
  marginTop: 0,
  transition: "all 0.3s ease"
};

const signout: React.CSSProperties = {
  position: "fixed",
  top: 30,
  left: 70,
  width: 100,
  height: 30,
  zIndex: 200,
  marginTop: 0,
  background: "rgba(115, 45, 45, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 5,
  border: 1,
  opacity: showSignOut ? 1 : 0,
  visibility: showSignOut ? "visible" : "hidden",
  pointerEvents: showSignOut ? "auto" : "none",
  transition: "all 0.3s ease",
  cursor: "pointer"
};

const overlay3Style: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  marginTop: 0,
  background: showSignOutForm ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)",
  zIndex: 500,
  opacity: showSignOutForm ? 1 : 0,
  pointerEvents: showSignOutForm ? "auto" : "none",
  backdropFilter: showSignOutForm ? "blur(5px)" : "blur(0)",
  overflow: showSignOutForm ? "clip" : "auto",
  transition: "all 0.3s ease"
};

const signoutForm: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 600,
  marginTop: 0,
  opacity: showSignOutForm ? 1 : 0,
  visibility: showSignOutForm ? "visible" : "hidden",
  pointerEvents: showSignOutForm ? "auto" : "none",
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
      <div><Wrapper variant="farm">
        <div className="flex items-center text-3xl justify-center transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between">
            <div className="grid gap-3">
            <div className="flex items-center justify-center">
              <svg className="animate-spin border-indigo-600" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <g id="Component 2">
                  <circle id="Ellipse 717" cx="17.0007" cy="17.0001" r="14.2013" stroke="#D1D5DB" strokeWidth="4" strokeDasharray="2 3" />
                  <path id="Ellipse 715" d="M21.3573 30.5163C24.6694 29.4486 27.4741 27.2019 29.2391 24.2028C31.0041 21.2038 31.6065 17.661 30.9319 14.2471C30.2573 10.8332 28.3528 7.78584 25.5798 5.68345C22.8067 3.58105 19.3583 2.57 15.8891 2.84222" stroke="#4F46E5" strokeWidth="4" />
                </g>
              </svg>
            </div>
            <span className="text-white text-2xl leading-snug">Loading</span>
            </div>
          </div>
        </div>
        </Wrapper>
      </div>
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
          * Section: Subscribe
          */}
        <div className="space-y-4">
          <h2 className="text-3xl mb-6 font-normal">Subscribe</h2>
          <p>{`Subscribe to Waste2Earn and we'll send major Waste2Earn updates straight to your inbox.`}</p>
          <iframe src="https://waste2earn.substack.com/embed" width="100%" frameBorder="0" scrolling="no"></iframe>
        </div>
        </>
	):(
		<>
      <div style={overlay2Style}></div>
      <div style={overlay3Style}></div>

      <div style={settings}>

      <svg onClick={toggleSignOutForm} className="flex-none cursor-pointer stroke-gray-900" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 10.2969V13.7031C2 14.1734 2.38209 14.5546 2.85343 14.5546C5.13807 14.5546 6.56533 17.0329 5.43635 19.0191C5.20068 19.4264 5.34054 19.9472 5.74873 20.1824L8.7051 21.8855C9.11329 22.1206 9.63524 21.9811 9.87091 21.5738C11.0151 19.5963 13.878 19.6055 15.0375 21.5741C15.2731 21.9814 15.7951 22.1209 16.2033 21.8858L19.1596 20.1827C19.5678 19.9475 19.7077 19.4267 19.472 19.0194C18.3432 17.0329 19.7708 14.5546 22.0557 14.5546C22.527 14.5546 22.9091 14.1734 22.9091 13.7031V10.2969C22.9091 9.82661 22.527 9.44536 22.0557 9.44536C19.771 9.44536 18.3438 6.96706 19.4727 4.98087C19.7084 4.57358 19.5686 4.05278 19.1604 3.81763L16.204 2.11454C15.7958 1.87939 15.2738 2.01894 15.0382 2.42623C13.8786 4.39479 11.0159 4.40344 9.87163 2.42592C9.63596 2.01863 9.11401 1.87908 8.70582 2.11423L5.74944 3.81732C5.34125 4.05247 5.2014 4.57327 5.43707 4.98056C6.56584 6.96709 5.13826 9.44536 2.85343 9.44536C2.38209 9.44536 2 9.82661 2 10.2969Z" stroke="currentColor" stroke-width="1.2"></path>
        <path d="M15.6364 11.5455C15.6364 13.3027 14.2118 14.7273 12.4545 14.7273C10.6973 14.7273 9.27273 13.3027 9.27273 11.5455C9.27273 9.78819 10.6973 8.36364 12.4545 8.36364C14.2118 8.36364 15.6364 9.78819 15.6364 11.5455Z" stroke="currentColor" stroke-width="1.2"></path>
      </svg>

    </div>


    <div onClick={showsignOutForm} style={signout}>Sign Out</div>

      <div className="flex flex-col align-center bg-green-900 font-normal shadow-md rounded px-8 pt-10 pb-10 m-5">
        <span className="flex flex-row mb-3 text-base">Firstname: <p className="ml-2 mb-3 text-base">{userDetails?.firstname || 'No Firstname'}</p></span>
        <span className="flex flex-row mb-3 text-base">Lastname: <p className="ml-2 mb-3 text-base">{userDetails?.lastname || 'No Lastname'}</p></span>
        <span className="flex flex-row mb-3 text-base">Role: <p className="ml-2 mb-3 text-base">{userDetails?.role || 'No Role'}</p></span>
        {/*<span className="flex flex-row mb-3">Created at: <p className="ml-2">{new Date(userDetails?.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p></span>*/}
        <span className="flex flex-row mb-3 text-base">Location: <p className="ml-2 mb-3 text-base">{userDetails?.location || 'No Location'}</p></span>

        <button onClick={showEditForm} type='button' className='mt-10 py-2.5 px-6 bg-sky-700 text-white rounded-lg cursor-pointer text-2xl text-center shadow-xs transition-all duration-500 hover:bg-sky-900'>Edit</button>
      </div>


      <div style={editForm}>
        <div className="flex items-center justify-center min-h-screen transition-all duration-300 ease-in-out">

          <form className="relative w-[380px] h-[480px] bg-[#dbd9d9] p-6 rounded-lg shadow-md" noValidate>
          <div className="absolute flex items-center justify-center bg-[#e85151] top-3 right-3 text-white-500 rounded-lg shadow-md hover:bg-[#bf3737] text-4xl font-light cursor-pointer w-8 h-8 transition-all duration-300 ease-in-out" onClick={hideEditForm}>&times;</div>

          </form> 

        </div>
      </div>


      <div style={signoutForm}>
        <div className="flex items-center justify-center min-h-screen transition-all duration-300 ease-in-out">

        <form className="relative w-[380px] h-[200px] bg-[#dbd9d9] p-6 rounded-lg shadow-md flex flex-col items-center justify-center" noValidate>

          <div className="absolute flex items-center justify-center bg-[#e85151] top-3 right-3 text-white-500 rounded-lg shadow-md hover:bg-[#bf3737] text-4xl font-light cursor-pointer w-8 h-8 transition-all duration-300 ease-in-out" onClick={hidesignOutForm}>&times;</div>
            <h2 className="text-2xl mt-18 text-zinc-600 text-center">Are you sure you want to Sign Out?</h2>

            <button onClick={handleSignOut} type='button' className='mt-5 w-[100px] pt-2 pb-2 bg-[#913030] text-white rounded-lg cursor-pointer text-1xl text-center shadow-xs transition-all duration-500 hover:bg-[#662222]'>{isSigningOut ? ('Signing Out') : ('Sign Out')}</button>
          </form> 

        </div>
      </div>

    </>
	)} 
      </Wrapper>
    </>
  )
}

export default Home