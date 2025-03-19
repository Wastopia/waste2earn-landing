import Link from "next/link";
import { FC } from "react";

import styles from './Wrapper.module.css';
import Footer from "./Footer";

export type WrapperProps = {
  variant: "default" | "farm";
}

const Wrapper : FC<WrapperProps> = ({
  children,
  variant = "default"
}) => (
  // Side image variant
  variant === "farm" ? (
    <div className="flex flex-row bg-gradient-to-br from-black via-[#034951] to-blue-900 text-white">
      <div className={styles.TextContainer}>
        <div className="max-w-[720px] space-y-24 lg:pb-12">
          {/* Header */}
          <div className="flex justify-center">
            <Link href="/"><a><img src="/logo-w2e.png" className="md:h-15 h-15 flex justify-center" /></a></Link>
          </div>
          {/* Content */}
          {children}
          {/* Footer */}
          <Footer />
        </div>
      </div>
      <div className={styles.FarmImage}>
        <video autoPlay muted loop className={styles.videoElement}>
        <source src="/assets/video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  ) 
  // Default variant
  : (
    <div className="flex flex-row">
      <div className={styles.TextContainer}>
        <div className="max-w-[720px] w-full space-y-12 lg:pb-12">
          {/* Header */}
          <div className="flex flex-row items-center">
            <div className="flex-1">
              <Link href="/"><a><img src="/logo-w2e.svg" className="h-10" /></a></Link>
            </div>
            <Link href="/blog">
              <a className="inline-block px-4 py-2 text-md mx-2">
                Blog
              </a>
            </Link>
            <a href="https://hm7ne-saaaa-aaaao-qezaq-cai.icp0.io/" target="_blank" rel="noreferrer" className="inline-block border border-gray-200 rounded-md px-4 py-2 text-md">
              Launch App
            </a>
          </div>
          {/* Content */}
          {children}
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
)

export default Wrapper;