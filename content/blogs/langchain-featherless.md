---
title: "LangChain & Featherless Serverless Inference"
date: "2023-05-24"
featureImage: "/images/blog/langchain-featherless.png"
excerpt: "LLM applications without infrastructure overhead."
author: "Sabieh Ahmed"
---

## From Prototype to Production: Why Combining LangChain + Featherless is a Game-Changer

As the open-source AI ecosystem rapidly evolves, developers face growing challenges in managing infrastructure and evaluating an expanding universe of models. By integrating with LangChain, Featherless enables you to build and scale LLM-powered applications with zero infrastructure hassle and instant access to over 4,300 open-source models.

Key benefits of this integration include:

- **Scalable Infrastructure**: Deploy production-grade LLM applications without any DevOps code. No GPU provisioning, autoscaling headaches, or container management.
- **Unlimited Model Flexibility**: Access thousands of models like Mistral, Llama, DeepSeek, and Qwen through a single API by changing just one parameter.
- **Predictable Pricing**: Enjoy straightforward subscription-based pricing with no hidden costs.
- **Rapid Prototyping & Testing**: Evaluate different models for your use case in minutes, not days.

The goal is to let you focus on your application logic while Featherless handles the heavy lifting of inference infrastructure.

## Quickstart: Launch Your LangChain App with Featherless

Getting started is incredibly straightforward:

1. **Install necessary packages**:

    ```bash
    pip install langchain langchain-core langchain-featherless-ai
    ```

2. **Initialize `ChatFeatherlessAi` as your LLM provider in LangChain**:

    ```python
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.output_parsers import StrOutputParser
    from langchain_featherless_ai import ChatFeatherlessAi

    # Initialize Featherless LLM
    llm = ChatFeatherlessAi(
        featherless_api_key="YOUR_FEATHERLESS_API_KEY",  # Replace with your actual key
        model="mistralai/Mistral-Small-24B-Instruct-2501",
        temperature=0.7,
        max_tokens=256
    )

    # Define a prompt template
    prompt = ChatPromptTemplate.from_template(
        "What is a creative slogan for a product called {product}?"
    )

    # Define an output parser
    output_parser = StrOutputParser()

    # Construct the chain using LCEL's pipe (|) operator
    chain = prompt | llm | output_parser

    # Invoke the chain
    product_name = "Featherless AI"
    response = chain.invoke({"product": product_name})

    print(f"Slogan for {product_name}: {response}")
    ```

_Key Change_: We're now using `ChatFeatherlessAi` directly from `langchain_featherless_ai` instead of the OpenAI-compatible endpoint. The API key can be passed directly or set via the `FEATHERLESS_API_KEY` environment variable.

Done! You've just powered your LangChain application with a model from Featherless using our direct, native integration and modern LCEL syntax.

## Example Use Case: Building a RAG App with Native Featherless Integration

Let's delve deeper into the power of this native integration by building a lightweight RAG (Retrieval-Augmented Generation) system, perfect for creating Q&A bots over your own documents.

We'll use:

- `ChatFeatherlessAi` for LLM inference.
- `LangChain` (LCEL, community packages) for orchestration and retrieval.
- `FAISS` (from `langchain-community`) as a simple in-memory vector store.
- `HuggingFaceEmbeddings` (from `langchain-huggingface`) for document embedding.

1. **Install additional packages for RAG**:

    ```bash
    pip install langchain-community langchain-huggingface langchain-text-splitters faiss-cpu sentence-transformers
    ```

2. **Ingest and index your documents**:

    ```python
    from langchain_community.vectorstores import FAISS
    from langchain_huggingface import HuggingFaceEmbeddings
    from langchain_community.document_loaders import TextLoader
    from langchain_text_splitters import RecursiveCharacterTextSplitter

    # Create a dummy "your_document.txt" file in the same directory for this example:
    # File content: "The Featherless API provides access to many LLMs. It's designed for ease of use and developer productivity."
    try:
        with open("your_document.txt", "w", encoding="utf-8") as f:
            f.write("The Featherless API provides access to many LLMs. It's designed for ease of use and developer productivity.")

        loader = TextLoader("./your_document.txt", encoding="utf-8")
        documents = loader.load()
    except Exception as e:
        print(f"Error preparing or loading document: {e}")
        print("Please ensure you can write to 'your_document.txt' or create it manually.")
        documents = []

    retriever = None
    if documents:
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        split_docs = text_splitter.split_documents(documents)

        # Using a common, reliable sentence transformer model
        embeddings_model_name = "sentence-transformers/all-mpnet-base-v2"
        embeddings = HuggingFaceEmbeddings(model_name=embeddings_model_name)

        try:
            vectorstore = FAISS.from_documents(split_docs, embeddings)
            retriever = vectorstore.as_retriever(search_kwargs={"k": 2}) 
        except Exception as e:
            print(f"Error creating FAISS vector store or retriever: {e}")
            print("This might be related to your PyTorch/Torchvision/FAISS setup.")
            print("Ensure you followed Step 1 for installing PyTorch correctly.")
    else:
        print("No documents loaded, retriever will not be initialized.")
    ```

