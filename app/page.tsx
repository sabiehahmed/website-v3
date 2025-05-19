import ScrollContainer from "@/components/scroll-container";

export default async function Home() {
  console.log(`%c
 ▗▄▄▖▗▖ ▗▖▗▄▄▄▖▗▖   ▗▖       ▗▄▄▖ ▗▄▄▖  ▗▄▖ 
▐▌   ▐▌ ▐▌  █  ▐▌   ▐▌       ▐▌ ▐▌▐▌ ▐▌▐▌ ▐▌
▐▌   ▐▛▀▜▌  █  ▐▌   ▐▌       ▐▛▀▚▖▐▛▀▚▖▐▌ ▐▌
▝▚▄▄▖▐▌ ▐▌▗▄█▄▖▐▙▄▄▖▐▙▄▄▖    ▐▙▄▞▘▐▌ ▐▌▝▚▄▞▘
                                            
    `, `font-family: monospace`);

  return (
    <>
      <ScrollContainer />
    </>
  );
}
