import Button from "../Buttons/Button"
import Image from "next/image"

const PokerBanner = () => (
  <div>
    <div className="flex flex-col space-y-4">
      <div className="max-w-sm">
        <Image src="/assets/poker/poker-1.png" alt="Poker Tournament Banner" width={400} height={300} />
      </div>
      <div className="flex-1 space-y-4">
        <div>
          <h2 className="font-bold text-lg">$Waste Token Airdrop Mechanism</h2>
          <p className="text-slate-500">Join now to get a seat at one the first Waste2Earn OG.</p>
        </div>
        <div className="">
          <div className="inline-block space-y-1 mr-4">
            <p className="text-slate-500 uppercase text-xs tracking-wider">Date</p>
            <p className="text-xl">2/26 5:30pm PT</p>
          </div>
          <div className="inline-block space-y-1">
            <p className="text-slate-500 uppercase text-xs tracking-wider">Prize Pool</p>
            <p className="text-xl">600,000 Waste</p>
          </div>
        </div>
        <Button
          target="_blank"
          rel="noreferrer"
          href="#">
          Buy in: 100 Waste
        </Button>
      </div>
    </div>
  </div>
)

export default PokerBanner;