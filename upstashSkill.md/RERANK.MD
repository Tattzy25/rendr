> ## Documentation Index
> Fetch the complete documentation index at: https://upstash.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Reranking

Upstash Search combines semantic and full text search results for maximum relevancy. Optionally, you can re-rank the returned documents using a state of the art model to further improve relevancy.

We provide this additional re-ranking as an opt-in setting because it requires more computational resources and is charged at \$1 per 1K re-ranked documents.

<Tabs>
  <Tab title="Python">
    ```python theme={"system"}
    scores = index.search(
        query="space opera",
        limit=2,
        reranking=True,
    )
    ```
  </Tab>

  <Tab title="TypeScript">
    ```ts theme={"system"}
    const searchResults = await index.search({
      query: "space opera",
      limit: 2,
      reranking: true,
    });
    ```
  </Tab>
</Tabs>
