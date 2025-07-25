import { NextSeo } from "next-seo";
import Link from "next/link";
import Button from "../components/Buttons/Button";
import Wrapper from "../components/Wrapper";
import { COPY, IMAGES } from "../lib/constants";

type ErrorProps = { res : any, err: any };

// Metadata
const TITLE = `404 | Waste2Earn`;
const DESC  = COPY.BASIC_DESCRIPTION;
function Error(props: any) {
  return (
    <>
      <NextSeo
        title={TITLE}
        description={DESC}
        openGraph={{
          title: TITLE,
          description: DESC,
          images: [
            {
              url: IMAGES.BASIC_META,
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
        <div className="space-y-4">
          <h1 className="text-4xl">Page not found.</h1>
          <Link href="/">
            <a>
              <Button>
                &larr; Return home
              </Button>
            </a>
          </Link>
        </div>
      </Wrapper>
    </>
  )
}

Error.getInitialProps = ({ res, err } : ErrorProps) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { 
    statusCode,
    err,
  }
}

export default Error;