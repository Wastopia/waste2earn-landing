import React from 'react';
import { FaFacebook, FaGithub, FaXTwitter, FaDiscord } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-gray-400 py-8 px-4 md:px-6 font-sans">
      <div className="container mx-auto max-w-7xl">
        {/* Top row with copyright and social icons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-sm">© {currentYear}</span>
            <a href="https://waste2earn.xyz" className="ml-2 text-blue-400 hover:text-blue-300">
              Waste2Earn
            </a>
          </div>
          
          <div className="flex space-x-4">
            <a href="https://x.com/waste2earn" aria-label="XTwitter" className="text-gray-400 hover:text-white">
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a href="https://discord.gg/W7bFg6J98q" aria-label="Discord" className="text-gray-400 hover:text-white">
              <FaDiscord className="w-5 h-5" />
            </a>
            <a href="https://facebook.com/waste2earn.xyz" aria-label="Facebook" className="text-gray-400 hover:text-white">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href="https://github.com/Wastopia" aria-label="GitHub" className="text-gray-400 hover:text-white">
              <FaGithub className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {/* Version numbers */}
        <div className="text-xs mb-4">
          Waste2Earn v0.3.0
        </div>
        
        {/* dApp domains section */}
        <div className="mb-3">
          <p className="text-sm mb-2">
            The dApp domains: (Add them to your favorites to prevent scamming risks)
          </p>
          <div className="text-sm flex flex-wrap">
            <a href="https://waste2earn.xyz" className="text-blue-400 hover:text-blue-300">
              waste2earn.xyz
            </a>
            <span>,</span>
            <a href="https://hm7ne-saaaa-aaaao-qezaq-cai.icp0.io/" className="text-blue-400 hover:text-blue-300">
              betawallet
            </a>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="text-xs text-gray-500 leading-relaxed font-sans">
          <p>
            Waste2Earn is a community-driven decentralized project focusing on waste management solutions through blockchain technology. Waste2Earn and its $WASTE token are provided &quot;as is&quot; without guarantees, and users interact with the platform at their own risk and responsibility.
            The $WASTE token serves utility and governance functions only; no individual or team guarantees its value. Before using Waste2Earn, carefully review its documentation to understand how it operates on the Internet Computer blockchain and the associated risks.
            No person, entity, developer, or Waste2Earn itself shall be liable for any damages or claims related to platform usage, including loss of assets, profits, or any direct, indirect, or consequential damages. This applies whether accessing Waste2Earn directly or through third-party interfaces.
            Users are solely responsible for managing risks associated with their activities on the platform.
          </p>
          <p className="mt-2">
            Utilizing this project/protocol may not comply with the requirements of certain regional laws. You are requested to comply with local laws and to assume all legal consequences arising from its use.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
