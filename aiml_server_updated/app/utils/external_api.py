import wikipedia

def fallback_search(query: str) -> str:
    try:
        return wikipedia.summary(query, sentences=2)
    except:
        return "Sorry, I couldn’t find an external reference."