3. **Set up `ChatFeatherlessAi` and build the RAG chain using LCEL**:

    ```python
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.output_parsers import StrOutputParser
    from langchain_core.runnables import RunnablePassthrough, RunnableParallel
    from langchain_featherless_ai import ChatFeatherlessAi

    # Initialize Featherless LLM
    llm = ChatFeatherlessAi(
        featherless_api_key="YOUR_FEATHERLESS_API_KEY",  # Replace
        model="mistralai/Mistral-Small-24B-Instruct-2501",
        temperature=0.3  # Lower temperature for more factual RAG
    )

    # RAG Prompt Template
    template = """Answer the question based only on the following context:
    {context}

    Question: {question}

    Answer:"""
    rag_prompt = ChatPromptTemplate.from_template(template)

    # Helper function to format retrieved documents
    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    if retriever:
        # Construct the RAG chain using LCEL
        rag_chain_from_docs = (
            RunnablePassthrough.assign(context=(lambda x: format_docs(x["documents"])))
            | rag_prompt
            | llm
            | StrOutputParser()
        )

        rag_chain_with_source = RunnableParallel(
            {"documents": retriever, "question": RunnablePassthrough()}
        ).assign(answer=rag_chain_from_docs)

        # Example Invocation
        question = "What is the Featherless API designed for?"
        result = rag_chain_with_source.invoke(question)

        print(f"\nQuestion: {question}")
        print(f"Answer: {result['answer']}")
        print("\nSources:")
        for doc in result['documents']:
            print(f"- {doc.page_content} (Metadata: {doc.metadata})")
    else:
        print("RAG chain not created as retriever is unavailable.")
    ```

This example demonstrates a modern, LCEL-based approach to building a sophisticated RAG system, seamlessly powered by serverless inference from Featherless and orchestrated via LangChain.

## Effortless Model Experimentation: Remember the `model` Parameter

Want to see if LLaMA 3 provides better answers for your use case? Or perhaps test DeepSeek's capabilities? With the native `ChatFeatherlessAi` integration, switching models is as simple as updating the `model` parameter:

```python
# Initialize with LLaMA 3
llm_llama3 = ChatFeatherlessAi(
    featherless_api_key="YOUR_FEATHERLESS_API_KEY",
    model="meta-llama/Llama-3.3-70B-Instruct"  # Example LLaMA 3 model from Featherless
)

# Or try DeepSeek
llm_deepseek = ChatFeatherlessAi(
    featherless_api_key="YOUR_FEATHERLESS_API_KEY",
    model="deepseek-ai/DeepSeek-V3-0324"  # Example DeepSeek model from Featherless
)

# Then, you can plug these into your LCEL chains:
# new_chain = prompt | llm_llama3 | output_parser
# new_rag_chain_with_source = RunnableParallel(...).assign(answer=rag_chain_from_docs.with_llm(llm_deepseek))
```

This frictionless model evaluation is a game-changer for prompt tuning and finding the perfect LLM for your specific task, all within a familiar LangChain paradigm.

## How to Get Started with Featherless and LangChain

1. **Create your free Featherless account**: Sign up at [Featherless.ai](https://featherless.ai)
2. **Grab your API key**: Find it on your Featherless dashboard. Set it as an environment variable `FEATHERLESS_API_KEY` or pass it directly to `ChatFeatherlessAi`.
3. **Explore the Model Catalog**: Discover over 4,300 models ready for instant deployment. Check the latest list [here](https://featherless.ai/models).
4. **Install `langchain-featherless-ai` and other necessary `langchain` packages**, then use `ChatFeatherlessAi` as shown.
5. **Dive into the Docs**:

    * [Featherless API Documentation](https://docs.featherless.ai)
    * [Official LangChain Integration Docs](https://python.langchain.com/docs/integrations/llms/featherless)
    * [LangChain Expression Language (LCEL)](https://python.langchain.com/docs/expression_language/)

## Final Thoughts: Build Without Limits

The native synergy between LangChain's powerful orchestration capabilities and Featherless's serverless inference platform creates an unparalleled developer experience. You can now focus on building innovative AI applications without worrying about infrastructure, while having the flexibility to experiment with thousands of models to find the perfect fit for your use case.

Start building today and experience the freedom of serverless LLM development!
