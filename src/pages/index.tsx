import Container from "@mui/material/Container";
import { HeaderSearch, GiphyTrendingList, GiphySearchList } from "@/containers";
import { Center } from "@/components";
import useListenSearchParam from "@/hooks/useListenSearchParam";
import Head from "next/head";


export default function Home() {
  const { search } = useListenSearchParam();

  return (
    <>
      <Head>
        <title>Gif Searcher</title>
        
       
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
      </Head>
      <Container maxWidth="lg">
        <Center>
          
          <HeaderSearch />
          {search === "" ? (
            <GiphyTrendingList />
          ) : (
            <GiphySearchList search={search} />
          )}
        </Center>
      </Container>
    </>
  );
}
